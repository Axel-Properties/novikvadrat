-- Payment Tracking System Migration
-- Creates rental_payments table for tracking rent payments

-- =====================================================
-- RENTAL PAYMENTS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS rental_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Payment Number (auto-generated)
  payment_number VARCHAR(50) UNIQUE,

  -- Relations
  contract_id UUID NOT NULL REFERENCES rental_contracts(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES tenants(id) ON DELETE SET NULL,

  -- Payment Period
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  due_date DATE NOT NULL,

  -- Amounts
  base_amount DECIMAL(12, 2) NOT NULL,
  utilities_amount DECIMAL(10, 2) DEFAULT 0,
  parking_amount DECIMAL(10, 2) DEFAULT 0,
  other_fees DECIMAL(10, 2) DEFAULT 0,
  late_fee DECIMAL(10, 2) DEFAULT 0,
  discount DECIMAL(10, 2) DEFAULT 0,
  total_amount DECIMAL(12, 2) NOT NULL,
  amount_paid DECIMAL(12, 2) DEFAULT 0,
  balance DECIMAL(12, 2) GENERATED ALWAYS AS (total_amount - amount_paid) STORED,
  currency VARCHAR(3) DEFAULT 'EUR',

  -- Payment Status
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'partial', 'paid', 'overdue', 'cancelled', 'refunded')),

  -- Payment Details (when paid)
  payment_date DATE,
  payment_method VARCHAR(30) CHECK (payment_method IN ('cash', 'bank_transfer', 'card', 'check', 'online', 'other')),
  transaction_reference VARCHAR(100),
  receipt_number VARCHAR(50),
  receipt_url VARCHAR(500),

  -- Notes
  notes TEXT,
  internal_notes TEXT,

  -- Flags
  is_first_payment BOOLEAN DEFAULT FALSE,
  is_last_payment BOOLEAN DEFAULT FALSE,
  reminder_sent BOOLEAN DEFAULT FALSE,
  reminder_sent_at TIMESTAMP,
  overdue_notice_sent BOOLEAN DEFAULT FALSE,
  overdue_notice_sent_at TIMESTAMP,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  paid_at TIMESTAMP,

  -- Ensure valid period
  CONSTRAINT valid_payment_period CHECK (period_end >= period_start)
);

CREATE INDEX idx_rental_payments_contract ON rental_payments(contract_id);
CREATE INDEX idx_rental_payments_tenant ON rental_payments(tenant_id);
CREATE INDEX idx_rental_payments_status ON rental_payments(status);
CREATE INDEX idx_rental_payments_due_date ON rental_payments(due_date);
CREATE INDEX idx_rental_payments_payment_date ON rental_payments(payment_date);
CREATE INDEX idx_rental_payments_period ON rental_payments(period_start, period_end);

-- =====================================================
-- TRIGGER: Auto-generate payment number
-- =====================================================

CREATE OR REPLACE FUNCTION generate_payment_number()
RETURNS TRIGGER AS $$
DECLARE
  year_str VARCHAR(4);
  next_num INT;
BEGIN
  IF NEW.payment_number IS NULL OR NEW.payment_number = '' THEN
    year_str := to_char(CURRENT_DATE, 'YYYY');

    SELECT COALESCE(MAX(
      CAST(SUBSTRING(payment_number FROM 'PAY-\d{4}-(\d+)') AS INT)
    ), 0) + 1
    INTO next_num
    FROM rental_payments
    WHERE payment_number LIKE 'PAY-' || year_str || '-%';

    NEW.payment_number := 'PAY-' || year_str || '-' || LPAD(next_num::TEXT, 5, '0');
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_generate_payment_number
BEFORE INSERT ON rental_payments
FOR EACH ROW
EXECUTE FUNCTION generate_payment_number();

-- =====================================================
-- TRIGGER: Update payment status based on amounts
-- =====================================================

CREATE OR REPLACE FUNCTION update_payment_status()
RETURNS TRIGGER AS $$
BEGIN
  -- Update status based on payment
  IF NEW.amount_paid >= NEW.total_amount THEN
    NEW.status := 'paid';
    NEW.paid_at := COALESCE(NEW.paid_at, CURRENT_TIMESTAMP);
  ELSIF NEW.amount_paid > 0 AND NEW.amount_paid < NEW.total_amount THEN
    NEW.status := 'partial';
  ELSIF NEW.status NOT IN ('cancelled', 'refunded') THEN
    -- Check if overdue
    IF NEW.due_date < CURRENT_DATE AND NEW.amount_paid = 0 THEN
      NEW.status := 'overdue';
    ELSE
      NEW.status := 'pending';
    END IF;
  END IF;

  NEW.updated_at := CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_payment_status
BEFORE UPDATE ON rental_payments
FOR EACH ROW
EXECUTE FUNCTION update_payment_status();

-- =====================================================
-- FUNCTION: Generate scheduled payments for a contract
-- =====================================================

CREATE OR REPLACE FUNCTION generate_scheduled_payments(
  p_contract_id UUID,
  p_months_ahead INT DEFAULT 12
)
RETURNS INT AS $$
DECLARE
  v_contract RECORD;
  v_current_date DATE;
  v_end_date DATE;
  v_payment_date DATE;
  v_period_start DATE;
  v_period_end DATE;
  v_count INT := 0;
  v_is_first BOOLEAN := TRUE;
BEGIN
  -- Get contract details
  SELECT * INTO v_contract
  FROM rental_contracts
  WHERE id = p_contract_id AND status = 'active';

  IF NOT FOUND THEN
    RETURN 0;
  END IF;

  -- Determine date range
  v_current_date := GREATEST(v_contract.start_date, CURRENT_DATE);
  v_end_date := LEAST(
    COALESCE(v_contract.end_date, v_current_date + (p_months_ahead || ' months')::INTERVAL),
    v_current_date + (p_months_ahead || ' months')::INTERVAL
  );

  -- Check if this is the first payment for this contract
  IF EXISTS (SELECT 1 FROM rental_payments WHERE contract_id = p_contract_id) THEN
    v_is_first := FALSE;
  END IF;

  -- Generate payments based on frequency
  v_payment_date := v_current_date;
  WHILE v_payment_date <= v_end_date LOOP
    -- Calculate period based on frequency
    v_period_start := v_payment_date;
    CASE v_contract.payment_frequency
      WHEN 'weekly' THEN
        v_period_end := v_payment_date + INTERVAL '1 week' - INTERVAL '1 day';
      WHEN 'biweekly' THEN
        v_period_end := v_payment_date + INTERVAL '2 weeks' - INTERVAL '1 day';
      WHEN 'monthly' THEN
        v_period_end := v_payment_date + INTERVAL '1 month' - INTERVAL '1 day';
      WHEN 'quarterly' THEN
        v_period_end := v_payment_date + INTERVAL '3 months' - INTERVAL '1 day';
      WHEN 'yearly' THEN
        v_period_end := v_payment_date + INTERVAL '1 year' - INTERVAL '1 day';
      ELSE
        v_period_end := v_payment_date + INTERVAL '1 month' - INTERVAL '1 day';
    END CASE;

    -- Check if payment already exists for this period
    IF NOT EXISTS (
      SELECT 1 FROM rental_payments
      WHERE contract_id = p_contract_id
      AND period_start = v_period_start
    ) THEN
      INSERT INTO rental_payments (
        contract_id,
        tenant_id,
        period_start,
        period_end,
        due_date,
        base_amount,
        utilities_amount,
        parking_amount,
        other_fees,
        total_amount,
        is_first_payment
      ) VALUES (
        p_contract_id,
        v_contract.tenant_id,
        v_period_start,
        v_period_end,
        v_period_start + ((v_contract.payment_due_day - 1) || ' days')::INTERVAL,
        v_contract.rent_amount,
        CASE WHEN v_contract.utilities_included THEN v_contract.utilities_amount ELSE 0 END,
        CASE WHEN v_contract.parking_included THEN v_contract.parking_amount ELSE 0 END,
        v_contract.other_fees,
        v_contract.rent_amount +
          CASE WHEN v_contract.utilities_included THEN v_contract.utilities_amount ELSE 0 END +
          CASE WHEN v_contract.parking_included THEN v_contract.parking_amount ELSE 0 END +
          v_contract.other_fees,
        v_is_first
      );
      v_count := v_count + 1;
      v_is_first := FALSE;
    END IF;

    -- Move to next payment period
    CASE v_contract.payment_frequency
      WHEN 'weekly' THEN
        v_payment_date := v_payment_date + INTERVAL '1 week';
      WHEN 'biweekly' THEN
        v_payment_date := v_payment_date + INTERVAL '2 weeks';
      WHEN 'monthly' THEN
        v_payment_date := v_payment_date + INTERVAL '1 month';
      WHEN 'quarterly' THEN
        v_payment_date := v_payment_date + INTERVAL '3 months';
      WHEN 'yearly' THEN
        v_payment_date := v_payment_date + INTERVAL '1 year';
      ELSE
        v_payment_date := v_payment_date + INTERVAL '1 month';
    END CASE;
  END LOOP;

  RETURN v_count;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- FUNCTION: Mark overdue payments
-- =====================================================

CREATE OR REPLACE FUNCTION mark_overdue_payments()
RETURNS INT AS $$
DECLARE
  v_count INT;
BEGIN
  UPDATE rental_payments
  SET status = 'overdue',
      updated_at = CURRENT_TIMESTAMP
  WHERE status = 'pending'
    AND due_date < CURRENT_DATE
    AND amount_paid = 0;

  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- VIEW: Payment Summary by Contract
-- =====================================================

CREATE OR REPLACE VIEW v_contract_payment_summary AS
SELECT
  rc.id as contract_id,
  rc.contract_number,
  t.first_name || ' ' || t.last_name as tenant_name,
  rc.rent_amount,
  rc.status as contract_status,
  COUNT(rp.id) as total_payments,
  COUNT(CASE WHEN rp.status = 'paid' THEN 1 END) as paid_payments,
  COUNT(CASE WHEN rp.status = 'pending' THEN 1 END) as pending_payments,
  COUNT(CASE WHEN rp.status = 'overdue' THEN 1 END) as overdue_payments,
  COALESCE(SUM(rp.total_amount), 0) as total_billed,
  COALESCE(SUM(rp.amount_paid), 0) as total_collected,
  COALESCE(SUM(rp.balance), 0) as total_outstanding
FROM rental_contracts rc
LEFT JOIN tenants t ON rc.tenant_id = t.id
LEFT JOIN rental_payments rp ON rc.id = rp.contract_id
GROUP BY rc.id, rc.contract_number, t.first_name, t.last_name, rc.rent_amount, rc.status;
