-- Optimize pg_timezone_names query by creating a materialized view
-- This is much faster than querying pg_timezone_names directly

-- Create materialized view for timezone names
CREATE MATERIALIZED VIEW IF NOT EXISTS timezone_names_cache AS
SELECT name
FROM pg_timezone_names
ORDER BY name;

-- Create index on the materialized view for faster lookups
CREATE INDEX IF NOT EXISTS idx_timezone_names_cache_name ON timezone_names_cache(name);

-- Create a function to refresh the materialized view
-- This should be run periodically or when timezone data changes
CREATE OR REPLACE FUNCTION refresh_timezone_names_cache()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY timezone_names_cache;
END;
$$;

-- Grant necessary permissions
GRANT SELECT ON timezone_names_cache TO authenticated;
GRANT SELECT ON timezone_names_cache TO anon;

-- Initial refresh
REFRESH MATERIALIZED VIEW timezone_names_cache;

-- Optional: Create a function to get timezone names (with caching logic)
CREATE OR REPLACE FUNCTION get_timezone_names()
RETURNS TABLE(name text)
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
  SELECT tz.name
  FROM timezone_names_cache tz
  ORDER BY tz.name;
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION get_timezone_names() TO authenticated;
GRANT EXECUTE ON FUNCTION get_timezone_names() TO anon;
