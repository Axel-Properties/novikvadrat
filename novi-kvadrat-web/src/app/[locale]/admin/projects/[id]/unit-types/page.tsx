'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { PageHeader, DataTable, Column } from '@/components/admin'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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
import { Loader2, Home } from 'lucide-react'
import { UnitType } from '@/types/database'

const emptyUnitType = {
  name: '',
  name_sr: '',
  description: '',
  default_price_multiplier: 1,
  sort_order: 0
}

export default function UnitTypesPage() {
  const params = useParams()
  const projectId = params.id as string
  const locale = params.locale as string || 'en'
  const { toast } = useToast()

  const [unitTypes, setUnitTypes] = useState<UnitType[]>([])
  const [projectName, setProjectName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteType, setDeleteType] = useState<UnitType | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [editingType, setEditingType] = useState<UnitType | null>(null)
  const [formData, setFormData] = useState(emptyUnitType)

  useEffect(() => {
    fetchUnitTypes()
    fetchProjectName()
  }, [projectId])

  const fetchProjectName = async () => {
    try {
      const response = await fetch(`/api/admin/projects/${projectId}`)
      if (response.ok) {
        const data = await response.json()
        setProjectName(data.name)
      }
    } catch (error) {
      console.error('Failed to fetch project:', error)
    }
  }

  const fetchUnitTypes = async () => {
    try {
      const response = await fetch(`/api/admin/projects/${projectId}/unit-types`)
      if (response.ok) {
        const data = await response.json()
        setUnitTypes(data)
      }
    } catch (error) {
      console.error('Failed to fetch unit types:', error)
      toast({
        title: 'Error',
        description: 'Failed to load unit types',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenDialog = (type?: UnitType) => {
    if (type) {
      setEditingType(type)
      setFormData({
        name: type.name,
        name_sr: type.name_sr || '',
        description: type.description || '',
        default_price_multiplier: type.default_price_multiplier || 1,
        sort_order: type.sort_order || 0
      })
    } else {
      setEditingType(null)
      setFormData(emptyUnitType)
    }
    setShowDialog(true)
  }

  const handleSubmit = async () => {
    if (!formData.name) {
      toast({
        title: 'Error',
        description: 'Name is required',
        variant: 'destructive'
      })
      return
    }

    setIsSubmitting(true)
    try {
      const url = editingType
        ? `/api/admin/projects/${projectId}/unit-types/${editingType.id}`
        : `/api/admin/projects/${projectId}/unit-types`

      const response = await fetch(url, {
        method: editingType ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          default_price_multiplier: parseFloat(String(formData.default_price_multiplier)) || 1,
          sort_order: parseInt(String(formData.sort_order)) || 0
        })
      })

      if (response.ok) {
        const savedType = await response.json()
        if (editingType) {
          setUnitTypes(prev => prev.map(t => t.id === savedType.id ? savedType : t))
        } else {
          setUnitTypes(prev => [...prev, savedType])
        }
        setShowDialog(false)
        toast({
          title: 'Success',
          description: `Unit type ${editingType ? 'updated' : 'created'} successfully`
        })
      } else {
        const error = await response.json()
        throw new Error(error.error || 'Failed to save unit type')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save unit type',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteType) return

    try {
      const response = await fetch(
        `/api/admin/projects/${projectId}/unit-types/${deleteType.id}`,
        { method: 'DELETE' }
      )

      if (response.ok) {
        setUnitTypes(prev => prev.filter(t => t.id !== deleteType.id))
        toast({
          title: 'Success',
          description: 'Unit type deleted successfully'
        })
      } else {
        throw new Error('Failed to delete')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete unit type',
        variant: 'destructive'
      })
    } finally {
      setDeleteType(null)
    }
  }

  const columns: Column<UnitType>[] = [
    {
      key: 'name',
      title: 'Name',
      render: (type) => (
        <div className="flex items-center gap-2">
          <Home className="h-4 w-4 text-gray-400" />
          <span className="font-medium">{type.name}</span>
        </div>
      )
    },
    {
      key: 'name_sr',
      title: 'Serbian Name',
      render: (type) => type.name_sr || '-'
    },
    {
      key: 'default_price_multiplier',
      title: 'Price Multiplier',
      render: (type) => (
        <span className={type.default_price_multiplier !== 1 ? 'text-blue-600 font-medium' : ''}>
          {type.default_price_multiplier?.toFixed(2) || '1.00'}x
        </span>
      )
    },
    {
      key: 'sort_order',
      title: 'Order',
      className: 'w-[80px]'
    }
  ]

  return (
    <>
      <PageHeader
        title="Unit Types"
        description={`Configure unit categories for: ${projectName}`}
        backHref={`/${locale}/admin/projects/${projectId}`}
        action={{
          label: 'Add Unit Type',
          onClick: () => handleOpenDialog()
        }}
      />

      <DataTable
        columns={columns}
        data={unitTypes}
        searchKey="name"
        searchPlaceholder="Search unit types..."
        isLoading={isLoading}
        emptyMessage="No unit types configured. Add your first unit type."
        onEdit={(type) => handleOpenDialog(type)}
        onDelete={(type) => setDeleteType(type)}
      />

      {/* Unit Type Form Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingType ? 'Edit Unit Type' : 'Add Unit Type'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Studio, Apartment"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name_sr">Serbian Name</Label>
              <Input
                id="name_sr"
                value={formData.name_sr}
                onChange={(e) => setFormData(prev => ({ ...prev, name_sr: e.target.value }))}
                placeholder="e.g., Garsonjera, Stan"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Optional description for this unit type"
                rows={2}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="default_price_multiplier">Price Multiplier</Label>
                <Input
                  id="default_price_multiplier"
                  type="number"
                  step="0.01"
                  min="0.1"
                  max="10"
                  value={formData.default_price_multiplier}
                  onChange={(e) => setFormData(prev => ({ ...prev, default_price_multiplier: parseFloat(e.target.value) || 1 }))}
                  placeholder="1.00"
                />
                <p className="text-xs text-gray-500">Affects unit pricing calculations</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sort_order">Sort Order</Label>
                <Input
                  id="sort_order"
                  type="number"
                  min="0"
                  value={formData.sort_order}
                  onChange={(e) => setFormData(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                  placeholder="0"
                />
                <p className="text-xs text-gray-500">Lower = appears first</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {editingType ? 'Save Changes' : 'Add Type'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteType} onOpenChange={() => setDeleteType(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Unit Type</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteType?.name}"?
              Units using this type will no longer be categorized.
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
