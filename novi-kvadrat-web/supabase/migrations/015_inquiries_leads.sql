-- Inquiries & Leads Management Migration
-- Creates inquiries and inquiry_activities tables

-- =====================================================
-- INQUIRIES TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Inquiry Number (auto-generated)
  inquiry_number VARCHAR(50) UNIQUE,

  -- Contact Info (for new leads not yet in buyers table)
  contact_name VARCHAR(200) NOT NULL,
  contact_email VARCHAR(255),
  contact_phone VARCHAR(50),

  -- Link to existing buyer (if applicable)
  buyer_id UUID REFERENCES buyers(id) ON DELETE SET NULL,

  -- Property Interest
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  building_id UUID REFERENCES project_buildings(id) ON DELETE SET NULL,
  unit_id UUID REFERENCES units(id) ON DELETE SET NULL,

  -- Inquiry Details
  inquiry_type VARCHAR(30) DEFAULT 'general' CHECK (inquiry_type IN (
    'general',
    'property_info',
    'viewing_request',
    'price_inquiry',
    'availability',
    'mortgage_info',
    'other'
  )),
  message TEXT,

  -- Source
  source VARCHAR(50) DEFAULT 'website' CHECK (source IN (
    'website',
    'website_form',
    'phone',
    'email',
    'walk_in',
    'social_media',
    'whatsapp',
    'viber',
    'referral',
    'advertisement',
    'property_portal',
    'other'
  )),
  source_url VARCHAR(500),
  source_campaign VARCHAR(100),

  -- Assignment
  assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
  assigned_agent_id UUID,

  -- Status Pipeline
  status VARCHAR(30) DEFAULT 'new' CHECK (status IN (
    'new',
    'contacted',
    'qualified',
    'viewing_scheduled',
    'viewing_completed',
    'proposal_sent',
    'negotiating',
    'converted',
    'follow_up',
    'not_interested',
    'lost',
    'spam'
  )),
  status_changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Qualification
  is_qualified BOOLEAN DEFAULT FALSE,
  qualification_score INT CHECK (qualification_score >= 0 AND qualification_score <= 100),
  budget_confirmed BOOLEAN DEFAULT FALSE,
  budget_range VARCHAR(100),
  timeline VARCHAR(50),

  -- Follow-up
  next_follow_up_date DATE,
  next_follow_up_type VARCHAR(50) CHECK (next_follow_up_type IN ('call', 'email', 'meeting', 'viewing', 'other')),
  follow_up_notes TEXT,

  -- Viewing
  viewing_scheduled_at TIMESTAMP,
  viewing_completed_at TIMESTAMP,
  viewing_notes TEXT,

  -- Priority & Tags
  priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  tags JSONB DEFAULT '[]'::jsonb,

  -- Conversion
  converted_to_buyer_id UUID REFERENCES buyers(id) ON DELETE SET NULL,
  converted_to_sale_id UUID REFERENCES sales(id) ON DELETE SET NULL,
  converted_at TIMESTAMP,

  -- Notes
  notes TEXT,
  internal_notes TEXT,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  first_response_at TIMESTAMP,
  last_activity_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_inquiries_number ON inquiries(inquiry_number);
CREATE INDEX idx_inquiries_buyer ON inquiries(buyer_id);
CREATE INDEX idx_inquiries_project ON inquiries(project_id);
CREATE INDEX idx_inquiries_unit ON inquiries(unit_id);
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_inquiries_assigned ON inquiries(assigned_to);
CREATE INDEX idx_inquiries_agent ON inquiries(assigned_agent_id);
CREATE INDEX idx_inquiries_source ON inquiries(source);
CREATE INDEX idx_inquiries_priority ON inquiries(priority);
CREATE INDEX idx_inquiries_follow_up ON inquiries(next_follow_up_date);
CREATE INDEX idx_inquiries_created ON inquiries(created_at);

-- =====================================================
-- INQUIRY ACTIVITIES TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS inquiry_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Relations
  inquiry_id UUID NOT NULL REFERENCES inquiries(id) ON DELETE CASCADE,

  -- Activity Info
  activity_type VARCHAR(30) NOT NULL CHECK (activity_type IN (
    'created',
    'status_change',
    'assigned',
    'note_added',
    'call_made',
    'call_received',
    'email_sent',
    'email_received',
    'sms_sent',
    'meeting_scheduled',
    'meeting_completed',
    'viewing_scheduled',
    'viewing_completed',
    'proposal_sent',
    'follow_up_scheduled',
    'converted',
    'document_added',
    'other'
  )),

  -- Details
  title VARCHAR(255),
  description TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,

  -- Status change tracking
  old_status VARCHAR(30),
  new_status VARCHAR(30),

  -- Duration (for calls, meetings)
  duration_minutes INT,

  -- Outcome
  outcome VARCHAR(50) CHECK (outcome IN ('positive', 'neutral', 'negative', 'no_answer', 'callback_requested')),

  -- Who made this activity
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_by_name VARCHAR(200),

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  activity_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_inquiry_activities_inquiry ON inquiry_activities(inquiry_id);
CREATE INDEX idx_inquiry_activities_type ON inquiry_activities(activity_type);
CREATE INDEX idx_inquiry_activities_date ON inquiry_activities(activity_date);
CREATE INDEX idx_inquiry_activities_created_by ON inquiry_activities(created_by);

-- =====================================================
-- TRIGGER: Auto-generate inquiry number
-- =====================================================

CREATE OR REPLACE FUNCTION generate_inquiry_number()
RETURNS TRIGGER AS $$
DECLARE
  year_str VARCHAR(4);
  next_num INT;
BEGIN
  IF NEW.inquiry_number IS NULL OR NEW.inquiry_number = '' THEN
    year_str := to_char(CURRENT_DATE, 'YYYY');

    SELECT COALESCE(MAX(
      CAST(SUBSTRING(inquiry_number FROM 'INQ-\d{4}-(\d+)') AS INT)
    ), 0) + 1
    INTO next_num
    FROM inquiries
    WHERE inquiry_number LIKE 'INQ-' || year_str || '-%';

    NEW.inquiry_number := 'INQ-' || year_str || '-' || LPAD(next_num::TEXT, 5, '0');
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_generate_inquiry_number
BEFORE INSERT ON inquiries
FOR EACH ROW
EXECUTE FUNCTION generate_inquiry_number();

-- =====================================================
-- TRIGGER: Auto-create activity on inquiry insert
-- =====================================================

CREATE OR REPLACE FUNCTION create_inquiry_activity()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO inquiry_activities (
    inquiry_id,
    activity_type,
    title,
    description,
    new_status
  ) VALUES (
    NEW.id,
    'created',
    'Inquiry created',
    'New inquiry from ' || NEW.source,
    NEW.status
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_create_inquiry_activity
AFTER INSERT ON inquiries
FOR EACH ROW
EXECUTE FUNCTION create_inquiry_activity();

-- =====================================================
-- TRIGGER: Track status changes
-- =====================================================

CREATE OR REPLACE FUNCTION track_inquiry_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    NEW.status_changed_at := CURRENT_TIMESTAMP;
    NEW.last_activity_at := CURRENT_TIMESTAMP;

    INSERT INTO inquiry_activities (
      inquiry_id,
      activity_type,
      title,
      old_status,
      new_status
    ) VALUES (
      NEW.id,
      'status_change',
      'Status changed from ' || OLD.status || ' to ' || NEW.status,
      OLD.status,
      NEW.status
    );
  END IF;

  NEW.updated_at := CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_track_inquiry_status
BEFORE UPDATE ON inquiries
FOR EACH ROW
EXECUTE FUNCTION track_inquiry_status_change();

-- =====================================================
-- FUNCTION: Convert inquiry to buyer
-- =====================================================

CREATE OR REPLACE FUNCTION convert_inquiry_to_buyer(p_inquiry_id UUID)
RETURNS UUID AS $$
DECLARE
  v_inquiry RECORD;
  v_buyer_id UUID;
BEGIN
  -- Get inquiry details
  SELECT * INTO v_inquiry
  FROM inquiries
  WHERE id = p_inquiry_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Inquiry not found';
  END IF;

  -- Check if already converted
  IF v_inquiry.converted_to_buyer_id IS NOT NULL THEN
    RETURN v_inquiry.converted_to_buyer_id;
  END IF;

  -- Parse name into first and last
  DECLARE
    v_names TEXT[];
    v_first_name TEXT;
    v_last_name TEXT;
  BEGIN
    v_names := string_to_array(v_inquiry.contact_name, ' ');
    v_first_name := v_names[1];
    v_last_name := COALESCE(array_to_string(v_names[2:], ' '), '');
    IF v_last_name = '' THEN v_last_name := v_first_name; END IF;

    -- Create buyer
    INSERT INTO buyers (
      first_name,
      last_name,
      email,
      phone,
      source,
      source_details,
      assigned_agent_id,
      status,
      notes
    ) VALUES (
      v_first_name,
      v_last_name,
      v_inquiry.contact_email,
      v_inquiry.contact_phone,
      v_inquiry.source,
      'Converted from inquiry ' || v_inquiry.inquiry_number,
      v_inquiry.assigned_agent_id,
      'active',
      v_inquiry.notes
    )
    RETURNING id INTO v_buyer_id;
  END;

  -- Update inquiry
  UPDATE inquiries
  SET
    buyer_id = v_buyer_id,
    converted_to_buyer_id = v_buyer_id,
    converted_at = CURRENT_TIMESTAMP,
    status = 'converted'
  WHERE id = p_inquiry_id;

  -- Create activity
  INSERT INTO inquiry_activities (
    inquiry_id,
    activity_type,
    title,
    description
  ) VALUES (
    p_inquiry_id,
    'converted',
    'Inquiry converted to buyer',
    'Created buyer record: ' || v_buyer_id::TEXT
  );

  RETURN v_buyer_id;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- VIEW: Inquiry Dashboard Stats
-- =====================================================

CREATE OR REPLACE VIEW v_inquiry_stats AS
SELECT
  COUNT(*) as total_inquiries,
  COUNT(CASE WHEN status = 'new' THEN 1 END) as new_count,
  COUNT(CASE WHEN status IN ('contacted', 'qualified', 'viewing_scheduled') THEN 1 END) as in_progress_count,
  COUNT(CASE WHEN status = 'converted' THEN 1 END) as converted_count,
  COUNT(CASE WHEN status IN ('not_interested', 'lost') THEN 1 END) as lost_count,
  COUNT(CASE WHEN created_at >= CURRENT_DATE THEN 1 END) as today_count,
  COUNT(CASE WHEN created_at >= CURRENT_DATE - INTERVAL '7 days' THEN 1 END) as week_count,
  COUNT(CASE WHEN created_at >= DATE_TRUNC('month', CURRENT_DATE) THEN 1 END) as month_count,
  COUNT(CASE WHEN next_follow_up_date = CURRENT_DATE THEN 1 END) as due_today_count,
  COUNT(CASE WHEN next_follow_up_date < CURRENT_DATE AND status NOT IN ('converted', 'not_interested', 'lost', 'spam') THEN 1 END) as overdue_count,
  ROUND(
    100.0 * COUNT(CASE WHEN status = 'converted' THEN 1 END) /
    NULLIF(COUNT(CASE WHEN status NOT IN ('new', 'spam') THEN 1 END), 0),
    2
  ) as conversion_rate
FROM inquiries;

-- =====================================================
-- VIEW: Inquiry by Source
-- =====================================================

CREATE OR REPLACE VIEW v_inquiry_by_source AS
SELECT
  source,
  COUNT(*) as total,
  COUNT(CASE WHEN status = 'converted' THEN 1 END) as converted,
  ROUND(
    100.0 * COUNT(CASE WHEN status = 'converted' THEN 1 END) / COUNT(*),
    2
  ) as conversion_rate
FROM inquiries
WHERE status != 'spam'
GROUP BY source
ORDER BY total DESC;
