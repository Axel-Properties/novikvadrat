'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PageHeader } from '@/components/admin'
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
import { useToast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'
import { Loader2 } from 'lucide-react'

interface City {
  id: string
  name_sr_lat: string
}

export default function NewMunicipalityPage() {
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string || 'en'
  const { toast } = useToast()
  const [cities, setCities] = useState<City[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name_en: '',
    name_sr_lat: '',
    name_sr_cyr: '',
    slug: '',
    city_id: '',
    municipality_type: 'municipality' as 'municipality' | 'neighborhood',
    latitude: '',
    longitude: '',
    is_active: true
  })

  useEffect(() => {
    fetchCities()
  }, [])

  const fetchCities = async () => {
    try {
      const response = await fetch('/api/admin/cities')
      if (response.ok) {
        const data = await response.json()
        setCities(data)
      }
    } catch (error) {
      console.error('Failed to fetch cities:', error)
    }
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[čć]/g, 'c')
      .replace(/[šş]/g, 's')
      .replace(/[žź]/g, 'z')
      .replace(/đ/g, 'dj')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleNameChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'name_sr_lat' && !prev.slug ? { slug: generateSlug(value) } : {})
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/admin/municipalities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          latitude: formData.latitude ? parseFloat(formData.latitude) : null,
          longitude: formData.longitude ? parseFloat(formData.longitude) : null
        })
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Municipality created successfully'
        })
        router.push(`/${locale}/admin/municipalities`)
      } else {
        const error = await response.json()
        throw new Error(error.message || 'Failed to create municipality')
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create municipality',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <PageHeader
        title="Add Municipality"
        description="Create a new municipality or neighborhood"
        backHref="/admin/municipalities"
      />

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name_en">Name (English) *</Label>
                <Input
                  id="name_en"
                  value={formData.name_en}
                  onChange={(e) => handleNameChange('name_en', e.target.value)}
                  placeholder="e.g., Vračar"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name_sr_lat">Name (Serbian Latin) *</Label>
                <Input
                  id="name_sr_lat"
                  value={formData.name_sr_lat}
                  onChange={(e) => handleNameChange('name_sr_lat', e.target.value)}
                  placeholder="e.g., Vračar"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name_sr_cyr">Name (Serbian Cyrillic) *</Label>
                <Input
                  id="name_sr_cyr"
                  value={formData.name_sr_cyr}
                  onChange={(e) => setFormData(prev => ({ ...prev, name_sr_cyr: e.target.value }))}
                  placeholder="e.g., Врачар"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="e.g., vracar"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city_id">City *</Label>
                <Select 
                  value={formData.city_id} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, city_id: value }))}
                  required
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
                <Label htmlFor="municipality_type">Type *</Label>
                <Select 
                  value={formData.municipality_type} 
                  onValueChange={(value: 'municipality' | 'neighborhood') => 
                    setFormData(prev => ({ ...prev, municipality_type: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="municipality">Municipality</SelectItem>
                    <SelectItem value="neighborhood">Neighborhood</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                  placeholder="e.g., 44.7866"
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
                  placeholder="e.g., 20.4489"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
              />
              <Label htmlFor="is_active">Active</Label>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push(`/${locale}/admin/municipalities`)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Create Municipality
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Toaster />
    </>
  )
}
