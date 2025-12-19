'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { PageHeader, ProjectSubNav } from '@/components/admin'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'
import { Loader2, Search, Check } from 'lucide-react'

interface Amenity {
  id: string
  name_en: string
  name_sr: string
  icon: string | null
  category: string
}

interface ProjectAmenity {
  amenity_id: string
}

const categoryLabels: Record<string, string> = {
  building: 'Building Amenities',
  apartment: 'Apartment Amenities',
  location: 'Location Amenities',
  outdoor: 'Outdoor Amenities',
  security: 'Security Amenities',
  other: 'Other Amenities'
}

export default function ProjectAmenitiesPage() {
  const params = useParams()
  const { toast } = useToast()
  const [amenities, setAmenities] = useState<Amenity[]>([])
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [projectName, setProjectName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchData()
  }, [params.id])

  const fetchData = async () => {
    try {
      const [projectRes, amenitiesRes, projectAmenitiesRes] = await Promise.all([
        fetch(`/api/admin/projects/${params.id}`),
        fetch('/api/admin/amenities'),
        fetch(`/api/admin/projects/${params.id}/amenities`)
      ])

      if (projectRes.ok) {
        const project = await projectRes.json()
        setProjectName(project.name)
      }

      if (amenitiesRes.ok) {
        const data = await amenitiesRes.json()
        setAmenities(data)
      }

      if (projectAmenitiesRes.ok) {
        const data: ProjectAmenity[] = await projectAmenitiesRes.json()
        setSelectedIds(new Set(data.map(pa => pa.amenity_id)))
      }
    } catch (error) {
      console.error('Failed to fetch:', error)
      toast({
        title: 'Error',
        description: 'Failed to load amenities',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const toggleAmenity = (amenityId: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev)
      if (newSet.has(amenityId)) {
        newSet.delete(amenityId)
      } else {
        newSet.add(amenityId)
      }
      return newSet
    })
  }

  const selectAllInCategory = (category: string) => {
    const categoryAmenities = amenities.filter(a => a.category === category)
    setSelectedIds(prev => {
      const newSet = new Set(prev)
      categoryAmenities.forEach(a => newSet.add(a.id))
      return newSet
    })
  }

  const deselectAllInCategory = (category: string) => {
    const categoryAmenities = amenities.filter(a => a.category === category)
    setSelectedIds(prev => {
      const newSet = new Set(prev)
      categoryAmenities.forEach(a => newSet.delete(a.id))
      return newSet
    })
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await fetch(`/api/admin/projects/${params.id}/amenities`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amenity_ids: Array.from(selectedIds) })
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Amenities updated successfully'
        })
      } else {
        throw new Error('Failed to save')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save amenities',
        variant: 'destructive'
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Group amenities by category
  const groupedAmenities = amenities.reduce((acc, amenity) => {
    const category = amenity.category || 'other'
    if (!acc[category]) acc[category] = []
    acc[category].push(amenity)
    return acc
  }, {} as Record<string, Amenity[]>)

  // Filter by search
  const filterAmenities = (items: Amenity[]) => {
    if (!search) return items
    const searchLower = search.toLowerCase()
    return items.filter(a => 
      a.name_en.toLowerCase().includes(searchLower) ||
      a.name_sr.toLowerCase().includes(searchLower)
    )
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
        title="Amenities"
        description={projectName}
        backHref={`/admin/projects/${params.id}`}
      />

      <ProjectSubNav />

      <div className="mb-4 flex items-center justify-between">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search amenities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {selectedIds.size} amenities selected
          </span>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Check className="h-4 w-4 mr-2" />
            )}
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(groupedAmenities).map(([category, items]) => {
          const filteredItems = filterAmenities(items)
          if (filteredItems.length === 0) return null

          const allSelected = filteredItems.every(a => selectedIds.has(a.id))
          const someSelected = filteredItems.some(a => selectedIds.has(a.id))

          return (
            <Card key={category}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    {categoryLabels[category] || category}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => selectAllInCategory(category)}
                    >
                      Select All
                    </Button>
                    {someSelected && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => deselectAllInCategory(category)}
                      >
                        Deselect All
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredItems.map((amenity) => (
                    <div key={amenity.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity.id}
                        checked={selectedIds.has(amenity.id)}
                        onCheckedChange={() => toggleAmenity(amenity.id)}
                      />
                      <Label
                        htmlFor={amenity.id}
                        className="text-sm cursor-pointer flex-1"
                      >
                        {amenity.name_sr || amenity.name_en}
                        {amenity.icon && (
                          <span className="ml-2 text-gray-400">{amenity.icon}</span>
                        )}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Toaster />
    </>
  )
}
