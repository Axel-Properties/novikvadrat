'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { PageHeader } from '@/components/admin'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
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
import { Loader2, Image, Layers, Sparkles, Building2, Camera, TrendingUp } from 'lucide-react'

interface City {
  id: string
  name_sr_lat: string
}

interface Municipality {
  id: string
  name_sr_lat: string
  city_id: string
}

interface Developer {
  id: string
  name: string
}

export default function EditProjectPage() {
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string || 'en'
  const { toast } = useToast()
  const [cities, setCities] = useState<City[]>([])
  const [municipalities, setMunicipalities] = useState<Municipality[]>([])
  const [developers, setDevelopers] = useState<Developer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    developer_id: '',
    description: '',
    city_id: '',
    municipality_id: '',
    address: '',
    latitude: '',
    longitude: '',
    construction_status: 'planning',
    construction_start_date: '',
    completion_date: '',
    completion_percentage: '0',
    total_buildings: '',
    total_floors: '',
    total_units: '',
    available_units: '',
    parking_spaces: '',
    heating_type: '',
    elevator: false,
    garage: false,
    energy_class: '',
    price_from: '',
    price_to: '',
    price_per_sqm_from: '',
    price_per_sqm_to: '',
    vat_included: true,
    first_buyer_vat_refund: false,
    main_image_url: '',
    video_url: '',
    virtual_tour_url: '',
    brochure_url: '',
    featured: false,
    featured_order: '',
    is_active: true
  })

  useEffect(() => {
    fetchCities()
    fetchDevelopers()
    fetchProject()
  }, [params.id])

  useEffect(() => {
    if (formData.city_id) {
      fetchMunicipalities(formData.city_id)
    }
  }, [formData.city_id])

  const fetchCities = async () => {
    try {
      const response = await fetch('/api/admin/cities')
      if (response.ok) {
        setCities(await response.json())
      }
    } catch (error) {
      console.error('Failed to fetch cities:', error)
    }
  }

  const fetchMunicipalities = async (cityId: string) => {
    try {
      const response = await fetch(`/api/admin/municipalities?city_id=${cityId}`)
      if (response.ok) {
        setMunicipalities(await response.json())
      }
    } catch (error) {
      console.error('Failed to fetch municipalities:', error)
    }
  }

  const fetchDevelopers = async () => {
    try {
      const response = await fetch('/api/admin/developers')
      if (response.ok) {
        setDevelopers(await response.json())
      }
    } catch (error) {
      console.error('Failed to fetch developers:', error)
    }
  }

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/admin/projects/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setFormData({
          name: data.name || '',
          slug: data.slug || '',
          developer_id: data.developer_id || '',
          description: data.description || '',
          city_id: data.city_id || '',
          municipality_id: data.municipality_id || '',
          address: data.address || '',
          latitude: data.latitude?.toString() || '',
          longitude: data.longitude?.toString() || '',
          construction_status: data.construction_status || 'planning',
          construction_start_date: data.construction_start_date?.split('T')[0] || '',
          completion_date: data.completion_date?.split('T')[0] || '',
          completion_percentage: data.completion_percentage?.toString() || '0',
          total_buildings: data.total_buildings?.toString() || '',
          total_floors: data.total_floors?.toString() || '',
          total_units: data.total_units?.toString() || '',
          available_units: data.available_units?.toString() || '',
          parking_spaces: data.parking_spaces?.toString() || '',
          heating_type: data.heating_type || '',
          elevator: data.elevator || false,
          garage: data.garage || false,
          energy_class: data.energy_class || '',
          price_from: data.price_from?.toString() || '',
          price_to: data.price_to?.toString() || '',
          price_per_sqm_from: data.price_per_sqm_from?.toString() || '',
          price_per_sqm_to: data.price_per_sqm_to?.toString() || '',
          vat_included: data.vat_included ?? true,
          first_buyer_vat_refund: data.first_buyer_vat_refund || false,
          main_image_url: data.main_image_url || '',
          video_url: data.video_url || '',
          virtual_tour_url: data.virtual_tour_url || '',
          brochure_url: data.brochure_url || '',
          featured: data.featured || false,
          featured_order: data.featured_order?.toString() || '',
          is_active: data.is_active ?? true
        })
      } else {
        throw new Error('Project not found')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load project',
        variant: 'destructive'
      })
      router.push(`/${locale}/admin/projects`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const payload = {
        ...formData,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
        completion_percentage: formData.completion_percentage ? parseInt(formData.completion_percentage) : 0,
        total_buildings: formData.total_buildings ? parseInt(formData.total_buildings) : null,
        total_floors: formData.total_floors ? parseInt(formData.total_floors) : null,
        total_units: formData.total_units ? parseInt(formData.total_units) : null,
        available_units: formData.available_units ? parseInt(formData.available_units) : null,
        parking_spaces: formData.parking_spaces ? parseInt(formData.parking_spaces) : null,
        price_from: formData.price_from ? parseFloat(formData.price_from) : null,
        price_to: formData.price_to ? parseFloat(formData.price_to) : null,
        price_per_sqm_from: formData.price_per_sqm_from ? parseFloat(formData.price_per_sqm_from) : null,
        price_per_sqm_to: formData.price_per_sqm_to ? parseFloat(formData.price_per_sqm_to) : null,
        featured_order: formData.featured_order ? parseInt(formData.featured_order) : null,
        developer_id: formData.developer_id || null,
        municipality_id: formData.municipality_id || null
      }

      const response = await fetch(`/api/admin/projects/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Project updated successfully'
        })
        router.push(`/${locale}/admin/projects`)
      } else {
        const error = await response.json()
        throw new Error(error.message || 'Failed to update project')
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update project',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    )
  }

  const subPages = [
    { label: 'Images', href: `/admin/projects/${params.id}/images`, icon: Image },
    { label: 'Layouts', href: `/admin/projects/${params.id}/layouts`, icon: Layers },
    { label: 'Amenities', href: `/admin/projects/${params.id}/amenities`, icon: Sparkles },
    { label: 'Buildings', href: `/admin/projects/${params.id}/buildings`, icon: Building2 },
    { label: 'Progress', href: `/admin/projects/${params.id}/progress`, icon: Camera },
    { label: 'Price History', href: `/admin/projects/${params.id}/price-history`, icon: TrendingUp },
  ]

  return (
    <>
      <PageHeader
        title="Edit Project"
        description={`Editing: ${formData.name}`}
        backHref="/admin/projects"
      />

      {/* Sub-navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {subPages.map((page) => (
          <Link key={page.href} href={page.href}>
            <Button variant="outline" size="sm">
              <page.icon className="h-4 w-4 mr-2" />
              {page.label}
            </Button>
          </Link>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="flex-wrap h-auto gap-1">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="construction">Construction</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Project Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug *</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="developer_id">Developer</Label>
                  <Select 
                    value={formData.developer_id} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, developer_id: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a developer" />
                    </SelectTrigger>
                    <SelectContent>
                      {developers.map((dev) => (
                        <SelectItem key={dev.id} value={dev.id}>
                          {dev.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={5}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="location">
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="city_id">City *</Label>
                    <Select 
                      value={formData.city_id} 
                      onValueChange={(value) => setFormData(prev => ({ 
                        ...prev, 
                        city_id: value,
                        municipality_id: '' 
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a city" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city.id} value={city.id}>
                            {city.name_sr_lat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="municipality_id">Municipality</Label>
                    <Select 
                      value={formData.municipality_id} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, municipality_id: value }))}
                      disabled={!formData.city_id}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a municipality" />
                      </SelectTrigger>
                      <SelectContent>
                        {municipalities.map((m) => (
                          <SelectItem key={m.id} value={m.id}>
                            {m.name_sr_lat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input
                      id="latitude"
                      type="number"
                      step="any"
                      value={formData.latitude}
                      onChange={(e) => setFormData(prev => ({ ...prev, latitude: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input
                      id="longitude"
                      type="number"
                      step="any"
                      value={formData.longitude}
                      onChange={(e) => setFormData(prev => ({ ...prev, longitude: e.target.value }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="construction">
            <Card>
              <CardHeader>
                <CardTitle>Construction Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="construction_status">Construction Status *</Label>
                    <Select 
                      value={formData.construction_status} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, construction_status: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planning">Planning</SelectItem>
                        <SelectItem value="u_izgradnji">Under Construction</SelectItem>
                        <SelectItem value="siva_faza">Gray Phase</SelectItem>
                        <SelectItem value="useljivo">Move-in Ready</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="construction_start_date">Start Date</Label>
                    <Input
                      id="construction_start_date"
                      type="date"
                      value={formData.construction_start_date}
                      onChange={(e) => setFormData(prev => ({ ...prev, construction_start_date: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="completion_date">Completion Date</Label>
                    <Input
                      id="completion_date"
                      type="date"
                      value={formData.completion_date}
                      onChange={(e) => setFormData(prev => ({ ...prev, completion_date: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="completion_percentage">Completion Percentage: {formData.completion_percentage}%</Label>
                  <Input
                    id="completion_percentage"
                    type="range"
                    min="0"
                    max="100"
                    value={formData.completion_percentage}
                    onChange={(e) => setFormData(prev => ({ ...prev, completion_percentage: e.target.value }))}
                    className="h-2"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="total_buildings">Buildings</Label>
                    <Input
                      id="total_buildings"
                      type="number"
                      value={formData.total_buildings}
                      onChange={(e) => setFormData(prev => ({ ...prev, total_buildings: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="total_floors">Floors</Label>
                    <Input
                      id="total_floors"
                      type="number"
                      value={formData.total_floors}
                      onChange={(e) => setFormData(prev => ({ ...prev, total_floors: e.target.value }))}
                    />
                  </div>
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
                    <Label htmlFor="available_units">Available</Label>
                    <Input
                      id="available_units"
                      type="number"
                      value={formData.available_units}
                      onChange={(e) => setFormData(prev => ({ ...prev, available_units: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parking_spaces">Parking</Label>
                    <Input
                      id="parking_spaces"
                      type="number"
                      value={formData.parking_spaces}
                      onChange={(e) => setFormData(prev => ({ ...prev, parking_spaces: e.target.value }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features">
            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="heating_type">Heating Type</Label>
                    <Select 
                      value={formData.heating_type} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, heating_type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select heating type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="centralno">Central Heating</SelectItem>
                        <SelectItem value="etazno">Floor Heating</SelectItem>
                        <SelectItem value="gas">Gas</SelectItem>
                        <SelectItem value="toplotna_pumpa">Heat Pump</SelectItem>
                        <SelectItem value="podno">Underfloor Heating</SelectItem>
                        <SelectItem value="ta_pec">Storage Heater</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="energy_class">Energy Class</Label>
                    <Select 
                      value={formData.energy_class} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, energy_class: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select energy class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A">A</SelectItem>
                        <SelectItem value="B">B</SelectItem>
                        <SelectItem value="C">C</SelectItem>
                        <SelectItem value="D">D</SelectItem>
                        <SelectItem value="E">E</SelectItem>
                        <SelectItem value="F">F</SelectItem>
                        <SelectItem value="G">G</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <Switch
                      id="elevator"
                      checked={formData.elevator}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, elevator: checked }))}
                    />
                    <Label htmlFor="elevator">Elevator</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="garage"
                      checked={formData.garage}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, garage: checked }))}
                    />
                    <Label htmlFor="garage">Garage</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing">
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="price_per_sqm_from">Price/m² From (EUR)</Label>
                    <Input
                      id="price_per_sqm_from"
                      type="number"
                      value={formData.price_per_sqm_from}
                      onChange={(e) => setFormData(prev => ({ ...prev, price_per_sqm_from: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price_per_sqm_to">Price/m² To (EUR)</Label>
                    <Input
                      id="price_per_sqm_to"
                      type="number"
                      value={formData.price_per_sqm_to}
                      onChange={(e) => setFormData(prev => ({ ...prev, price_per_sqm_to: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <Switch
                      id="vat_included"
                      checked={formData.vat_included}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, vat_included: checked }))}
                    />
                    <Label htmlFor="vat_included">VAT Included</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="first_buyer_vat_refund"
                      checked={formData.first_buyer_vat_refund}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, first_buyer_vat_refund: checked }))}
                    />
                    <Label htmlFor="first_buyer_vat_refund">First Buyer VAT Refund</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media">
            <Card>
              <CardHeader>
                <CardTitle>Media</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="main_image_url">Main Image URL</Label>
                  <Input
                    id="main_image_url"
                    type="url"
                    value={formData.main_image_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, main_image_url: e.target.value }))}
                  />
                  {formData.main_image_url && (
                    <div className="mt-2">
                      <img 
                        src={formData.main_image_url} 
                        alt="Main image preview" 
                        className="h-40 w-auto rounded border"
                        onError={(e) => (e.currentTarget.style.display = 'none')}
                      />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="video_url">Video URL</Label>
                    <Input
                      id="video_url"
                      type="url"
                      value={formData.video_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, video_url: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="virtual_tour_url">Virtual Tour URL</Label>
                    <Input
                      id="virtual_tour_url"
                      type="url"
                      value={formData.virtual_tour_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, virtual_tour_url: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="brochure_url">Brochure URL</Label>
                    <Input
                      id="brochure_url"
                      type="url"
                      value={formData.brochure_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, brochure_url: e.target.value }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                  />
                  <Label htmlFor="featured">Featured Project</Label>
                </div>

                {formData.featured && (
                  <div className="space-y-2">
                    <Label htmlFor="featured_order">Featured Order</Label>
                    <Input
                      id="featured_order"
                      type="number"
                      value={formData.featured_order}
                      onChange={(e) => setFormData(prev => ({ ...prev, featured_order: e.target.value }))}
                    />
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                  />
                  <Label htmlFor="is_active">Active (visible on website)</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/${locale}/admin/projects`)}
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
