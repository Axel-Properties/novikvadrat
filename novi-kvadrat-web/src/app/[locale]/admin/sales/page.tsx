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
import { Loader2, Building, User, DollarSign, Calendar, Home } from 'lucide-react'

interface Sale {
  id: string
  sale_number: string
  unit_id: string | null
  buyer_id: string
  project_id: string | null
  building_id: string | null
  agent_id: string | null
  buyer_name: string | null
  unit_number: string | null
  project_name: string | null
  building_name: string | null
  agent_name: string | null
  sale_price: number
  original_price: number | null
  discount_amount: number
  currency: string
  financing_type: string
  down_payment_amount: number
  down_payment_paid: boolean
  reservation_date: string | null
  contract_date: string | null
  expected_handover_date: string | null
  status: string
  commission_percentage: number | null
  commission_amount: number | null
  notes: string | null
  created_at: string
}

interface Buyer {
  id: string
  first_name: string
  last_name: string
}

interface Project {
  id: string
  name: string
}

interface Agent {
  id: string
  first_name: string
  last_name: string
}

const emptySale = {
  buyer_id: '',
  project_id: '',
  building_id: '',
  unit_id: '',
  agent_id: '',
  sale_price: '',
  original_price: '',
  discount_amount: '0',
  discount_reason: '',
  currency: 'EUR',
  vat_included: true,
  vat_amount: '0',
  first_buyer_vat_refund: false,
  down_payment_amount: '0',
  down_payment_percentage: '',
  down_payment_date: '',
  down_payment_paid: false,
  financing_type: 'cash',
  mortgage_bank: '',
  mortgage_amount: '',
  mortgage_approved: false,
  reservation_date: '',
  contract_date: '',
  expected_handover_date: '',
  status: 'inquiry',
  commission_percentage: '',
  commission_amount: '',
  notes: ''
}

const statusOptions = [
  { value: 'inquiry', label: 'Inquiry', color: 'bg-gray-100 text-gray-800' },
  { value: 'viewing_scheduled', label: 'Viewing Scheduled', color: 'bg-blue-100 text-blue-800' },
  { value: 'offer_made', label: 'Offer Made', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'negotiating', label: 'Negotiating', color: 'bg-orange-100 text-orange-800' },
  { value: 'reserved', label: 'Reserved', color: 'bg-purple-100 text-purple-800' },
  { value: 'contract_signed', label: 'Contract Signed', color: 'bg-indigo-100 text-indigo-800' },
  { value: 'payment_in_progress', label: 'Payment In Progress', color: 'bg-cyan-100 text-cyan-800' },
  { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' },
  { value: 'refunded', label: 'Refunded', color: 'bg-pink-100 text-pink-800' }
]

const financingOptions = [
  { value: 'cash', label: 'Cash' },
  { value: 'mortgage', label: 'Mortgage' },
  { value: 'installment', label: 'Installment Plan' },
  { value: 'mixed', label: 'Mixed' }
]

export default function SalesPage() {
  const params = useParams()
  const { toast } = useToast()
  const locale = params.locale as string || 'en'
  const [sales, setSales] = useState<Sale[]>([])
  const [buyers, setBuyers] = useState<Buyer[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [agents, setAgents] = useState<Agent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteSale, setDeleteSale] = useState<Sale | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [editingSale, setEditingSale] = useState<Sale | null>(null)
  const [formData, setFormData] = useState(emptySale)

  useEffect(() => {
    fetchSales()
    fetchBuyers()
    fetchProjects()
    fetchAgents()
  }, [])

  const fetchSales = async () => {
    try {
      const response = await fetch('/api/admin/sales')
      if (response.ok) {
        const data = await response.json()
        setSales(data)
      }
    } catch (error) {
      console.error('Failed to fetch sales:', error)
      toast({
        title: 'Error',
        description: 'Failed to load sales',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchBuyers = async () => {
    try {
      const response = await fetch('/api/admin/buyers')
      if (response.ok) {
        const data = await response.json()
        setBuyers(data)
      }
    } catch (error) {
      console.error('Failed to fetch buyers:', error)
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

  const fetchAgents = async () => {
    try {
      const response = await fetch('/api/admin/agents?is_active=true')
      if (response.ok) {
        const data = await response.json()
        setAgents(data)
      }
    } catch (error) {
      console.error('Failed to fetch agents:', error)
    }
  }

  const handleOpenDialog = (sale?: Sale) => {
    if (sale) {
      setEditingSale(sale)
      setFormData({
        buyer_id: sale.buyer_id || '',
        project_id: sale.project_id || '',
        building_id: sale.building_id || '',
        unit_id: sale.unit_id || '',
        agent_id: sale.agent_id || '',
        sale_price: sale.sale_price?.toString() || '',
        original_price: sale.original_price?.toString() || '',
        discount_amount: sale.discount_amount?.toString() || '0',
        discount_reason: '',
        currency: sale.currency || 'EUR',
        vat_included: true,
        vat_amount: '0',
        first_buyer_vat_refund: false,
        down_payment_amount: sale.down_payment_amount?.toString() || '0',
        down_payment_percentage: '',
        down_payment_date: '',
        down_payment_paid: sale.down_payment_paid || false,
        financing_type: sale.financing_type || 'cash',
        mortgage_bank: '',
        mortgage_amount: '',
        mortgage_approved: false,
        reservation_date: sale.reservation_date || '',
        contract_date: sale.contract_date || '',
        expected_handover_date: sale.expected_handover_date || '',
        status: sale.status || 'inquiry',
        commission_percentage: sale.commission_percentage?.toString() || '',
        commission_amount: sale.commission_amount?.toString() || '',
        notes: sale.notes || ''
      })
    } else {
      setEditingSale(null)
      setFormData(emptySale)
    }
    setShowDialog(true)
  }

  const handleSubmit = async () => {
    if (!formData.buyer_id || !formData.sale_price) {
      toast({
        title: 'Error',
        description: 'Buyer and sale price are required',
        variant: 'destructive'
      })
      return
    }

    setIsSubmitting(true)
    try {
      const url = editingSale
        ? `/api/admin/sales/${editingSale.id}`
        : '/api/admin/sales'
      const method = editingSale ? 'PUT' : 'POST'

      const payload = {
        ...formData,
        sale_price: parseFloat(formData.sale_price),
        original_price: formData.original_price ? parseFloat(formData.original_price) : null,
        discount_amount: formData.discount_amount ? parseFloat(formData.discount_amount) : 0,
        vat_amount: formData.vat_amount ? parseFloat(formData.vat_amount) : 0,
        down_payment_amount: formData.down_payment_amount ? parseFloat(formData.down_payment_amount) : 0,
        down_payment_percentage: formData.down_payment_percentage ? parseFloat(formData.down_payment_percentage) : null,
        mortgage_amount: formData.mortgage_amount ? parseFloat(formData.mortgage_amount) : null,
        commission_percentage: formData.commission_percentage ? parseFloat(formData.commission_percentage) : null,
        commission_amount: formData.commission_amount ? parseFloat(formData.commission_amount) : null,
        project_id: formData.project_id || null,
        building_id: formData.building_id || null,
        unit_id: formData.unit_id || null,
        agent_id: formData.agent_id || null,
        reservation_date: formData.reservation_date || null,
        contract_date: formData.contract_date || null,
        expected_handover_date: formData.expected_handover_date || null,
        down_payment_date: formData.down_payment_date || null
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        const savedSale = await response.json()
        if (editingSale) {
          setSales(prev => prev.map(s => s.id === savedSale.id ? savedSale : s))
        } else {
          setSales(prev => [savedSale, ...prev])
        }
        setShowDialog(false)
        toast({
          title: 'Success',
          description: editingSale ? 'Sale updated successfully' : 'Sale created successfully'
        })
      } else {
        const error = await response.json()
        throw new Error(error.message || 'Failed to save sale')
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save sale',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteSale) return

    try {
      const response = await fetch(`/api/admin/sales/${deleteSale.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setSales(prev => prev.filter(s => s.id !== deleteSale.id))
        toast({
          title: 'Success',
          description: 'Sale deleted successfully'
        })
      } else {
        const error = await response.json()
        throw new Error(error.message || 'Failed to delete')
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete sale',
        variant: 'destructive'
      })
    } finally {
      setDeleteSale(null)
    }
  }

  const formatCurrency = (amount: number, currency: string = 'EUR') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount)
  }

  const columns: Column<Sale>[] = [
    {
      key: 'sale_number',
      title: 'Sale #',
      render: (sale) => (
        <span className="font-mono text-sm">{sale.sale_number || '-'}</span>
      )
    },
    {
      key: 'buyer_name',
      title: 'Buyer',
      render: (sale) => (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-gray-400" />
          <span>{sale.buyer_name || '-'}</span>
        </div>
      )
    },
    {
      key: 'property',
      title: 'Property',
      render: (sale) => (
        <div className="space-y-1">
          {sale.project_name && (
            <div className="flex items-center gap-1 text-sm">
              <Building className="h-3 w-3 text-gray-400" />
              {sale.project_name}
            </div>
          )}
          {sale.unit_number && (
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Home className="h-3 w-3" />
              Unit {sale.unit_number}
            </div>
          )}
        </div>
      )
    },
    {
      key: 'sale_price',
      title: 'Price',
      render: (sale) => (
        <div className="flex items-center gap-1">
          <DollarSign className="h-3 w-3 text-gray-400" />
          <span className="font-medium">{formatCurrency(sale.sale_price, sale.currency)}</span>
        </div>
      )
    },
    {
      key: 'contract_date',
      title: 'Contract Date',
      render: (sale) => (
        <span className="text-sm text-gray-600">
          {sale.contract_date ? new Date(sale.contract_date).toLocaleDateString() : '-'}
        </span>
      )
    },
    {
      key: 'agent_name',
      title: 'Agent',
      render: (sale) => (
        <span className="text-sm text-gray-600">
          {sale.agent_name || '-'}
        </span>
      )
    },
    {
      key: 'status',
      title: 'Status',
      render: (sale) => {
        const status = statusOptions.find(s => s.value === sale.status)
        return (
          <Badge className={status?.color || 'bg-gray-100 text-gray-800'}>
            {status?.label || sale.status}
          </Badge>
        )
      }
    }
  ]

  return (
    <>
      <PageHeader
        title="Sales"
        description="Manage property sales and transactions"
        action={{
          label: 'New Sale',
          onClick: () => handleOpenDialog()
        }}
      />

      <DataTable
        columns={columns}
        data={sales}
        searchKey="buyer_name"
        searchPlaceholder="Search sales by buyer..."
        isLoading={isLoading}
        emptyMessage="No sales found. Create your first sale."
        onEdit={(sale) => handleOpenDialog(sale)}
        onDelete={(sale) => setDeleteSale(sale)}
      />

      {/* Add/Edit Sale Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingSale ? 'Edit Sale' : 'New Sale'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Buyer & Property */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-700">Buyer & Property</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="buyer_id">Buyer *</Label>
                  <Select
                    value={formData.buyer_id}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, buyer_id: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select buyer" />
                    </SelectTrigger>
                    <SelectContent>
                      {buyers.map(buyer => (
                        <SelectItem key={buyer.id} value={buyer.id}>
                          {buyer.first_name} {buyer.last_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="agent_id">Agent</Label>
                  <Select
                    value={formData.agent_id}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, agent_id: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select agent" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">No Agent</SelectItem>
                      {agents.map(agent => (
                        <SelectItem key={agent.id} value={agent.id}>
                          {agent.first_name} {agent.last_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
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
                      <SelectItem value="">No Project</SelectItem>
                      {projects.map(project => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map(status => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-700">Pricing</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sale_price">Sale Price (EUR) *</Label>
                  <Input
                    id="sale_price"
                    type="number"
                    value={formData.sale_price}
                    onChange={(e) => setFormData(prev => ({ ...prev, sale_price: e.target.value }))}
                    placeholder="150000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="original_price">Original Price</Label>
                  <Input
                    id="original_price"
                    type="number"
                    value={formData.original_price}
                    onChange={(e) => setFormData(prev => ({ ...prev, original_price: e.target.value }))}
                    placeholder="160000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount_amount">Discount</Label>
                  <Input
                    id="discount_amount"
                    type="number"
                    value={formData.discount_amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, discount_amount: e.target.value }))}
                    placeholder="10000"
                  />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-700">Payment</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="financing_type">Financing Type</Label>
                  <Select
                    value={formData.financing_type}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, financing_type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select financing" />
                    </SelectTrigger>
                    <SelectContent>
                      {financingOptions.map(opt => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="down_payment_amount">Down Payment</Label>
                  <Input
                    id="down_payment_amount"
                    type="number"
                    value={formData.down_payment_amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, down_payment_amount: e.target.value }))}
                    placeholder="30000"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="down_payment_paid"
                  checked={formData.down_payment_paid}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, down_payment_paid: checked }))}
                />
                <Label htmlFor="down_payment_paid">Down payment received</Label>
              </div>
            </div>

            {/* Dates */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-700">Important Dates</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reservation_date">Reservation Date</Label>
                  <Input
                    id="reservation_date"
                    type="date"
                    value={formData.reservation_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, reservation_date: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contract_date">Contract Date</Label>
                  <Input
                    id="contract_date"
                    type="date"
                    value={formData.contract_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, contract_date: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expected_handover_date">Expected Handover</Label>
                  <Input
                    id="expected_handover_date"
                    type="date"
                    value={formData.expected_handover_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, expected_handover_date: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {/* Commission */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-700">Commission</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="commission_percentage">Commission %</Label>
                  <Input
                    id="commission_percentage"
                    type="number"
                    step="0.1"
                    value={formData.commission_percentage}
                    onChange={(e) => setFormData(prev => ({ ...prev, commission_percentage: e.target.value }))}
                    placeholder="3"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="commission_amount">Commission Amount</Label>
                  <Input
                    id="commission_amount"
                    type="number"
                    value={formData.commission_amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, commission_amount: e.target.value }))}
                    placeholder="4500"
                  />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Additional notes about this sale..."
                  rows={3}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {editingSale ? 'Save Changes' : 'Create Sale'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteSale} onOpenChange={() => setDeleteSale(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Sale</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete sale "{deleteSale?.sale_number}"?
              This action cannot be undone. Completed sales cannot be deleted.
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
