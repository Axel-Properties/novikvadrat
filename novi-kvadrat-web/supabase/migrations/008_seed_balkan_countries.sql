-- Seed Balkan Countries
-- Creates countries table and adds Serbia and other Balkan countries

-- =====================================================
-- CREATE COUNTRIES TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS countries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en VARCHAR(100) NOT NULL,
  name_sr_lat VARCHAR(100) NOT NULL,
  name_sr_cyr VARCHAR(100) NOT NULL,
  country_code VARCHAR(2) UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_countries_code ON countries(country_code);
CREATE INDEX IF NOT EXISTS idx_countries_active ON countries(is_active);

-- Function to insert or update country
CREATE OR REPLACE FUNCTION insert_country_if_not_exists(
  p_name_en VARCHAR(100),
  p_name_sr_lat VARCHAR(100),
  p_name_sr_cyr VARCHAR(100),
  p_country_code VARCHAR(2),
  p_is_active BOOLEAN
) RETURNS VOID AS $$
BEGIN
  -- Try to update first
  UPDATE countries SET
    name_en = p_name_en,
    name_sr_lat = p_name_sr_lat,
    name_sr_cyr = p_name_sr_cyr,
    is_active = p_is_active
  WHERE country_code = p_country_code;
  
  -- If no row was updated, insert new one
  IF NOT FOUND THEN
    INSERT INTO countries (name_en, name_sr_lat, name_sr_cyr, country_code, is_active)
    VALUES (p_name_en, p_name_sr_lat, p_name_sr_cyr, p_country_code, p_is_active);
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Insert Balkan countries
SELECT insert_country_if_not_exists('Serbia', 'Srbija', 'Србија', 'RS', true);
SELECT insert_country_if_not_exists('Croatia', 'Hrvatska', 'Хрватска', 'HR', true);
SELECT insert_country_if_not_exists('Bosnia and Herzegovina', 'Bosna i Hercegovina', 'Босна и Херцеговина', 'BA', true);
SELECT insert_country_if_not_exists('Montenegro', 'Crna Gora', 'Црна Гора', 'ME', true);
SELECT insert_country_if_not_exists('North Macedonia', 'Severna Makedonija', 'Северна Македонија', 'MK', true);
SELECT insert_country_if_not_exists('Slovenia', 'Slovenija', 'Словенија', 'SI', true);
SELECT insert_country_if_not_exists('Albania', 'Albanija', 'Албанија', 'AL', true);
SELECT insert_country_if_not_exists('Bulgaria', 'Bugarska', 'Бугарска', 'BG', true);
SELECT insert_country_if_not_exists('Romania', 'Rumunija', 'Румунија', 'RO', true);
SELECT insert_country_if_not_exists('Greece', 'Grčka', 'Грчка', 'GR', true);
