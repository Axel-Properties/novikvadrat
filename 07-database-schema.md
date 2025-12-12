# Database Schema

## PostgreSQL Database Design

---

## Core Entities

### Users Table

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) UNIQUE,
  password_hash VARCHAR(255),
  
  -- Profile
  name VARCHAR(255) NOT NULL,
  avatar_url VARCHAR(500),
  bio TEXT,
  
  -- Type & Status
  user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('buyer', 'seller', 'agent', 'developer')),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'banned', 'pending')),
  
  -- Verification
  email_verified BOOLEAN DEFAULT FALSE,
  phone_verified BOOLEAN DEFAULT FALSE,
  identity_verified BOOLEAN DEFAULT FALSE,
  
  -- OAuth
  google_id VARCHAR(255),
  facebook_id VARCHAR(255),
  
  -- Settings (JSONB for flexibility)
  settings JSONB DEFAULT '{}',
  
  -- Timestamps
  last_login_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_type ON users(user_type);
CREATE INDEX idx_users_status ON users(status);
```

### Cities Table

```sql
CREATE TABLE cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en VARCHAR(100) NOT NULL,
  name_ka VARCHAR(100) NOT NULL,
  name_ru VARCHAR(100),
  slug VARCHAR(100) UNIQUE NOT NULL,
  country VARCHAR(50) DEFAULT 'Georgia',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Districts Table

```sql
CREATE TABLE districts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id UUID REFERENCES cities(id) ON DELETE CASCADE,
  name_en VARCHAR(100) NOT NULL,
  name_ka VARCHAR(100) NOT NULL,
  name_ru VARCHAR(100),
  slug VARCHAR(100) NOT NULL,
  parent_district_id UUID REFERENCES districts(id),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  polygon GEOMETRY(POLYGON, 4326),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(city_id, slug)
);

CREATE INDEX idx_districts_city ON districts(city_id);
CREATE INDEX idx_districts_polygon ON districts USING GIST(polygon);
```

### Metro Stations Table

```sql
CREATE TABLE metro_stations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city_id UUID REFERENCES cities(id) ON DELETE CASCADE,
  name_en VARCHAR(100) NOT NULL,
  name_ka VARCHAR(100) NOT NULL,
  name_ru VARCHAR(100),
  slug VARCHAR(100) NOT NULL,
  line_name VARCHAR(50),
  line_color VARCHAR(7),
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  
  UNIQUE(city_id, slug)
);
```

---

## Developers & Projects

### Developers Table

```sql
CREATE TABLE developers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  
  -- Basic Info
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  logo_url VARCHAR(500),
  cover_image_url VARCHAR(500),
  description TEXT,
  
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
  license_number VARCHAR(100),
  
  -- Statistics
  total_projects INT DEFAULT 0,
  active_projects INT DEFAULT 0,
  completed_projects INT DEFAULT 0,
  
  -- Status
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'inactive', 'rejected')),
  founded_year INT,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_developers_slug ON developers(slug);
CREATE INDEX idx_developers_status ON developers(status);
```

### Projects Table

```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  developer_id UUID REFERENCES developers(id) ON DELETE CASCADE,
  city_id UUID REFERENCES cities(id),
  district_id UUID REFERENCES districts(id),
  
  -- Basic Info
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT,
  
  -- Location
  address VARCHAR(500),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  nearest_metro_id UUID REFERENCES metro_stations(id),
  metro_distance INT,
  
  -- Pricing
  price_min DECIMAL(12, 2),
  price_max DECIMAL(12, 2),
  price_per_sqm_min DECIMAL(10, 2),
  price_per_sqm_max DECIMAL(10, 2),
  currency VARCHAR(3) DEFAULT 'USD',
  
  -- Project Details
  project_type VARCHAR(50) CHECK (project_type IN ('residential', 'commercial', 'mixed', 'cottage')),
  total_buildings INT DEFAULT 1,
  total_floors_min INT,
  total_floors_max INT,
  total_apartments INT,
  available_apartments INT,
  
  -- Areas
  area_min DECIMAL(10, 2),
  area_max DECIMAL(10, 2),
  
  -- Construction
  construction_start DATE,
  construction_end DATE,
  completion_percentage INT DEFAULT 0,
  construction_status VARCHAR(30) CHECK (construction_status IN 
    ('planned', 'under_construction', 'completed', 'on_hold')),
  
  -- Frame Types
  has_black_frame BOOLEAN DEFAULT FALSE,
  has_white_frame BOOLEAN DEFAULT FALSE,
  has_green_frame BOOLEAN DEFAULT FALSE,
  
  -- Purchase Terms
  has_installment BOOLEAN DEFAULT FALSE,
  has_mortgage BOOLEAN DEFAULT FALSE,
  
  -- Amenities (JSONB)
  amenities JSONB DEFAULT '[]',
  
  -- Media
  images JSONB DEFAULT '[]',
  video_url VARCHAR(500),
  virtual_tour_url VARCHAR(500),
  
  -- Status
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'inactive', 'archived')),
  is_featured BOOLEAN DEFAULT FALSE,
  
  -- Statistics
  views_count INT DEFAULT 0,
  favorites_count INT DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(developer_id, slug)
);

CREATE INDEX idx_projects_developer ON projects(developer_id);
CREATE INDEX idx_projects_city ON projects(city_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_price ON projects(price_min, price_max);
```

### Layouts Table

```sql
CREATE TABLE layouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  
  -- Basic Info
  code VARCHAR(50) NOT NULL,
  name VARCHAR(100),
  
  -- Specifications
  rooms INT NOT NULL,
  bedrooms INT,
  bathrooms INT DEFAULT 1,
  total_area DECIMAL(10, 2) NOT NULL,
  living_area DECIMAL(10, 2),
  kitchen_area DECIMAL(10, 2),
  balcony_area DECIMAL(10, 2),
  
  -- Floor Plans
  floor_plan_2d VARCHAR(500),
  floor_plan_3d VARCHAR(500),
  
  -- Availability
  floor_range_min INT,
  floor_range_max INT,
  total_units INT DEFAULT 0,
  available_units INT DEFAULT 0,
  
  -- Pricing
  price_min DECIMAL(12, 2),
  price_max DECIMAL(12, 2),
  
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(project_id, code)
);

CREATE INDEX idx_layouts_project ON layouts(project_id);
CREATE INDEX idx_layouts_rooms ON layouts(rooms);
```

### Apartment Units Table

```sql
CREATE TABLE apartment_units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  building_id UUID REFERENCES buildings(id),
  layout_id UUID REFERENCES layouts(id),
  
  -- Identification
  unit_number VARCHAR(20) NOT NULL,
  floor INT NOT NULL,
  
  -- Specifications
  total_area DECIMAL(10, 2) NOT NULL,
  price DECIMAL(12, 2) NOT NULL,
  price_per_sqm DECIMAL(10, 2),
  
  -- Status
  status VARCHAR(20) DEFAULT 'available' CHECK (status IN 
    ('available', 'reserved', 'sold', 'not_for_sale')),
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_units_project ON apartment_units(project_id);
CREATE INDEX idx_units_status ON apartment_units(status);
```

---

## Property Listings (Secondary Market)

```sql
CREATE TABLE property_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- Listing Type
  listing_type VARCHAR(20) NOT NULL CHECK (listing_type IN ('sale', 'rent', 'daily')),
  property_type VARCHAR(30) NOT NULL CHECK (property_type IN 
    ('apartment', 'house', 'commercial', 'office', 'warehouse', 'land', 'garage')),
  
  -- Basic Info
  title VARCHAR(255),
  description TEXT,
  
  -- Location
  city_id UUID REFERENCES cities(id),
  district_id UUID REFERENCES districts(id),
  address VARCHAR(500),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Pricing
  price DECIMAL(12, 2) NOT NULL,
  price_per_sqm DECIMAL(10, 2),
  currency VARCHAR(3) DEFAULT 'USD',
  is_negotiable BOOLEAN DEFAULT FALSE,
  
  -- Property Details
  rooms INT,
  bathrooms INT DEFAULT 1,
  total_area DECIMAL(10, 2) NOT NULL,
  floor INT,
  total_floors INT,
  building_type VARCHAR(20),
  building_year INT,
  condition VARCHAR(30),
  
  -- Amenities (JSONB)
  amenities JSONB DEFAULT '{}',
  
  -- Media
  images JSONB DEFAULT '[]',
  
  -- Seller Info
  seller_type VARCHAR(20) CHECK (seller_type IN ('owner', 'agent', 'developer')),
  
  -- Status
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN 
    ('pending', 'active', 'paused', 'sold', 'rented', 'expired', 'rejected')),
  
  -- Statistics
  views_count INT DEFAULT 0,
  favorites_count INT DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_listings_user ON property_listings(user_id);
CREATE INDEX idx_listings_city ON property_listings(city_id);
CREATE INDEX idx_listings_type ON property_listings(listing_type, property_type);
CREATE INDEX idx_listings_status ON property_listings(status);
CREATE INDEX idx_listings_price ON property_listings(price);
```
