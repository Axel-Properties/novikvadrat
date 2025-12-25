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
import { Loader2, Phone, Mail, Building2, Star, Check, X } from 'lucide-react'

interface Vendor {
  id: string
  name: string
  company_name: string | null
  vendor_type: string
  email: string | null
  phone: string | null
  website: string | null
  address: string | null
  city: string | null
  country: string
  tax_id: string | null
  bank_account: string | null
  bank_name: string | null
  rating: number | null
  notes: string | null
  is_active: boolean
  is_preferred: boolean
  created_at: string
}

const vendorTypes: Record<string, string> = {
  contractor: 'Contractor',
  service_provider: 'Service Provider',
  supplier: 'Supplier',
  utility_company: 'Utility Company',
  government: 'Government',
  other: 'Other'
}

const emptyVendor = {
  name: '',
  company_name: '',
  vendor_type: 'service_provider',
  email: '',
  phone: '',
  website: '',
  address: '',
  city: '',
  country: 'Serbia',
  tax_id: '',
  bank_account: '',
  bank_name: '',
  rating: '',
  notes: '',
  is_active: true,
  is_preferred: false
}

export default function VendorsPage() {
  const params = useParams()
  const { toast } = useToast()
  const locale = params.locale as string || 'en'
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteVendor, setDeleteVendor] = useState<Vendor | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null)
  const [formData, setFormData] = useState(emptyVendor)
  const [typeFilter, setTypeFilter] = useState<string>('')

  useEffect(() => {
    fetchVendors()
  }, [typeFilter])

  const fetchVendors = async () => {
    try {
      const url = typeFilter
        ? `/api/admin/vendors?vendor_type=${typeFilter}`
        : '/api/admin/vendors'
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setVendors(data)
      }
    } catch (error) {
      console.error('Failed to fetch vendors:', error)
      toast({
        title: 'Error',
        description: 'Failed to load vendors',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenDialog = (vendor?: Vendor) => {
    if (vendor) {
      setEditingVendor(vendor)
      setFormData({
        name: vendor.name,
        company_name: vendor.company_name || '',
        vendor_type: vendor.vendor_type,
        email: vendor.email || '',
        phone: vendor.phone || '',
        website: vendor.website || '',
        address: vendor.address || '',
        city: vendor.city || '',
        country: vendor.country || 'Serbia',
        tax_id: vendor.tax_id || '',
        bank_account: vendor.bank_account || '',
        bank_name: vendor.bank_name || '',
        rating: vendor.rating?.toString() || '',
        notes: vendor.notes || '',
        is_active: vendor.is_active,
        is_preferred: vendor.is_preferred
      })
    } else {
      setEditingVendor(null)
      setFormData(emptyVendor)
    }
    setShowDialog(true)
  }

  const handleSubmit = async () => {
    if (!formData.name) {
      toast({
        title: 'Error',
        description: 'Vendor name is required',
        variant: 'destructive'
      })
      return
    }

    setIsSubmitting(true)
    try {
      const url = editingVendor
        ? `/api/admin/vendors/${editingVendor.id}`
        : '/api/admin/vendors'
      const method = editingVendor ? 'PUT' : 'POST'

      const payload = {
        ...formData,
        rating: formData.rating ? parseInt(formData.rating) : null
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        const savedVendor = await response.json()
        if (editingVendor) {
          setVendors(prev => prev.map(v => v.id === savedVendor.id ? savedVendor : v))
        } else {
          setVendors(prev => [...prev, savedVendor])
        }
        setShowDialog(false)
        toast({
          title: 'Success',
          description: editingVendor ? 'Vendor updated successfully' : 'Vendor created successfully'
        })
      } else {
        const error = await response.json()
        throw new Error(error.message || 'Failed to save vendor')
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save vendor',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteVendor) return

    try {
      const response = await fetch(`/api/admin/vendors/${deleteVendor.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setVendors(prev => prev.filter(v => v.id !== deleteVendor.id))
        toast({
          title: 'Success',
          description: 'Vendor deleted successfully'
        })
      } else {
        const error = await response.json()
        throw new Error(error.message || 'Failed to delete')
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete vendor',
        variant: 'destructive'
      })
    } finally {
      setDeleteVendor(null)
    }
  }

  const columns: Column<Vendor>[] = [
    {
      key: 'name',
      title: 'Vendor',
      render: (vendor) => (
        <div className="flex items-center gap-2">
          {vendor.is_preferred && (
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          )}
          <div>
            <span className="font-medium">{vendor.name}</span>
            {vendor.company_name && (
              <p className="text-sm text-gray-500">{vendor.company_name}</p>
            )}
          </div>
        </div>
      )
    },
    {
      key: 'vendor_type',
      title: 'Type',
      render: (vendor) => (
        <Badge variant="outline">
          {vendorTypes[vendor.vendor_type] || vendor.vendor_type}
        </Badge>
      )
    },
    {
      key: 'contact',
      title: 'Contact',
      render: (vendor) => (
        <div className="space-y-1">
          {vendor.email && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Mail className="h-3 w-3" />
              {vendor.email}
            </div>
          )}
          {vendor.phone && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Phone className="h-3 w-3" />
              {vendor.phone}
            </div>
          )}
        </div>
      )
    },
    {
      key: 'location',
      title: 'Location',
      render: (vendor) => (
        <span className="text-sm text-gray-600">
          {[vendor.city, vendor.country].filter(Boolean).join(', ') || '-'}
        </span>
      )
    },
    {
      key: 'is_active',
      title: 'Status',
      render: (vendor) => (
        vendor.is_active ? (
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
        title="Vendors"
        description="Manage vendors and service providers"
        action={{
          label: 'Add Vendor',
          onClick: () => handleOpenDialog()
        }}
      />

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Types</SelectItem>
            {Object.entries(vendorTypes).map(([key, label]) => (
              <SelectItem key={key} value={key}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <DataTable
        columns={columns}
        data={vendors}
        searchKey="name"
        searchPlaceholder="Search vendors..."
        isLoading={isLoading}
        emptyMessage="No vendors found. Add your first vendor."
        onEdit={(vendor) => handleOpenDialog(vendor)}
        onDelete={(vendor) => setDeleteVendor(vendor)}
      />

      {/* Add/Edit Vendor Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingVendor ? 'Edit Vendor' : 'Add Vendor'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-700">Basic Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Vendor name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company_name">Company Name</Label>
                  <Input
                    id="company_name"
                    value={formData.company_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, company_name: e.target.value }))}
                    placeholder="Company name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vendor_type">Type</Label>
                  <Select
                    value={formData.vendor_type}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, vendor_type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(vendorTypes).map(([key, label]) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax_id">Tax ID</Label>
                  <Input
                    id="tax_id"
                    value={formData.tax_id}
                    onChange={(e) => setFormData(prev => ({ ...prev, tax_id: e.target.value }))}
                    placeholder="Tax ID / PIB"
                  />
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-700">Contact Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="email@example.com"
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
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                  placeholder="https://..."
                />
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
              <div className="grid grid-cols-2 gap-4">
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

            {/* Bank Details */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-700">Bank Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bank_name">Bank Name</Label>
                  <Input
                    id="bank_name"
                    value={formData.bank_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, bank_name: e.target.value }))}
                    placeholder="Bank name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bank_account">Bank Account</Label>
                  <Input
                    id="bank_account"
                    value={formData.bank_account}
                    onChange={(e) => setFormData(prev => ({ ...prev, bank_account: e.target.value }))}
                    placeholder="Account number"
                  />
                </div>
              </div>
            </div>

            {/* Status & Notes */}
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
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                  />
                  <Label htmlFor="is_active">Active</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="is_preferred"
                    checked={formData.is_preferred}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_preferred: checked }))}
                  />
                  <Label htmlFor="is_preferred">Preferred Vendor</Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {editingVendor ? 'Save Changes' : 'Add Vendor'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteVendor} onOpenChange={() => setDeleteVendor(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Vendor</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteVendor?.name}"?
              Vendors with associated expenses cannot be deleted.
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
