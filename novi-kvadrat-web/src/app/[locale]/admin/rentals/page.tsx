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
import { Loader2, Calendar, Euro, Home } from 'lucide-react'

interface RentalContract {
  id: string
  contract_number: string
  tenant_id: string
  tenant_name: string | null
  tenant: { id: string; first_name: string; last_name: string; email: string; phone: string } | null
  unit_id: string | null
  unit_number: string | null
  project_id: string | null
  project_name: string | null
  building_id: string | null
  building_name: string | null
  rent_amount: number
  currency: string
  deposit_amount: number
  deposit_paid: boolean
  start_date: string
  end_date: string | null
  is_indefinite: boolean
  payment_frequency: string
  status: string
  created_at: string
}

interface Tenant {
  id: string
  first_name: string
  last_name: string
}

interface Unit {
  id: string
  unit_number: string
  project_id: string
  building_id: string
}

interface Project {
  id: string
  name: string
}

const emptyContract = {
  tenant_id: '',
  unit_id: '',
  project_id: '',
  building_id: '',
  rent_amount: '',
  currency: 'EUR',
  deposit_amount: '',
  deposit_paid: false,
  start_date: '',
  end_date: '',
  is_indefinite: false,
  payment_frequency: 'monthly',
  payment_due_day: '1',
  utilities_included: false,
  utilities_amount: '',
  parking_included: false,
  parking_amount: '',
  other_fees: '',
  other_fees_description: '',
  status: 'active',
  notes: '',
  auto_renew: false
}

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-800',
  active: 'bg-green-100 text-green-800',
  expired: 'bg-yellow-100 text-yellow-800',
  terminated: 'bg-red-100 text-red-800',
  renewed: 'bg-blue-100 text-blue-800'
}

export default function RentalsPage() {
  const params = useParams()
  const { toast } = useToast()
  const locale = params.locale as string || 'en'
  const [contracts, setContracts] = useState<RentalContract[]>([])
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteContract, setDeleteContract] = useState<RentalContract | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [editingContract, setEditingContract] = useState<RentalContract | null>(null)
  const [formData, setFormData] = useState(emptyContract)
  const [statusFilter, setStatusFilter] = useState<string>('')

  useEffect(() => {
    fetchContracts()
    fetchTenants()
    fetchProjects()
  }, [statusFilter])

  const fetchContracts = async () => {
    try {
      const url = statusFilter
        ? `/api/admin/rentals?status=${statusFilter}`
        : '/api/admin/rentals'
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setContracts(data)
      }
    } catch (error) {
      console.error('Failed to fetch contracts:', error)
      toast({
        title: 'Error',
        description: 'Failed to load rental contracts',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchTenants = async () => {
    try {
      const response = await fetch('/api/admin/tenants?is_active=true')
      if (response.ok) {
        const data = await response.json()
        setTenants(data)
      }
    } catch (error) {
      console.error('Failed to fetch tenants:', error)
    }
  }

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/admin/projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    }
  }

  const handleOpenDialog = (contract?: RentalContract) => {
    if (contract) {
      setEditingContract(contract)
      setFormData({
        tenant_id: contract.tenant_id,
        unit_id: contract.unit_id || '',
        project_id: contract.project_id || '',
        building_id: contract.building_id || '',
        rent_amount: contract.rent_amount.toString(),
        currency: contract.currency,
        deposit_amount: contract.deposit_amount.toString(),
        deposit_paid: contract.deposit_paid,
        start_date: contract.start_date,
        end_date: contract.end_date || '',
        is_indefinite: contract.is_indefinite,
        payment_frequency: contract.payment_frequency,
        payment_due_day: '1',
        utilities_included: false,
        utilities_amount: '',
        parking_included: false,
        parking_amount: '',
        other_fees: '',
        other_fees_description: '',
        status: contract.status,
        notes: '',
        auto_renew: false
      })
    } else {
      setEditingContract(null)
      setFormData(emptyContract)
    }
    setShowDialog(true)
  }

  const handleSubmit = async () => {
    if (!formData.tenant_id || !formData.rent_amount || !formData.start_date) {
      toast({
        title: 'Error',
        description: 'Tenant, rent amount, and start date are required',
        variant: 'destructive'
      })
      return
    }

    setIsSubmitting(true)
    try {
      const url = editingContract
        ? `/api/admin/rentals/${editingContract.id}`
        : '/api/admin/rentals'
      const method = editingContract ? 'PUT' : 'POST'

      const payload = {
        ...formData,
        rent_amount: parseFloat(formData.rent_amount),
        deposit_amount: formData.deposit_amount ? parseFloat(formData.deposit_amount) : 0,
        utilities_amount: formData.utilities_amount ? parseFloat(formData.utilities_amount) : 0,
        parking_amount: formData.parking_amount ? parseFloat(formData.parking_amount) : 0,
        other_fees: formData.other_fees ? parseFloat(formData.other_fees) : 0,
        payment_due_day: parseInt(formData.payment_due_day),
        unit_id: formData.unit_id || null,
        project_id: formData.project_id || null,
        building_id: formData.building_id || null,
        end_date: formData.end_date || null
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        const savedContract = await response.json()
        if (editingContract) {
          setContracts(prev => prev.map(c => c.id === savedContract.id ? savedContract : c))
        } else {
          setContracts(prev => [savedContract, ...prev])
        }
        setShowDialog(false)
        toast({
          title: 'Success',
          description: editingContract ? 'Contract updated successfully' : 'Contract created successfully'
        })
      } else {
        const error = await response.json()
        throw new Error(error.message || 'Failed to save contract')
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save contract',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteContract) return

    try {
      const response = await fetch(`/api/admin/rentals/${deleteContract.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setContracts(prev => prev.filter(c => c.id !== deleteContract.id))
        toast({
          title: 'Success',
          description: 'Contract deleted successfully'
        })
      } else {
        throw new Error('Failed to delete')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete contract',
        variant: 'destructive'
      })
    } finally {
      setDeleteContract(null)
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatCurrency = (amount: number, currency: string = 'EUR') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(amount)
  }

  const columns: Column<RentalContract>[] = [
    {
      key: 'contract_number',
      title: 'Contract',
      render: (contract) => (
        <div>
          <span className="font-medium">{contract.contract_number}</span>
          <p className="text-sm text-gray-500">{contract.tenant_name}</p>
        </div>
      )
    },
    {
      key: 'property',
      title: 'Property',
      render: (contract) => (
        <div className="flex items-center gap-2">
          <Home className="h-4 w-4 text-gray-400" />
          <div>
            <span className="text-sm">{contract.unit_number || '-'}</span>
            {contract.project_name && (
              <p className="text-xs text-gray-500">{contract.project_name}</p>
            )}
          </div>
        </div>
      )
    },
    {
      key: 'rent_amount',
      title: 'Rent',
      render: (contract) => (
        <div className="flex items-center gap-1">
          <Euro className="h-4 w-4 text-gray-400" />
          <span className="font-medium">{formatCurrency(contract.rent_amount, contract.currency)}</span>
          <span className="text-xs text-gray-500">/{contract.payment_frequency}</span>
        </div>
      )
    },
    {
      key: 'period',
      title: 'Period',
      render: (contract) => (
        <div className="flex items-center gap-1 text-sm">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span>{formatDate(contract.start_date)}</span>
          <span className="text-gray-400">-</span>
          <span>{contract.is_indefinite ? 'Indefinite' : (contract.end_date ? formatDate(contract.end_date) : '-')}</span>
        </div>
      )
    },
    {
      key: 'status',
      title: 'Status',
      render: (contract) => (
        <Badge className={statusColors[contract.status] || 'bg-gray-100 text-gray-800'}>
          {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
        </Badge>
      )
    }
  ]

  return (
    <>
      <PageHeader
        title="Rental Contracts"
        description="Manage rental agreements and leases"
        action={{
          label: 'Add Contract',
          onClick: () => handleOpenDialog()
        }}
      />

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
            <SelectItem value="terminated">Terminated</SelectItem>
            <SelectItem value="renewed">Renewed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable
        columns={columns}
        data={contracts}
        searchKey="contract_number"
        searchPlaceholder="Search contracts..."
        isLoading={isLoading}
        emptyMessage="No rental contracts found. Create your first contract."
        onEdit={(contract) => handleOpenDialog(contract)}
        onDelete={(contract) => setDeleteContract(contract)}
      />

      {/* Add/Edit Contract Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingContract ? 'Edit Contract' : 'New Rental Contract'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Tenant Selection */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-700">Tenant & Property</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tenant_id">Tenant *</Label>
                  <Select
                    value={formData.tenant_id}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, tenant_id: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select tenant" />
                    </SelectTrigger>
                    <SelectContent>
                      {tenants.map((tenant) => (
                        <SelectItem key={tenant.id} value={tenant.id}>
                          {tenant.first_name} {tenant.last_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project_id">Project</Label>
                  <Select
                    value={formData.project_id}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, project_id: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Rent Details */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-700">Rent Details</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rent_amount">Rent Amount *</Label>
                  <Input
                    id="rent_amount"
                    type="number"
                    value={formData.rent_amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, rent_amount: e.target.value }))}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={formData.currency}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="RSD">RSD</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payment_frequency">Payment Frequency</Label>
                  <Select
                    value={formData.payment_frequency}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, payment_frequency: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="deposit_amount">Deposit Amount</Label>
                  <Input
                    id="deposit_amount"
                    type="number"
                    value={formData.deposit_amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, deposit_amount: e.target.value }))}
                    placeholder="0.00"
                  />
                </div>
                <div className="flex items-center gap-2 pt-8">
                  <Switch
                    id="deposit_paid"
                    checked={formData.deposit_paid}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, deposit_paid: checked }))}
                  />
                  <Label htmlFor="deposit_paid">Deposit Paid</Label>
                </div>
              </div>
            </div>

            {/* Contract Period */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-700">Contract Period</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start_date">Start Date *</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end_date">End Date</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                    disabled={formData.is_indefinite}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="is_indefinite"
                  checked={formData.is_indefinite}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_indefinite: checked, end_date: checked ? '' : prev.end_date }))}
                />
                <Label htmlFor="is_indefinite">Indefinite term contract</Label>
              </div>
            </div>

            {/* Status */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-700">Status</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Contract Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                      <SelectItem value="terminated">Terminated</SelectItem>
                      <SelectItem value="renewed">Renewed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2 pt-8">
                  <Switch
                    id="auto_renew"
                    checked={formData.auto_renew}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, auto_renew: checked }))}
                  />
                  <Label htmlFor="auto_renew">Auto-renew</Label>
                </div>
              </div>
            </div>

            {/* Notes */}
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {editingContract ? 'Save Changes' : 'Create Contract'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteContract} onOpenChange={() => setDeleteContract(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Contract</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete contract "{deleteContract?.contract_number}"?
              This will also delete all associated payment records. This action cannot be undone.
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
