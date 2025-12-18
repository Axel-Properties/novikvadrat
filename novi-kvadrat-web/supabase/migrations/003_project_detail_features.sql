-- Project Detail Page Features Migration
-- Adds tables for price history, buildings, and construction progress

-- =====================================================
-- PRICE HISTORY TABLE
-- =====================================================
-- Tracks price changes over time for price dynamics chart

CREATE TABLE IF NOT EXISTS project_price_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  price_min DECIMAL(12, 2) NOT NULL,
  price_per_sqm_min DECIMAL(10, 2),
  currency VARCHAR(3) DEFAULT 'EUR',
  recorded_at DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_price_history_project ON project_price_history(project_id);
CREATE INDEX idx_price_history_date ON project_price_history(recorded_at);

-- =====================================================
-- PROJECT BUILDINGS TABLE
-- =====================================================
-- For projects with multiple buildings/blocks

CREATE TABLE IF NOT EXISTS project_buildings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  
  -- Building Info
  name VARCHAR(100) NOT NULL,  -- e.g., "Block A", "Building 1"
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

CREATE INDEX idx_buildings_project ON project_buildings(project_id);

-- =====================================================
-- CONSTRUCTION PROGRESS TABLES
-- =====================================================
-- Photo spots for tracking construction progress over time

CREATE TABLE IF NOT EXISTS construction_progress_spots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  
  -- Spot Info
  name VARCHAR(100) NOT NULL,  -- e.g., "Spot 1", "Main View"
  description TEXT,
  
  -- Date Range
  start_date DATE,
  latest_date DATE,
  
  -- Cover image (first/latest photo)
  cover_image_url VARCHAR(500),
  
  -- Ordering
  sort_order INT DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_progress_spots_project ON construction_progress_spots(project_id);

-- Individual photos for each spot
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

CREATE INDEX idx_progress_photos_spot ON construction_progress_photos(spot_id);
CREATE INDEX idx_progress_photos_date ON construction_progress_photos(taken_at);

-- =====================================================
-- HELPER FUNCTION: Update photo count on spot
-- =====================================================

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

CREATE TRIGGER trigger_update_spot_stats
AFTER INSERT OR UPDATE OR DELETE ON construction_progress_photos
FOR EACH ROW
EXECUTE FUNCTION update_spot_photo_stats();


