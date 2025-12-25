-- Expense Tracking System Migration
-- Creates expense_categories, vendors, and expenses tables

-- =====================================================
-- EXPENSE CATEGORIES TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS expense_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Category Info
  name VARCHAR(100) NOT NULL,
  name_sr VARCHAR(100),
  description TEXT,

  -- Visual
  icon VARCHAR(50) DEFAULT 'folder',
  color VARCHAR(7) DEFAULT '#6B7280',

  -- Hierarchy (optional parent category)
  parent_id UUID REFERENCES expense_categories(id) ON DELETE SET NULL,

  -- Ordering
  sort_order INT DEFAULT 0,

  -- Status
  is_active BOOLEAN DEFAULT TRUE,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(name)
);

CREATE INDEX idx_expense_categories_parent ON expense_categories(parent_id);
CREATE INDEX idx_expense_categories_active ON expense_categories(is_active);

-- Seed default expense categories
INSERT INTO expense_categories (name, name_sr, icon, color, sort_order) VALUES
('Maintenance', 'Odrzavanje', 'wrench', '#3B82F6', 1),
('Utilities', 'Komunalije', 'zap', '#EAB308', 2),
('Property Tax', 'Porez na imovinu', 'landmark', '#EF4444', 3),
('Insurance', 'Osiguranje', 'shield', '#8B5CF6', 4),
('Repairs', 'Popravke', 'hammer', '#F97316', 5),
('Cleaning', 'Ciscenje', 'sparkles', '#06B6D4', 6),
('Security', 'Obezbedjenje', 'lock', '#64748B', 7),
('Marketing', 'Marketing', 'megaphone', '#EC4899', 8),
('Legal', 'Pravni troskovi', 'scale', '#6366F1', 9),
('Administrative', 'Administrativni', 'file-text', '#84CC16', 10),
('Renovation', 'Renoviranje', 'paint-roller', '#14B8A6', 11),
('Landscaping', 'Uredjenje dvorista', 'trees', '#22C55E', 12),
('Pest Control', 'Deratizacija', 'bug', '#A855F7', 13),
('Other', 'Ostalo', 'more-horizontal', '#9CA3AF', 99)
ON CONFLICT (name) DO NOTHING;

-- =====================================================
-- VENDORS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Basic Info
  name VARCHAR(200) NOT NULL,
  company_name VARCHAR(200),
  vendor_type VARCHAR(50) DEFAULT 'service_provider' CHECK (vendor_type IN (
    'contractor', 'service_provider', 'supplier', 'utility_company', 'government', 'other'
  )),

  -- Contact Info
  email VARCHAR(255),
  phone VARCHAR(50),
  phone_secondary VARCHAR(50),
  website VARCHAR(255),

  -- Address
  address TEXT,
  city VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100) DEFAULT 'Serbia',

  -- Business Details
  tax_id VARCHAR(50),
  registration_number VARCHAR(50),
  bank_account VARCHAR(100),
  bank_name VARCHAR(100),

  -- Categories/Services
  service_categories JSONB DEFAULT '[]'::jsonb,
  specializations TEXT[],

  -- Rating & Notes
  rating INT CHECK (rating >= 1 AND rating <= 5),
  notes TEXT,

  -- Documents
  documents JSONB DEFAULT '[]'::jsonb,

  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  is_preferred BOOLEAN DEFAULT FALSE,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_vendors_name ON vendors(name);
CREATE INDEX idx_vendors_type ON vendors(vendor_type);
CREATE INDEX idx_vendors_active ON vendors(is_active);
CREATE INDEX idx_vendors_preferred ON vendors(is_preferred);
CREATE INDEX idx_vendors_tax_id ON vendors(tax_id);

-- =====================================================
-- EXPENSES TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Expense Number (auto-generated)
  expense_number VARCHAR(50) UNIQUE,

  -- Category & Vendor
  category_id UUID REFERENCES expense_categories(id) ON DELETE SET NULL,
  vendor_id UUID REFERENCES vendors(id) ON DELETE SET NULL,

  -- Property Association (optional - can be general expenses)
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  building_id UUID REFERENCES project_buildings(id) ON DELETE SET NULL,
  unit_id UUID REFERENCES units(id) ON DELETE SET NULL,

  -- Expense Details
  title VARCHAR(255) NOT NULL,
  description TEXT,

  -- Amounts
  amount DECIMAL(12, 2) NOT NULL,
  tax_amount DECIMAL(10, 2) DEFAULT 0,
  total_amount DECIMAL(12, 2) GENERATED ALWAYS AS (amount + tax_amount) STORED,
  currency VARCHAR(3) DEFAULT 'EUR',

  -- Date Info
  expense_date DATE NOT NULL,
  due_date DATE,
  paid_date DATE,

  -- Payment Status
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid', 'rejected', 'cancelled')),
  payment_method VARCHAR(30) CHECK (payment_method IN ('cash', 'bank_transfer', 'card', 'check', 'online', 'other')),
  payment_reference VARCHAR(100),

  -- Recurring Expense
  is_recurring BOOLEAN DEFAULT FALSE,
  recurrence_frequency VARCHAR(20) CHECK (recurrence_frequency IN ('weekly', 'monthly', 'quarterly', 'yearly')),
  recurrence_end_date DATE,
  parent_expense_id UUID REFERENCES expenses(id) ON DELETE SET NULL,

  -- Documents
  receipt_url VARCHAR(500),
  invoice_url VARCHAR(500),
  additional_documents JSONB DEFAULT '[]'::jsonb,

  -- Approval
  requires_approval BOOLEAN DEFAULT FALSE,
  approved_by UUID REFERENCES users(id) ON DELETE SET NULL,
  approved_at TIMESTAMP,
  rejection_reason TEXT,

  -- Notes
  notes TEXT,
  internal_notes TEXT,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX idx_expenses_category ON expenses(category_id);
CREATE INDEX idx_expenses_vendor ON expenses(vendor_id);
CREATE INDEX idx_expenses_project ON expenses(project_id);
CREATE INDEX idx_expenses_building ON expenses(building_id);
CREATE INDEX idx_expenses_unit ON expenses(unit_id);
CREATE INDEX idx_expenses_status ON expenses(status);
CREATE INDEX idx_expenses_date ON expenses(expense_date);
CREATE INDEX idx_expenses_due_date ON expenses(due_date);
CREATE INDEX idx_expenses_recurring ON expenses(is_recurring);
CREATE INDEX idx_expenses_number ON expenses(expense_number);

-- =====================================================
-- TRIGGER: Auto-generate expense number
-- =====================================================

CREATE OR REPLACE FUNCTION generate_expense_number()
RETURNS TRIGGER AS $$
DECLARE
  year_str VARCHAR(4);
  next_num INT;
BEGIN
  IF NEW.expense_number IS NULL OR NEW.expense_number = '' THEN
    year_str := to_char(CURRENT_DATE, 'YYYY');

    SELECT COALESCE(MAX(
      CAST(SUBSTRING(expense_number FROM 'EXP-\d{4}-(\d+)') AS INT)
    ), 0) + 1
    INTO next_num
    FROM expenses
    WHERE expense_number LIKE 'EXP-' || year_str || '-%';

    NEW.expense_number := 'EXP-' || year_str || '-' || LPAD(next_num::TEXT, 5, '0');
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_generate_expense_number
BEFORE INSERT ON expenses
FOR EACH ROW
EXECUTE FUNCTION generate_expense_number();

-- =====================================================
-- TRIGGER: Update timestamps
-- =====================================================

CREATE OR REPLACE FUNCTION update_expense_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_expense_category_timestamp
BEFORE UPDATE ON expense_categories
FOR EACH ROW
EXECUTE FUNCTION update_expense_timestamp();

CREATE TRIGGER trigger_update_vendor_timestamp
BEFORE UPDATE ON vendors
FOR EACH ROW
EXECUTE FUNCTION update_expense_timestamp();

CREATE TRIGGER trigger_update_expense_timestamp
BEFORE UPDATE ON expenses
FOR EACH ROW
EXECUTE FUNCTION update_expense_timestamp();

-- =====================================================
-- FUNCTION: Generate recurring expense
-- =====================================================

CREATE OR REPLACE FUNCTION generate_recurring_expense(p_parent_expense_id UUID)
RETURNS UUID AS $$
DECLARE
  v_parent RECORD;
  v_next_date DATE;
  v_new_id UUID;
BEGIN
  SELECT * INTO v_parent
  FROM expenses
  WHERE id = p_parent_expense_id
    AND is_recurring = TRUE
    AND (recurrence_end_date IS NULL OR recurrence_end_date >= CURRENT_DATE);

  IF NOT FOUND THEN
    RETURN NULL;
  END IF;

  -- Calculate next expense date
  CASE v_parent.recurrence_frequency
    WHEN 'weekly' THEN
      v_next_date := v_parent.expense_date + INTERVAL '1 week';
    WHEN 'monthly' THEN
      v_next_date := v_parent.expense_date + INTERVAL '1 month';
    WHEN 'quarterly' THEN
      v_next_date := v_parent.expense_date + INTERVAL '3 months';
    WHEN 'yearly' THEN
      v_next_date := v_parent.expense_date + INTERVAL '1 year';
    ELSE
      v_next_date := v_parent.expense_date + INTERVAL '1 month';
  END CASE;

  -- Check if within end date
  IF v_parent.recurrence_end_date IS NOT NULL AND v_next_date > v_parent.recurrence_end_date THEN
    RETURN NULL;
  END IF;

  -- Create new expense
  INSERT INTO expenses (
    category_id, vendor_id, project_id, building_id, unit_id,
    title, description, amount, tax_amount, currency,
    expense_date, is_recurring, recurrence_frequency, recurrence_end_date,
    parent_expense_id, requires_approval, notes
  ) VALUES (
    v_parent.category_id, v_parent.vendor_id, v_parent.project_id, v_parent.building_id, v_parent.unit_id,
    v_parent.title, v_parent.description, v_parent.amount, v_parent.tax_amount, v_parent.currency,
    v_next_date, TRUE, v_parent.recurrence_frequency, v_parent.recurrence_end_date,
    v_parent.id, v_parent.requires_approval, v_parent.notes
  )
  RETURNING id INTO v_new_id;

  RETURN v_new_id;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- VIEW: Expense Summary by Category
-- =====================================================

CREATE OR REPLACE VIEW v_expense_summary_by_category AS
SELECT
  ec.id as category_id,
  ec.name as category_name,
  ec.name_sr as category_name_sr,
  ec.color,
  ec.icon,
  COUNT(e.id) as expense_count,
  COALESCE(SUM(e.total_amount), 0) as total_amount,
  COALESCE(SUM(CASE WHEN e.status = 'paid' THEN e.total_amount ELSE 0 END), 0) as paid_amount,
  COALESCE(SUM(CASE WHEN e.status = 'pending' THEN e.total_amount ELSE 0 END), 0) as pending_amount,
  COALESCE(SUM(CASE WHEN EXTRACT(MONTH FROM e.expense_date) = EXTRACT(MONTH FROM CURRENT_DATE)
    AND EXTRACT(YEAR FROM e.expense_date) = EXTRACT(YEAR FROM CURRENT_DATE)
    THEN e.total_amount ELSE 0 END), 0) as current_month_amount
FROM expense_categories ec
LEFT JOIN expenses e ON ec.id = e.category_id AND e.status != 'cancelled'
GROUP BY ec.id, ec.name, ec.name_sr, ec.color, ec.icon
ORDER BY total_amount DESC;

-- =====================================================
-- VIEW: Monthly Expense Report
-- =====================================================

CREATE OR REPLACE VIEW v_monthly_expense_report AS
SELECT
  DATE_TRUNC('month', expense_date) as month,
  COUNT(*) as expense_count,
  SUM(total_amount) as total_expenses,
  SUM(CASE WHEN status = 'paid' THEN total_amount ELSE 0 END) as paid_expenses,
  SUM(CASE WHEN status = 'pending' THEN total_amount ELSE 0 END) as pending_expenses
FROM expenses
WHERE status NOT IN ('cancelled', 'rejected')
GROUP BY DATE_TRUNC('month', expense_date)
ORDER BY month DESC;

-- =====================================================
-- VIEW: Vendor Expense History
-- =====================================================

CREATE OR REPLACE VIEW v_vendor_expense_history AS
SELECT
  v.id as vendor_id,
  v.name as vendor_name,
  v.company_name,
  v.vendor_type,
  v.is_preferred,
  COUNT(e.id) as total_expenses,
  COALESCE(SUM(e.total_amount), 0) as total_amount,
  MIN(e.expense_date) as first_expense_date,
  MAX(e.expense_date) as last_expense_date
FROM vendors v
LEFT JOIN expenses e ON v.id = e.vendor_id AND e.status NOT IN ('cancelled', 'rejected')
GROUP BY v.id, v.name, v.company_name, v.vendor_type, v.is_preferred
ORDER BY total_amount DESC;
