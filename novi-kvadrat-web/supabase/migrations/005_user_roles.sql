-- User Roles and Permissions Migration
-- Creates roles and users tables and seeds generic roles

-- =====================================================
-- ROLES TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  permissions JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_roles_name ON roles(name);

-- =====================================================
-- USERS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255), -- In production, use Supabase Auth
  avatar_url VARCHAR(500),
  role_id UUID REFERENCES roles(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role_id);

-- =====================================================
-- GENERIC ROLES WITH PERMISSIONS
-- =====================================================

-- Helper function to create permission object
DO $$
DECLARE
  super_admin_perms JSONB;
  admin_perms JSONB;
  editor_perms JSONB;
  viewer_perms JSONB;
  developer_manager_perms JSONB;
  content_manager_perms JSONB;
BEGIN
  -- Super Admin: Full access to everything
  super_admin_perms := jsonb_build_object(
    'countries', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
    'cities', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
    'municipalities', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
    'developers', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
    'projects', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
    'images', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
    'layouts', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
    'amenities', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
    'users', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
    'roles', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true)
  );

  -- Admin: Full access except user/role management
  admin_perms := jsonb_build_object(
    'countries', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
    'cities', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
    'municipalities', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
    'developers', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
    'projects', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
    'images', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
    'layouts', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
    'amenities', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
    'users', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
    'roles', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false)
  );

  -- Editor: Can view and edit content but not delete
  editor_perms := jsonb_build_object(
    'countries', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', false),
    'cities', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', false),
    'municipalities', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', false),
    'developers', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', false),
    'projects', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', false),
    'images', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', false),
    'layouts', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', false),
    'amenities', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', false),
    'users', jsonb_build_object('view', false, 'create', false, 'edit', false, 'delete', false),
    'roles', jsonb_build_object('view', false, 'create', false, 'edit', false, 'delete', false)
  );

  -- Viewer: Read-only access
  viewer_perms := jsonb_build_object(
    'countries', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
    'cities', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
    'municipalities', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
    'developers', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
    'projects', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
    'images', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
    'layouts', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
    'amenities', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
    'users', jsonb_build_object('view', false, 'create', false, 'edit', false, 'delete', false),
    'roles', jsonb_build_object('view', false, 'create', false, 'edit', false, 'delete', false)
  );

  -- Developer Manager: Can manage developers and projects
  developer_manager_perms := jsonb_build_object(
    'countries', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
    'cities', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
    'municipalities', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
    'developers', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
    'projects', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
    'images', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
    'layouts', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
    'amenities', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
    'users', jsonb_build_object('view', false, 'create', false, 'edit', false, 'delete', false),
    'roles', jsonb_build_object('view', false, 'create', false, 'edit', false, 'delete', false)
  );

  -- Content Manager: Can manage projects, images, layouts, amenities
  content_manager_perms := jsonb_build_object(
    'countries', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
    'cities', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
    'municipalities', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
    'developers', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
    'projects', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', false),
    'images', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
    'layouts', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
    'amenities', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
    'users', jsonb_build_object('view', false, 'create', false, 'edit', false, 'delete', false),
    'roles', jsonb_build_object('view', false, 'create', false, 'edit', false, 'delete', false)
  );

  -- Insert roles (only if they don't exist)
  INSERT INTO roles (name, description, permissions)
  VALUES
    ('Super Admin', 'Full access to all features and settings', super_admin_perms),
    ('Admin', 'Full access except user and role management', admin_perms),
    ('Editor', 'Can view and edit content but cannot delete', editor_perms),
    ('Viewer', 'Read-only access to all content', viewer_perms),
    ('Developer Manager', 'Can manage developers and projects', developer_manager_perms),
    ('Content Manager', 'Can manage projects, images, layouts, and amenities', content_manager_perms)
  ON CONFLICT (name) DO NOTHING;

END $$;

