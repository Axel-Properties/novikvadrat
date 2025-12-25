-- Update Role Permissions Migration
-- Adds permissions for new modules: tenants, rentals, payments, expenses, vendors

-- =====================================================
-- UPDATE EXISTING ROLES WITH NEW PERMISSIONS
-- =====================================================

DO $$
DECLARE
  super_admin_perms JSONB;
  admin_perms JSONB;
  editor_perms JSONB;
  viewer_perms JSONB;
  developer_manager_perms JSONB;
  content_manager_perms JSONB;
BEGIN
  -- Super Admin: Full access to everything including new modules
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
    'roles', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
    'tenants', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
    'rentals', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
    'payments', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
    'expenses', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
    'vendors', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
    'expense_categories', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true)
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
    'roles', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
    'tenants', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
    'rentals', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
    'payments', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
    'expenses', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
    'vendors', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
    'expense_categories', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true)
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
    'roles', jsonb_build_object('view', false, 'create', false, 'edit', false, 'delete', false),
    'tenants', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', false),
    'rentals', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', false),
    'payments', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', false),
    'expenses', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', false),
    'vendors', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', false),
    'expense_categories', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false)
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
    'roles', jsonb_build_object('view', false, 'create', false, 'edit', false, 'delete', false),
    'tenants', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
    'rentals', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
    'payments', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
    'expenses', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
    'vendors', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
    'expense_categories', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false)
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
    'roles', jsonb_build_object('view', false, 'create', false, 'edit', false, 'delete', false),
    'tenants', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
    'rentals', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
    'payments', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
    'expenses', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
    'vendors', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
    'expense_categories', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false)
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
    'roles', jsonb_build_object('view', false, 'create', false, 'edit', false, 'delete', false),
    'tenants', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
    'rentals', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
    'payments', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
    'expenses', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
    'vendors', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
    'expense_categories', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false)
  );

  -- Update roles
  UPDATE roles SET permissions = super_admin_perms WHERE name = 'Super Admin';
  UPDATE roles SET permissions = admin_perms WHERE name = 'Admin';
  UPDATE roles SET permissions = editor_perms WHERE name = 'Editor';
  UPDATE roles SET permissions = viewer_perms WHERE name = 'Viewer';
  UPDATE roles SET permissions = developer_manager_perms WHERE name = 'Developer Manager';
  UPDATE roles SET permissions = content_manager_perms WHERE name = 'Content Manager';

  -- Add new Property Manager role for rental management
  INSERT INTO roles (name, description, permissions)
  VALUES (
    'Property Manager',
    'Can manage tenants, rentals, payments, and expenses',
    jsonb_build_object(
      'countries', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
      'cities', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
      'municipalities', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
      'developers', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
      'projects', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
      'images', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
      'layouts', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
      'amenities', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false),
      'users', jsonb_build_object('view', false, 'create', false, 'edit', false, 'delete', false),
      'roles', jsonb_build_object('view', false, 'create', false, 'edit', false, 'delete', false),
      'tenants', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
      'rentals', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
      'payments', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
      'expenses', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', true),
      'vendors', jsonb_build_object('view', true, 'create', true, 'edit', true, 'delete', false),
      'expense_categories', jsonb_build_object('view', true, 'create', false, 'edit', false, 'delete', false)
    )
  )
  ON CONFLICT (name) DO UPDATE SET
    description = EXCLUDED.description,
    permissions = EXCLUDED.permissions;

END $$;
