'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { PageHeader, ProjectSubNav } from '@/components/admin'
import { FileUpload } from '@/components/admin/file-upload'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { Loader2, Plus, Trash2, Camera, Images, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

interface ConstructionProgressSpot {
  id: string
  name: string
  description: string | null
  start_date: string | null
  latest_date: string | null
  cover_image_url: string | null
  sort_order: number
  photo_count?: number
  photos?: ConstructionProgressPhoto[]
}

interface ConstructionProgressPhoto {
  id: string
  url: string
  caption: string | null
  taken_at: string
  sort_order: number
}

export default function ProjectProgressPage() {
  const params = useParams()
  const { toast } = useToast()
  const [spots, setSpots] = useState<ConstructionProgressSpot[]>([])
  const [projectName, setProjectName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteSpot, setDeleteSpot] = useState<ConstructionProgressSpot | null>(null)
  const [showAddSpotDialog, setShowAddSpotDialog] = useState(false)
  const [showPhotoDialog, setShowPhotoDialog] = useState(false)
  const [selectedSpot, setSelectedSpot] = useState<ConstructionProgressSpot | null>(null)
  const [newSpot, setNewSpot] = useState({
    name: '',
    description: '',
    start_date: '',
    cover_image_url: ''
  })
  const [newPhoto, setNewPhoto] = useState({
    url: '',
    caption: '',
    taken_at: new Date().toISOString().split('T')[0]
  })

  useEffect(() => {
    fetchProjectAndSpots()
  }, [params.id])

  const fetchProjectAndSpots = async () => {
    try {
      const [projectRes, spotsRes] = await Promise.all([
        fetch(`/api/admin/projects/${params.id}`),
        fetch(`/api/admin/projects/${params.id}/progress`)
      ])

      if (projectRes.ok) {
        const project = await projectRes.json()
        setProjectName(project.name)
      }

      if (spotsRes.ok) {
        const data = await spotsRes.json()
        setSpots(data || [])
      }
    } catch (error) {
      console.error('Failed to fetch:', error)
      toast({
        title: 'Error',
        description: 'Failed to load construction progress',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddSpot = async () => {
    if (!newSpot.name) {
      toast({
        title: 'Error',
        description: 'Spot name is required',
        variant: 'destructive'
      })
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/admin/projects/${params.id}/progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSpot)
      })

      if (response.ok) {
        const addedSpot = await response.json()
        setSpots(prev => [...prev, addedSpot])
        setShowAddSpotDialog(false)
        setNewSpot({ name: '', description: '', start_date: '', cover_image_url: '' })
        toast({
          title: 'Success',
          description: 'Progress spot added successfully'
        })
      } else {
        throw new Error('Failed to add spot')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add progress spot',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddPhoto = async () => {
    if (!selectedSpot || !newPhoto.url) {
      toast({
        title: 'Error',
        description: 'Please upload a photo',
        variant: 'destructive'
      })
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/admin/projects/${params.id}/progress/${selectedSpot.id}/photos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPhoto)
      })

      if (response.ok) {
        await fetchProjectAndSpots()
        setShowPhotoDialog(false)
        setNewPhoto({ url: '', caption: '', taken_at: new Date().toISOString().split('T')[0] })
        toast({
          title: 'Success',
          description: 'Photo added successfully'
        })
      } else {
        throw new Error('Failed to add photo')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add photo',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteSpot) return

    try {
      const response = await fetch(`/api/admin/projects/${params.id}/progress/${deleteSpot.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setSpots(prev => prev.filter(spot => spot.id !== deleteSpot.id))
        toast({
          title: 'Success',
          description: 'Progress spot deleted successfully'
        })
      } else {
        throw new Error('Failed to delete')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete progress spot',
        variant: 'destructive'
      })
    } finally {
      setDeleteSpot(null)
    }
  }

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'N/A'
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
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
        title="Construction Progress"
        description={projectName}
        backHref={`/admin/projects/${params.id}`}
        action={{
          label: 'Add Spot',
          onClick: () => setShowAddSpotDialog(true)
        }}
      />

      <ProjectSubNav />

      {spots.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Camera className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500 mb-4">No construction progress spots yet</p>
            <Button onClick={() => setShowAddSpotDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add First Spot
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {spots.map((spot) => (
            <Card key={spot.id} className="overflow-hidden group">
              <div className="relative aspect-[4/3] bg-gray-100">
                {spot.cover_image_url ? (
                  <Image
                    src={spot.cover_image_url}
                    alt={spot.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Camera className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                {spot.photo_count && spot.photo_count > 0 && (
                  <Badge className="absolute top-2 right-2 bg-gray-900/80 text-white">
                    <Images className="h-3 w-3 mr-1" />
                    {spot.photo_count} photos
                  </Badge>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      setSelectedSpot(spot)
                      setShowPhotoDialog(true)
                    }}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Photo
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => setDeleteSpot(spot)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">{spot.name}</h3>
                {spot.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{spot.description}</p>
                )}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(spot.start_date)}
                  </div>
                  {spot.latest_date && spot.latest_date !== spot.start_date && (
                    <span>→ {formatDate(spot.latest_date)}</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Spot Dialog */}
      <Dialog open={showAddSpotDialog} onOpenChange={setShowAddSpotDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Construction Progress Spot</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Spot Name *</Label>
              <Input
                id="name"
                value={newSpot.name}
                onChange={(e) => setNewSpot(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Main View, Building A, etc."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newSpot.description}
                onChange={(e) => setNewSpot(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Optional description"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="start_date">Start Date</Label>
              <Input
                id="start_date"
                type="date"
                value={newSpot.start_date}
                onChange={(e) => setNewSpot(prev => ({ ...prev, start_date: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Cover Image</Label>
              <FileUpload
                value={newSpot.cover_image_url}
                onChange={(url) => setNewSpot(prev => ({ ...prev, cover_image_url: url }))}
                folder="construction-progress"
                accept="image/*"
                placeholder="Upload cover image"
                showPreview={true}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddSpotDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSpot} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Add Spot
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Photo Dialog */}
      <Dialog open={showPhotoDialog} onOpenChange={setShowPhotoDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Photo to {selectedSpot?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Photo *</Label>
              <FileUpload
                value={newPhoto.url}
                onChange={(url) => setNewPhoto(prev => ({ ...prev, url }))}
                folder="construction-progress"
                accept="image/*"
                placeholder="Upload progress photo"
                showPreview={true}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="caption">Caption</Label>
              <Input
                id="caption"
                value={newPhoto.caption}
                onChange={(e) => setNewPhoto(prev => ({ ...prev, caption: e.target.value }))}
                placeholder="Optional caption"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taken_at">Date Taken</Label>
              <Input
                id="taken_at"
                type="date"
                value={newPhoto.taken_at}
                onChange={(e) => setNewPhoto(prev => ({ ...prev, taken_at: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPhotoDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddPhoto} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Add Photo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteSpot} onOpenChange={() => setDeleteSpot(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Progress Spot</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteSpot?.name}"? This will also delete all photos associated with this spot. This action cannot be undone.
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
