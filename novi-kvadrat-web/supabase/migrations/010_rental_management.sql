-- Rental Management System Migration
-- Creates tenants and rental_contracts tables for tracking rentals

-- =====================================================
-- TENANTS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Personal Info
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  phone_secondary VARCHAR(50),

  -- Identification
  id_number VARCHAR(50),
  id_type VARCHAR(50) DEFAULT 'personal_id' CHECK (id_type IN ('personal_id', 'passport', 'drivers_license', 'other')),

  -- Address
  address TEXT,
  city VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100) DEFAULT 'Serbia',

  -- Emergency Contact
  emergency_contact_name VARCHAR(200),
  emergency_contact_phone VARCHAR(50),
  emergency_contact_relation VARCHAR(100),

  -- Documents
  documents JSONB DEFAULT '[]'::jsonb,

  -- Notes
  notes TEXT,

  -- Status
  is_active BOOLEAN DEFAULT TRUE,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tenants_email ON tenants(email);
CREATE INDEX idx_tenants_phone ON tenants(phone);
CREATE INDEX idx_tenants_name ON tenants(last_name, first_name);
CREATE INDEX idx_tenants_active ON tenants(is_active);

-- =====================================================
-- RENTAL CONTRACTS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS rental_contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Contract Number (auto-generated or manual)
  contract_number VARCHAR(50) UNIQUE,

  -- Relations
  unit_id UUID REFERENCES units(id) ON DELETE SET NULL,
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  building_id UUID REFERENCES project_buildings(id) ON DELETE SET NULL,

  -- Contract Details
  rent_amount DECIMAL(12, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  deposit_amount DECIMAL(12, 2) DEFAULT 0,
  deposit_paid BOOLEAN DEFAULT FALSE,
  deposit_paid_date DATE,

  -- Contract Period
  start_date DATE NOT NULL,
  end_date DATE,
  is_indefinite BOOLEAN DEFAULT FALSE,

  -- Payment Terms
  payment_frequency VARCHAR(20) DEFAULT 'monthly' CHECK (payment_frequency IN ('weekly', 'biweekly', 'monthly', 'quarterly', 'yearly')),
  payment_due_day INT DEFAULT 1 CHECK (payment_due_day >= 1 AND payment_due_day <= 28),

  -- Late Fees
  late_fee_enabled BOOLEAN DEFAULT FALSE,
  late_fee_type VARCHAR(20) DEFAULT 'fixed' CHECK (late_fee_type IN ('fixed', 'percentage')),
  late_fee_amount DECIMAL(10, 2) DEFAULT 0,
  late_fee_grace_days INT DEFAULT 0,

  -- Utilities & Extras
  utilities_included BOOLEAN DEFAULT FALSE,
  utilities_amount DECIMAL(10, 2) DEFAULT 0,
  parking_included BOOLEAN DEFAULT FALSE,
  parking_amount DECIMAL(10, 2) DEFAULT 0,
  other_fees DECIMAL(10, 2) DEFAULT 0,
  other_fees_description TEXT,

  -- Contract Status
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('draft', 'active', 'expired', 'terminated', 'renewed')),
  termination_date DATE,
  termination_reason TEXT,

  -- Documents
  contract_document_url VARCHAR(500),
  additional_documents JSONB DEFAULT '[]'::jsonb,

  -- Notes
  notes TEXT,
  internal_notes TEXT,

  -- Renewal
  auto_renew BOOLEAN DEFAULT FALSE,
  renewal_notice_days INT DEFAULT 30,
  renewal_reminder_sent BOOLEAN DEFAULT FALSE,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Ensure end_date is after start_date when not indefinite
  CONSTRAINT valid_contract_dates CHECK (
    is_indefinite = TRUE OR end_date IS NULL OR end_date >= start_date
  )
);

CREATE INDEX idx_rental_contracts_unit ON rental_contracts(unit_id);
CREATE INDEX idx_rental_contracts_tenant ON rental_contracts(tenant_id);
CREATE INDEX idx_rental_contracts_project ON rental_contracts(project_id);
CREATE INDEX idx_rental_contracts_status ON rental_contracts(status);
CREATE INDEX idx_rental_contracts_dates ON rental_contracts(start_date, end_date);
CREATE INDEX idx_rental_contracts_number ON rental_contracts(contract_number);

-- =====================================================
-- TRIGGER: Auto-generate contract number
-- =====================================================

CREATE OR REPLACE FUNCTION generate_contract_number()
RETURNS TRIGGER AS $$
DECLARE
  year_str VARCHAR(4);
  next_num INT;
BEGIN
  IF NEW.contract_number IS NULL OR NEW.contract_number = '' THEN
    year_str := to_char(CURRENT_DATE, 'YYYY');

    SELECT COALESCE(MAX(
      CAST(SUBSTRING(contract_number FROM 'RC-\d{4}-(\d+)') AS INT)
    ), 0) + 1
    INTO next_num
    FROM rental_contracts
    WHERE contract_number LIKE 'RC-' || year_str || '-%';

    NEW.contract_number := 'RC-' || year_str || '-' || LPAD(next_num::TEXT, 4, '0');
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_generate_contract_number
BEFORE INSERT ON rental_contracts
FOR EACH ROW
EXECUTE FUNCTION generate_contract_number();

-- =====================================================
-- TRIGGER: Update unit status when contract changes
-- =====================================================

CREATE OR REPLACE FUNCTION update_unit_rental_status()
RETURNS TRIGGER AS $$
BEGIN
  -- When a new active contract is created, mark unit as rented
  IF TG_OP = 'INSERT' AND NEW.status = 'active' AND NEW.unit_id IS NOT NULL THEN
    UPDATE units SET status = 'rented', updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.unit_id;

  -- When contract status changes to active
  ELSIF TG_OP = 'UPDATE' AND NEW.status = 'active' AND OLD.status != 'active' AND NEW.unit_id IS NOT NULL THEN
    UPDATE units SET status = 'rented', updated_at = CURRENT_TIMESTAMP
    WHERE id = NEW.unit_id;

  -- When contract is terminated or expired, mark unit as available
  ELSIF TG_OP = 'UPDATE' AND NEW.status IN ('terminated', 'expired') AND OLD.status = 'active' AND NEW.unit_id IS NOT NULL THEN
    -- Only mark as available if no other active contracts exist for this unit
    IF NOT EXISTS (
      SELECT 1 FROM rental_contracts
      WHERE unit_id = NEW.unit_id
      AND status = 'active'
      AND id != NEW.id
    ) THEN
      UPDATE units SET status = 'available', updated_at = CURRENT_TIMESTAMP
      WHERE id = NEW.unit_id;
    END IF;

  -- When contract is deleted
  ELSIF TG_OP = 'DELETE' AND OLD.status = 'active' AND OLD.unit_id IS NOT NULL THEN
    IF NOT EXISTS (
      SELECT 1 FROM rental_contracts
      WHERE unit_id = OLD.unit_id
      AND status = 'active'
      AND id != OLD.id
    ) THEN
      UPDATE units SET status = 'available', updated_at = CURRENT_TIMESTAMP
      WHERE id = OLD.unit_id;
    END IF;
    RETURN OLD;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_unit_rental_status
AFTER INSERT OR UPDATE OR DELETE ON rental_contracts
FOR EACH ROW
EXECUTE FUNCTION update_unit_rental_status();

-- =====================================================
-- TRIGGER: Update timestamps
-- =====================================================

CREATE OR REPLACE FUNCTION update_rental_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_tenant_timestamp
BEFORE UPDATE ON tenants
FOR EACH ROW
EXECUTE FUNCTION update_rental_timestamp();

CREATE TRIGGER trigger_update_contract_timestamp
BEFORE UPDATE ON rental_contracts
FOR EACH ROW
EXECUTE FUNCTION update_rental_timestamp();
