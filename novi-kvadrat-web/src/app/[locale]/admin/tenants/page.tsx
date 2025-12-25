'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { PageHeader, DataTable, Column } from '@/components/admin'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
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
import { Loader2, User, Check, X, Phone, Mail } from 'lucide-react'

interface Tenant {
  id: string
  first_name: string
  last_name: string
  full_name: string
  email: string | null
  phone: string | null
  phone_secondary: string | null
  id_number: string | null
  id_type: string
  address: string | null
  city: string | null
  postal_code: string | null
  country: string
  emergency_contact_name: string | null
  emergency_contact_phone: string | null
  emergency_contact_relation: string | null
  notes: string | null
  is_active: boolean
  created_at: string
}

const emptyTenant = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  phone_secondary: '',
  id_number: '',
  id_type: 'personal_id',
  address: '',
  city: '',
  postal_code: '',
  country: 'Serbia',
  emergency_contact_name: '',
  emergency_contact_phone: '',
  emergency_contact_relation: '',
  notes: '',
  is_active: true
}

export default function TenantsPage() {
  const params = useParams()
  const { toast } = useToast()
  const locale = params.locale as string || 'en'
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteTenant, setDeleteTenant] = useState<Tenant | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [editingTenant, setEditingTenant] = useState<Tenant | null>(null)
  const [formData, setFormData] = useState(emptyTenant)

  useEffect(() => {
    fetchTenants()
  }, [])

  const fetchTenants = async () => {
    try {
      const response = await fetch('/api/admin/tenants')
      if (response.ok) {
        const data = await response.json()
        setTenants(data)
      }
    } catch (error) {
      console.error('Failed to fetch tenants:', error)
      toast({
        title: 'Error',
        description: 'Failed to load tenants',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenDialog = (tenant?: Tenant) => {
    if (tenant) {
      setEditingTenant(tenant)
      setFormData({
        first_name: tenant.first_name,
        last_name: tenant.last_name,
        email: tenant.email || '',
        phone: tenant.phone || '',
        phone_secondary: tenant.phone_secondary || '',
        id_number: tenant.id_number || '',
        id_type: tenant.id_type || 'personal_id',
        address: tenant.address || '',
        city: tenant.city || '',
        postal_code: tenant.postal_code || '',
        country: tenant.country || 'Serbia',
        emergency_contact_name: tenant.emergency_contact_name || '',
        emergency_contact_phone: tenant.emergency_contact_phone || '',
        emergency_contact_relation: tenant.emergency_contact_relation || '',
        notes: tenant.notes || '',
        is_active: tenant.is_active
      })
    } else {
      setEditingTenant(null)
      setFormData(emptyTenant)
    }
    setShowDialog(true)
  }

  const handleSubmit = async () => {
    if (!formData.first_name || !formData.last_name) {
      toast({
        title: 'Error',
        description: 'First name and last name are required',
        variant: 'destructive'
      })
      return
    }

    setIsSubmitting(true)
    try {
      const url = editingTenant
        ? `/api/admin/tenants/${editingTenant.id}`
        : '/api/admin/tenants'
      const method = editingTenant ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const savedTenant = await response.json()
        if (editingTenant) {
          setTenants(prev => prev.map(t => t.id === savedTenant.id ? savedTenant : t))
        } else {
          setTenants(prev => [...prev, savedTenant])
        }
        setShowDialog(false)
        toast({
          title: 'Success',
          description: editingTenant ? 'Tenant updated successfully' : 'Tenant created successfully'
        })
      } else {
        const error = await response.json()
        throw new Error(error.message || 'Failed to save tenant')
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save tenant',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTenant) return

    try {
      const response = await fetch(`/api/admin/tenants/${deleteTenant.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setTenants(prev => prev.filter(t => t.id !== deleteTenant.id))
        toast({
          title: 'Success',
          description: 'Tenant deleted successfully'
        })
      } else {
        const error = await response.json()
        throw new Error(error.message || 'Failed to delete')
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete tenant',
        variant: 'destructive'
      })
    } finally {
      setDeleteTenant(null)
    }
  }

  const columns: Column<Tenant>[] = [
    {
      key: 'full_name',
      title: 'Name',
      render: (tenant) => (
        <div>
          <span className="font-medium">{tenant.full_name}</span>
          {tenant.id_number && (
            <p className="text-sm text-gray-500">ID: {tenant.id_number}</p>
          )}
        </div>
      )
    },
    {
      key: 'contact',
      title: 'Contact',
      render: (tenant) => (
        <div className="space-y-1">
          {tenant.email && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Mail className="h-3 w-3" />
              {tenant.email}
            </div>
          )}
          {tenant.phone && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Phone className="h-3 w-3" />
              {tenant.phone}
            </div>
          )}
        </div>
      )
    },
    {
      key: 'address',
      title: 'Location',
      render: (tenant) => (
        <span className="text-sm text-gray-600">
          {[tenant.city, tenant.country].filter(Boolean).join(', ') || '-'}
        </span>
      )
    },
    {
      key: 'is_active',
      title: 'Status',
      render: (tenant) => (
        tenant.is_active ? (
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
    }
  ]

  return (
    <>
      <PageHeader
        title="Tenants"
        description="Manage tenant information and records"
        action={{
          label: 'Add Tenant',
          onClick: () => handleOpenDialog()
        }}
      />

      <DataTable
        columns={columns}
        data={tenants}
        searchKey="full_name"
        searchPlaceholder="Search tenants..."
        isLoading={isLoading}
        emptyMessage="No tenants found. Add your first tenant."
        onEdit={(tenant) => handleOpenDialog(tenant)}
        onDelete={(tenant) => setDeleteTenant(tenant)}
      />

      {/* Add/Edit Tenant Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingTenant ? 'Edit Tenant' : 'Add Tenant'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-700">Basic Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name *</Label>
                  <Input
                    id="first_name"
                    value={formData.first_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name *</Label>
                  <Input
                    id="last_name"
                    value={formData.last_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+381 ..."
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="id_type">ID Type</Label>
                  <Select
                    value={formData.id_type}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, id_type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select ID type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="personal_id">Personal ID</SelectItem>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="drivers_license">Driver's License</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="id_number">ID Number</Label>
                  <Input
                    id="id_number"
                    value={formData.id_number}
                    onChange={(e) => setFormData(prev => ({ ...prev, id_number: e.target.value }))}
                    placeholder="ID number"
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-700">Address</h3>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Street address"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="City"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postal_code">Postal Code</Label>
                  <Input
                    id="postal_code"
                    value={formData.postal_code}
                    onChange={(e) => setFormData(prev => ({ ...prev, postal_code: e.target.value }))}
                    placeholder="Postal code"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                    placeholder="Country"
                  />
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-700">Emergency Contact</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergency_contact_name">Name</Label>
                  <Input
                    id="emergency_contact_name"
                    value={formData.emergency_contact_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, emergency_contact_name: e.target.value }))}
                    placeholder="Contact name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergency_contact_phone">Phone</Label>
                  <Input
                    id="emergency_contact_phone"
                    value={formData.emergency_contact_phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, emergency_contact_phone: e.target.value }))}
                    placeholder="Contact phone"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergency_contact_relation">Relation</Label>
                  <Input
                    id="emergency_contact_relation"
                    value={formData.emergency_contact_relation}
                    onChange={(e) => setFormData(prev => ({ ...prev, emergency_contact_relation: e.target.value }))}
                    placeholder="e.g. Spouse, Parent"
                  />
                </div>
              </div>
            </div>

            {/* Notes & Status */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Additional notes..."
                  rows={3}
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {editingTenant ? 'Save Changes' : 'Add Tenant'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteTenant} onOpenChange={() => setDeleteTenant(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Tenant</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteTenant?.full_name}"?
              This action cannot be undone. Note: Tenants with active contracts cannot be deleted.
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
