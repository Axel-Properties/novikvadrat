-- Combined Migration: Project Buildings + Property Management (Tables Only)
-- Creates all missing tables WITHOUT modifying amenities
-- Combines migrations 003 and 004 (tables only)

-- =====================================================
-- FROM MIGRATION 003: PROJECT BUILDINGS
-- =====================================================

-- Price History Table
CREATE TABLE IF NOT EXISTS project_price_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  price_min DECIMAL(12, 2) NOT NULL,
  price_per_sqm_min DECIMAL(10, 2),
  currency VARCHAR(3) DEFAULT 'EUR',
  recorded_at DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_price_history_project ON project_price_history(project_id);
CREATE INDEX IF NOT EXISTS idx_price_history_date ON project_price_history(recorded_at);

-- Project Buildings Table
CREATE TABLE IF NOT EXISTS project_buildings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  
  -- Building Info
  name VARCHAR(100) NOT NULL,
  address VARCHAR(255),
  
  -- Building Details
  floors INT,
  total_units INT,
  available_units INT,
  
  -- Status
  construction_status VARCHAR(50) CHECK (construction_status IN 
    ('planning', 'u_izgradnji', 'siva_faza', 'useljivo', 'completed')),
  completion_date DATE,
  
  -- Location (optional, falls back to project coordinates if null)
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Ordering
  sort_order INT DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_buildings_project ON project_buildings(project_id);

-- Construction Progress Tables
CREATE TABLE IF NOT EXISTS construction_progress_spots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  
  -- Spot Info
  name VARCHAR(100) NOT NULL,
  description TEXT,
  
  -- Date Range
  start_date DATE,
  latest_date DATE,
  
  -- Cover image
  cover_image_url VARCHAR(500),
  
  -- Ordering
  sort_order INT DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_progress_spots_project ON construction_progress_spots(project_id);

CREATE TABLE IF NOT EXISTS construction_progress_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  spot_id UUID REFERENCES construction_progress_spots(id) ON DELETE CASCADE,
  
  -- Photo Info
  url VARCHAR(500) NOT NULL,
  caption VARCHAR(255),
  taken_at DATE NOT NULL,
  
  -- Ordering
  sort_order INT DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_progress_photos_spot ON construction_progress_photos(spot_id);
CREATE INDEX IF NOT EXISTS idx_progress_photos_date ON construction_progress_photos(taken_at);

-- Trigger for construction progress
CREATE OR REPLACE FUNCTION update_spot_photo_stats()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    UPDATE construction_progress_spots
    SET 
      latest_date = (
        SELECT MAX(taken_at) FROM construction_progress_photos WHERE spot_id = NEW.spot_id
      ),
      start_date = (
        SELECT MIN(taken_at) FROM construction_progress_photos WHERE spot_id = NEW.spot_id
      )
    WHERE id = NEW.spot_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE construction_progress_spots
    SET 
      latest_date = (
        SELECT MAX(taken_at) FROM construction_progress_photos WHERE spot_id = OLD.spot_id
      ),
      start_date = (
        SELECT MIN(taken_at) FROM construction_progress_photos WHERE spot_id = OLD.spot_id
      )
    WHERE id = OLD.spot_id;
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_spot_stats ON construction_progress_photos;
CREATE TRIGGER trigger_update_spot_stats
AFTER INSERT OR UPDATE OR DELETE ON construction_progress_photos
FOR EACH ROW
EXECUTE FUNCTION update_spot_photo_stats();

-- =====================================================
-- FROM MIGRATION 004: PROPERTY MANAGEMENT (TABLES ONLY)
-- =====================================================

-- Building Types Table
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

CREATE INDEX IF NOT EXISTS idx_building_types_project ON building_types(project_id);

-- Unit Types Table
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

CREATE INDEX IF NOT EXISTS idx_unit_types_project ON unit_types(project_id);

-- Add columns to project_buildings
ALTER TABLE project_buildings
  ADD COLUMN IF NOT EXISTS building_type_id UUID REFERENCES building_types(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS building_group VARCHAR(100);

-- Units Table
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

CREATE INDEX IF NOT EXISTS idx_units_project ON units(project_id);
CREATE INDEX IF NOT EXISTS idx_units_building ON units(building_id);
CREATE INDEX IF NOT EXISTS idx_units_status ON units(status);
CREATE INDEX IF NOT EXISTS idx_units_floor ON units(floor);
CREATE INDEX IF NOT EXISTS idx_units_price ON units(price);
CREATE INDEX IF NOT EXISTS idx_units_area ON units(total_area);

-- Unit Features Table (Junction)
CREATE TABLE IF NOT EXISTS unit_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  unit_id UUID REFERENCES units(id) ON DELETE CASCADE,
  amenity_id UUID REFERENCES amenities(id) ON DELETE CASCADE,
  notes VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(unit_id, amenity_id)
);

CREATE INDEX IF NOT EXISTS idx_unit_features_unit ON unit_features(unit_id);

-- Unit Images Table
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

CREATE INDEX IF NOT EXISTS idx_unit_images_unit ON unit_images(unit_id);

-- =====================================================
-- TRIGGERS: Update unit counts
-- =====================================================

-- Update building unit counts
CREATE OR REPLACE FUNCTION update_building_unit_counts()
RETURNS TRIGGER AS $$
DECLARE
  target_building_id UUID;
BEGIN
  IF TG_OP = 'DELETE' THEN
    target_building_id := OLD.building_id;
  ELSE
    target_building_id := NEW.building_id;
  END IF;

  UPDATE project_buildings
  SET
    total_units = (SELECT COUNT(*) FROM units WHERE building_id = target_building_id),
    available_units = (SELECT COUNT(*) FROM units WHERE building_id = target_building_id AND status = 'available')
  WHERE id = target_building_id;

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

DROP TRIGGER IF EXISTS trigger_update_building_unit_counts ON units;
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
  IF TG_OP = 'DELETE' THEN
    target_project_id := OLD.project_id;
  ELSE
    target_project_id := NEW.project_id;
  END IF;

  UPDATE projects
  SET
    total_units = (SELECT COUNT(*) FROM units WHERE project_id = target_project_id),
    available_units = (SELECT COUNT(*) FROM units WHERE project_id = target_project_id AND status = 'available')
  WHERE id = target_project_id;

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

DROP TRIGGER IF EXISTS trigger_update_project_unit_counts ON units;
CREATE TRIGGER trigger_update_project_unit_counts
AFTER INSERT OR UPDATE OR DELETE ON units
FOR EACH ROW
EXECUTE FUNCTION update_project_unit_counts();
