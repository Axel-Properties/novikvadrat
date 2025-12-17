'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { PageHeader, DataTable, Column } from '@/components/admin'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { Loader2, Plus, Check, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface Layout {
  id: string
  name: string
  layout_type: string
  total_area: number
  living_area: number | null
  terrace_area: number | null
  bedrooms: number | null
  bathrooms: number | null
  has_terrace: boolean
  has_loggia: boolean
  price_from: number | null
  price_to: number | null
  floor_plan_url: string | null
  total_units: number | null
  available_units: number | null
}

const layoutTypes = [
  { value: 'garsonjera', label: 'Garsonjera (Studio)' },
  { value: 'jednosoban', label: 'Jednosoban (1 Bedroom)' },
  { value: 'jednoiposoban', label: 'Jednoiposoban (1.5 Bedroom)' },
  { value: 'dvosoban', label: 'Dvosoban (2 Bedroom)' },
  { value: 'dvoiposoban', label: 'Dvoiposoban (2.5 Bedroom)' },
  { value: 'trosoban', label: 'Trosoban (3 Bedroom)' },
  { value: 'troiposoban', label: 'Troiposoban (3.5 Bedroom)' },
  { value: 'cetvorosoban', label: 'Četvorosoban (4 Bedroom)' },
  { value: 'petosoban', label: 'Petosoban (5 Bedroom)' },
  { value: 'penthouse', label: 'Penthouse' },
]

const emptyLayout = {
  name: '',
  layout_type: 'jednosoban',
  total_area: '',
  living_area: '',
  terrace_area: '',
  bedrooms: '',
  bathrooms: '',
  has_terrace: false,
  has_loggia: false,
  price_from: '',
  price_to: '',
  floor_plan_url: '',
  total_units: '',
  available_units: ''
}

export default function ProjectLayoutsPage() {
  const params = useParams()
  const { toast } = useToast()
  const [layouts, setLayouts] = useState<Layout[]>([])
  const [projectName, setProjectName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteLayout, setDeleteLayout] = useState<Layout | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [editingLayout, setEditingLayout] = useState<Layout | null>(null)
  const [formData, setFormData] = useState(emptyLayout)

  useEffect(() => {
    fetchProjectAndLayouts()
  }, [params.id])

  const fetchProjectAndLayouts = async () => {
    try {
      const [projectRes, layoutsRes] = await Promise.all([
        fetch(`/api/admin/projects/${params.id}`),
        fetch(`/api/admin/projects/${params.id}/layouts`)
      ])

      if (projectRes.ok) {
        const project = await projectRes.json()
        setProjectName(project.name)
      }

      if (layoutsRes.ok) {
        const data = await layoutsRes.json()
        setLayouts(data)
      }
    } catch (error) {
      console.error('Failed to fetch:', error)
      toast({
        title: 'Error',
        description: 'Failed to load layouts',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenDialog = (layout?: Layout) => {
    if (layout) {
      setEditingLayout(layout)
      setFormData({
        name: layout.name,
        layout_type: layout.layout_type,
        total_area: layout.total_area?.toString() || '',
        living_area: layout.living_area?.toString() || '',
        terrace_area: layout.terrace_area?.toString() || '',
        bedrooms: layout.bedrooms?.toString() || '',
        bathrooms: layout.bathrooms?.toString() || '',
        has_terrace: layout.has_terrace,
        has_loggia: layout.has_loggia,
        price_from: layout.price_from?.toString() || '',
        price_to: layout.price_to?.toString() || '',
        floor_plan_url: layout.floor_plan_url || '',
        total_units: layout.total_units?.toString() || '',
        available_units: layout.available_units?.toString() || ''
      })
    } else {
      setEditingLayout(null)
      setFormData(emptyLayout)
    }
    setShowDialog(true)
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.total_area) {
      toast({
        title: 'Error',
        description: 'Name and total area are required',
        variant: 'destructive'
      })
      return
    }

    setIsSubmitting(true)
    try {
      const payload = {
        name: formData.name,
        layout_type: formData.layout_type,
        total_area: parseFloat(formData.total_area),
        living_area: formData.living_area ? parseFloat(formData.living_area) : null,
        terrace_area: formData.terrace_area ? parseFloat(formData.terrace_area) : null,
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
        has_terrace: formData.has_terrace,
        has_loggia: formData.has_loggia,
        price_from: formData.price_from ? parseFloat(formData.price_from) : null,
        price_to: formData.price_to ? parseFloat(formData.price_to) : null,
        floor_plan_url: formData.floor_plan_url || null,
        total_units: formData.total_units ? parseInt(formData.total_units) : null,
        available_units: formData.available_units ? parseInt(formData.available_units) : null
      }

      const url = editingLayout 
        ? `/api/admin/projects/${params.id}/layouts/${editingLayout.id}`
        : `/api/admin/projects/${params.id}/layouts`

      const response = await fetch(url, {
        method: editingLayout ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        const savedLayout = await response.json()
        if (editingLayout) {
          setLayouts(prev => prev.map(l => l.id === savedLayout.id ? savedLayout : l))
        } else {
          setLayouts(prev => [...prev, savedLayout])
        }
        setShowDialog(false)
        toast({
          title: 'Success',
          description: `Layout ${editingLayout ? 'updated' : 'added'} successfully`
        })
      } else {
        throw new Error('Failed to save layout')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save layout',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteLayout) return

    try {
      const response = await fetch(`/api/admin/projects/${params.id}/layouts/${deleteLayout.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setLayouts(prev => prev.filter(l => l.id !== deleteLayout.id))
        toast({
          title: 'Success',
          description: 'Layout deleted successfully'
        })
      } else {
        throw new Error('Failed to delete')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete layout',
        variant: 'destructive'
      })
    } finally {
      setDeleteLayout(null)
    }
  }

  const formatPrice = (price: number | null) => {
    if (!price) return '-'
    return new Intl.NumberFormat('sr-RS', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(price)
  }

  const columns: Column<Layout>[] = [
    {
      key: 'name',
      title: 'Name',
      render: (layout) => <span className="font-medium">{layout.name}</span>
    },
    {
      key: 'layout_type',
      title: 'Type',
      render: (layout) => (
        <Badge variant="outline">
          {layoutTypes.find(t => t.value === layout.layout_type)?.label || layout.layout_type}
        </Badge>
      )
    },
    {
      key: 'total_area',
      title: 'Area (m²)',
      render: (layout) => `${layout.total_area} m²`
    },
    {
      key: 'bedrooms',
      title: 'Bed/Bath',
      render: (layout) => `${layout.bedrooms || '-'} / ${layout.bathrooms || '-'}`
    },
    {
      key: 'price_from',
      title: 'Price Range',
      render: (layout) => `${formatPrice(layout.price_from)} - ${formatPrice(layout.price_to)}`
    },
    {
      key: 'units',
      title: 'Available',
      render: (layout) => (
        <span>{layout.available_units || 0} / {layout.total_units || 0}</span>
      )
    }
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    )
  }

  return (
    <>
      <PageHeader
        title="Project Layouts"
        description={`Managing layouts for: ${projectName}`}
        backHref={`/admin/projects/${params.id}`}
        action={{
          label: 'Add Layout',
          onClick: () => handleOpenDialog()
        }}
      />

      <DataTable
        columns={columns}
        data={layouts}
        searchKey="name"
        searchPlaceholder="Search layouts..."
        emptyMessage="No layouts added yet"
        onEdit={(layout) => handleOpenDialog(layout)}
        onDelete={(layout) => setDeleteLayout(layout)}
      />

      {/* Layout Form Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingLayout ? 'Edit Layout' : 'Add Layout'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., A1, B2"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="layout_type">Type *</Label>
                <Select 
                  value={formData.layout_type} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, layout_type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {layoutTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="total_area">Total Area (m²) *</Label>
                <Input
                  id="total_area"
                  type="number"
                  step="0.01"
                  value={formData.total_area}
                  onChange={(e) => setFormData(prev => ({ ...prev, total_area: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="living_area">Living Area (m²)</Label>
                <Input
                  id="living_area"
                  type="number"
                  step="0.01"
                  value={formData.living_area}
                  onChange={(e) => setFormData(prev => ({ ...prev, living_area: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="terrace_area">Terrace Area (m²)</Label>
                <Input
                  id="terrace_area"
                  type="number"
                  step="0.01"
                  value={formData.terrace_area}
                  onChange={(e) => setFormData(prev => ({ ...prev, terrace_area: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData(prev => ({ ...prev, bedrooms: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData(prev => ({ ...prev, bathrooms: e.target.value }))}
                />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <Switch
                  id="has_terrace"
                  checked={formData.has_terrace}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, has_terrace: checked }))}
                />
                <Label htmlFor="has_terrace">Has Terrace</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="has_loggia"
                  checked={formData.has_loggia}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, has_loggia: checked }))}
                />
                <Label htmlFor="has_loggia">Has Loggia</Label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price_from">Price From (EUR)</Label>
                <Input
                  id="price_from"
                  type="number"
                  value={formData.price_from}
                  onChange={(e) => setFormData(prev => ({ ...prev, price_from: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price_to">Price To (EUR)</Label>
                <Input
                  id="price_to"
                  type="number"
                  value={formData.price_to}
                  onChange={(e) => setFormData(prev => ({ ...prev, price_to: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="total_units">Total Units</Label>
                <Input
                  id="total_units"
                  type="number"
                  value={formData.total_units}
                  onChange={(e) => setFormData(prev => ({ ...prev, total_units: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="available_units">Available Units</Label>
                <Input
                  id="available_units"
                  type="number"
                  value={formData.available_units}
                  onChange={(e) => setFormData(prev => ({ ...prev, available_units: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="floor_plan_url">Floor Plan URL</Label>
              <Input
                id="floor_plan_url"
                type="url"
                value={formData.floor_plan_url}
                onChange={(e) => setFormData(prev => ({ ...prev, floor_plan_url: e.target.value }))}
                placeholder="https://..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {editingLayout ? 'Save Changes' : 'Add Layout'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteLayout} onOpenChange={() => setDeleteLayout(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Layout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteLayout?.name}"? This action cannot be undone.
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
