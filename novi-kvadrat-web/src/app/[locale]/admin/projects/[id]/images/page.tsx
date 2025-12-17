'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { PageHeader } from '@/components/admin'
import { Card, CardContent } from '@/components/ui/card'
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
import { Loader2, Plus, Trash2, Star, GripVertical } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface ProjectImage {
  id: string
  url: string
  caption: string | null
  image_type: string
  is_primary: boolean
  sort_order: number
}

const imageTypes = [
  { value: 'exterior', label: 'Exterior' },
  { value: 'interior', label: 'Interior' },
  { value: 'floor_plan', label: 'Floor Plan' },
  { value: 'location', label: 'Location' },
  { value: 'construction', label: 'Construction' },
  { value: 'amenity', label: 'Amenity' },
]

export default function ProjectImagesPage() {
  const params = useParams()
  const { toast } = useToast()
  const [images, setImages] = useState<ProjectImage[]>([])
  const [projectName, setProjectName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteImage, setDeleteImage] = useState<ProjectImage | null>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [newImage, setNewImage] = useState({
    url: '',
    caption: '',
    image_type: 'exterior',
    is_primary: false
  })

  useEffect(() => {
    fetchProjectAndImages()
  }, [params.id])

  const fetchProjectAndImages = async () => {
    try {
      const [projectRes, imagesRes] = await Promise.all([
        fetch(`/api/admin/projects/${params.id}`),
        fetch(`/api/admin/projects/${params.id}/images`)
      ])

      if (projectRes.ok) {
        const project = await projectRes.json()
        setProjectName(project.name)
      }

      if (imagesRes.ok) {
        const data = await imagesRes.json()
        setImages(data)
      }
    } catch (error) {
      console.error('Failed to fetch:', error)
      toast({
        title: 'Error',
        description: 'Failed to load images',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddImage = async () => {
    if (!newImage.url) {
      toast({
        title: 'Error',
        description: 'Image URL is required',
        variant: 'destructive'
      })
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/admin/projects/${params.id}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newImage)
      })

      if (response.ok) {
        const addedImage = await response.json()
        setImages(prev => [...prev, addedImage])
        setShowAddDialog(false)
        setNewImage({ url: '', caption: '', image_type: 'exterior', is_primary: false })
        toast({
          title: 'Success',
          description: 'Image added successfully'
        })
      } else {
        throw new Error('Failed to add image')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add image',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteImage) return

    try {
      const response = await fetch(`/api/admin/projects/${params.id}/images/${deleteImage.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setImages(prev => prev.filter(img => img.id !== deleteImage.id))
        toast({
          title: 'Success',
          description: 'Image deleted successfully'
        })
      } else {
        throw new Error('Failed to delete')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete image',
        variant: 'destructive'
      })
    } finally {
      setDeleteImage(null)
    }
  }

  const handleSetPrimary = async (imageId: string) => {
    try {
      const response = await fetch(`/api/admin/projects/${params.id}/images/${imageId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_primary: true })
      })

      if (response.ok) {
        setImages(prev => prev.map(img => ({
          ...img,
          is_primary: img.id === imageId
        })))
        toast({
          title: 'Success',
          description: 'Primary image updated'
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update primary image',
        variant: 'destructive'
      })
    }
  }

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
        title="Project Images"
        description={`Managing images for: ${projectName}`}
        backHref={`/admin/projects/${params.id}`}
        action={{
          label: 'Add Image',
          onClick: () => setShowAddDialog(true)
        }}
      />

      {images.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-gray-500 mb-4">No images uploaded yet</p>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add First Image
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden group">
              <div className="relative aspect-video bg-gray-100">
                <img
                  src={image.url}
                  alt={image.caption || 'Project image'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-image.png'
                  }}
                />
                {image.is_primary && (
                  <Badge className="absolute top-2 left-2 bg-yellow-500">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    Primary
                  </Badge>
                )}
                <Badge className="absolute top-2 right-2" variant="secondary">
                  {imageTypes.find(t => t.value === image.image_type)?.label || image.image_type}
                </Badge>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  {!image.is_primary && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleSetPrimary(image.id)}
                    >
                      <Star className="h-4 w-4 mr-1" />
                      Set Primary
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => setDeleteImage(image)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {image.caption && (
                <CardContent className="p-3">
                  <p className="text-sm text-gray-600 truncate">{image.caption}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Add Image Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Image</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url">Image URL *</Label>
              <Input
                id="url"
                value={newImage.url}
                onChange={(e) => setNewImage(prev => ({ ...prev, url: e.target.value }))}
                placeholder="https://..."
              />
              {newImage.url && (
                <div className="mt-2">
                  <img 
                    src={newImage.url} 
                    alt="Preview" 
                    className="h-32 w-auto rounded border"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="caption">Caption</Label>
              <Input
                id="caption"
                value={newImage.caption}
                onChange={(e) => setNewImage(prev => ({ ...prev, caption: e.target.value }))}
                placeholder="Optional caption"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image_type">Image Type</Label>
              <Select 
                value={newImage.image_type} 
                onValueChange={(value) => setNewImage(prev => ({ ...prev, image_type: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {imageTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddImage} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Add Image
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteImage} onOpenChange={() => setDeleteImage(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Image</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this image? This action cannot be undone.
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
