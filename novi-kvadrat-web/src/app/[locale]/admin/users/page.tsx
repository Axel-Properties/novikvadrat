'use client'

import { useEffect, useState } from 'react'
import { PageHeader, DataTable, Column } from '@/components/admin'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
import { Loader2, User, Check, X } from 'lucide-react'

interface UserData {
  id: string
  email: string
  full_name: string
  avatar_url: string | null
  role_id: string | null
  role_name?: string
  is_active: boolean
  last_login_at: string | null
  created_at: string
}

interface Role {
  id: string
  name: string
}

const emptyUser = {
  email: '',
  full_name: '',
  avatar_url: '',
  role_id: '',
  is_active: true,
  password: ''
}

export default function UsersPage() {
  const { toast } = useToast()
  const [users, setUsers] = useState<UserData[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteUser, setDeleteUser] = useState<UserData | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [editingUser, setEditingUser] = useState<UserData | null>(null)
  const [formData, setFormData] = useState(emptyUser)

  useEffect(() => {
    fetchUsers()
    fetchRoles()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users')
      if (response.ok) {
        const data = await response.json()
        setUsers(data)
      }
    } catch (error) {
      console.error('Failed to fetch users:', error)
      toast({
        title: 'Error',
        description: 'Failed to load users',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchRoles = async () => {
    try {
      const response = await fetch('/api/admin/roles')
      if (response.ok) {
        const data = await response.json()
        setRoles(data)
      }
    } catch (error) {
      console.error('Failed to fetch roles:', error)
    }
  }

  const handleOpenDialog = (user?: UserData) => {
    if (user) {
      setEditingUser(user)
      setFormData({
        email: user.email,
        full_name: user.full_name,
        avatar_url: user.avatar_url || '',
        role_id: user.role_id || '',
        is_active: user.is_active,
        password: ''
      })
    } else {
      setEditingUser(null)
      setFormData(emptyUser)
    }
    setShowDialog(true)
  }

  const handleSubmit = async () => {
    if (!formData.email || !formData.full_name) {
      toast({
        title: 'Error',
        description: 'Email and full name are required',
        variant: 'destructive'
      })
      return
    }

    if (!editingUser && !formData.password) {
      toast({
        title: 'Error',
        description: 'Password is required for new users',
        variant: 'destructive'
      })
      return
    }

    setIsSubmitting(true)
    try {
      const url = editingUser 
        ? `/api/admin/users/${editingUser.id}`
        : '/api/admin/users'

      const payload: any = {
        email: formData.email,
        full_name: formData.full_name,
        avatar_url: formData.avatar_url || null,
        role_id: formData.role_id || null,
        is_active: formData.is_active
      }

      if (formData.password) {
        payload.password = formData.password
      }

      const response = await fetch(url, {
        method: editingUser ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        const savedUser = await response.json()
        if (editingUser) {
          setUsers(prev => prev.map(u => u.id === savedUser.id ? savedUser : u))
        } else {
          setUsers(prev => [...prev, savedUser])
        }
        setShowDialog(false)
        toast({
          title: 'Success',
          description: `User ${editingUser ? 'updated' : 'created'} successfully`
        })
      } else {
        const error = await response.json()
        throw new Error(error.message || 'Failed to save user')
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save user',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteUser) return

    try {
      const response = await fetch(`/api/admin/users/${deleteUser.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setUsers(prev => prev.filter(u => u.id !== deleteUser.id))
        toast({
          title: 'Success',
          description: 'User deleted successfully'
        })
      } else {
        throw new Error('Failed to delete')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete user',
        variant: 'destructive'
      })
    } finally {
      setDeleteUser(null)
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const columns: Column<UserData>[] = [
    {
      key: 'avatar',
      title: '',
      className: 'w-[60px]',
      render: (user) => (
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.avatar_url || ''} alt={user.full_name} />
          <AvatarFallback>
            <User className="h-5 w-5 text-gray-400" />
          </AvatarFallback>
        </Avatar>
      )
    },
    {
      key: 'full_name',
      title: 'Name',
      render: (user) => (
        <div>
          <span className="font-medium">{user.full_name}</span>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      )
    },
    {
      key: 'role_name',
      title: 'Role',
      render: (user) => (
        <Badge variant="outline">
          {user.role_name || 'No Role'}
        </Badge>
      )
    },
    {
      key: 'is_active',
      title: 'Status',
      render: (user) => (
        user.is_active ? (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <Check className="h-3 w-3 mr-1" />
            Active
          </Badge>
        ) : (
          <Badge variant="secondary">
            <X className="h-3 w-3 mr-1" />
            Inactive
          </Badge>
        )
      )
    },
    {
      key: 'last_login_at',
      title: 'Last Login',
      render: (user) => (
        <span className="text-sm text-gray-500">
          {formatDate(user.last_login_at)}
        </span>
      )
    }
  ]

  return (
    <>
      <PageHeader
        title="Users"
        description="Manage admin and portal users"
        action={{
          label: 'Add User',
          onClick: () => handleOpenDialog()
        }}
      />

      <DataTable
        columns={columns}
        data={users}
        searchKey="full_name"
        searchPlaceholder="Search users..."
        isLoading={isLoading}
        emptyMessage="No users found. Add your first user."
        onEdit={(user) => handleOpenDialog(user)}
        onDelete={(user) => setDeleteUser(user)}
      />

      {/* User Form Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingUser ? 'Edit User' : 'Add User'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="user@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name *</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">
                Password {editingUser ? '(leave empty to keep current)' : '*'}
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                placeholder={editingUser ? '••••••••' : 'Enter password'}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role_id">Role</Label>
              <Select 
                value={formData.role_id} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, role_id: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="avatar_url">Avatar URL</Label>
              <Input
                id="avatar_url"
                type="url"
                value={formData.avatar_url}
                onChange={(e) => setFormData(prev => ({ ...prev, avatar_url: e.target.value }))}
                placeholder="https://..."
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
              />
              <Label htmlFor="is_active">Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {editingUser ? 'Save Changes' : 'Add User'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteUser} onOpenChange={() => setDeleteUser(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteUser?.full_name}"? 
              This action cannot be undone.
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
