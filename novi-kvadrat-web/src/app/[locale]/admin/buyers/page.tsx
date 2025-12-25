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
import { Loader2, Phone, Mail, DollarSign, Clock, User } from 'lucide-react'

interface Buyer {
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
  is_company: boolean
  company_name: string | null
  company_tax_id: string | null
  budget_min: number | null
  budget_max: number | null
  preferred_locations: string[]
  preferred_property_types: string[]
  preferred_bedrooms_min: number | null
  preferred_bedrooms_max: number | null
  source: string
  source_details: string | null
  assigned_agent_id: string | null
  agent_name: string | null
  status: string
  priority: string
  purchase_timeline: string | null
  financing_type: string | null
  pre_approved: boolean
  notes: string | null
  created_at: string
}

interface Agent {
  id: string
  first_name: string
  last_name: string
}

const emptyBuyer = {
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
  is_company: false,
  company_name: '',
  company_tax_id: '',
  budget_min: '',
  budget_max: '',
  preferred_locations: [] as string[],
  preferred_property_types: [] as string[],
  preferred_bedrooms_min: '',
  preferred_bedrooms_max: '',
  source: 'website',
  source_details: '',
  assigned_agent_id: '',
  status: 'active',
  priority: 'medium',
  purchase_timeline: '',
  financing_type: '',
  pre_approved: false,
  notes: ''
}

const statusOptions = [
  { value: 'active', label: 'Active', color: 'bg-green-100 text-green-800' },
  { value: 'qualified', label: 'Qualified', color: 'bg-blue-100 text-blue-800' },
  { value: 'negotiating', label: 'Negotiating', color: 'bg-purple-100 text-purple-800' },
  { value: 'purchased', label: 'Purchased', color: 'bg-teal-100 text-teal-800' },
  { value: 'lost', label: 'Lost', color: 'bg-gray-100 text-gray-800' },
  { value: 'inactive', label: 'Inactive', color: 'bg-red-100 text-red-800' }
]

const priorityOptions = [
  { value: 'low', label: 'Low', color: 'bg-gray-100 text-gray-800' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
  { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800' }
]

const sourceOptions = [
  'website', 'website_form', 'phone', 'email', 'walk_in', 'social_media',
  'whatsapp', 'viber', 'referral', 'advertisement', 'property_portal', 'other'
]

export default function BuyersPage() {
  const params = useParams()
  const { toast } = useToast()
  const locale = params.locale as string || 'en'
  const [buyers, setBuyers] = useState<Buyer[]>([])
  const [agents, setAgents] = useState<Agent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteBuyer, setDeleteBuyer] = useState<Buyer | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [editingBuyer, setEditingBuyer] = useState<Buyer | null>(null)
  const [formData, setFormData] = useState(emptyBuyer)

  useEffect(() => {
    fetchBuyers()
    fetchAgents()
  }, [])

  const fetchBuyers = async () => {
    try {
      const response = await fetch('/api/admin/buyers')
      if (response.ok) {
        const data = await response.json()
        setBuyers(data)
      }
    } catch (error) {
      console.error('Failed to fetch buyers:', error)
      toast({
        title: 'Error',
        description: 'Failed to load buyers',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
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

  const handleOpenDialog = (buyer?: Buyer) => {
    if (buyer) {
      setEditingBuyer(buyer)
      setFormData({
        first_name: buyer.first_name,
        last_name: buyer.last_name,
        email: buyer.email || '',
        phone: buyer.phone || '',
        phone_secondary: buyer.phone_secondary || '',
        id_number: buyer.id_number || '',
        id_type: buyer.id_type || 'personal_id',
        address: buyer.address || '',
        city: buyer.city || '',
        postal_code: buyer.postal_code || '',
        country: buyer.country || 'Serbia',
        is_company: buyer.is_company || false,
        company_name: buyer.company_name || '',
        company_tax_id: buyer.company_tax_id || '',
        budget_min: buyer.budget_min?.toString() || '',
        budget_max: buyer.budget_max?.toString() || '',
        preferred_locations: buyer.preferred_locations || [],
        preferred_property_types: buyer.preferred_property_types || [],
        preferred_bedrooms_min: buyer.preferred_bedrooms_min?.toString() || '',
        preferred_bedrooms_max: buyer.preferred_bedrooms_max?.toString() || '',
        source: buyer.source || 'website',
        source_details: buyer.source_details || '',
        assigned_agent_id: buyer.assigned_agent_id || '',
        status: buyer.status || 'active',
        priority: buyer.priority || 'medium',
        purchase_timeline: buyer.purchase_timeline || '',
        financing_type: buyer.financing_type || '',
        pre_approved: buyer.pre_approved || false,
        notes: buyer.notes || ''
      })
    } else {
      setEditingBuyer(null)
      setFormData(emptyBuyer)
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
      const url = editingBuyer
        ? `/api/admin/buyers/${editingBuyer.id}`
        : '/api/admin/buyers'
      const method = editingBuyer ? 'PUT' : 'POST'

      const payload = {
        ...formData,
        budget_min: formData.budget_min ? parseFloat(formData.budget_min) : null,
        budget_max: formData.budget_max ? parseFloat(formData.budget_max) : null,
        preferred_bedrooms_min: formData.preferred_bedrooms_min ? parseInt(formData.preferred_bedrooms_min) : null,
        preferred_bedrooms_max: formData.preferred_bedrooms_max ? parseInt(formData.preferred_bedrooms_max) : null,
        assigned_agent_id: formData.assigned_agent_id || null
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        const savedBuyer = await response.json()
        if (editingBuyer) {
          setBuyers(prev => prev.map(b => b.id === savedBuyer.id ? savedBuyer : b))
        } else {
          setBuyers(prev => [...prev, savedBuyer])
        }
        setShowDialog(false)
        toast({
          title: 'Success',
          description: editingBuyer ? 'Buyer updated successfully' : 'Buyer created successfully'
        })
      } else {
        const error = await response.json()
        throw new Error(error.message || 'Failed to save buyer')
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save buyer',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteBuyer) return

    try {
      const response = await fetch(`/api/admin/buyers/${deleteBuyer.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setBuyers(prev => prev.filter(b => b.id !== deleteBuyer.id))
        toast({
          title: 'Success',
          description: 'Buyer deleted successfully'
        })
      } else {
        const error = await response.json()
        throw new Error(error.message || 'Failed to delete')
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete buyer',
        variant: 'destructive'
      })
    } finally {
      setDeleteBuyer(null)
    }
  }

  const formatBudget = (min: number | null, max: number | null) => {
    if (!min && !max) return '-'
    if (min && max) return `€${min.toLocaleString()} - €${max.toLocaleString()}`
    if (min) return `€${min.toLocaleString()}+`
    return `Up to €${max?.toLocaleString()}`
  }

  const columns: Column<Buyer>[] = [
    {
      key: 'full_name',
      title: 'Buyer',
      render: (buyer) => (
        <div>
          <span className="font-medium">{buyer.full_name}</span>
          {buyer.is_company && buyer.company_name && (
            <p className="text-sm text-gray-500">{buyer.company_name}</p>
          )}
        </div>
      )
    },
    {
      key: 'contact',
      title: 'Contact',
      render: (buyer) => (
        <div className="space-y-1">
          {buyer.email && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Mail className="h-3 w-3" />
              {buyer.email}
            </div>
          )}
          {buyer.phone && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Phone className="h-3 w-3" />
              {buyer.phone}
            </div>
          )}
        </div>
      )
    },
    {
      key: 'budget',
      title: 'Budget',
      render: (buyer) => (
        <div className="flex items-center gap-1 text-sm">
          <DollarSign className="h-3 w-3 text-gray-400" />
          {formatBudget(buyer.budget_min, buyer.budget_max)}
        </div>
      )
    },
    {
      key: 'agent_name',
      title: 'Agent',
      render: (buyer) => (
        <span className="text-sm text-gray-600">
          {buyer.agent_name || '-'}
        </span>
      )
    },
    {
      key: 'status',
      title: 'Status',
      render: (buyer) => {
        const status = statusOptions.find(s => s.value === buyer.status)
        return (
          <Badge className={status?.color || 'bg-gray-100 text-gray-800'}>
            {status?.label || buyer.status}
          </Badge>
        )
      }
    },
    {
      key: 'priority',
      title: 'Priority',
      render: (buyer) => {
        const priority = priorityOptions.find(p => p.value === buyer.priority)
        return (
          <Badge variant="outline" className={priority?.color || ''}>
            {priority?.label || buyer.priority}
          </Badge>
        )
      }
    }
  ]

  return (
    <>
      <PageHeader
        title="Buyers"
        description="Manage potential and active property buyers"
        action={{
          label: 'Add Buyer',
          onClick: () => handleOpenDialog()
        }}
      />

      <DataTable
        columns={columns}
        data={buyers}
        searchKey="full_name"
        searchPlaceholder="Search buyers..."
        isLoading={isLoading}
        emptyMessage="No buyers found. Add your first buyer."
        onEdit={(buyer) => handleOpenDialog(buyer)}
        onDelete={(buyer) => setDeleteBuyer(buyer)}
      />

      {/* Add/Edit Buyer Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingBuyer ? 'Edit Buyer' : 'Add Buyer'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-700">Personal Information</h3>
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
              <div className="flex items-center gap-2">
                <Switch
                  id="is_company"
                  checked={formData.is_company}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_company: checked }))}
                />
                <Label htmlFor="is_company">This is a company</Label>
              </div>
              {formData.is_company && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company_name">Company Name</Label>
                    <Input
                      id="company_name"
                      value={formData.company_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, company_name: e.target.value }))}
                      placeholder="Company Ltd."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company_tax_id">Tax ID</Label>
                    <Input
                      id="company_tax_id"
                      value={formData.company_tax_id}
                      onChange={(e) => setFormData(prev => ({ ...prev, company_tax_id: e.target.value }))}
                      placeholder="Tax ID"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Budget & Preferences */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-700">Budget & Preferences</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget_min">Min Budget (EUR)</Label>
                  <Input
                    id="budget_min"
                    type="number"
                    value={formData.budget_min}
                    onChange={(e) => setFormData(prev => ({ ...prev, budget_min: e.target.value }))}
                    placeholder="50000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget_max">Max Budget (EUR)</Label>
                  <Input
                    id="budget_max"
                    type="number"
                    value={formData.budget_max}
                    onChange={(e) => setFormData(prev => ({ ...prev, budget_max: e.target.value }))}
                    placeholder="150000"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="preferred_bedrooms_min">Min Bedrooms</Label>
                  <Input
                    id="preferred_bedrooms_min"
                    type="number"
                    value={formData.preferred_bedrooms_min}
                    onChange={(e) => setFormData(prev => ({ ...prev, preferred_bedrooms_min: e.target.value }))}
                    placeholder="1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferred_bedrooms_max">Max Bedrooms</Label>
                  <Input
                    id="preferred_bedrooms_max"
                    type="number"
                    value={formData.preferred_bedrooms_max}
                    onChange={(e) => setFormData(prev => ({ ...prev, preferred_bedrooms_max: e.target.value }))}
                    placeholder="3"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="purchase_timeline">Purchase Timeline</Label>
                  <Select
                    value={formData.purchase_timeline}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, purchase_timeline: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="1_3_months">1-3 Months</SelectItem>
                      <SelectItem value="3_6_months">3-6 Months</SelectItem>
                      <SelectItem value="6_12_months">6-12 Months</SelectItem>
                      <SelectItem value="over_year">Over a Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="mortgage">Mortgage</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="pre_approved"
                  checked={formData.pre_approved}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, pre_approved: checked }))}
                />
                <Label htmlFor="pre_approved">Pre-approved for mortgage</Label>
              </div>
            </div>

            {/* Source & Assignment */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-700">Source & Assignment</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="source">Source</Label>
                  <Select
                    value={formData.source}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, source: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      {sourceOptions.map(source => (
                        <SelectItem key={source} value={source}>
                          {source.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assigned_agent_id">Assigned Agent</Label>
                  <Select
                    value={formData.assigned_agent_id}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, assigned_agent_id: value }))}
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
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      {priorityOptions.map(priority => (
                        <SelectItem key={priority.value} value={priority.value}>
                          {priority.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  placeholder="Additional notes about this buyer..."
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
              {editingBuyer ? 'Save Changes' : 'Add Buyer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteBuyer} onOpenChange={() => setDeleteBuyer(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Buyer</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteBuyer?.full_name}"?
              This action cannot be undone. Buyers with active sales cannot be deleted.
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
