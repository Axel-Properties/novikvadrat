-- Property Management System Migration
-- Adds building types, unit types, units, and enhanced amenities

-- =====================================================
-- AMENITIES TABLE UPDATES
-- =====================================================

-- Update category constraint to include new categories
ALTER TABLE amenities DROP CONSTRAINT IF EXISTS amenities_category_check;
ALTER TABLE amenities ADD CONSTRAINT amenities_category_check
  CHECK (category IN ('unit_features', 'building_amenities', 'appliances', 'smart_features', 'security_features'));

-- Add sort_order column if not exists
ALTER TABLE amenities ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0;

-- Clear existing amenities and insert new comprehensive list
DELETE FROM project_amenities;
DELETE FROM amenities;

-- =====================================================
-- SEED AMENITIES WITH SERBIAN TRANSLATIONS
-- =====================================================

-- Unit Features (20 items)
INSERT INTO amenities (name_en, name_sr, icon, category, sort_order) VALUES
('Air Conditioning', 'Klima uređaj', 'wind', 'unit_features', 1),
('Built-in Wardrobes', 'Ugradni plakari', 'archive', 'unit_features', 2),
('Floor-to-Ceiling Windows', 'Prozori od poda do plafona', 'maximize', 'unit_features', 3),
('En-suite Bathroom', 'Kupatilo uz spavaću sobu', 'bath', 'unit_features', 4),
('Kitchen Island', 'Kuhinjsko ostrvo', 'chef-hat', 'unit_features', 5),
('Underfloor Heating', 'Podno grejanje', 'thermometer', 'unit_features', 6),
('Electric Blinds', 'Električne roletne', 'blinds', 'unit_features', 7),
('In-unit Laundry', 'Vešernica u stanu', 'washing-machine', 'unit_features', 8),
('Home Office Space', 'Radni prostor', 'briefcase', 'unit_features', 9),
('Panic Room', 'Sigurnosna soba', 'shield-alert', 'unit_features', 10),
('Hardwood Floors', 'Drveni podovi', 'layers', 'unit_features', 11),
('Smart Home System', 'Smart Home sistem', 'cpu', 'unit_features', 12),
('Private Balcony', 'Privatni balkon', 'fence', 'unit_features', 13),
('Walk-in Closet', 'Garderober', 'shirt', 'unit_features', 14),
('Premium Appliances', 'Premium uređaji', 'sparkles', 'unit_features', 15),
('Sound Insulation', 'Zvučna izolacija', 'volume-x', 'unit_features', 16),
('Video Intercom', 'Video interfon', 'video', 'unit_features', 17),
('Wine Cooler', 'Rashladna vitrina za vino', 'wine', 'unit_features', 18),
('Storage Room', 'Ostava', 'box', 'unit_features', 19),
('Fireplace', 'Kamin', 'flame', 'unit_features', 20);

-- Building Amenities (20 items)
INSERT INTO amenities (name_en, name_sr, icon, category, sort_order) VALUES
('Swimming Pool', 'Bazen', 'pool', 'building_amenities', 1),
('Concierge Service', 'Concierge služba', 'bell-concierge', 'building_amenities', 2),
('Rooftop Terrace', 'Krovna terasa', 'sun', 'building_amenities', 3),
('Pet-Friendly', 'Dozvoljeni ljubimci', 'paw-print', 'building_amenities', 4),
('Electric Vehicle Charging', 'Punjač za električna vozila', 'plug-zap', 'building_amenities', 5),
('Children''s Playground', 'Dečije igralište', 'baby', 'building_amenities', 6),
('Cinema Room', 'Bioskopska sala', 'clapperboard', 'building_amenities', 7),
('Library', 'Biblioteka', 'book-open', 'building_amenities', 8),
('Valet Parking', 'Valet parking', 'car', 'building_amenities', 9),
('Package Room', 'Prostorija za pakete', 'package', 'building_amenities', 10),
('Fitness Center', 'Fitnes centar', 'dumbbell', 'building_amenities', 11),
('24/7 Security', '24/7 Obezbeđenje', 'shield-check', 'building_amenities', 12),
('Business Center', 'Poslovni centar', 'building-2', 'building_amenities', 13),
('Bicycle Storage', 'Ostava za bicikle', 'bike', 'building_amenities', 14),
('Spa & Wellness', 'Spa i velnes', 'sparkles', 'building_amenities', 15),
('Coworking Space', 'Coworking prostor', 'users', 'building_amenities', 16),
('Game Room', 'Igraonica', 'gamepad-2', 'building_amenities', 17),
('Guest Suites', 'Apartmani za goste', 'bed', 'building_amenities', 18),
('Dry Cleaning Service', 'Hemijsko čišćenje', 'shirt', 'building_amenities', 19),
('BBQ Area', 'Roštilj zona', 'flame', 'building_amenities', 20);

-- Included Appliances (14 items)
INSERT INTO amenities (name_en, name_sr, icon, category, sort_order) VALUES
('Refrigerator', 'Frižider', 'refrigerator', 'appliances', 1),
('Oven', 'Rerna', 'cooking-pot', 'appliances', 2),
('Cooktop', 'Ploča za kuvanje', 'flame', 'appliances', 3),
('Washing Machine', 'Veš mašina', 'washing-machine', 'appliances', 4),
('Wine Fridge', 'Frižider za vino', 'wine', 'appliances', 5),
('Garbage Disposal', 'Drobljač otpada', 'trash', 'appliances', 6),
('HVAC System', 'HVAC sistem', 'air-vent', 'appliances', 7),
('Dishwasher', 'Mašina za sudove', 'utensils', 'appliances', 8),
('Microwave', 'Mikrotalasna', 'microwave', 'appliances', 9),
('Range Hood', 'Napa', 'wind', 'appliances', 10),
('Dryer', 'Sušilica', 'wind', 'appliances', 11),
('Ice Maker', 'Aparat za led', 'snowflake', 'appliances', 12),
('Water Heater', 'Bojler', 'droplet', 'appliances', 13),
('Water Filter', 'Filter za vodu', 'filter', 'appliances', 14);

-- Smart Features (14 items)
INSERT INTO amenities (name_en, name_sr, icon, category, sort_order) VALUES
('Smart Thermostat', 'Smart termostat', 'thermometer', 'smart_features', 1),
('Smart Locks', 'Smart brave', 'lock', 'smart_features', 2),
('Security System', 'Sigurnosni sistem', 'shield', 'smart_features', 3),
('Automated Blinds', 'Automatske roletne', 'blinds', 'smart_features', 4),
('Home Assistant Integration', 'Home Assistant integracija', 'cpu', 'smart_features', 5),
('USB Outlets', 'USB utičnice', 'usb', 'smart_features', 6),
('Smart Lighting', 'Smart osvetljenje', 'lightbulb', 'smart_features', 7),
('Video Doorbell', 'Video zvono', 'bell', 'smart_features', 8),
('Smart Speakers', 'Smart zvučnici', 'speaker', 'smart_features', 9),
('Smart Appliances', 'Smart uređaji', 'smartphone', 'smart_features', 10),
('Wireless Charging Stations', 'Bežične stanice za punjenje', 'battery-charging', 'smart_features', 11),
('Smart Water Leak Detectors', 'Smart detektori curenja vode', 'droplet', 'smart_features', 12);

-- Security Features (12 items)
INSERT INTO amenities (name_en, name_sr, icon, category, sort_order) VALUES
('24/7 Surveillance', '24/7 Video nadzor', 'cctv', 'security_features', 1),
('Biometric Entry', 'Biometrijski ulaz', 'fingerprint', 'security_features', 2),
('Alarm System', 'Alarmni sistem', 'siren', 'security_features', 3),
('Emergency Exits', 'Izlazi za hitne slučajeve', 'door-open', 'security_features', 4),
('Intercom System', 'Interfon sistem', 'phone', 'security_features', 5),
('Window Locks', 'Brave na prozorima', 'lock', 'security_features', 6),
('Access Control', 'Kontrola pristupa', 'key', 'security_features', 7),
('Security Guards', 'Obezbeđenje', 'user-check', 'security_features', 8),
('Fire Detection', 'Detekcija požara', 'flame', 'security_features', 9),
('Safe Room', 'Sef soba', 'vault', 'security_features', 10),
('Motion Sensors', 'Senzori pokreta', 'radar', 'security_features', 11),
('Reinforced Doors', 'Ojačana vrata', 'door-closed', 'security_features', 12);

-- =====================================================
-- BUILDING TYPES TABLE
-- =====================================================
-- Per-project configurable building categories

CREATE TABLE IF NOT EXISTS building_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,

  -- Type Info
  name VARCHAR(100) NOT NULL,
  name_sr VARCHAR(100),
  description TEXT,

  -- Visual
  color VARCHAR(7) DEFAULT '#3B82F6',

  -- Ordering
  sort_order INT DEFAULT 0,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(project_id, name)
);

CREATE INDEX idx_building_types_project ON building_types(project_id);

-- =====================================================
-- UNIT TYPES TABLE
-- =====================================================
-- Per-project configurable unit types

CREATE TABLE IF NOT EXISTS unit_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,

  -- Type Info
  name VARCHAR(100) NOT NULL,
  name_sr VARCHAR(100),
  description TEXT,

  -- Optional defaults
  default_price_multiplier DECIMAL(5, 2) DEFAULT 1.00,

  -- Ordering
  sort_order INT DEFAULT 0,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(project_id, name)
);

CREATE INDEX idx_unit_types_project ON unit_types(project_id);

-- =====================================================
-- ALTER PROJECT_BUILDINGS TABLE
-- =====================================================
-- Add building_type reference and building_group

ALTER TABLE project_buildings
  ADD COLUMN IF NOT EXISTS building_type_id UUID REFERENCES building_types(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS building_group VARCHAR(100);

-- =====================================================
-- UNITS TABLE
-- =====================================================
-- Individual apartments/units

CREATE TABLE IF NOT EXISTS units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  building_id UUID REFERENCES project_buildings(id) ON DELETE CASCADE,

  -- Basic Info
  unit_number VARCHAR(50) NOT NULL,
  floor INT NOT NULL,
  unit_type_id UUID REFERENCES unit_types(id) ON DELETE SET NULL,
  layout_id UUID REFERENCES layouts(id) ON DELETE SET NULL,

  -- Property Category
  property_category VARCHAR(50) DEFAULT 'apartment' CHECK (property_category IN
    ('apartment', 'studio', 'penthouse', 'duplex', 'loft', 'commercial', 'parking', 'storage')),

  -- Status
  status VARCHAR(50) DEFAULT 'available' CHECK (status IN
    ('available', 'reserved', 'sold', 'rented', 'unavailable', 'coming_soon')),

  -- Physical Attributes
  orientation VARCHAR(50) CHECK (orientation IN
    ('north', 'south', 'east', 'west', 'northeast', 'northwest', 'southeast', 'southwest')),
  view_type VARCHAR(50) CHECK (view_type IN
    ('city', 'park', 'river', 'sea', 'mountain', 'courtyard', 'street', 'garden')),

  -- Furnishing
  furnishing_status VARCHAR(50) DEFAULT 'unfurnished' CHECK (furnishing_status IN
    ('unfurnished', 'semi_furnished', 'fully_furnished', 'turnkey')),

  -- Specifications (in m2)
  total_area DECIMAL(8, 2) NOT NULL,
  living_area DECIMAL(8, 2),
  terrace_area DECIMAL(8, 2),
  balcony_area DECIMAL(8, 2),
  garden_area DECIMAL(8, 2),

  -- Room Counts
  bedrooms INT DEFAULT 0,
  bathrooms INT DEFAULT 1,

  -- Features (booleans)
  has_terrace BOOLEAN DEFAULT FALSE,
  has_balcony BOOLEAN DEFAULT FALSE,
  has_garden BOOLEAN DEFAULT FALSE,
  has_parking BOOLEAN DEFAULT FALSE,
  has_storage BOOLEAN DEFAULT FALSE,

  -- Parking Details
  parking_spots INT DEFAULT 0,
  parking_type VARCHAR(50) CHECK (parking_type IN ('indoor', 'outdoor', 'underground', 'covered')),

  -- Description
  description TEXT,
  internal_notes TEXT,

  -- Pricing (EUR)
  price DECIMAL(12, 2),
  price_per_sqm DECIMAL(10, 2),
  original_price DECIMAL(12, 2),

  -- Availability
  available_from DATE,

  -- Media
  hero_image_url VARCHAR(500),
  floor_plan_2d_url VARCHAR(500),
  floor_plan_3d_url VARCHAR(500),
  floor_plan_with_dimensions_url VARCHAR(500),
  virtual_tour_url VARCHAR(500),

  -- Status Flags
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,

  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(building_id, unit_number)
);

CREATE INDEX idx_units_project ON units(project_id);
CREATE INDEX idx_units_building ON units(building_id);
CREATE INDEX idx_units_status ON units(status);
CREATE INDEX idx_units_floor ON units(floor);
CREATE INDEX idx_units_price ON units(price);
CREATE INDEX idx_units_area ON units(total_area);

-- =====================================================
-- UNIT FEATURES TABLE (Junction)
-- =====================================================

CREATE TABLE IF NOT EXISTS unit_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id UUID REFERENCES units(id) ON DELETE CASCADE,
  amenity_id UUID REFERENCES amenities(id) ON DELETE CASCADE,
  notes VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(unit_id, amenity_id)
);

CREATE INDEX idx_unit_features_unit ON unit_features(unit_id);

-- =====================================================
-- UNIT IMAGES TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS unit_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id UUID REFERENCES units(id) ON DELETE CASCADE,
  url VARCHAR(500) NOT NULL,
  caption VARCHAR(255),
  image_type VARCHAR(50) DEFAULT 'interior' CHECK (image_type IN
    ('interior', 'exterior', 'floor_plan', 'view', 'bathroom', 'kitchen', 'bedroom', 'living_room', 'other')),
  is_primary BOOLEAN DEFAULT FALSE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_unit_images_unit ON unit_images(unit_id);

-- =====================================================
-- TRIGGERS: Update unit counts
-- =====================================================

-- Update building unit counts
CREATE OR REPLACE FUNCTION update_building_unit_counts()
RETURNS TRIGGER AS $$
DECLARE
  target_building_id UUID;
BEGIN
  -- Determine which building to update
  IF TG_OP = 'DELETE' THEN
    target_building_id := OLD.building_id;
  ELSE
    target_building_id := NEW.building_id;
  END IF;

  -- Update the building counts
  UPDATE project_buildings
  SET
    total_units = (SELECT COUNT(*) FROM units WHERE building_id = target_building_id),
    available_units = (SELECT COUNT(*) FROM units WHERE building_id = target_building_id AND status = 'available')
  WHERE id = target_building_id;

  -- If building changed on UPDATE, also update old building
  IF TG_OP = 'UPDATE' AND OLD.building_id IS DISTINCT FROM NEW.building_id THEN
    UPDATE project_buildings
    SET
      total_units = (SELECT COUNT(*) FROM units WHERE building_id = OLD.building_id),
      available_units = (SELECT COUNT(*) FROM units WHERE building_id = OLD.building_id AND status = 'available')
    WHERE id = OLD.building_id;
  END IF;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_building_unit_counts
AFTER INSERT OR UPDATE OR DELETE ON units
FOR EACH ROW
EXECUTE FUNCTION update_building_unit_counts();

-- Update project unit counts
CREATE OR REPLACE FUNCTION update_project_unit_counts()
RETURNS TRIGGER AS $$
DECLARE
  target_project_id UUID;
BEGIN
  -- Determine which project to update
  IF TG_OP = 'DELETE' THEN
    target_project_id := OLD.project_id;
  ELSE
    target_project_id := NEW.project_id;
  END IF;

  -- Update the project counts
  UPDATE projects
  SET
    total_units = (SELECT COUNT(*) FROM units WHERE project_id = target_project_id),
    available_units = (SELECT COUNT(*) FROM units WHERE project_id = target_project_id AND status = 'available')
  WHERE id = target_project_id;

  -- If project changed on UPDATE, also update old project
  IF TG_OP = 'UPDATE' AND OLD.project_id IS DISTINCT FROM NEW.project_id THEN
    UPDATE projects
    SET
      total_units = (SELECT COUNT(*) FROM units WHERE project_id = OLD.project_id),
      available_units = (SELECT COUNT(*) FROM units WHERE project_id = OLD.project_id AND status = 'available')
    WHERE id = OLD.project_id;
  END IF;

  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_project_unit_counts
AFTER INSERT OR UPDATE OR DELETE ON units
FOR EACH ROW
EXECUTE FUNCTION update_project_unit_counts();

-- =====================================================
-- SUPABASE STORAGE BUCKET FOR UPLOADS
-- =====================================================
-- Note: Run this in Supabase SQL Editor or create bucket via dashboard
-- INSERT INTO storage.buckets (id, name, public) VALUES ('uploads', 'uploads', true);
