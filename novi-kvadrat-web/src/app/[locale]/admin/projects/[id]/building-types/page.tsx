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
import { Loader2 } from 'lucide-react'
import { BuildingType } from '@/types/database'

const emptyBuildingType = {
  name: '',
  name_sr: '',
  description: '',
  color: '#3B82F6'
}

export default function BuildingTypesPage() {
  const params = useParams()
  const projectId = params.id as string
  const locale = params.locale as string || 'en'
  const { toast } = useToast()

  const [buildingTypes, setBuildingTypes] = useState<BuildingType[]>([])
  const [projectName, setProjectName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteType, setDeleteType] = useState<BuildingType | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [editingType, setEditingType] = useState<BuildingType | null>(null)
  const [formData, setFormData] = useState(emptyBuildingType)

  useEffect(() => {
    fetchBuildingTypes()
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

  const fetchBuildingTypes = async () => {
    try {
      const response = await fetch(`/api/admin/projects/${projectId}/building-types`)
      if (response.ok) {
        const data = await response.json()
        setBuildingTypes(data)
      }
    } catch (error) {
      console.error('Failed to fetch building types:', error)
      toast({
        title: 'Error',
        description: 'Failed to load building types',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenDialog = (type?: BuildingType) => {
    if (type) {
      setEditingType(type)
      setFormData({
        name: type.name,
        name_sr: type.name_sr || '',
        description: type.description || '',
        color: type.color || '#3B82F6'
      })
    } else {
      setEditingType(null)
      setFormData(emptyBuildingType)
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
        ? `/api/admin/projects/${projectId}/building-types/${editingType.id}`
        : `/api/admin/projects/${projectId}/building-types`

      const response = await fetch(url, {
        method: editingType ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const savedType = await response.json()
        if (editingType) {
          setBuildingTypes(prev => prev.map(t => t.id === savedType.id ? savedType : t))
        } else {
          setBuildingTypes(prev => [...prev, savedType])
        }
        setShowDialog(false)
        toast({
          title: 'Success',
          description: `Building type ${editingType ? 'updated' : 'created'} successfully`
        })
      } else {
        const error = await response.json()
        throw new Error(error.error || 'Failed to save building type')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save building type',
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
        `/api/admin/projects/${projectId}/building-types/${deleteType.id}`,
        { method: 'DELETE' }
      )

      if (response.ok) {
        setBuildingTypes(prev => prev.filter(t => t.id !== deleteType.id))
        toast({
          title: 'Success',
          description: 'Building type deleted successfully'
        })
      } else {
        throw new Error('Failed to delete')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete building type',
        variant: 'destructive'
      })
    } finally {
      setDeleteType(null)
    }
  }

  const columns: Column<BuildingType>[] = [
    {
      key: 'color',
      title: 'Color',
      className: 'w-[60px]',
      render: (type) => (
        <div
          className="w-6 h-6 rounded border"
          style={{ backgroundColor: type.color || '#3B82F6' }}
        />
      )
    },
    {
      key: 'name',
      title: 'Name',
      render: (type) => <span className="font-medium">{type.name}</span>
    },
    {
      key: 'name_sr',
      title: 'Serbian Name',
      render: (type) => type.name_sr || '-'
    },
    {
      key: 'description',
      title: 'Description',
      render: (type) => (
        <span className="text-gray-500 truncate max-w-[200px] block">
          {type.description || '-'}
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
        title="Building Types"
        description={`Configure building categories for: ${projectName}`}
        backHref={`/${locale}/admin/projects/${projectId}`}
        action={{
          label: 'Add Type',
          onClick: () => handleOpenDialog()
        }}
      />

      <DataTable
        columns={columns}
        data={buildingTypes}
        searchKey="name"
        searchPlaceholder="Search building types..."
        isLoading={isLoading}
        emptyMessage="No building types configured. Add your first building type."
        onEdit={(type) => handleOpenDialog(type)}
        onDelete={(type) => setDeleteType(type)}
      />

      {/* Building Type Form Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingType ? 'Edit Building Type' : 'Add Building Type'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Street Front, Central, Premium"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name_sr">Serbian Name</Label>
              <Input
                id="name_sr"
                value={formData.name_sr}
                onChange={(e) => setFormData(prev => ({ ...prev, name_sr: e.target.value }))}
                placeholder="e.g., Uličn Front, Centralni, Premium"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Optional description for this building type"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  id="color"
                  value={formData.color}
                  onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                  className="w-10 h-10 rounded border cursor-pointer"
                />
                <Input
                  value={formData.color}
                  onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                  placeholder="#3B82F6"
                  className="w-28"
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
              {editingType ? 'Save Changes' : 'Add Type'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteType} onOpenChange={() => setDeleteType(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Building Type</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteType?.name}"?
              Buildings using this type will no longer be categorized.
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
