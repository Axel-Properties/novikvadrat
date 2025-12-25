-- Agents Management Migration
-- Creates agents and agent_projects tables

-- =====================================================
-- AGENTS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Link to user account (optional)
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,

  -- Personal Info
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  phone_secondary VARCHAR(50),

  -- Profile
  photo_url VARCHAR(500),
  bio_en TEXT,
  bio_sr TEXT,
  title VARCHAR(100),

  -- Professional Info
  license_number VARCHAR(100),
  license_expiry_date DATE,
  years_experience INT,
  languages JSONB DEFAULT '["Serbian", "English"]'::jsonb,

  -- Specializations
  specializations JSONB DEFAULT '[]'::jsonb,
  property_types JSONB DEFAULT '[]'::jsonb,
  areas_served JSONB DEFAULT '[]'::jsonb,

  -- Commission
  default_commission_rate DECIMAL(5, 2) DEFAULT 3.00,
  commission_split_rate DECIMAL(5, 2) DEFAULT 50.00,

  -- Social Media
  linkedin_url VARCHAR(255),
  instagram_url VARCHAR(255),
  facebook_url VARCHAR(255),
  twitter_url VARCHAR(255),

  -- Performance
  total_sales_count INT DEFAULT 0,
  total_sales_value DECIMAL(14, 2) DEFAULT 0,
  total_rentals_count INT DEFAULT 0,
  rating DECIMAL(3, 2) CHECK (rating >= 0 AND rating <= 5),
  review_count INT DEFAULT 0,

  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  availability_status VARCHAR(30) DEFAULT 'available' CHECK (availability_status IN ('available', 'busy', 'on_leave', 'unavailable')),

  -- Notes
  notes TEXT,
  internal_notes TEXT,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  hired_date DATE,
  last_sale_at TIMESTAMP
);

CREATE INDEX idx_agents_user ON agents(user_id);
CREATE INDEX idx_agents_email ON agents(email);
CREATE INDEX idx_agents_name ON agents(last_name, first_name);
CREATE INDEX idx_agents_active ON agents(is_active);
CREATE INDEX idx_agents_featured ON agents(is_featured);
CREATE INDEX idx_agents_availability ON agents(availability_status);

-- =====================================================
-- AGENT PROJECTS TABLE (Junction)
-- =====================================================

CREATE TABLE IF NOT EXISTS agent_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,

  -- Assignment Details
  is_primary BOOLEAN DEFAULT FALSE,
  commission_rate DECIMAL(5, 2),

  -- Performance on this project
  units_sold INT DEFAULT 0,
  units_rented INT DEFAULT 0,
  total_value DECIMAL(14, 2) DEFAULT 0,

  -- Status
  is_active BOOLEAN DEFAULT TRUE,

  -- Timestamps
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(agent_id, project_id)
);

CREATE INDEX idx_agent_projects_agent ON agent_projects(agent_id);
CREATE INDEX idx_agent_projects_project ON agent_projects(project_id);
CREATE INDEX idx_agent_projects_primary ON agent_projects(is_primary);

-- =====================================================
-- Add agent references to existing tables
-- =====================================================

-- Add agent_id to buyers if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'buyers' AND column_name = 'assigned_agent_id'
  ) THEN
    ALTER TABLE buyers ADD COLUMN assigned_agent_id UUID REFERENCES agents(id) ON DELETE SET NULL;
    CREATE INDEX idx_buyers_agent ON buyers(assigned_agent_id);
  END IF;
END $$;

-- Add agent_id to sales if not exists (already has agent_id but not referenced)
DO $$
BEGIN
  -- Drop existing constraint if any
  ALTER TABLE sales DROP CONSTRAINT IF EXISTS sales_agent_id_fkey;

  -- Add foreign key constraint
  ALTER TABLE sales
    ADD CONSTRAINT sales_agent_id_fkey
    FOREIGN KEY (agent_id) REFERENCES agents(id) ON DELETE SET NULL;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Add agent_id to inquiries if not exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'inquiries' AND column_name = 'assigned_agent_id'
  ) THEN
    -- Drop existing constraint if any
    ALTER TABLE inquiries DROP CONSTRAINT IF EXISTS inquiries_assigned_agent_id_fkey;

    -- Add foreign key constraint
    ALTER TABLE inquiries
      ADD CONSTRAINT inquiries_assigned_agent_id_fkey
      FOREIGN KEY (assigned_agent_id) REFERENCES agents(id) ON DELETE SET NULL;
  END IF;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- =====================================================
-- TRIGGER: Update agent performance on sale
-- =====================================================

CREATE OR REPLACE FUNCTION update_agent_on_sale()
RETURNS TRIGGER AS $$
BEGIN
  -- Update agent stats when sale is completed
  IF NEW.status = 'completed' AND NEW.agent_id IS NOT NULL THEN
    UPDATE agents
    SET
      total_sales_count = total_sales_count + 1,
      total_sales_value = total_sales_value + COALESCE(NEW.sale_price, 0),
      last_sale_at = CURRENT_TIMESTAMP,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.agent_id;

    -- Update agent_projects if applicable
    IF NEW.project_id IS NOT NULL THEN
      UPDATE agent_projects
      SET
        units_sold = units_sold + 1,
        total_value = total_value + COALESCE(NEW.sale_price, 0)
      WHERE agent_id = NEW.agent_id AND project_id = NEW.project_id;
    END IF;

  -- Reverse if sale was completed but now cancelled/refunded
  ELSIF TG_OP = 'UPDATE'
    AND OLD.status = 'completed'
    AND NEW.status IN ('cancelled', 'refunded')
    AND NEW.agent_id IS NOT NULL
  THEN
    UPDATE agents
    SET
      total_sales_count = GREATEST(0, total_sales_count - 1),
      total_sales_value = GREATEST(0, total_sales_value - COALESCE(OLD.sale_price, 0)),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.agent_id;

    IF NEW.project_id IS NOT NULL THEN
      UPDATE agent_projects
      SET
        units_sold = GREATEST(0, units_sold - 1),
        total_value = GREATEST(0, total_value - COALESCE(OLD.sale_price, 0))
      WHERE agent_id = NEW.agent_id AND project_id = NEW.project_id;
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_agent_on_sale
AFTER INSERT OR UPDATE ON sales
FOR EACH ROW
EXECUTE FUNCTION update_agent_on_sale();

-- =====================================================
-- TRIGGER: Update agent performance on rental
-- =====================================================

CREATE OR REPLACE FUNCTION update_agent_on_rental()
RETURNS TRIGGER AS $$
BEGIN
  -- This would need agent_id on rental_contracts - skipping for now
  -- Can be implemented when rental_contracts has agent_id
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- TRIGGER: Update timestamps
-- =====================================================

CREATE TRIGGER trigger_update_agent_timestamp
BEFORE UPDATE ON agents
FOR EACH ROW
EXECUTE FUNCTION update_expense_timestamp();

-- =====================================================
-- VIEW: Agent Performance
-- =====================================================

CREATE OR REPLACE VIEW v_agent_performance AS
SELECT
  a.id,
  a.first_name || ' ' || a.last_name as full_name,
  a.email,
  a.phone,
  a.photo_url,
  a.title,
  a.is_active,
  a.is_featured,
  a.availability_status,
  a.total_sales_count,
  a.total_sales_value,
  a.total_rentals_count,
  a.rating,
  a.review_count,
  a.last_sale_at,
  -- Current month performance
  (
    SELECT COUNT(*) FROM sales s
    WHERE s.agent_id = a.id
    AND s.status = 'completed'
    AND s.contract_date >= DATE_TRUNC('month', CURRENT_DATE)
  ) as sales_this_month,
  (
    SELECT COALESCE(SUM(s.sale_price), 0) FROM sales s
    WHERE s.agent_id = a.id
    AND s.status = 'completed'
    AND s.contract_date >= DATE_TRUNC('month', CURRENT_DATE)
  ) as value_this_month,
  -- Active inquiries
  (
    SELECT COUNT(*) FROM inquiries i
    WHERE i.assigned_agent_id = a.id
    AND i.status NOT IN ('converted', 'not_interested', 'lost', 'spam')
  ) as active_inquiries,
  -- Active buyers
  (
    SELECT COUNT(*) FROM buyers b
    WHERE b.assigned_agent_id = a.id
    AND b.status IN ('active', 'qualified', 'negotiating')
  ) as active_buyers,
  -- Projects count
  (
    SELECT COUNT(*) FROM agent_projects ap
    WHERE ap.agent_id = a.id AND ap.is_active = TRUE
  ) as assigned_projects
FROM agents a
ORDER BY a.total_sales_value DESC;

-- =====================================================
-- VIEW: Agent Leaderboard
-- =====================================================

CREATE OR REPLACE VIEW v_agent_leaderboard AS
SELECT
  a.id,
  a.first_name || ' ' || a.last_name as full_name,
  a.photo_url,
  a.title,
  COUNT(s.id) as total_sales,
  COALESCE(SUM(s.sale_price), 0) as total_value,
  COALESCE(SUM(s.commission_amount), 0) as total_commission,
  ROUND(AVG(s.sale_price), 0) as avg_sale_price,
  MIN(s.contract_date) as first_sale_date,
  MAX(s.contract_date) as last_sale_date
FROM agents a
LEFT JOIN sales s ON a.id = s.agent_id AND s.status = 'completed'
WHERE a.is_active = TRUE
GROUP BY a.id
ORDER BY total_value DESC;
