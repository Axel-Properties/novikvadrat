-- Serbian Real Estate Platform Database Schema
-- Adapted for Serbian market specifics

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- =====================================================
-- LOCATION TABLES
-- =====================================================

-- Cities Table (Serbian cities)
CREATE TABLE IF NOT EXISTS cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en VARCHAR(100) NOT NULL,
  name_sr_lat VARCHAR(100) NOT NULL, -- Serbian Latin
  name_sr_cyr VARCHAR(100) NOT NULL, -- Serbian Cyrillic
  slug VARCHAR(100) UNIQUE NOT NULL,
  country VARCHAR(50) DEFAULT 'Serbia',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Municipalities/Districts (Opštine)
CREATE TABLE IF NOT EXISTS municipalities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id UUID REFERENCES cities(id) ON DELETE CASCADE,
  name_en VARCHAR(100) NOT NULL,
  name_sr_lat VARCHAR(100) NOT NULL,
  name_sr_cyr VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL,
  parent_id UUID REFERENCES municipalities(id), -- For neighborhoods within municipalities
  municipality_type VARCHAR(50) CHECK (municipality_type IN ('municipality', 'neighborhood')),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  polygon GEOMETRY(POLYGON, 4326),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(city_id, slug)
);

CREATE INDEX idx_municipalities_city ON municipalities(city_id);
CREATE INDEX idx_municipalities_polygon ON municipalities USING GIST(polygon);

-- =====================================================
-- DEVELOPERS & COMPANIES
-- =====================================================

CREATE TABLE IF NOT EXISTS developers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Basic Info
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  pib VARCHAR(20), -- Serbian Tax ID (PIB)
  logo_url VARCHAR(500),
  cover_image_url VARCHAR(500),
  description TEXT,
  founded_year INT,
  
  -- Contact
  website VARCHAR(500),
  email VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  
  -- Social
  facebook VARCHAR(255),
  instagram VARCHAR(255),
  linkedin VARCHAR(255),
  
  -- Verification
  is_verified BOOLEAN DEFAULT FALSE,
  verified_at TIMESTAMP,
  apr_registration VARCHAR(100), -- APR registration number
  
  -- Statistics
  total_projects INT DEFAULT 0,
  active_projects INT DEFAULT 0,
  completed_projects INT DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_developers_slug ON developers(slug);
CREATE INDEX idx_developers_verified ON developers(is_verified);

-- =====================================================
-- PROJECTS (NOVOGRADNJA)
-- =====================================================

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  developer_id UUID REFERENCES developers(id),
  
  -- Basic Info
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  
  -- Location
  city_id UUID REFERENCES cities(id),
  municipality_id UUID REFERENCES municipalities(id),
  address VARCHAR(500),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Construction Details
  construction_status VARCHAR(50) CHECK (construction_status IN 
    ('planning', 'u_izgradnji', 'siva_faza', 'useljivo', 'completed')),
  construction_start_date DATE,
  completion_date DATE,
  completion_percentage INT CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
  
  -- Building Details
  total_buildings INT DEFAULT 1,
  total_floors INT,
  total_units INT,
  available_units INT,
  parking_spaces INT,
  
  -- Features
  heating_type VARCHAR(50) CHECK (heating_type IN 
    ('centralno', 'etazno', 'gas', 'toplotna_pumpa', 'podno', 'ta_pec')),
  elevator BOOLEAN DEFAULT FALSE,
  garage BOOLEAN DEFAULT FALSE,
  energy_class VARCHAR(10),
  
  -- Pricing (in EUR - Serbian market standard)
  price_from DECIMAL(12, 2),
  price_to DECIMAL(12, 2),
  price_per_sqm_from DECIMAL(10, 2),
  price_per_sqm_to DECIMAL(10, 2),
  vat_included BOOLEAN DEFAULT TRUE, -- PDV included in price
  first_buyer_vat_refund BOOLEAN DEFAULT FALSE, -- Povraćaj PDV-a za prvi stan
  
  -- Marketing
  featured BOOLEAN DEFAULT FALSE,
  featured_order INT,
  main_image_url VARCHAR(500),
  video_url VARCHAR(500),
  virtual_tour_url VARCHAR(500),
  brochure_url VARCHAR(500),
  
  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  views_count INT DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_projects_developer ON projects(developer_id);
CREATE INDEX idx_projects_city ON projects(city_id);
CREATE INDEX idx_projects_municipality ON projects(municipality_id);
CREATE INDEX idx_projects_status ON projects(construction_status);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_projects_price_range ON projects(price_from, price_to);

-- =====================================================
-- PROJECT FEATURES & AMENITIES
-- =====================================================

CREATE TABLE IF NOT EXISTS amenities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en VARCHAR(100) NOT NULL,
  name_sr VARCHAR(100) NOT NULL,
  icon VARCHAR(50),
  category VARCHAR(50) CHECK (category IN 
    ('building', 'apartment', 'location', 'outdoor', 'security', 'other')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS project_amenities (
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  amenity_id UUID REFERENCES amenities(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, amenity_id)
);

-- =====================================================
-- PROJECT IMAGES
-- =====================================================

CREATE TABLE IF NOT EXISTS project_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  url VARCHAR(500) NOT NULL,
  caption VARCHAR(255),
  image_type VARCHAR(50) CHECK (image_type IN 
    ('exterior', 'interior', 'floor_plan', 'location', 'construction', 'amenity')),
  is_primary BOOLEAN DEFAULT FALSE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_project_images_project ON project_images(project_id);

-- =====================================================
-- FLOOR PLANS / LAYOUTS
-- =====================================================

CREATE TABLE IF NOT EXISTS layouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  
  -- Layout Info
  name VARCHAR(100) NOT NULL, -- e.g., "Tip A", "Jednosoban stan"
  layout_type VARCHAR(50) CHECK (layout_type IN 
    ('garsonjera', 'jednosoban', 'jednoiposoban', 'dvosoban', 'dvoiposoban', 
     'trosoban', 'troiposoban', 'cetvorosoban', 'petosoban', 'penthouse')),
  
  -- Measurements (in m²)
  total_area DECIMAL(8, 2) NOT NULL,
  living_area DECIMAL(8, 2),
  terrace_area DECIMAL(8, 2),
  
  -- Rooms
  bedrooms INT DEFAULT 0,
  bathrooms INT DEFAULT 1,
  has_terrace BOOLEAN DEFAULT FALSE,
  has_loggia BOOLEAN DEFAULT FALSE,
  
  -- Pricing
  price_from DECIMAL(12, 2),
  price_to DECIMAL(12, 2),
  
  -- Images
  floor_plan_url VARCHAR(500),
  floor_plan_3d_url VARCHAR(500),
  
  -- Availability
  total_units INT DEFAULT 1,
  available_units INT DEFAULT 1,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_layouts_project ON layouts(project_id);
CREATE INDEX idx_layouts_type ON layouts(layout_type);

-- =====================================================
-- INITIAL DATA - Serbian Cities
-- =====================================================

INSERT INTO cities (name_en, name_sr_lat, name_sr_cyr, slug, latitude, longitude, sort_order) VALUES
('Belgrade', 'Beograd', 'Београд', 'beograd', 44.7866, 20.4489, 1),
('Novi Sad', 'Novi Sad', 'Нови Сад', 'novi-sad', 45.2671, 19.8335, 2),
('Niš', 'Niš', 'Ниш', 'nis', 43.3209, 21.8958, 3),
('Kragujevac', 'Kragujevac', 'Крагујевац', 'kragujevac', 44.0128, 20.9114, 4),
('Subotica', 'Subotica', 'Суботица', 'subotica', 46.1000, 19.6667, 5),
('Pančevo', 'Pančevo', 'Панчево', 'pancevo', 44.8708, 20.6403, 6),
('Zrenjanin', 'Zrenjanin', 'Зрењанин', 'zrenjanin', 45.3833, 20.3900, 7),
('Čačak', 'Čačak', 'Чачак', 'cacak', 43.8914, 20.3497, 8),
('Kraljevo', 'Kraljevo', 'Краљево', 'kraljevo', 43.7234, 20.6870, 9),
('Valjevo', 'Valjevo', 'Ваљево', 'valjevo', 44.2748, 19.8859, 10);

-- Belgrade Municipalities
INSERT INTO municipalities (city_id, name_en, name_sr_lat, name_sr_cyr, slug, municipality_type) 
SELECT 
  c.id, 
  m.name_en, 
  m.name_sr_lat, 
  m.name_sr_cyr, 
  m.slug,
  'municipality'
FROM cities c
CROSS JOIN (VALUES
  ('Stari Grad', 'Stari Grad', 'Стари Град', 'stari-grad'),
  ('Vračar', 'Vračar', 'Врачар', 'vracar'),
  ('Savski Venac', 'Savski Venac', 'Савски Венац', 'savski-venac'),
  ('Novi Beograd', 'Novi Beograd', 'Нови Београд', 'novi-beograd'),
  ('Zvezdara', 'Zvezdara', 'Звездара', 'zvezdara'),
  ('Voždovac', 'Voždovac', 'Вождовац', 'vozdovac'),
  ('Zemun', 'Zemun', 'Земун', 'zemun'),
  ('Palilula', 'Palilula', 'Палилула', 'palilula'),
  ('Čukarica', 'Čukarica', 'Чукарица', 'cukarica'),
  ('Rakovica', 'Rakovica', 'Раковица', 'rakovica')
) AS m(name_en, name_sr_lat, name_sr_cyr, slug)
WHERE c.slug = 'beograd';

-- Sample Amenities
INSERT INTO amenities (name_en, name_sr, icon, category) VALUES
('Reception', 'Recepcija', 'reception', 'building'),
('Security', 'Obezbeđenje', 'security', 'security'),
('Underground Parking', 'Podzemna garaža', 'parking', 'building'),
('Elevator', 'Lift', 'elevator', 'building'),
('Smart Home', 'Smart Home sistem', 'smart-home', 'apartment'),
('Central Heating', 'Centralno grejanje', 'heating', 'building'),
('Playground', 'Dečije igralište', 'playground', 'outdoor'),
('Gym', 'Teretana', 'gym', 'building'),
('Swimming Pool', 'Bazen', 'pool', 'outdoor'),
('Video Surveillance', 'Video nadzor', 'cctv', 'security');