'use client'

import { useEffect, useState } from 'react'
import { PageHeader, DataTable, Column } from '@/components/admin'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'
import { Loader2 } from 'lucide-react'

interface Permission {
  view: boolean
  create: boolean
  edit: boolean
  delete: boolean
}

interface Permissions {
  countries: Permission
  cities: Permission
  municipalities: Permission
  developers: Permission
  projects: Permission
  images: Permission
  layouts: Permission
  amenities: Permission
  users: Permission
  roles: Permission
}

interface Role {
  id: string
  name: string
  description: string | null
  permissions: Permissions
  users_count?: number
  created_at: string
}

const defaultPermissions: Permissions = {
  countries: { view: false, create: false, edit: false, delete: false },
  cities: { view: false, create: false, edit: false, delete: false },
  municipalities: { view: false, create: false, edit: false, delete: false },
  developers: { view: false, create: false, edit: false, delete: false },
  projects: { view: false, create: false, edit: false, delete: false },
  images: { view: false, create: false, edit: false, delete: false },
  layouts: { view: false, create: false, edit: false, delete: false },
  amenities: { view: false, create: false, edit: false, delete: false },
  users: { view: false, create: false, edit: false, delete: false },
  roles: { view: false, create: false, edit: false, delete: false }
}

const modules = [
  'countries', 'cities', 'municipalities', 'developers', 'projects',
  'images', 'layouts', 'amenities', 'users', 'roles'
]

const emptyRole = {
  name: '',
  description: '',
  permissions: defaultPermissions
}

export default function RolesPage() {
  const { toast } = useToast()
  const [roles, setRoles] = useState<Role[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteRole, setDeleteRole] = useState<Role | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>(null)
  const [formData, setFormData] = useState(emptyRole)

  useEffect(() => {
    fetchRoles()
  }, [])

  const fetchRoles = async () => {
    try {
      const response = await fetch('/api/admin/roles')
      if (response.ok) {
        const data = await response.json()
        setRoles(data)
      }
    } catch (error) {
      console.error('Failed to fetch roles:', error)
      toast({
        title: 'Error',
        description: 'Failed to load roles',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenDialog = (role?: Role) => {
    if (role) {
      setEditingRole(role)
      setFormData({
        name: role.name,
        description: role.description || '',
        permissions: role.permissions || defaultPermissions
      })
    } else {
      setEditingRole(null)
      setFormData(emptyRole)
    }
    setShowDialog(true)
  }

  const handlePermissionChange = (module: string, action: keyof Permission, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [module]: {
          ...prev.permissions[module as keyof Permissions],
          [action]: checked
        }
      }
    }))
  }

  const handleSubmit = async () => {
    if (!formData.name) {
      toast({
        title: 'Error',
        description: 'Role name is required',
        variant: 'destructive'
      })
      return
    }

    setIsSubmitting(true)
    try {
      const url = editingRole 
        ? `/api/admin/roles/${editingRole.id}`
        : '/api/admin/roles'

      const response = await fetch(url, {
        method: editingRole ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const savedRole = await response.json()
        if (editingRole) {
          setRoles(prev => prev.map(r => r.id === savedRole.id ? savedRole : r))
        } else {
          setRoles(prev => [...prev, savedRole])
        }
        setShowDialog(false)
        toast({
          title: 'Success',
          description: `Role ${editingRole ? 'updated' : 'created'} successfully`
        })
      } else {
        const error = await response.json()
        throw new Error(error.message || 'Failed to save role')
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save role',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteRole) return

    try {
      const response = await fetch(`/api/admin/roles/${deleteRole.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setRoles(prev => prev.filter(r => r.id !== deleteRole.id))
        toast({
          title: 'Success',
          description: 'Role deleted successfully'
        })
      } else {
        throw new Error('Failed to delete')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete role',
        variant: 'destructive'
      })
    } finally {
      setDeleteRole(null)
    }
  }

  const countPermissions = (permissions: Permissions) => {
    let count = 0
    Object.values(permissions).forEach(module => {
      Object.values(module).forEach(perm => {
        if (perm) count++
      })
    })
    return count
  }

  const columns: Column<Role>[] = [
    {
      key: 'name',
      title: 'Name',
      render: (role) => <span className="font-medium">{role.name}</span>
    },
    {
      key: 'description',
      title: 'Description',
      render: (role) => (
        <span className="text-gray-500">{role.description || '-'}</span>
      )
    },
    {
      key: 'permissions',
      title: 'Permissions',
      render: (role) => (
        <Badge variant="secondary">
          {countPermissions(role.permissions)} permissions
        </Badge>
      )
    },
    {
      key: 'users_count',
      title: 'Users',
      render: (role) => (
        <span className="text-gray-500">{role.users_count || 0} users</span>
      )
    }
  ]

  return (
    <>
      <PageHeader
        title="Roles"
        description="Manage user roles and permissions"
        action={{
          label: 'Add Role',
          onClick: () => handleOpenDialog()
        }}
      />

      <DataTable
        columns={columns}
        data={roles}
        searchKey="name"
        searchPlaceholder="Search roles..."
        isLoading={isLoading}
        emptyMessage="No roles found. Add your first role."
        onEdit={(role) => handleOpenDialog(role)}
        onDelete={(role) => setDeleteRole(role)}
      />

      {/* Role Form Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingRole ? 'Edit Role' : 'Add Role'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Role Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Editor"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Role description"
                />
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Permissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-3 font-medium">Module</th>
                        <th className="text-center py-2 px-3 font-medium">View</th>
                        <th className="text-center py-2 px-3 font-medium">Create</th>
                        <th className="text-center py-2 px-3 font-medium">Edit</th>
                        <th className="text-center py-2 px-3 font-medium">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {modules.map((module) => (
                        <tr key={module} className="border-b">
                          <td className="py-2 px-3 capitalize">{module}</td>
                          {(['view', 'create', 'edit', 'delete'] as const).map((action) => (
                            <td key={action} className="text-center py-2 px-3">
                              <Checkbox
                                checked={formData.permissions[module as keyof Permissions]?.[action] || false}
                                onCheckedChange={(checked) => 
                                  handlePermissionChange(module, action, checked as boolean)
                                }
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {editingRole ? 'Save Changes' : 'Add Role'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteRole} onOpenChange={() => setDeleteRole(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Role</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteRole?.name}"? 
              Users with this role will lose their permissions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Toaster />
    </>
  )
}
