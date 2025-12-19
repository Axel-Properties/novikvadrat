'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { PageHeader, ProjectSubNav } from '@/components/admin'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
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
import { FileUpload } from '@/components/admin/file-upload'
import { Loader2 } from 'lucide-react'

const layoutTypes = [
  { value: 'garsonjera', label: 'Garsonjera (Studio)' },
  { value: 'jednosoban', label: 'Jednosoban (1 Bedroom)' },
  { value: 'jednoiposoban', label: 'Jednoiposoban (1.5 Bedroom)' },
  { value: 'dvosoban', label: 'Dvosoban (2 Bedroom)' },
  { value: 'dvoiposoban', label: 'Dvoiposoban (2.5 Bedroom)' },
  { value: 'trosoban', label: 'Trosoban (3 Bedroom)' },
  { value: 'troiposoban', label: 'Troiposoban (3.5 Bedroom)' },
  { value: 'cetvorosoban', label: 'Četvorosoban (4 Bedroom)' },
  { value: 'petosoban', label: 'Petosoban (5 Bedroom)' },
  { value: 'penthouse', label: 'Penthouse' },
]

interface Layout {
  id: string
  name: string
  layout_type: string
  total_area: number
  living_area: number | null
  terrace_area: number | null
  bedrooms: number | null
  bathrooms: number | null
  has_terrace: boolean
  has_loggia: boolean
  price_from: number | null
  price_to: number | null
  floor_plan_url: string | null
  total_units: number | null
  available_units: number | null
}

export default function EditLayoutPage() {
  const router = useRouter()
  const params = useParams()
  const projectId = params.id as string
  const layoutId = params.layoutId as string
  const locale = params.locale as string || 'en'
  const { toast } = useToast()
  const [projectName, setProjectName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    layout_type: 'jednosoban',
    total_area: '',
    living_area: '',
    terrace_area: '',
    bedrooms: '',
    bathrooms: '',
    has_terrace: false,
    has_loggia: false,
    price_from: '',
    price_to: '',
    floor_plan_url: '',
    total_units: '',
    available_units: ''
  })

  useEffect(() => {
    fetchData()
  }, [projectId, layoutId])

  const fetchData = async () => {
    try {
      const [projectRes, layoutRes] = await Promise.all([
        fetch(`/api/admin/projects/${projectId}`),
        fetch(`/api/admin/projects/${projectId}/layouts/${layoutId}`)
      ])

      if (projectRes.ok) {
        const project = await projectRes.json()
        setProjectName(project.name)
      }

      if (layoutRes.ok) {
        const layout: Layout = await layoutRes.json()
        setFormData({
          name: layout.name,
          layout_type: layout.layout_type,
          total_area: layout.total_area?.toString() || '',
          living_area: layout.living_area?.toString() || '',
          terrace_area: layout.terrace_area?.toString() || '',
          bedrooms: layout.bedrooms?.toString() || '',
          bathrooms: layout.bathrooms?.toString() || '',
          has_terrace: layout.has_terrace,
          has_loggia: layout.has_loggia,
          price_from: layout.price_from?.toString() || '',
          price_to: layout.price_to?.toString() || '',
          floor_plan_url: layout.floor_plan_url || '',
          total_units: layout.total_units?.toString() || '',
          available_units: layout.available_units?.toString() || ''
        })
      } else {
        throw new Error('Failed to fetch layout')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load layout',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.total_area) {
      toast({
        title: 'Error',
        description: 'Name and total area are required',
        variant: 'destructive'
      })
      return
    }

    setIsSubmitting(true)
    try {
      const payload = {
        name: formData.name,
        layout_type: formData.layout_type,
        total_area: parseFloat(formData.total_area),
        living_area: formData.living_area ? parseFloat(formData.living_area) : null,
        terrace_area: formData.terrace_area ? parseFloat(formData.terrace_area) : null,
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
        has_terrace: formData.has_terrace,
        has_loggia: formData.has_loggia,
        price_from: formData.price_from ? parseFloat(formData.price_from) : null,
        price_to: formData.price_to ? parseFloat(formData.price_to) : null,
        floor_plan_url: formData.floor_plan_url || null,
        total_units: formData.total_units ? parseInt(formData.total_units) : null,
        available_units: formData.available_units ? parseInt(formData.available_units) : null
      }

      const response = await fetch(`/api/admin/projects/${projectId}/layouts/${layoutId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Layout updated successfully'
        })
        router.push(`/${locale}/admin/projects/${projectId}/layouts`)
      } else {
        throw new Error('Failed to update layout')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update layout',
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
        title={`Edit Layout: ${formData.name}`}
        description={projectName}
        backHref={`/${locale}/admin/projects/${projectId}/layouts`}
      />

      <ProjectSubNav />

      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent className="p-0">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent h-auto p-0">
                <TabsTrigger
                  value="details"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-4 py-3"
                >
                  Details
                </TabsTrigger>
                <TabsTrigger
                  value="dimensions"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-4 py-3"
                >
                  Dimensions
                </TabsTrigger>
                <TabsTrigger
                  value="pricing"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-4 py-3"
                >
                  Pricing
                </TabsTrigger>
                <TabsTrigger
                  value="media"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-4 py-3"
                >
                  Media
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Layout Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., A1, B2, Tip A"
                      className="max-w-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="layout_type">Layout Type *</Label>
                    <Select
                      value={formData.layout_type}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, layout_type: value }))}
                    >
                      <SelectTrigger className="max-w-md">
                        <SelectValue placeholder="Select layout type" />
                      </SelectTrigger>
                      <SelectContent>
                        {layoutTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="total_units">Total Units</Label>
                    <Input
                      id="total_units"
                      type="number"
                      min="0"
                      value={formData.total_units}
                      onChange={(e) => setFormData(prev => ({ ...prev, total_units: e.target.value }))}
                      placeholder="0"
                      className="max-w-[200px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="available_units">Available Units</Label>
                    <Input
                      id="available_units"
                      type="number"
                      min="0"
                      value={formData.available_units}
                      onChange={(e) => setFormData(prev => ({ ...prev, available_units: e.target.value }))}
                      placeholder="0"
                      className="max-w-[200px]"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="dimensions" className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="total_area">Total Area (m²) *</Label>
                    <Input
                      id="total_area"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.total_area}
                      onChange={(e) => setFormData(prev => ({ ...prev, total_area: e.target.value }))}
                      placeholder="0.00"
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
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="terrace_area">Terrace Area (m²)</Label>
                    <Input
                      id="terrace_area"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.terrace_area}
                      onChange={(e) => setFormData(prev => ({ ...prev, terrace_area: e.target.value }))}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      min="0"
                      value={formData.bedrooms}
                      onChange={(e) => setFormData(prev => ({ ...prev, bedrooms: e.target.value }))}
                      placeholder="0"
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
                      placeholder="1"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-7">
                    <Switch
                      id="has_terrace"
                      checked={formData.has_terrace}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, has_terrace: checked }))}
                    />
                    <Label htmlFor="has_terrace" className="cursor-pointer">Has Terrace</Label>
                  </div>
                  <div className="flex items-center gap-2 pt-7">
                    <Switch
                      id="has_loggia"
                      checked={formData.has_loggia}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, has_loggia: checked }))}
                    />
                    <Label htmlFor="has_loggia" className="cursor-pointer">Has Loggia</Label>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="pricing" className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price_from">Price From (EUR)</Label>
                    <Input
                      id="price_from"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price_from}
                      onChange={(e) => setFormData(prev => ({ ...prev, price_from: e.target.value }))}
                      placeholder="0.00"
                      className="max-w-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price_to">Price To (EUR)</Label>
                    <Input
                      id="price_to"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price_to}
                      onChange={(e) => setFormData(prev => ({ ...prev, price_to: e.target.value }))}
                      placeholder="0.00"
                      className="max-w-md"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="media" className="p-4">
                <div className="space-y-2">
                  <Label>Floor Plan</Label>
                  <FileUpload
                    value={formData.floor_plan_url}
                    onChange={(url) => setFormData(prev => ({ ...prev, floor_plan_url: url }))}
                    folder="floor-plans"
                    placeholder="Upload floor plan image"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Sticky Footer */}
        <div className="sticky bottom-0 bg-white border-t p-4 -mx-4 mt-4 flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/${locale}/admin/projects/${projectId}/layouts`)}
            disabled={isSubmitting}
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
