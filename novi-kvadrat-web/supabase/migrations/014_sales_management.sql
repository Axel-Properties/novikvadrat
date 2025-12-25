-- Sales Management System Migration
-- Creates buyers, sales, and sale_payments tables

-- =====================================================
-- BUYERS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS buyers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Personal Info
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  phone_secondary VARCHAR(50),

  -- Identification
  id_number VARCHAR(50),
  id_type VARCHAR(50) DEFAULT 'personal_id' CHECK (id_type IN ('personal_id', 'passport', 'company_id', 'other')),

  -- Address
  address TEXT,
  city VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100) DEFAULT 'Serbia',

  -- Company (if corporate buyer)
  is_company BOOLEAN DEFAULT FALSE,
  company_name VARCHAR(200),
  company_tax_id VARCHAR(50),

  -- Preferences
  budget_min DECIMAL(12, 2),
  budget_max DECIMAL(12, 2),
  preferred_locations JSONB DEFAULT '[]'::jsonb,
  preferred_property_types JSONB DEFAULT '[]'::jsonb,
  preferred_bedrooms_min INT,
  preferred_bedrooms_max INT,
  preferred_area_min DECIMAL(8, 2),
  preferred_area_max DECIMAL(8, 2),

  -- Source & Assignment
  source VARCHAR(50) DEFAULT 'website' CHECK (source IN ('website', 'phone', 'walk_in', 'referral', 'social_media', 'advertisement', 'agent', 'other')),
  source_details TEXT,
  assigned_agent_id UUID,

  -- Status
  status VARCHAR(30) DEFAULT 'active' CHECK (status IN ('lead', 'active', 'qualified', 'negotiating', 'purchased', 'inactive', 'lost')),
  priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),

  -- Timeline
  purchase_timeline VARCHAR(50) CHECK (purchase_timeline IN ('immediate', 'within_1_month', 'within_3_months', 'within_6_months', 'within_1_year', 'flexible')),
  financing_type VARCHAR(50) CHECK (financing_type IN ('cash', 'mortgage', 'mixed', 'undecided')),
  pre_approved BOOLEAN DEFAULT FALSE,

  -- Notes
  notes TEXT,
  internal_notes TEXT,

  -- Documents
  documents JSONB DEFAULT '[]'::jsonb,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_contact_at TIMESTAMP
);

CREATE INDEX idx_buyers_email ON buyers(email);
CREATE INDEX idx_buyers_phone ON buyers(phone);
CREATE INDEX idx_buyers_name ON buyers(last_name, first_name);
CREATE INDEX idx_buyers_status ON buyers(status);
CREATE INDEX idx_buyers_agent ON buyers(assigned_agent_id);
CREATE INDEX idx_buyers_source ON buyers(source);
CREATE INDEX idx_buyers_budget ON buyers(budget_min, budget_max);

-- =====================================================
-- SALES TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS sales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Sale Number (auto-generated)
  sale_number VARCHAR(50) UNIQUE,

  -- Relations
  unit_id UUID REFERENCES units(id) ON DELETE SET NULL,
  buyer_id UUID NOT NULL REFERENCES buyers(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  building_id UUID REFERENCES project_buildings(id) ON DELETE SET NULL,
  agent_id UUID,

  -- Sale Details
  sale_price DECIMAL(12, 2) NOT NULL,
  original_price DECIMAL(12, 2),
  discount_amount DECIMAL(10, 2) DEFAULT 0,
  discount_reason TEXT,
  currency VARCHAR(3) DEFAULT 'EUR',

  -- VAT
  vat_included BOOLEAN DEFAULT TRUE,
  vat_amount DECIMAL(10, 2) DEFAULT 0,
  first_buyer_vat_refund BOOLEAN DEFAULT FALSE,

  -- Payment Structure
  down_payment_amount DECIMAL(12, 2) DEFAULT 0,
  down_payment_percentage DECIMAL(5, 2),
  down_payment_date DATE,
  down_payment_paid BOOLEAN DEFAULT FALSE,

  -- Financing
  financing_type VARCHAR(50) DEFAULT 'cash' CHECK (financing_type IN ('cash', 'mortgage', 'installments', 'mixed')),
  mortgage_bank VARCHAR(100),
  mortgage_amount DECIMAL(12, 2),
  mortgage_approved BOOLEAN DEFAULT FALSE,
  mortgage_approval_date DATE,

  -- Dates
  reservation_date DATE,
  contract_date DATE,
  handover_date DATE,
  expected_handover_date DATE,

  -- Status Pipeline
  status VARCHAR(30) DEFAULT 'inquiry' CHECK (status IN (
    'inquiry',
    'viewing_scheduled',
    'viewed',
    'offer_made',
    'negotiating',
    'reserved',
    'contract_pending',
    'contract_signed',
    'payment_in_progress',
    'completed',
    'cancelled',
    'refunded'
  )),
  status_changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Cancellation
  cancellation_date DATE,
  cancellation_reason TEXT,
  refund_amount DECIMAL(12, 2),

  -- Commission
  commission_percentage DECIMAL(5, 2),
  commission_amount DECIMAL(10, 2),
  commission_paid BOOLEAN DEFAULT FALSE,
  commission_paid_date DATE,

  -- Documents
  contract_document_url VARCHAR(500),
  additional_documents JSONB DEFAULT '[]'::jsonb,

  -- Notes
  notes TEXT,
  internal_notes TEXT,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sales_unit ON sales(unit_id);
CREATE INDEX idx_sales_buyer ON sales(buyer_id);
CREATE INDEX idx_sales_project ON sales(project_id);
CREATE INDEX idx_sales_agent ON sales(agent_id);
CREATE INDEX idx_sales_status ON sales(status);
CREATE INDEX idx_sales_number ON sales(sale_number);
CREATE INDEX idx_sales_dates ON sales(reservation_date, contract_date, handover_date);

-- =====================================================
-- SALE PAYMENTS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS sale_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Payment Number
  payment_number VARCHAR(50) UNIQUE,

  -- Relations
  sale_id UUID NOT NULL REFERENCES sales(id) ON DELETE CASCADE,
  buyer_id UUID REFERENCES buyers(id) ON DELETE SET NULL,

  -- Payment Details
  payment_type VARCHAR(30) NOT NULL CHECK (payment_type IN (
    'down_payment',
    'installment',
    'final_payment',
    'mortgage_disbursement',
    'adjustment',
    'refund',
    'other'
  )),
  installment_number INT,

  -- Amounts
  amount_due DECIMAL(12, 2) NOT NULL,
  amount_paid DECIMAL(12, 2) DEFAULT 0,
  balance DECIMAL(12, 2) GENERATED ALWAYS AS (amount_due - amount_paid) STORED,
  currency VARCHAR(3) DEFAULT 'EUR',

  -- Dates
  due_date DATE NOT NULL,
  payment_date DATE,

  -- Payment Info
  payment_method VARCHAR(30) CHECK (payment_method IN ('cash', 'bank_transfer', 'card', 'check', 'mortgage', 'escrow', 'other')),
  transaction_reference VARCHAR(100),
  bank_name VARCHAR(100),

  -- Status
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'partial', 'paid', 'overdue', 'cancelled', 'refunded')),

  -- Documents
  receipt_url VARCHAR(500),
  invoice_url VARCHAR(500),

  -- Notes
  notes TEXT,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  paid_at TIMESTAMP
);

CREATE INDEX idx_sale_payments_sale ON sale_payments(sale_id);
CREATE INDEX idx_sale_payments_buyer ON sale_payments(buyer_id);
CREATE INDEX idx_sale_payments_status ON sale_payments(status);
CREATE INDEX idx_sale_payments_due_date ON sale_payments(due_date);
CREATE INDEX idx_sale_payments_type ON sale_payments(payment_type);

-- =====================================================
-- TRIGGER: Auto-generate sale number
-- =====================================================

CREATE OR REPLACE FUNCTION generate_sale_number()
RETURNS TRIGGER AS $$
DECLARE
  year_str VARCHAR(4);
  next_num INT;
BEGIN
  IF NEW.sale_number IS NULL OR NEW.sale_number = '' THEN
    year_str := to_char(CURRENT_DATE, 'YYYY');

    SELECT COALESCE(MAX(
      CAST(SUBSTRING(sale_number FROM 'SL-\d{4}-(\d+)') AS INT)
    ), 0) + 1
    INTO next_num
    FROM sales
    WHERE sale_number LIKE 'SL-' || year_str || '-%';

    NEW.sale_number := 'SL-' || year_str || '-' || LPAD(next_num::TEXT, 4, '0');
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_generate_sale_number
BEFORE INSERT ON sales
FOR EACH ROW
EXECUTE FUNCTION generate_sale_number();

-- =====================================================
-- TRIGGER: Auto-generate sale payment number
-- =====================================================

CREATE OR REPLACE FUNCTION generate_sale_payment_number()
RETURNS TRIGGER AS $$
DECLARE
  year_str VARCHAR(4);
  next_num INT;
BEGIN
  IF NEW.payment_number IS NULL OR NEW.payment_number = '' THEN
    year_str := to_char(CURRENT_DATE, 'YYYY');

    SELECT COALESCE(MAX(
      CAST(SUBSTRING(payment_number FROM 'SP-\d{4}-(\d+)') AS INT)
    ), 0) + 1
    INTO next_num
    FROM sale_payments
    WHERE payment_number LIKE 'SP-' || year_str || '-%';

    NEW.payment_number := 'SP-' || year_str || '-' || LPAD(next_num::TEXT, 5, '0');
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_generate_sale_payment_number
BEFORE INSERT ON sale_payments
FOR EACH ROW
EXECUTE FUNCTION generate_sale_payment_number();

-- =====================================================
-- TRIGGER: Update unit status on sale status change
-- =====================================================

CREATE OR REPLACE FUNCTION update_unit_sale_status()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.unit_id IS NOT NULL THEN
    -- When sale is reserved or beyond, mark unit as reserved
    IF NEW.status IN ('reserved', 'contract_pending', 'contract_signed', 'payment_in_progress') THEN
      UPDATE units SET status = 'reserved', updated_at = CURRENT_TIMESTAMP
      WHERE id = NEW.unit_id;

    -- When sale is completed, mark unit as sold
    ELSIF NEW.status = 'completed' THEN
      UPDATE units SET status = 'sold', updated_at = CURRENT_TIMESTAMP
      WHERE id = NEW.unit_id;

    -- When sale is cancelled/refunded, check if unit should be available again
    ELSIF NEW.status IN ('cancelled', 'refunded') AND TG_OP = 'UPDATE'
          AND OLD.status NOT IN ('cancelled', 'refunded') THEN
      -- Only mark available if no other active sales for this unit
      IF NOT EXISTS (
        SELECT 1 FROM sales
        WHERE unit_id = NEW.unit_id
        AND status NOT IN ('cancelled', 'refunded', 'inquiry', 'viewing_scheduled', 'viewed')
        AND id != NEW.id
      ) THEN
        UPDATE units SET status = 'available', updated_at = CURRENT_TIMESTAMP
        WHERE id = NEW.unit_id;
      END IF;
    END IF;
  END IF;

  -- Track status change time
  IF TG_OP = 'UPDATE' AND OLD.status IS DISTINCT FROM NEW.status THEN
    NEW.status_changed_at := CURRENT_TIMESTAMP;
  END IF;

  NEW.updated_at := CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_unit_sale_status
BEFORE INSERT OR UPDATE ON sales
FOR EACH ROW
EXECUTE FUNCTION update_unit_sale_status();

-- =====================================================
-- TRIGGER: Update buyer status on sale
-- =====================================================

CREATE OR REPLACE FUNCTION update_buyer_on_sale()
RETURNS TRIGGER AS $$
BEGIN
  -- Update buyer status when sale reaches certain stages
  IF NEW.status = 'negotiating' THEN
    UPDATE buyers SET status = 'negotiating', updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.buyer_id AND status IN ('lead', 'active', 'qualified');

  ELSIF NEW.status = 'completed' THEN
    UPDATE buyers SET status = 'purchased', updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.buyer_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_buyer_on_sale
AFTER INSERT OR UPDATE ON sales
FOR EACH ROW
EXECUTE FUNCTION update_buyer_on_sale();

-- =====================================================
-- TRIGGER: Update timestamps
-- =====================================================

CREATE TRIGGER trigger_update_buyer_timestamp
BEFORE UPDATE ON buyers
FOR EACH ROW
EXECUTE FUNCTION update_expense_timestamp();

CREATE TRIGGER trigger_update_sale_payment_timestamp
BEFORE UPDATE ON sale_payments
FOR EACH ROW
EXECUTE FUNCTION update_expense_timestamp();

-- =====================================================
-- VIEW: Sales Pipeline Summary
-- =====================================================

CREATE OR REPLACE VIEW v_sales_pipeline AS
SELECT
  status,
  COUNT(*) as count,
  COALESCE(SUM(sale_price), 0) as total_value,
  COALESCE(AVG(sale_price), 0) as avg_value
FROM sales
WHERE status NOT IN ('cancelled', 'refunded')
GROUP BY status
ORDER BY
  CASE status
    WHEN 'inquiry' THEN 1
    WHEN 'viewing_scheduled' THEN 2
    WHEN 'viewed' THEN 3
    WHEN 'offer_made' THEN 4
    WHEN 'negotiating' THEN 5
    WHEN 'reserved' THEN 6
    WHEN 'contract_pending' THEN 7
    WHEN 'contract_signed' THEN 8
    WHEN 'payment_in_progress' THEN 9
    WHEN 'completed' THEN 10
    ELSE 99
  END;

-- =====================================================
-- VIEW: Buyer Summary
-- =====================================================

CREATE OR REPLACE VIEW v_buyer_summary AS
SELECT
  b.id,
  b.first_name || ' ' || b.last_name as full_name,
  b.email,
  b.phone,
  b.status,
  b.priority,
  b.source,
  b.budget_min,
  b.budget_max,
  COUNT(s.id) as total_sales,
  COUNT(CASE WHEN s.status = 'completed' THEN 1 END) as completed_sales,
  COALESCE(SUM(CASE WHEN s.status = 'completed' THEN s.sale_price ELSE 0 END), 0) as total_purchased_value,
  b.created_at,
  b.last_contact_at
FROM buyers b
LEFT JOIN sales s ON b.id = s.buyer_id
GROUP BY b.id;
