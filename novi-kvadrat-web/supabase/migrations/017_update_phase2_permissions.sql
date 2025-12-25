-- Phase 2 Permissions Update
-- Updates existing roles with Sales, Inquiries, Buyers, and Agents permissions

-- =====================================================
-- Update Admin role with Phase 2 permissions
-- =====================================================

UPDATE roles
SET permissions = jsonb_set(
  permissions,
  '{modules}',
  permissions->'modules' || '{
    "buyers": {"view": true, "create": true, "edit": true, "delete": true},
    "sales": {"view": true, "create": true, "edit": true, "delete": true},
    "inquiries": {"view": true, "create": true, "edit": true, "delete": true},
    "agents": {"view": true, "create": true, "edit": true, "delete": true}
  }'::jsonb
)
WHERE name = 'Admin';

-- =====================================================
-- Update Editor role with Phase 2 permissions
-- =====================================================

UPDATE roles
SET permissions = jsonb_set(
  permissions,
  '{modules}',
  permissions->'modules' || '{
    "buyers": {"view": true, "create": true, "edit": true, "delete": false},
    "sales": {"view": true, "create": true, "edit": true, "delete": false},
    "inquiries": {"view": true, "create": true, "edit": true, "delete": false},
    "agents": {"view": true, "create": false, "edit": false, "delete": false}
  }'::jsonb
)
WHERE name = 'Editor';

-- =====================================================
-- Update Viewer role with Phase 2 permissions
-- =====================================================

UPDATE roles
SET permissions = jsonb_set(
  permissions,
  '{modules}',
  permissions->'modules' || '{
    "buyers": {"view": true, "create": false, "edit": false, "delete": false},
    "sales": {"view": true, "create": false, "edit": false, "delete": false},
    "inquiries": {"view": true, "create": false, "edit": false, "delete": false},
    "agents": {"view": true, "create": false, "edit": false, "delete": false}
  }'::jsonb
)
WHERE name = 'Viewer';

-- =====================================================
-- Update Property Manager role with Phase 2 permissions
-- =====================================================

UPDATE roles
SET permissions = jsonb_set(
  permissions,
  '{modules}',
  permissions->'modules' || '{
    "buyers": {"view": true, "create": true, "edit": true, "delete": false},
    "sales": {"view": true, "create": true, "edit": true, "delete": false},
    "inquiries": {"view": true, "create": true, "edit": true, "delete": true},
    "agents": {"view": true, "create": false, "edit": false, "delete": false}
  }'::jsonb
)
WHERE name = 'Property Manager';

-- =====================================================
-- Create Sales Manager role
-- =====================================================

INSERT INTO roles (name, description, permissions, is_system)
VALUES (
  'Sales Manager',
  'Manages sales operations, buyers, and agents',
  '{
    "modules": {
      "dashboard": {"view": true},
      "projects": {"view": true, "create": false, "edit": false, "delete": false},
      "developers": {"view": true, "create": false, "edit": false, "delete": false},
      "countries": {"view": true, "create": false, "edit": false, "delete": false},
      "cities": {"view": true, "create": false, "edit": false, "delete": false},
      "municipalities": {"view": true, "create": false, "edit": false, "delete": false},
      "amenities": {"view": true, "create": false, "edit": false, "delete": false},
      "building_types": {"view": true, "create": false, "edit": false, "delete": false},
      "import": {"view": false, "create": false, "edit": false, "delete": false},
      "users": {"view": false, "create": false, "edit": false, "delete": false},
      "roles": {"view": false, "create": false, "edit": false, "delete": false},
      "tenants": {"view": true, "create": false, "edit": false, "delete": false},
      "rentals": {"view": true, "create": false, "edit": false, "delete": false},
      "payments": {"view": true, "create": false, "edit": false, "delete": false},
      "expense_categories": {"view": true, "create": false, "edit": false, "delete": false},
      "expenses": {"view": true, "create": false, "edit": false, "delete": false},
      "vendors": {"view": true, "create": false, "edit": false, "delete": false},
      "buyers": {"view": true, "create": true, "edit": true, "delete": true},
      "sales": {"view": true, "create": true, "edit": true, "delete": true},
      "inquiries": {"view": true, "create": true, "edit": true, "delete": true},
      "agents": {"view": true, "create": true, "edit": true, "delete": false}
    }
  }'::jsonb,
  false
)
ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  permissions = EXCLUDED.permissions;

-- =====================================================
-- Create Agent role (for agents themselves)
-- =====================================================

INSERT INTO roles (name, description, permissions, is_system)
VALUES (
  'Agent',
  'Real estate agent with access to assigned buyers and inquiries',
  '{
    "modules": {
      "dashboard": {"view": true},
      "projects": {"view": true, "create": false, "edit": false, "delete": false},
      "developers": {"view": false, "create": false, "edit": false, "delete": false},
      "countries": {"view": false, "create": false, "edit": false, "delete": false},
      "cities": {"view": false, "create": false, "edit": false, "delete": false},
      "municipalities": {"view": false, "create": false, "edit": false, "delete": false},
      "amenities": {"view": false, "create": false, "edit": false, "delete": false},
      "building_types": {"view": false, "create": false, "edit": false, "delete": false},
      "import": {"view": false, "create": false, "edit": false, "delete": false},
      "users": {"view": false, "create": false, "edit": false, "delete": false},
      "roles": {"view": false, "create": false, "edit": false, "delete": false},
      "tenants": {"view": false, "create": false, "edit": false, "delete": false},
      "rentals": {"view": false, "create": false, "edit": false, "delete": false},
      "payments": {"view": false, "create": false, "edit": false, "delete": false},
      "expense_categories": {"view": false, "create": false, "edit": false, "delete": false},
      "expenses": {"view": false, "create": false, "edit": false, "delete": false},
      "vendors": {"view": false, "create": false, "edit": false, "delete": false},
      "buyers": {"view": true, "create": true, "edit": true, "delete": false},
      "sales": {"view": true, "create": true, "edit": true, "delete": false},
      "inquiries": {"view": true, "create": true, "edit": true, "delete": false},
      "agents": {"view": false, "create": false, "edit": false, "delete": false}
    }
  }'::jsonb,
  false
)
ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  permissions = EXCLUDED.permissions;
