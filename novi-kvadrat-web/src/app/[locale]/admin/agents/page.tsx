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
import { Loader2, Phone, Mail, Star, Check, X, Award, TrendingUp } from 'lucide-react'

interface Agent {
  id: string
  first_name: string
  last_name: string
  full_name: string
  email: string
  phone: string | null
  phone_secondary: string | null
  photo_url: string | null
  bio_en: string | null
  bio_sr: string | null
  title: string | null
  license_number: string | null
  license_expiry_date: string | null
  years_experience: number | null
  languages: string[]
  specializations: string[]
  property_types: string[]
  areas_served: string[]
  default_commission_rate: number
  commission_split_rate: number
  linkedin_url: string | null
  instagram_url: string | null
  facebook_url: string | null
  total_sales_count: number
  total_sales_value: number
  rating: number | null
  review_count: number
  is_active: boolean
  is_featured: boolean
  availability_status: string
  notes: string | null
  hired_date: string | null
  created_at: string
}

const emptyAgent = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  phone_secondary: '',
  photo_url: '',
  bio_en: '',
  bio_sr: '',
  title: '',
  license_number: '',
  license_expiry_date: '',
  years_experience: '',
  languages: ['Serbian', 'English'],
  specializations: [],
  property_types: [],
  areas_served: [],
  default_commission_rate: '3',
  commission_split_rate: '50',
  linkedin_url: '',
  instagram_url: '',
  facebook_url: '',
  is_active: true,
  is_featured: false,
  availability_status: 'available',
  notes: '',
  hired_date: ''
}

const availabilityOptions = [
  { value: 'available', label: 'Available', color: 'bg-green-100 text-green-800' },
  { value: 'busy', label: 'Busy', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'on_leave', label: 'On Leave', color: 'bg-blue-100 text-blue-800' },
  { value: 'unavailable', label: 'Unavailable', color: 'bg-red-100 text-red-800' }
]

export default function AgentsPage() {
  const params = useParams()
  const { toast } = useToast()
  const locale = params.locale as string || 'en'
  const [agents, setAgents] = useState<Agent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteAgent, setDeleteAgent] = useState<Agent | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null)
  const [formData, setFormData] = useState(emptyAgent)

  useEffect(() => {
    fetchAgents()
  }, [])

  const fetchAgents = async () => {
    try {
      const response = await fetch('/api/admin/agents')
      if (response.ok) {
        const data = await response.json()
        setAgents(data)
      }
    } catch (error) {
      console.error('Failed to fetch agents:', error)
      toast({
        title: 'Error',
        description: 'Failed to load agents',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenDialog = (agent?: Agent) => {
    if (agent) {
      setEditingAgent(agent)
      setFormData({
        first_name: agent.first_name,
        last_name: agent.last_name,
        email: agent.email,
        phone: agent.phone || '',
        phone_secondary: agent.phone_secondary || '',
        photo_url: agent.photo_url || '',
        bio_en: agent.bio_en || '',
        bio_sr: agent.bio_sr || '',
        title: agent.title || '',
        license_number: agent.license_number || '',
        license_expiry_date: agent.license_expiry_date || '',
        years_experience: agent.years_experience?.toString() || '',
        languages: agent.languages || ['Serbian', 'English'],
        specializations: agent.specializations || [],
        property_types: agent.property_types || [],
        areas_served: agent.areas_served || [],
        default_commission_rate: agent.default_commission_rate?.toString() || '3',
        commission_split_rate: agent.commission_split_rate?.toString() || '50',
        linkedin_url: agent.linkedin_url || '',
        instagram_url: agent.instagram_url || '',
        facebook_url: agent.facebook_url || '',
        is_active: agent.is_active,
        is_featured: agent.is_featured,
        availability_status: agent.availability_status || 'available',
        notes: agent.notes || '',
        hired_date: agent.hired_date || ''
      })
    } else {
      setEditingAgent(null)
      setFormData(emptyAgent)
    }
    setShowDialog(true)
  }

  const handleSubmit = async () => {
    if (!formData.first_name || !formData.last_name || !formData.email) {
      toast({
        title: 'Error',
        description: 'First name, last name, and email are required',
        variant: 'destructive'
      })
      return
    }

    setIsSubmitting(true)
    try {
      const url = editingAgent
        ? `/api/admin/agents/${editingAgent.id}`
        : '/api/admin/agents'
      const method = editingAgent ? 'PUT' : 'POST'

      const payload = {
        ...formData,
        years_experience: formData.years_experience ? parseInt(formData.years_experience) : null,
        default_commission_rate: formData.default_commission_rate ? parseFloat(formData.default_commission_rate) : 3,
        commission_split_rate: formData.commission_split_rate ? parseFloat(formData.commission_split_rate) : 50,
        license_expiry_date: formData.license_expiry_date || null,
        hired_date: formData.hired_date || null
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        const savedAgent = await response.json()
        if (editingAgent) {
          setAgents(prev => prev.map(a => a.id === savedAgent.id ? savedAgent : a))
        } else {
          setAgents(prev => [...prev, savedAgent])
        }
        setShowDialog(false)
        toast({
          title: 'Success',
          description: editingAgent ? 'Agent updated successfully' : 'Agent created successfully'
        })
      } else {
        const error = await response.json()
        throw new Error(error.message || 'Failed to save agent')
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save agent',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteAgent) return

    try {
      const response = await fetch(`/api/admin/agents/${deleteAgent.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setAgents(prev => prev.filter(a => a.id !== deleteAgent.id))
        toast({
          title: 'Success',
          description: 'Agent deleted successfully'
        })
      } else {
        const error = await response.json()
        throw new Error(error.message || 'Failed to delete')
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete agent',
        variant: 'destructive'
      })
    } finally {
      setDeleteAgent(null)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const columns: Column<Agent>[] = [
    {
      key: 'full_name',
      title: 'Agent',
      render: (agent) => (
        <div className="flex items-center gap-3">
          {agent.photo_url ? (
            <img
              src={agent.photo_url}
              alt={agent.full_name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-medium">
              {agent.first_name[0]}{agent.last_name[0]}
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{agent.full_name}</span>
              {agent.is_featured && (
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              )}
            </div>
            {agent.title && (
              <p className="text-sm text-gray-500">{agent.title}</p>
            )}
          </div>
        </div>
      )
    },
    {
      key: 'contact',
      title: 'Contact',
      render: (agent) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Mail className="h-3 w-3" />
            {agent.email}
          </div>
          {agent.phone && (
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Phone className="h-3 w-3" />
              {agent.phone}
            </div>
          )}
        </div>
      )
    },
    {
      key: 'performance',
      title: 'Performance',
      render: (agent) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-sm">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <span>{agent.total_sales_count} sales</span>
          </div>
          <div className="text-sm text-gray-500">
            {formatCurrency(agent.total_sales_value)}
          </div>
          {agent.rating && (
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-3 w-3 text-yellow-500" />
              {agent.rating.toFixed(1)} ({agent.review_count})
            </div>
          )}
        </div>
      )
    },
    {
      key: 'availability_status',
      title: 'Availability',
      render: (agent) => {
        const status = availabilityOptions.find(s => s.value === agent.availability_status)
        return (
          <Badge className={status?.color || 'bg-gray-100 text-gray-800'}>
            {status?.label || agent.availability_status}
          </Badge>
        )
      }
    },
    {
      key: 'is_active',
      title: 'Status',
      render: (agent) => (
        agent.is_active ? (
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
        title="Agents"
        description="Manage real estate agents and their assignments"
        action={{
          label: 'Add Agent',
          onClick: () => handleOpenDialog()
        }}
      />

      <DataTable
        columns={columns}
        data={agents}
        searchKey="full_name"
        searchPlaceholder="Search agents..."
        isLoading={isLoading}
        emptyMessage="No agents found. Add your first agent."
        onEdit={(agent) => handleOpenDialog(agent)}
        onDelete={(agent) => setDeleteAgent(agent)}
      />

      {/* Add/Edit Agent Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingAgent ? 'Edit Agent' : 'Add Agent'}</DialogTitle>
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
                  <Label htmlFor="email">Email *</Label>
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
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Senior Sales Agent"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="photo_url">Photo URL</Label>
                  <Input
                    id="photo_url"
                    value={formData.photo_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, photo_url: e.target.value }))}
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>

            {/* Professional Info */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-700">Professional Information</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="license_number">License Number</Label>
                  <Input
                    id="license_number"
                    value={formData.license_number}
                    onChange={(e) => setFormData(prev => ({ ...prev, license_number: e.target.value }))}
                    placeholder="ABC-12345"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="license_expiry_date">License Expiry</Label>
                  <Input
                    id="license_expiry_date"
                    type="date"
                    value={formData.license_expiry_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, license_expiry_date: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="years_experience">Years Experience</Label>
                  <Input
                    id="years_experience"
                    type="number"
                    value={formData.years_experience}
                    onChange={(e) => setFormData(prev => ({ ...prev, years_experience: e.target.value }))}
                    placeholder="5"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hired_date">Hired Date</Label>
                  <Input
                    id="hired_date"
                    type="date"
                    value={formData.hired_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, hired_date: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="availability_status">Availability</Label>
                  <Select
                    value={formData.availability_status}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, availability_status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      {availabilityOptions.map(status => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Commission */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-700">Commission Settings</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="default_commission_rate">Default Commission Rate (%)</Label>
                  <Input
                    id="default_commission_rate"
                    type="number"
                    step="0.1"
                    value={formData.default_commission_rate}
                    onChange={(e) => setFormData(prev => ({ ...prev, default_commission_rate: e.target.value }))}
                    placeholder="3"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="commission_split_rate">Commission Split Rate (%)</Label>
                  <Input
                    id="commission_split_rate"
                    type="number"
                    step="0.1"
                    value={formData.commission_split_rate}
                    onChange={(e) => setFormData(prev => ({ ...prev, commission_split_rate: e.target.value }))}
                    placeholder="50"
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-700">Biography</h3>
              <div className="space-y-2">
                <Label htmlFor="bio_en">Bio (English)</Label>
                <Textarea
                  id="bio_en"
                  value={formData.bio_en}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio_en: e.target.value }))}
                  placeholder="Agent biography in English..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio_sr">Bio (Serbian)</Label>
                <Textarea
                  id="bio_sr"
                  value={formData.bio_sr}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio_sr: e.target.value }))}
                  placeholder="Agent biography in Serbian..."
                  rows={3}
                />
              </div>
            </div>

            {/* Social & Status */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-700">Social Media</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin_url">LinkedIn</Label>
                  <Input
                    id="linkedin_url"
                    value={formData.linkedin_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, linkedin_url: e.target.value }))}
                    placeholder="https://linkedin.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram_url">Instagram</Label>
                  <Input
                    id="instagram_url"
                    value={formData.instagram_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, instagram_url: e.target.value }))}
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebook_url">Facebook</Label>
                  <Input
                    id="facebook_url"
                    value={formData.facebook_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, facebook_url: e.target.value }))}
                    placeholder="https://facebook.com/..."
                  />
                </div>
              </div>
            </div>

            {/* Status Toggles */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-700">Status</h3>
              <div className="flex items-center gap-6">
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
                    id="is_featured"
                    checked={formData.is_featured}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: checked }))}
                  />
                  <Label htmlFor="is_featured">Featured Agent</Label>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notes">Internal Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Internal notes about this agent..."
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
              {editingAgent ? 'Save Changes' : 'Add Agent'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteAgent} onOpenChange={() => setDeleteAgent(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Agent</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteAgent?.full_name}"?
              This action cannot be undone. Agents with active sales or inquiries cannot be deleted.
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
