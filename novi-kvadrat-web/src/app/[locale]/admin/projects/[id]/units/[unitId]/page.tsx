'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { PageHeader, ProjectSubNav } from '@/components/admin'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'
import { FileUpload, MultiFileUpload } from '@/components/admin/file-upload'
import { Loader2, Home, Ruler, Settings, Image, DollarSign, Calendar } from 'lucide-react'
import {
  ProjectBuildingWithType,
  UnitType,
  Layout,
  Amenity,
  UnitWithDetails,
  UNIT_STATUS,
  AMENITY_CATEGORIES,
  AmenityCategory
} from '@/types/database'

const propertyCategories = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'studio', label: 'Studio' },
  { value: 'penthouse', label: 'Penthouse' },
  { value: 'duplex', label: 'Duplex' },
  { value: 'loft', label: 'Loft' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'parking', label: 'Parking' },
  { value: 'storage', label: 'Storage' },
]

const orientations = [
  { value: 'north', label: 'North' },
  { value: 'south', label: 'South' },
  { value: 'east', label: 'East' },
  { value: 'west', label: 'West' },
  { value: 'northeast', label: 'Northeast' },
  { value: 'northwest', label: 'Northwest' },
  { value: 'southeast', label: 'Southeast' },
  { value: 'southwest', label: 'Southwest' },
]

const viewTypes = [
  { value: 'city', label: 'City View' },
  { value: 'park', label: 'Park View' },
  { value: 'river', label: 'River View' },
  { value: 'sea', label: 'Sea View' },
  { value: 'mountain', label: 'Mountain View' },
  { value: 'courtyard', label: 'Courtyard' },
  { value: 'street', label: 'Street' },
  { value: 'garden', label: 'Garden View' },
]

const furnishingStatuses = [
  { value: 'unfurnished', label: 'Unfurnished' },
  { value: 'semi_furnished', label: 'Semi-Furnished' },
  { value: 'fully_furnished', label: 'Fully Furnished' },
  { value: 'turnkey', label: 'Turnkey' },
]

const parkingTypes = [
  { value: 'indoor', label: 'Indoor' },
  { value: 'outdoor', label: 'Outdoor' },
  { value: 'underground', label: 'Underground' },
  { value: 'covered', label: 'Covered' },
]

export default function EditUnitPage() {
  const router = useRouter()
  const params = useParams()
  const projectId = params.id as string
  const unitId = params.unitId as string
  const locale = params.locale as string || 'en'
  const { toast } = useToast()

  const [buildings, setBuildings] = useState<ProjectBuildingWithType[]>([])
  const [unitTypes, setUnitTypes] = useState<UnitType[]>([])
  const [allLayouts, setAllLayouts] = useState<Layout[]>([])
  const [amenities, setAmenities] = useState<Amenity[]>([])
  const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set())
  const [projectName, setProjectName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    // Basic Info
    building_id: '',
    unit_number: '',
    floor: '',
    unit_type_id: '',
    layout_id: '',
    property_category: 'apartment',

    // Specifications
    total_area: '',
    living_area: '',
    terrace_area: '',
    balcony_area: '',
    garden_area: '',
    bedrooms: '1',
    bathrooms: '1',
    orientation: '',
    view_type: '',
    furnishing_status: 'unfurnished',
    has_terrace: false,
    has_balcony: false,
    has_garden: false,
    has_parking: false,
    has_storage: false,
    parking_spots: '0',
    parking_type: '',

    // Description
    description: '',
    internal_notes: '',

    // Pricing
    price: '',
    price_per_sqm: '',
    original_price: '',

    // Availability
    status: 'available',
    available_from: '',
    is_active: true,
    is_featured: false,

    // Media
    hero_image_url: '',
    floor_plan_2d_url: '',
    floor_plan_3d_url: '',
    floor_plan_with_dimensions_url: '',
    virtual_tour_url: '',
    gallery: [] as string[]
  })

  // Filter layouts based on selected unit type
  const filteredLayouts = formData.unit_type_id
    ? (() => {
        const selectedUnitType = unitTypes.find(t => t.id === formData.unit_type_id)
        if (!selectedUnitType) return allLayouts

        // Match unit type name (lowercase) with layout_type
        const unitTypeNameLower = selectedUnitType.name.toLowerCase()
        return allLayouts.filter(layout => {
          if (!layout.layout_type) return false
          // Try to match layout_type with unit type name
          return layout.layout_type.toLowerCase() === unitTypeNameLower ||
                 layout.layout_type.toLowerCase().includes(unitTypeNameLower) ||
                 unitTypeNameLower.includes(layout.layout_type.toLowerCase())
        })
      })()
    : allLayouts

  useEffect(() => {
    fetchInitialData()
  }, [projectId, unitId])

  const fetchInitialData = async () => {
    await Promise.all([
      fetchProjectName(),
      fetchBuildings(),
      fetchUnitTypes(),
      fetchLayouts(),
      fetchAmenities(),
      fetchUnit()
    ])
    setIsLoading(false)
  }

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

  const fetchBuildings = async () => {
    try {
      const response = await fetch(`/api/admin/projects/${projectId}/buildings`)
      if (response.ok) {
        const data = await response.json()
        setBuildings(data)
      }
    } catch (error) {
      console.error('Failed to fetch buildings:', error)
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
    }
  }

  const fetchLayouts = async () => {
    try {
      const response = await fetch(`/api/admin/projects/${projectId}/layouts`)
      if (response.ok) {
        const data = await response.json()
        setAllLayouts(data)
      }
    } catch (error) {
      console.error('Failed to fetch layouts:', error)
    }
  }

  const fetchAmenities = async () => {
    try {
      const response = await fetch('/api/admin/amenities')
      if (response.ok) {
        const data = await response.json()
        setAmenities(data)
      }
    } catch (error) {
      console.error('Failed to fetch amenities:', error)
    }
  }

  const fetchUnit = async () => {
    try {
      const response = await fetch(`/api/admin/projects/${projectId}/units/${unitId}`)
      if (response.ok) {
        const data: UnitWithDetails = await response.json()
        setFormData({
          building_id: data.building_id,
          unit_number: data.unit_number,
          floor: data.floor?.toString() || '',
          unit_type_id: data.unit_type_id || '',
          layout_id: data.layout_id || '',
          property_category: data.property_category || 'apartment',
          total_area: data.total_area?.toString() || '',
          living_area: data.living_area?.toString() || '',
          terrace_area: data.terrace_area?.toString() || '',
          balcony_area: data.balcony_area?.toString() || '',
          garden_area: data.garden_area?.toString() || '',
          bedrooms: data.bedrooms?.toString() || '1',
          bathrooms: data.bathrooms?.toString() || '1',
          orientation: data.orientation || '',
          view_type: data.view_type || '',
          furnishing_status: data.furnishing_status || 'unfurnished',
          has_terrace: data.has_terrace || false,
          has_balcony: data.has_balcony || false,
          has_garden: data.has_garden || false,
          has_parking: data.has_parking || false,
          has_storage: data.has_storage || false,
          parking_spots: data.parking_spots?.toString() || '0',
          parking_type: data.parking_type || '',
          description: data.description || '',
          internal_notes: data.internal_notes || '',
          price: data.price?.toString() || '',
          price_per_sqm: data.price_per_sqm?.toString() || '',
          original_price: data.original_price?.toString() || '',
          status: data.status || 'available',
          available_from: data.available_from || '',
          is_active: data.is_active !== false,
          is_featured: data.is_featured || false,
          hero_image_url: data.hero_image_url || '',
          floor_plan_2d_url: data.floor_plan_2d_url || '',
          floor_plan_3d_url: data.floor_plan_3d_url || '',
          floor_plan_with_dimensions_url: data.floor_plan_with_dimensions_url || '',
          virtual_tour_url: data.virtual_tour_url || '',
          gallery: data.images?.map(img => img.url) || []
        })

        // Fetch and set features
        const featuresResponse = await fetch(`/api/admin/projects/${projectId}/units/${unitId}/features`)
        if (featuresResponse.ok) {
          const features = await featuresResponse.json()
          setSelectedFeatures(new Set(features.map((f: { amenity_id: string }) => f.amenity_id)))
        }
      } else {
        toast({
          title: 'Error',
          description: 'Unit not found',
          variant: 'destructive'
        })
        router.push(`/${locale}/admin/projects/${projectId}/units`)
      }
    } catch (error) {
      console.error('Failed to fetch unit:', error)
      toast({
        title: 'Error',
        description: 'Failed to load unit',
        variant: 'destructive'
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.building_id) {
      toast({
        title: 'Error',
        description: 'Please select a building',
        variant: 'destructive'
      })
      return
    }

    if (!formData.unit_number) {
      toast({
        title: 'Error',
        description: 'Unit number is required',
        variant: 'destructive'
      })
      return
    }

    if (!formData.total_area) {
      toast({
        title: 'Error',
        description: 'Total area is required',
        variant: 'destructive'
      })
      return
    }

    setIsSubmitting(true)
    try {
      // Update unit
      const response = await fetch(`/api/admin/projects/${projectId}/units/${unitId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        // Update features
        await fetch(`/api/admin/projects/${projectId}/units/${unitId}/features`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amenity_ids: Array.from(selectedFeatures)
          })
        })

        toast({
          title: 'Success',
          description: 'Unit updated successfully'
        })
        router.push(`/${locale}/admin/projects/${projectId}/units`)
      } else {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update unit')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update unit',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFeatureToggle = (amenityId: string) => {
    const newSelected = new Set(selectedFeatures)
    if (newSelected.has(amenityId)) {
      newSelected.delete(amenityId)
    } else {
      newSelected.add(amenityId)
    }
    setSelectedFeatures(newSelected)
  }

  // Group amenities by category
  const amenitiesByCategory = amenities.reduce((acc, amenity) => {
    const category = amenity.category as AmenityCategory
    if (!acc[category]) acc[category] = []
    acc[category].push(amenity)
    return acc
  }, {} as Record<AmenityCategory, Amenity[]>)

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
        title={`Edit Unit: ${formData.unit_number}`}
        description={projectName}
        backHref={`/${locale}/admin/projects/${projectId}/units`}
      />

      <ProjectSubNav />

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-6">
            <TabsTrigger value="basic" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Basic Info
            </TabsTrigger>
            <TabsTrigger value="specifications" className="flex items-center gap-2">
              <Ruler className="h-4 w-4" />
              Specifications
            </TabsTrigger>
            <TabsTrigger value="features" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Features
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Media
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Pricing
            </TabsTrigger>
            <TabsTrigger value="availability" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Availability
            </TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="building_id">Building *</Label>
                    <Select
                      value={formData.building_id}
                      onValueChange={(v) => setFormData(prev => ({ ...prev, building_id: v }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select building" />
                      </SelectTrigger>
                      <SelectContent>
                        {buildings.map((building) => (
                          <SelectItem key={building.id} value={building.id}>
                            {building.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit_number">Unit Number *</Label>
                    <Input
                      id="unit_number"
                      value={formData.unit_number}
                      onChange={(e) => setFormData(prev => ({ ...prev, unit_number: e.target.value }))}
                      placeholder="e.g., A-101"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="floor">Floor *</Label>
                    <Input
                      id="floor"
                      type="number"
                      min="0"
                      value={formData.floor}
                      onChange={(e) => setFormData(prev => ({ ...prev, floor: e.target.value }))}
                      placeholder="e.g., 1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="property_category">Property Category</Label>
                    <Select
                      value={formData.property_category}
                      onValueChange={(v) => setFormData(prev => ({ ...prev, property_category: v }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {propertyCategories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit_type_id">Unit Type</Label>
                    <Select
                      value={formData.unit_type_id}
                      onValueChange={(v) => {
                        setFormData(prev => {
                          // Clear layout if it doesn't match the new unit type
                          const newLayoutId = prev.layout_id
                          const selectedUnitType = unitTypes.find(t => t.id === v)
                          if (newLayoutId && selectedUnitType) {
                            const currentLayout = allLayouts.find(l => l.id === newLayoutId)
                            if (currentLayout) {
                              const unitTypeNameLower = selectedUnitType.name.toLowerCase()
                              const matches = currentLayout.layout_type?.toLowerCase() === unitTypeNameLower ||
                                            currentLayout.layout_type?.toLowerCase().includes(unitTypeNameLower) ||
                                            unitTypeNameLower.includes(currentLayout.layout_type?.toLowerCase() || '')
                              if (!matches) {
                                return { ...prev, unit_type_id: v, layout_id: '' }
                              }
                            }
                          }
                          return { ...prev, unit_type_id: v }
                        })
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {unitTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name_sr ? `${type.name_sr} (${type.name})` : type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="layout_id">Layout</Label>
                    <Select
                      value={formData.layout_id}
                      onValueChange={(v) => setFormData(prev => ({ ...prev, layout_id: v }))}
                      disabled={Boolean(formData.unit_type_id) && filteredLayouts.length === 0}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={formData.unit_type_id && filteredLayouts.length === 0 ? "No layouts for this type" : "Select layout"} />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredLayouts.length > 0 ? (
                          filteredLayouts.map((layout) => (
                            <SelectItem key={layout.id} value={layout.id}>
                              {layout.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="none" disabled>No layouts available</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Public description for this unit"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="internal_notes">Internal Notes</Label>
                  <Textarea
                    id="internal_notes"
                    value={formData.internal_notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, internal_notes: e.target.value }))}
                    placeholder="Internal notes (not visible to public)"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Specifications Tab */}
          <TabsContent value="specifications">
            <Card>
              <CardHeader>
                <CardTitle>Unit Specifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="total_area">Total Area (m²) *</Label>
                    <Input
                      id="total_area"
                      type="number"
                      step="0.01"
                      min="0"
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
                      min="0"
                      value={formData.living_area}
                      onChange={(e) => setFormData(prev => ({ ...prev, living_area: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      min="0"
                      value={formData.bedrooms}
                      onChange={(e) => setFormData(prev => ({ ...prev, bedrooms: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      min="0"
                      value={formData.bathrooms}
                      onChange={(e) => setFormData(prev => ({ ...prev, bathrooms: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="terrace_area">Terrace Area (m²)</Label>
                    <Input
                      id="terrace_area"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.terrace_area}
                      onChange={(e) => setFormData(prev => ({ ...prev, terrace_area: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="balcony_area">Balcony Area (m²)</Label>
                    <Input
                      id="balcony_area"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.balcony_area}
                      onChange={(e) => setFormData(prev => ({ ...prev, balcony_area: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="garden_area">Garden Area (m²)</Label>
                    <Input
                      id="garden_area"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.garden_area}
                      onChange={(e) => setFormData(prev => ({ ...prev, garden_area: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="orientation">Orientation</Label>
                    <Select
                      value={formData.orientation}
                      onValueChange={(v) => setFormData(prev => ({ ...prev, orientation: v }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select orientation" />
                      </SelectTrigger>
                      <SelectContent>
                        {orientations.map((o) => (
                          <SelectItem key={o.value} value={o.value}>
                            {o.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="view_type">View Type</Label>
                    <Select
                      value={formData.view_type}
                      onValueChange={(v) => setFormData(prev => ({ ...prev, view_type: v }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select view" />
                      </SelectTrigger>
                      <SelectContent>
                        {viewTypes.map((v) => (
                          <SelectItem key={v.value} value={v.value}>
                            {v.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="furnishing_status">Furnishing Status</Label>
                    <Select
                      value={formData.furnishing_status}
                      onValueChange={(v) => setFormData(prev => ({ ...prev, furnishing_status: v }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {furnishingStatuses.map((f) => (
                          <SelectItem key={f.value} value={f.value}>
                            {f.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-4">Additional Features</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="has_terrace"
                        checked={formData.has_terrace}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, has_terrace: checked as boolean }))}
                      />
                      <Label htmlFor="has_terrace">Has Terrace</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="has_balcony"
                        checked={formData.has_balcony}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, has_balcony: checked as boolean }))}
                      />
                      <Label htmlFor="has_balcony">Has Balcony</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="has_garden"
                        checked={formData.has_garden}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, has_garden: checked as boolean }))}
                      />
                      <Label htmlFor="has_garden">Has Garden</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="has_parking"
                        checked={formData.has_parking}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, has_parking: checked as boolean }))}
                      />
                      <Label htmlFor="has_parking">Has Parking</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="has_storage"
                        checked={formData.has_storage}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, has_storage: checked as boolean }))}
                      />
                      <Label htmlFor="has_storage">Has Storage</Label>
                    </div>
                  </div>
                </div>

                {formData.has_parking && (
                  <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-2">
                      <Label htmlFor="parking_spots">Parking Spots</Label>
                      <Input
                        id="parking_spots"
                        type="number"
                        min="0"
                        value={formData.parking_spots}
                        onChange={(e) => setFormData(prev => ({ ...prev, parking_spots: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="parking_type">Parking Type</Label>
                      <Select
                        value={formData.parking_type}
                        onValueChange={(v) => setFormData(prev => ({ ...prev, parking_type: v }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {parkingTypes.map((p) => (
                            <SelectItem key={p.value} value={p.value}>
                              {p.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features">
            <div className="space-y-6">
              {Object.entries(AMENITY_CATEGORIES).map(([category, info]) => (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle>{info.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {amenitiesByCategory[category as AmenityCategory]?.map((amenity) => (
                        <div key={amenity.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={amenity.id}
                            checked={selectedFeatures.has(amenity.id)}
                            onCheckedChange={() => handleFeatureToggle(amenity.id)}
                          />
                          <Label htmlFor={amenity.id} className="text-sm cursor-pointer">
                            {amenity.name_en}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {!amenitiesByCategory[category as AmenityCategory]?.length && (
                      <p className="text-gray-500 text-sm">No amenities in this category</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Hero Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <FileUpload
                    value={formData.hero_image_url}
                    onChange={(url) => setFormData(prev => ({ ...prev, hero_image_url: url }))}
                    folder="units"
                    placeholder="Upload hero image or paste URL"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Floor Plans</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>2D Floor Plan</Label>
                      <FileUpload
                        value={formData.floor_plan_2d_url}
                        onChange={(url) => setFormData(prev => ({ ...prev, floor_plan_2d_url: url }))}
                        folder="floor-plans"
                        placeholder="Upload 2D floor plan"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>3D Floor Plan</Label>
                      <FileUpload
                        value={formData.floor_plan_3d_url}
                        onChange={(url) => setFormData(prev => ({ ...prev, floor_plan_3d_url: url }))}
                        folder="floor-plans"
                        placeholder="Upload 3D floor plan"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Floor Plan with Dimensions</Label>
                      <FileUpload
                        value={formData.floor_plan_with_dimensions_url}
                        onChange={(url) => setFormData(prev => ({ ...prev, floor_plan_with_dimensions_url: url }))}
                        folder="floor-plans"
                        placeholder="Upload dimensioned plan"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Virtual Tour</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="virtual_tour_url">Virtual Tour URL</Label>
                    <Input
                      id="virtual_tour_url"
                      type="url"
                      value={formData.virtual_tour_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, virtual_tour_url: e.target.value }))}
                      placeholder="https://..."
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Gallery Images</CardTitle>
                </CardHeader>
                <CardContent>
                  <MultiFileUpload
                    values={formData.gallery}
                    onChange={(urls) => setFormData(prev => ({ ...prev, gallery: urls }))}
                    folder="units/gallery"
                    maxFiles={20}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value="pricing">
            <Card>
              <CardHeader>
                <CardTitle>Pricing Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (€)</Label>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="e.g., 150000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price_per_sqm">Price per m² (€)</Label>
                    <Input
                      id="price_per_sqm"
                      type="number"
                      min="0"
                      value={formData.price_per_sqm}
                      onChange={(e) => setFormData(prev => ({ ...prev, price_per_sqm: e.target.value }))}
                      placeholder="e.g., 2500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="original_price">Original Price (€)</Label>
                    <Input
                      id="original_price"
                      type="number"
                      min="0"
                      value={formData.original_price}
                      onChange={(e) => setFormData(prev => ({ ...prev, original_price: e.target.value }))}
                      placeholder="For showing discounts"
                    />
                  </div>
                </div>
                {formData.price && formData.total_area && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">
                      Calculated price per m²: <strong>€{(parseFloat(formData.price) / parseFloat(formData.total_area)).toFixed(2)}</strong>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Availability Tab */}
          <TabsContent value="availability">
            <Card>
              <CardHeader>
                <CardTitle>Availability & Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(v) => setFormData(prev => ({ ...prev, status: v }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(UNIT_STATUS).map(([value, { label }]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="available_from">Available From</Label>
                    <Input
                      id="available_from"
                      type="date"
                      value={formData.available_from}
                      onChange={(e) => setFormData(prev => ({ ...prev, available_from: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="border-t pt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="is_active">Active</Label>
                      <p className="text-sm text-gray-500">Unit is visible on the website</p>
                    </div>
                    <Switch
                      id="is_active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="is_featured">Featured</Label>
                      <p className="text-sm text-gray-500">Highlight this unit in listings</p>
                    </div>
                    <Switch
                      id="is_featured"
                      checked={formData.is_featured}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_featured: checked }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/${locale}/admin/projects/${projectId}/units`)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Save Changes
          </Button>
        </div>
      </form>

      <Toaster />
    </>
  )
}
