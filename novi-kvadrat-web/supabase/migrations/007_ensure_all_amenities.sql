-- Ensure All Amenities Migration
-- Adds all amenities from the UI with proper categories
-- Uses ON CONFLICT to avoid duplicates if run multiple times

-- =====================================================
-- UPDATE CATEGORY CONSTRAINT
-- =====================================================

-- First, drop ALL existing category constraints (there might be multiple)
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (
        SELECT conname 
        FROM pg_constraint 
        WHERE conrelid = 'amenities'::regclass 
        AND conname LIKE '%category%'
    ) LOOP
        EXECUTE 'ALTER TABLE amenities DROP CONSTRAINT IF EXISTS ' || quote_ident(r.conname);
    END LOOP;
END $$;

-- =====================================================
-- UPDATE EXISTING ROWS TO NEW CATEGORIES
-- =====================================================

-- Now update existing rows with old category values to new categories
-- Map old categories to new ones
UPDATE amenities SET category = 'building_amenities' WHERE category IN ('building', 'outdoor');
UPDATE amenities SET category = 'unit_features' WHERE category IN ('apartment');
UPDATE amenities SET category = 'security_features' WHERE category = 'security';
UPDATE amenities SET category = 'building_amenities' WHERE category = 'location';
-- Set 'other' to 'building_amenities' as default
UPDATE amenities SET category = 'building_amenities' WHERE category = 'other' OR category IS NULL;

-- =====================================================
-- ADD NEW CATEGORY CONSTRAINT
-- =====================================================

-- Now we can safely add the new constraint
ALTER TABLE amenities ADD CONSTRAINT amenities_category_check
  CHECK (category IN ('unit_features', 'building_amenities', 'appliances', 'smart_features', 'security_features'));

-- Add sort_order column if not exists
ALTER TABLE amenities ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0;

-- Ensure all existing rows have valid categories before proceeding
-- Set any invalid categories to a default
UPDATE amenities 
SET category = 'building_amenities' 
WHERE category NOT IN ('unit_features', 'building_amenities', 'appliances', 'smart_features', 'security_features');

-- Add unique constraint on name_en if not exists (for ON CONFLICT to work)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'amenities_name_en_unique'
  ) THEN
    ALTER TABLE amenities ADD CONSTRAINT amenities_name_en_unique UNIQUE (name_en);
  END IF;
END $$;

-- Function to insert or update amenity (handles both cases: with or without unique constraint)
CREATE OR REPLACE FUNCTION insert_amenity_if_not_exists(
  p_name_en VARCHAR(100),
  p_name_sr VARCHAR(100),
  p_icon VARCHAR(50),
  p_category VARCHAR(50),
  p_sort_order INT
) RETURNS VOID AS $$
BEGIN
  -- Try to update first
  UPDATE amenities SET
    name_sr = p_name_sr,
    icon = p_icon,
    category = p_category,
    sort_order = p_sort_order
  WHERE name_en = p_name_en;
  
  -- If no row was updated, insert new one
  IF NOT FOUND THEN
    INSERT INTO amenities (name_en, name_sr, icon, category, sort_order)
    VALUES (p_name_en, p_name_sr, p_icon, p_category, p_sort_order);
  END IF;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- INSERT ALL AMENITIES (ON CONFLICT DO NOTHING)
-- =====================================================

-- Unit Features (20 items)
SELECT insert_amenity_if_not_exists('Air Conditioning', 'Klima uređaj', 'wind', 'unit_features', 1);
SELECT insert_amenity_if_not_exists('Built-in Wardrobes', 'Ugradni plakari', 'archive', 'unit_features', 2);
SELECT insert_amenity_if_not_exists('Floor-to-Ceiling Windows', 'Prozori od poda do plafona', 'maximize', 'unit_features', 3);
SELECT insert_amenity_if_not_exists('En-suite Bathroom', 'Kupatilo uz spavaću sobu', 'bath', 'unit_features', 4);
SELECT insert_amenity_if_not_exists('Kitchen Island', 'Kuhinjsko ostrvo', 'chef-hat', 'unit_features', 5);
SELECT insert_amenity_if_not_exists('Underfloor Heating', 'Podno grejanje', 'thermometer', 'unit_features', 6);
SELECT insert_amenity_if_not_exists('Electric Blinds', 'Električne roletne', 'blinds', 'unit_features', 7);
SELECT insert_amenity_if_not_exists('In-unit Laundry', 'Vešernica u stanu', 'washing-machine', 'unit_features', 8);
SELECT insert_amenity_if_not_exists('Home Office Space', 'Radni prostor', 'briefcase', 'unit_features', 9);
SELECT insert_amenity_if_not_exists('Panic Room', 'Sigurnosna soba', 'shield-alert', 'unit_features', 10);
SELECT insert_amenity_if_not_exists('Hardwood Floors', 'Drveni podovi', 'layers', 'unit_features', 11);
SELECT insert_amenity_if_not_exists('Smart Home System', 'Smart Home sistem', 'cpu', 'unit_features', 12);
SELECT insert_amenity_if_not_exists('Private Balcony', 'Privatni balkon', 'fence', 'unit_features', 13);
SELECT insert_amenity_if_not_exists('Walk-in Closet', 'Garderober', 'shirt', 'unit_features', 14);
SELECT insert_amenity_if_not_exists('Premium Appliances', 'Premium uređaji', 'sparkles', 'unit_features', 15);
SELECT insert_amenity_if_not_exists('Sound Insulation', 'Zvučna izolacija', 'volume-x', 'unit_features', 16);
SELECT insert_amenity_if_not_exists('Video Intercom', 'Video interfon', 'video', 'unit_features', 17);
SELECT insert_amenity_if_not_exists('Wine Cooler', 'Rashladna vitrina za vino', 'wine', 'unit_features', 18);
SELECT insert_amenity_if_not_exists('Storage Room', 'Ostava', 'box', 'unit_features', 19);
SELECT insert_amenity_if_not_exists('Fireplace', 'Kamin', 'flame', 'unit_features', 20);

-- Building Amenities (20 items)
SELECT insert_amenity_if_not_exists('Swimming Pool', 'Bazen', 'pool', 'building_amenities', 1);
SELECT insert_amenity_if_not_exists('Concierge Service', 'Concierge služba', 'bell-concierge', 'building_amenities', 2);
SELECT insert_amenity_if_not_exists('Rooftop Terrace', 'Krovna terasa', 'sun', 'building_amenities', 3);
SELECT insert_amenity_if_not_exists('Pet-Friendly', 'Dozvoljeni ljubimci', 'paw-print', 'building_amenities', 4);
SELECT insert_amenity_if_not_exists('Electric Vehicle Charging', 'Punjač za električna vozila', 'plug-zap', 'building_amenities', 5);
SELECT insert_amenity_if_not_exists('Children''s Playground', 'Dečije igralište', 'baby', 'building_amenities', 6);
SELECT insert_amenity_if_not_exists('Cinema Room', 'Bioskopska sala', 'clapperboard', 'building_amenities', 7);
SELECT insert_amenity_if_not_exists('Library', 'Biblioteka', 'book-open', 'building_amenities', 8);
SELECT insert_amenity_if_not_exists('Valet Parking', 'Valet parking', 'car', 'building_amenities', 9);
SELECT insert_amenity_if_not_exists('Package Room', 'Prostorija za pakete', 'package', 'building_amenities', 10);
SELECT insert_amenity_if_not_exists('Fitness Center', 'Fitnes centar', 'dumbbell', 'building_amenities', 11);
SELECT insert_amenity_if_not_exists('24/7 Security', '24/7 Obezbeđenje', 'shield-check', 'building_amenities', 12);
SELECT insert_amenity_if_not_exists('Business Center', 'Poslovni centar', 'building-2', 'building_amenities', 13);
SELECT insert_amenity_if_not_exists('Bicycle Storage', 'Ostava za bicikle', 'bike', 'building_amenities', 14);
SELECT insert_amenity_if_not_exists('Spa & Wellness', 'Spa i velnes', 'sparkles', 'building_amenities', 15);
SELECT insert_amenity_if_not_exists('Coworking Space', 'Coworking prostor', 'users', 'building_amenities', 16);
SELECT insert_amenity_if_not_exists('Game Room', 'Igraonica', 'gamepad-2', 'building_amenities', 17);
SELECT insert_amenity_if_not_exists('Guest Suites', 'Apartmani za goste', 'bed', 'building_amenities', 18);
SELECT insert_amenity_if_not_exists('Dry Cleaning Service', 'Hemijsko čišćenje', 'shirt', 'building_amenities', 19);
SELECT insert_amenity_if_not_exists('BBQ Area', 'Roštilj zona', 'flame', 'building_amenities', 20);

-- Included Appliances (14 items)
SELECT insert_amenity_if_not_exists('Refrigerator', 'Frižider', 'refrigerator', 'appliances', 1);
SELECT insert_amenity_if_not_exists('Oven', 'Rerna', 'cooking-pot', 'appliances', 2);
SELECT insert_amenity_if_not_exists('Cooktop', 'Ploča za kuvanje', 'flame', 'appliances', 3);
SELECT insert_amenity_if_not_exists('Washing Machine', 'Veš mašina', 'washing-machine', 'appliances', 4);
SELECT insert_amenity_if_not_exists('Wine Fridge', 'Frižider za vino', 'wine', 'appliances', 5);
SELECT insert_amenity_if_not_exists('Garbage Disposal', 'Drobljač otpada', 'trash', 'appliances', 6);
SELECT insert_amenity_if_not_exists('HVAC System', 'HVAC sistem', 'air-vent', 'appliances', 7);
SELECT insert_amenity_if_not_exists('Dishwasher', 'Mašina za sudove', 'utensils', 'appliances', 8);
SELECT insert_amenity_if_not_exists('Microwave', 'Mikrotalasna', 'microwave', 'appliances', 9);
SELECT insert_amenity_if_not_exists('Range Hood', 'Napa', 'wind', 'appliances', 10);
SELECT insert_amenity_if_not_exists('Dryer', 'Sušilica', 'wind', 'appliances', 11);
SELECT insert_amenity_if_not_exists('Ice Maker', 'Aparat za led', 'snowflake', 'appliances', 12);
SELECT insert_amenity_if_not_exists('Water Heater', 'Bojler', 'droplet', 'appliances', 13);
SELECT insert_amenity_if_not_exists('Water Filter', 'Filter za vodu', 'filter', 'appliances', 14);

-- Smart Features (12 items)
SELECT insert_amenity_if_not_exists('Smart Thermostat', 'Smart termostat', 'thermometer', 'smart_features', 1);
SELECT insert_amenity_if_not_exists('Smart Locks', 'Smart brave', 'lock', 'smart_features', 2);
SELECT insert_amenity_if_not_exists('Security System', 'Sigurnosni sistem', 'shield', 'smart_features', 3);
SELECT insert_amenity_if_not_exists('Automated Blinds', 'Automatske roletne', 'blinds', 'smart_features', 4);
SELECT insert_amenity_if_not_exists('Home Assistant Integration', 'Home Assistant integracija', 'cpu', 'smart_features', 5);
SELECT insert_amenity_if_not_exists('USB Outlets', 'USB utičnice', 'usb', 'smart_features', 6);
SELECT insert_amenity_if_not_exists('Smart Lighting', 'Smart osvetljenje', 'lightbulb', 'smart_features', 7);
SELECT insert_amenity_if_not_exists('Video Doorbell', 'Video zvono', 'bell', 'smart_features', 8);
SELECT insert_amenity_if_not_exists('Smart Speakers', 'Smart zvučnici', 'speaker', 'smart_features', 9);
SELECT insert_amenity_if_not_exists('Smart Appliances', 'Smart uređaji', 'smartphone', 'smart_features', 10);
SELECT insert_amenity_if_not_exists('Wireless Charging Stations', 'Bežične stanice za punjenje', 'battery-charging', 'smart_features', 11);
SELECT insert_amenity_if_not_exists('Smart Water Leak Detectors', 'Smart detektori curenja vode', 'droplet', 'smart_features', 12);

-- Security Features (12 items)
SELECT insert_amenity_if_not_exists('24/7 Surveillance', '24/7 Video nadzor', 'cctv', 'security_features', 1);
SELECT insert_amenity_if_not_exists('Biometric Entry', 'Biometrijski ulaz', 'fingerprint', 'security_features', 2);
SELECT insert_amenity_if_not_exists('Alarm System', 'Alarmni sistem', 'siren', 'security_features', 3);
SELECT insert_amenity_if_not_exists('Emergency Exits', 'Izlazi za hitne slučajeve', 'door-open', 'security_features', 4);
SELECT insert_amenity_if_not_exists('Intercom System', 'Interfon sistem', 'phone', 'security_features', 5);
SELECT insert_amenity_if_not_exists('Window Locks', 'Brave na prozorima', 'lock', 'security_features', 6);
SELECT insert_amenity_if_not_exists('Access Control', 'Kontrola pristupa', 'key', 'security_features', 7);
SELECT insert_amenity_if_not_exists('Security Guards', 'Obezbeđenje', 'user-check', 'security_features', 8);
SELECT insert_amenity_if_not_exists('Fire Detection', 'Detekcija požara', 'flame', 'security_features', 9);
SELECT insert_amenity_if_not_exists('Safe Room', 'Sef soba', 'vault', 'security_features', 10);
SELECT insert_amenity_if_not_exists('Motion Sensors', 'Senzori pokreta', 'radar', 'security_features', 11);
SELECT insert_amenity_if_not_exists('Reinforced Doors', 'Ojačana vrata', 'door-closed', 'security_features', 12);
