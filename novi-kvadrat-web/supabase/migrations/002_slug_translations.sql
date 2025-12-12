-- Add slug translation columns to cities table
ALTER TABLE cities ADD COLUMN IF NOT EXISTS slug_en VARCHAR(100);
ALTER TABLE cities ADD COLUMN IF NOT EXISTS slug_sr VARCHAR(100);
ALTER TABLE cities ADD COLUMN IF NOT EXISTS slug_sr_cyr VARCHAR(100);

-- Add slug translation columns to municipalities table
ALTER TABLE municipalities ADD COLUMN IF NOT EXISTS slug_en VARCHAR(100);
ALTER TABLE municipalities ADD COLUMN IF NOT EXISTS slug_sr VARCHAR(100);
ALTER TABLE municipalities ADD COLUMN IF NOT EXISTS slug_sr_cyr VARCHAR(100);

-- Add slug translation columns to projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS slug_en VARCHAR(255);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS slug_sr VARCHAR(255);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS slug_sr_cyr VARCHAR(255);

-- Add slug translation columns to developers table
ALTER TABLE developers ADD COLUMN IF NOT EXISTS slug_en VARCHAR(255);
ALTER TABLE developers ADD COLUMN IF NOT EXISTS slug_sr VARCHAR(255);
ALTER TABLE developers ADD COLUMN IF NOT EXISTS slug_sr_cyr VARCHAR(255);

-- Update cities with English slugs
UPDATE cities SET 
  slug_en = CASE slug
    WHEN 'beograd' THEN 'belgrade'
    WHEN 'novi-sad' THEN 'novi-sad'
    WHEN 'nis' THEN 'nis'
    WHEN 'kragujevac' THEN 'kragujevac'
    WHEN 'subotica' THEN 'subotica'
    WHEN 'pancevo' THEN 'pancevo'
    WHEN 'zrenjanin' THEN 'zrenjanin'
    WHEN 'cacak' THEN 'cacak'
    WHEN 'kraljevo' THEN 'kraljevo'
    WHEN 'valjevo' THEN 'valjevo'
    ELSE slug
  END,
  slug_sr = slug,
  slug_sr_cyr = CASE slug
    WHEN 'beograd' THEN 'београд'
    WHEN 'novi-sad' THEN 'нови-сад'
    WHEN 'nis' THEN 'ниш'
    WHEN 'kragujevac' THEN 'крагујевац'
    WHEN 'subotica' THEN 'суботица'
    WHEN 'pancevo' THEN 'панчево'
    WHEN 'zrenjanin' THEN 'зрењанин'
    WHEN 'cacak' THEN 'чачак'
    WHEN 'kraljevo' THEN 'краљево'
    WHEN 'valjevo' THEN 'ваљево'
    ELSE slug
  END;

-- Update municipalities with translated slugs
UPDATE municipalities SET
  slug_en = CASE slug
    WHEN 'stari-grad' THEN 'old-town'
    WHEN 'vracar' THEN 'vracar'
    WHEN 'savski-venac' THEN 'savski-venac'
    WHEN 'novi-beograd' THEN 'new-belgrade'
    WHEN 'zvezdara' THEN 'zvezdara'
    WHEN 'vozdovac' THEN 'vozdovac'
    WHEN 'zemun' THEN 'zemun'
    WHEN 'palilula' THEN 'palilula'
    WHEN 'cukarica' THEN 'cukarica'
    WHEN 'rakovica' THEN 'rakovica'
    ELSE slug
  END,
  slug_sr = slug,
  slug_sr_cyr = CASE slug
    WHEN 'stari-grad' THEN 'стари-град'
    WHEN 'vracar' THEN 'врачар'
    WHEN 'savski-venac' THEN 'савски-венац'
    WHEN 'novi-beograd' THEN 'нови-београд'
    WHEN 'zvezdara' THEN 'звездара'
    WHEN 'vozdovac' THEN 'вождовац'
    WHEN 'zemun' THEN 'земун'
    WHEN 'palilula' THEN 'палилула'
    WHEN 'cukarica' THEN 'чукарица'
    WHEN 'rakovica' THEN 'раковица'
    ELSE slug
  END;

-- Create indexes for slug columns
CREATE INDEX IF NOT EXISTS idx_cities_slug_en ON cities(slug_en);
CREATE INDEX IF NOT EXISTS idx_cities_slug_sr ON cities(slug_sr);
CREATE INDEX IF NOT EXISTS idx_cities_slug_sr_cyr ON cities(slug_sr_cyr);

CREATE INDEX IF NOT EXISTS idx_municipalities_slug_en ON municipalities(slug_en);
CREATE INDEX IF NOT EXISTS idx_municipalities_slug_sr ON municipalities(slug_sr);
CREATE INDEX IF NOT EXISTS idx_municipalities_slug_sr_cyr ON municipalities(slug_sr_cyr);

CREATE INDEX IF NOT EXISTS idx_projects_slug_en ON projects(slug_en);
CREATE INDEX IF NOT EXISTS idx_projects_slug_sr ON projects(slug_sr);
CREATE INDEX IF NOT EXISTS idx_projects_slug_sr_cyr ON projects(slug_sr_cyr);

CREATE INDEX IF NOT EXISTS idx_developers_slug_en ON developers(slug_en);
CREATE INDEX IF NOT EXISTS idx_developers_slug_sr ON developers(slug_sr);
CREATE INDEX IF NOT EXISTS idx_developers_slug_sr_cyr ON developers(slug_sr_cyr);

-- Update projects and developers slugs (copy main slug to all language versions initially)
UPDATE projects SET slug_en = slug, slug_sr = slug, slug_sr_cyr = slug WHERE slug_en IS NULL;
UPDATE developers SET slug_en = slug, slug_sr = slug, slug_sr_cyr = slug WHERE slug_en IS NULL;