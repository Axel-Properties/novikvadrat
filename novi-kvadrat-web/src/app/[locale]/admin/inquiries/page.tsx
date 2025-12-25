'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { PageHeader, DataTable, Column } from '@/components/admin'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { Loader2, Phone, Mail, Building, Calendar, MessageSquare, AlertCircle } from 'lucide-react'

interface Inquiry {
  id: string
  inquiry_number: string
  contact_name: string
  contact_email: string | null
  contact_phone: string | null
  buyer_id: string | null
  buyer_name: string | null
  project_id: string | null
  project_name: string | null
  building_id: string | null
  building_name: string | null
  unit_id: string | null
  unit_number: string | null
  inquiry_type: string
  message: string | null
  source: string
  source_url: string | null
  source_campaign: string | null
  assigned_agent_id: string | null
  status: string
  priority: string
  next_follow_up_date: string | null
  next_follow_up_type: string | null
  budget_range: string | null
  timeline: string | null
  notes: string | null
  created_at: string
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

const emptyInquiry = {
  contact_name: '',
  contact_email: '',
  contact_phone: '',
  project_id: '',
  building_id: '',
  unit_id: '',
  inquiry_type: 'general',
  message: '',
  source: 'website',
  source_url: '',
  source_campaign: '',
  assigned_agent_id: '',
  status: 'new',
  priority: 'medium',
  next_follow_up_date: '',
  next_follow_up_type: '',
  budget_range: '',
  timeline: '',
  notes: ''
}

const statusOptions = [
  { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-800' },
  { value: 'contacted', label: 'Contacted', color: 'bg-cyan-100 text-cyan-800' },
  { value: 'qualified', label: 'Qualified', color: 'bg-green-100 text-green-800' },
  { value: 'viewing_scheduled', label: 'Viewing Scheduled', color: 'bg-purple-100 text-purple-800' },
  { value: 'viewing_completed', label: 'Viewing Completed', color: 'bg-indigo-100 text-indigo-800' },
  { value: 'proposal_sent', label: 'Proposal Sent', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'negotiating', label: 'Negotiating', color: 'bg-orange-100 text-orange-800' },
  { value: 'converted', label: 'Converted', color: 'bg-teal-100 text-teal-800' },
  { value: 'follow_up', label: 'Follow Up', color: 'bg-amber-100 text-amber-800' },
  { value: 'not_interested', label: 'Not Interested', color: 'bg-gray-100 text-gray-800' },
  { value: 'lost', label: 'Lost', color: 'bg-red-100 text-red-800' },
  { value: 'spam', label: 'Spam', color: 'bg-red-200 text-red-900' }
]

const priorityOptions = [
  { value: 'low', label: 'Low', color: 'bg-gray-100 text-gray-800' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
  { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-800' }
]

const inquiryTypes = [
  'general', 'property_info', 'viewing_request', 'price_inquiry', 'availability', 'mortgage_info', 'other'
]

const sourceOptions = [
  'website', 'website_form', 'phone', 'email', 'walk_in', 'social_media',
  'whatsapp', 'viber', 'referral', 'advertisement', 'property_portal', 'other'
]

const followUpTypes = ['call', 'email', 'meeting', 'viewing', 'other']

export default function InquiriesPage() {
  const params = useParams()
  const { toast } = useToast()
  const locale = params.locale as string || 'en'
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [agents, setAgents] = useState<Agent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteInquiry, setDeleteInquiry] = useState<Inquiry | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [editingInquiry, setEditingInquiry] = useState<Inquiry | null>(null)
  const [formData, setFormData] = useState(emptyInquiry)

  useEffect(() => {
    fetchInquiries()
    fetchProjects()
    fetchAgents()
  }, [])

  const fetchInquiries = async () => {
    try {
      const response = await fetch('/api/admin/inquiries')
      if (response.ok) {
        const data = await response.json()
        setInquiries(data)
      }
    } catch (error) {
      console.error('Failed to fetch inquiries:', error)
      toast({
        title: 'Error',
        description: 'Failed to load inquiries',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
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

  const handleOpenDialog = (inquiry?: Inquiry) => {
    if (inquiry) {
      setEditingInquiry(inquiry)
      setFormData({
        contact_name: inquiry.contact_name,
        contact_email: inquiry.contact_email || '',
        contact_phone: inquiry.contact_phone || '',
        project_id: inquiry.project_id || '',
        building_id: inquiry.building_id || '',
        unit_id: inquiry.unit_id || '',
        inquiry_type: inquiry.inquiry_type || 'general',
        message: inquiry.message || '',
        source: inquiry.source || 'website',
        source_url: inquiry.source_url || '',
        source_campaign: inquiry.source_campaign || '',
        assigned_agent_id: inquiry.assigned_agent_id || '',
        status: inquiry.status || 'new',
        priority: inquiry.priority || 'medium',
        next_follow_up_date: inquiry.next_follow_up_date || '',
        next_follow_up_type: inquiry.next_follow_up_type || '',
        budget_range: inquiry.budget_range || '',
        timeline: inquiry.timeline || '',
        notes: inquiry.notes || ''
      })
    } else {
      setEditingInquiry(null)
      setFormData(emptyInquiry)
    }
    setShowDialog(true)
  }

  const handleSubmit = async () => {
    if (!formData.contact_name) {
      toast({
        title: 'Error',
        description: 'Contact name is required',
        variant: 'destructive'
      })
      return
    }

    setIsSubmitting(true)
    try {
      const url = editingInquiry
        ? `/api/admin/inquiries/${editingInquiry.id}`
        : '/api/admin/inquiries'
      const method = editingInquiry ? 'PUT' : 'POST'

      const payload = {
        ...formData,
        project_id: formData.project_id || null,
        building_id: formData.building_id || null,
        unit_id: formData.unit_id || null,
        assigned_agent_id: formData.assigned_agent_id || null,
        next_follow_up_date: formData.next_follow_up_date || null,
        next_follow_up_type: formData.next_follow_up_type || null
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        const savedInquiry = await response.json()
        if (editingInquiry) {
          setInquiries(prev => prev.map(i => i.id === savedInquiry.id ? savedInquiry : i))
        } else {
          setInquiries(prev => [savedInquiry, ...prev])
        }
        setShowDialog(false)
        toast({
          title: 'Success',
          description: editingInquiry ? 'Inquiry updated successfully' : 'Inquiry created successfully'
        })
      } else {
        const error = await response.json()
        throw new Error(error.message || 'Failed to save inquiry')
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save inquiry',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteInquiry) return

    try {
      const response = await fetch(`/api/admin/inquiries/${deleteInquiry.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setInquiries(prev => prev.filter(i => i.id !== deleteInquiry.id))
        toast({
          title: 'Success',
          description: 'Inquiry deleted successfully'
        })
      } else {
        const error = await response.json()
        throw new Error(error.message || 'Failed to delete')
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete inquiry',
        variant: 'destructive'
      })
    } finally {
      setDeleteInquiry(null)
    }
  }

  const isOverdue = (followUpDate: string | null) => {
    if (!followUpDate) return false
    return new Date(followUpDate) < new Date()
  }

  const columns: Column<Inquiry>[] = [
    {
      key: 'inquiry_number',
      title: 'Inquiry #',
      render: (inquiry) => (
        <span className="font-mono text-sm">{inquiry.inquiry_number || '-'}</span>
      )
    },
    {
      key: 'contact_name',
      title: 'Contact',
      render: (inquiry) => (
        <div>
          <span className="font-medium">{inquiry.contact_name}</span>
          <div className="space-y-1 mt-1">
            {inquiry.contact_email && (
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Mail className="h-3 w-3" />
                {inquiry.contact_email}
              </div>
            )}
            {inquiry.contact_phone && (
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Phone className="h-3 w-3" />
                {inquiry.contact_phone}
              </div>
            )}
          </div>
        </div>
      )
    },
    {
      key: 'project_name',
      title: 'Interest',
      render: (inquiry) => (
        <div className="space-y-1">
          {inquiry.project_name && (
            <div className="flex items-center gap-1 text-sm">
              <Building className="h-3 w-3 text-gray-400" />
              {inquiry.project_name}
            </div>
          )}
          <Badge variant="outline" className="text-xs">
            {inquiry.inquiry_type.replace(/_/g, ' ')}
          </Badge>
        </div>
      )
    },
    {
      key: 'source',
      title: 'Source',
      render: (inquiry) => (
        <span className="text-sm text-gray-600 capitalize">
          {inquiry.source.replace(/_/g, ' ')}
        </span>
      )
    },
    {
      key: 'next_follow_up_date',
      title: 'Follow Up',
      render: (inquiry) => {
        if (!inquiry.next_follow_up_date) return <span className="text-gray-400">-</span>
        const overdue = isOverdue(inquiry.next_follow_up_date)
        return (
          <div className={`flex items-center gap-1 text-sm ${overdue ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
            {overdue && <AlertCircle className="h-3 w-3" />}
            <Calendar className="h-3 w-3" />
            {new Date(inquiry.next_follow_up_date).toLocaleDateString()}
          </div>
        )
      }
    },
    {
      key: 'status',
      title: 'Status',
      render: (inquiry) => {
        const status = statusOptions.find(s => s.value === inquiry.status)
        return (
          <Badge className={status?.color || 'bg-gray-100 text-gray-800'}>
            {status?.label || inquiry.status}
          </Badge>
        )
      }
    },
    {
      key: 'priority',
      title: 'Priority',
      render: (inquiry) => {
        const priority = priorityOptions.find(p => p.value === inquiry.priority)
        return (
          <Badge variant="outline" className={priority?.color || ''}>
            {priority?.label || inquiry.priority}
          </Badge>
        )
      }
    }
  ]

  return (
    <>
      <PageHeader
        title="Inquiries"
        description="Manage leads and property inquiries"
        action={{
          label: 'Add Inquiry',
          onClick: () => handleOpenDialog()
        }}
      />

      <DataTable
        columns={columns}
        data={inquiries}
        searchKey="contact_name"
        searchPlaceholder="Search by contact name..."
        isLoading={isLoading}
        emptyMessage="No inquiries found. Add your first inquiry."
        onEdit={(inquiry) => handleOpenDialog(inquiry)}
        onDelete={(inquiry) => setDeleteInquiry(inquiry)}
      />

      {/* Add/Edit Inquiry Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingInquiry ? 'Edit Inquiry' : 'Add Inquiry'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-700">Contact Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="contact_name">Contact Name *</Label>
                  <Input
                    id="contact_name"
                    value={formData.contact_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, contact_name: e.target.value }))}
                    placeholder="John Doe"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact_email">Email</Label>
                  <Input
                    id="contact_email"
                    type="email"
                    value={formData.contact_email}
                    onChange={(e) => setFormData(prev => ({ ...prev, contact_email: e.target.value }))}
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact_phone">Phone</Label>
                  <Input
                    id="contact_phone"
                    value={formData.contact_phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, contact_phone: e.target.value }))}
                    placeholder="+381 ..."
                  />
                </div>
              </div>
            </div>

            {/* Inquiry Details */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-700">Inquiry Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="inquiry_type">Inquiry Type</Label>
                  <Select
                    value={formData.inquiry_type}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, inquiry_type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {inquiryTypes.map(type => (
                        <SelectItem key={type} value={type}>
                          {type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project_id">Project Interest</Label>
                  <Select
                    value={formData.project_id}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, project_id: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">No specific project</SelectItem>
                      {projects.map(project => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Inquiry message or details..."
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget_range">Budget Range</Label>
                  <Input
                    id="budget_range"
                    value={formData.budget_range}
                    onChange={(e) => setFormData(prev => ({ ...prev, budget_range: e.target.value }))}
                    placeholder="e.g. 80,000 - 120,000 EUR"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeline">Timeline</Label>
                  <Input
                    id="timeline"
                    value={formData.timeline}
                    onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
                    placeholder="e.g. 3-6 months"
                  />
                </div>
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
                      <SelectItem value="">Unassigned</SelectItem>
                      {agents.map(agent => (
                        <SelectItem key={agent.id} value={agent.id}>
                          {agent.first_name} {agent.last_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Status & Follow-up */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-700">Status & Follow-up</h3>
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="next_follow_up_date">Next Follow-up Date</Label>
                  <Input
                    id="next_follow_up_date"
                    type="date"
                    value={formData.next_follow_up_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, next_follow_up_date: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="next_follow_up_type">Follow-up Type</Label>
                  <Select
                    value={formData.next_follow_up_type}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, next_follow_up_type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      {followUpTypes.map(type => (
                        <SelectItem key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
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
                <Label htmlFor="notes">Internal Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Internal notes about this inquiry..."
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
              {editingInquiry ? 'Save Changes' : 'Add Inquiry'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteInquiry} onOpenChange={() => setDeleteInquiry(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Inquiry</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete inquiry "{deleteInquiry?.inquiry_number}"?
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
