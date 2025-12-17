'use client'

import { useEffect, useState } from 'react'
import { PageHeader, DataTable, Column } from '@/components/admin'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { Loader2 } from 'lucide-react'

interface Amenity {
  id: string
  name_en: string
  name_sr: string
  icon: string | null
  category: string
  projects_count?: number
}

const categories = [
  { value: 'building', label: 'Building' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'location', label: 'Location' },
  { value: 'outdoor', label: 'Outdoor' },
  { value: 'security', label: 'Security' },
  { value: 'other', label: 'Other' },
]

const emptyAmenity = {
  name_en: '',
  name_sr: '',
  icon: '',
  category: 'building'
}

export default function AmenitiesPage() {
  const { toast } = useToast()
  const [amenities, setAmenities] = useState<Amenity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteAmenity, setDeleteAmenity] = useState<Amenity | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [editingAmenity, setEditingAmenity] = useState<Amenity | null>(null)
  const [formData, setFormData] = useState(emptyAmenity)
  const [filterCategory, setFilterCategory] = useState<string>('all')

  useEffect(() => {
    fetchAmenities()
  }, [])

  const fetchAmenities = async () => {
    try {
      const response = await fetch('/api/admin/amenities')
      if (response.ok) {
        const data = await response.json()
        setAmenities(data)
      }
    } catch (error) {
      console.error('Failed to fetch amenities:', error)
      toast({
        title: 'Error',
        description: 'Failed to load amenities',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenDialog = (amenity?: Amenity) => {
    if (amenity) {
      setEditingAmenity(amenity)
      setFormData({
        name_en: amenity.name_en,
        name_sr: amenity.name_sr,
        icon: amenity.icon || '',
        category: amenity.category
      })
    } else {
      setEditingAmenity(null)
      setFormData(emptyAmenity)
    }
    setShowDialog(true)
  }

  const handleSubmit = async () => {
    if (!formData.name_en || !formData.name_sr) {
      toast({
        title: 'Error',
        description: 'English and Serbian names are required',
        variant: 'destructive'
      })
      return
    }

    setIsSubmitting(true)
    try {
      const url = editingAmenity 
        ? `/api/admin/amenities/${editingAmenity.id}`
        : '/api/admin/amenities'

      const response = await fetch(url, {
        method: editingAmenity ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const savedAmenity = await response.json()
        if (editingAmenity) {
          setAmenities(prev => prev.map(a => a.id === savedAmenity.id ? savedAmenity : a))
        } else {
          setAmenities(prev => [...prev, savedAmenity])
        }
        setShowDialog(false)
        toast({
          title: 'Success',
          description: `Amenity ${editingAmenity ? 'updated' : 'created'} successfully`
        })
      } else {
        throw new Error('Failed to save amenity')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save amenity',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteAmenity) return

    try {
      const response = await fetch(`/api/admin/amenities/${deleteAmenity.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setAmenities(prev => prev.filter(a => a.id !== deleteAmenity.id))
        toast({
          title: 'Success',
          description: 'Amenity deleted successfully'
        })
      } else {
        throw new Error('Failed to delete')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete amenity',
        variant: 'destructive'
      })
    } finally {
      setDeleteAmenity(null)
    }
  }

  const filteredAmenities = filterCategory === 'all' 
    ? amenities 
    : amenities.filter(a => a.category === filterCategory)

  const columns: Column<Amenity>[] = [
    {
      key: 'icon',
      title: 'Icon',
      className: 'w-[60px]',
      render: (amenity) => (
        <span className="text-xl">{amenity.icon || '•'}</span>
      )
    },
    {
      key: 'name_en',
      title: 'Name (EN)',
      render: (amenity) => <span className="font-medium">{amenity.name_en}</span>
    },
    {
      key: 'name_sr',
      title: 'Name (SR)'
    },
    {
      key: 'category',
      title: 'Category',
      render: (amenity) => (
        <Badge variant="outline" className="capitalize">
          {amenity.category}
        </Badge>
      )
    },
    {
      key: 'projects_count',
      title: 'Used In',
      render: (amenity) => (
        <span className="text-gray-500">{amenity.projects_count || 0} projects</span>
      )
    }
  ]

  return (
    <>
      <PageHeader
        title="Amenities"
        description="Manage amenities that can be assigned to projects"
        action={{
          label: 'Add Amenity',
          onClick: () => handleOpenDialog()
        }}
      >
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </PageHeader>

      <DataTable
        columns={columns}
        data={filteredAmenities}
        searchKey="name_en"
        searchPlaceholder="Search amenities..."
        isLoading={isLoading}
        emptyMessage="No amenities found. Add your first amenity."
        onEdit={(amenity) => handleOpenDialog(amenity)}
        onDelete={(amenity) => setDeleteAmenity(amenity)}
      />

      {/* Amenity Form Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingAmenity ? 'Edit Amenity' : 'Add Amenity'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name_en">Name (English) *</Label>
              <Input
                id="name_en"
                value={formData.name_en}
                onChange={(e) => setFormData(prev => ({ ...prev, name_en: e.target.value }))}
                placeholder="e.g., Swimming Pool"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name_sr">Name (Serbian) *</Label>
              <Input
                id="name_sr"
                value={formData.name_sr}
                onChange={(e) => setFormData(prev => ({ ...prev, name_sr: e.target.value }))}
                placeholder="e.g., Bazen"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="icon">Icon (emoji or text)</Label>
              <Input
                id="icon"
                value={formData.icon}
                onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                placeholder="e.g., 🏊 or pool"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {editingAmenity ? 'Save Changes' : 'Add Amenity'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteAmenity} onOpenChange={() => setDeleteAmenity(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Amenity</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteAmenity?.name_en}"? 
              This will remove it from all projects that use it.
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
