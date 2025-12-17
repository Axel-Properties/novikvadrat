'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { PageHeader } from '@/components/admin'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'
import { Loader2 } from 'lucide-react'

export default function EditCityPage() {
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string || 'en'
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name_en: '',
    name_sr_lat: '',
    name_sr_cyr: '',
    slug: '',
    country: '',
    latitude: '',
    longitude: '',
    is_active: true,
    sort_order: 0
  })

  useEffect(() => {
    fetchCity()
  }, [params.id])

  const fetchCity = async () => {
    try {
      const response = await fetch(`/api/admin/cities/${params.id}`)
      if (response.ok) {
        const city = await response.json()
        setFormData({
          name_en: city.name_en || '',
          name_sr_lat: city.name_sr_lat || '',
          name_sr_cyr: city.name_sr_cyr || '',
          slug: city.slug || '',
          country: city.country || '',
          latitude: city.latitude?.toString() || '',
          longitude: city.longitude?.toString() || '',
          is_active: city.is_active ?? true,
          sort_order: city.sort_order || 0
        })
      } else {
        throw new Error('City not found')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load city',
        variant: 'destructive'
      })
      router.push('/admin/cities')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/admin/cities/${params.id}`, {
        method: 'PUT',
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
          description: 'City updated successfully'
        })
        router.push(`/${locale}/admin/cities`)
      } else {
        const error = await response.json()
        throw new Error(error.message || 'Failed to update city')
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update city',
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

  return (
    <>
      <PageHeader
        title="Edit City"
        description={`Editing: ${formData.name_sr_lat}`}
        backHref="/admin/cities"
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
                  onChange={(e) => setFormData(prev => ({ ...prev, name_en: e.target.value }))}
                  placeholder="e.g., Belgrade"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name_sr_lat">Name (Serbian Latin) *</Label>
                <Input
                  id="name_sr_lat"
                  value={formData.name_sr_lat}
                  onChange={(e) => setFormData(prev => ({ ...prev, name_sr_lat: e.target.value }))}
                  placeholder="e.g., Beograd"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name_sr_cyr">Name (Serbian Cyrillic) *</Label>
                <Input
                  id="name_sr_cyr"
                  value={formData.name_sr_cyr}
                  onChange={(e) => setFormData(prev => ({ ...prev, name_sr_cyr: e.target.value }))}
                  placeholder="e.g., Београд"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="e.g., beograd"
                  required
                />
                <p className="text-xs text-gray-500">URL-friendly identifier</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                  placeholder="e.g., Serbia"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <div className="space-y-2">
                <Label htmlFor="sort_order">Sort Order</Label>
                <Input
                  id="sort_order"
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
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
                onClick={() => router.push('/admin/cities')}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Toaster />
    </>
  )
}
