'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { PageHeader, ProjectSubNav } from '@/components/admin'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'
import { Loader2, Building2 } from 'lucide-react'
import { BuildingType, ProjectBuildingWithType } from '@/types/database'

const constructionStatuses = [
  { value: 'planning', label: 'Planning' },
  { value: 'u_izgradnji', label: 'Under Construction' },
  { value: 'siva_faza', label: 'Gray Phase' },
  { value: 'useljivo', label: 'Move-in Ready' },
  { value: 'completed', label: 'Completed' },
]

export default function EditBuildingPage() {
  const router = useRouter()
  const params = useParams()
  const projectId = params.id as string
  const buildingId = params.buildingId as string
  const locale = params.locale as string || 'en'
  const { toast } = useToast()

  const [buildingTypes, setBuildingTypes] = useState<BuildingType[]>([])
  const [projectName, setProjectName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    building_type_id: '',
    building_group: '',
    floors: '',
    address: '',
    construction_status: '',
    completion_date: ''
  })

  useEffect(() => {
    fetchBuildingTypes()
    fetchProjectName()
    fetchBuilding()
  }, [projectId, buildingId])

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
      const response = await fetch('/api/admin/building-types')
      if (response.ok) {
        const data = await response.json()
        setBuildingTypes(data)
      }
    } catch (error) {
      console.error('Failed to fetch building types:', error)
    }
  }

  const fetchBuilding = async () => {
    try {
      const response = await fetch(`/api/admin/projects/${projectId}/buildings/${buildingId}`)
      if (response.ok) {
        const data: ProjectBuildingWithType = await response.json()
        setFormData({
          name: data.name,
          building_type_id: data.building_type_id || '',
          building_group: data.building_group || '',
          floors: data.floors?.toString() || '',
          address: data.address || '',
          construction_status: data.construction_status || '',
          completion_date: data.completion_date || ''
        })
      } else {
        toast({
          title: 'Error',
          description: 'Building not found',
          variant: 'destructive'
        })
        router.push(`/${locale}/admin/projects/${projectId}/buildings`)
      }
    } catch (error) {
      console.error('Failed to fetch building:', error)
      toast({
        title: 'Error',
        description: 'Failed to load building',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name) {
      toast({
        title: 'Error',
        description: 'Building name is required',
        variant: 'destructive'
      })
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/admin/projects/${projectId}/buildings/${buildingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Building updated successfully'
        })
        router.push(`/${locale}/admin/projects/${projectId}/buildings`)
      } else {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update building')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update building',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedType = buildingTypes.find(t => t.id === formData.building_type_id)

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
        title={`Edit Building: ${formData.name}`}
        description={projectName}
        backHref={`/${locale}/admin/projects/${projectId}/buildings`}
      />

      <ProjectSubNav />

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Building Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter building name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="building_type_id">Building Type</Label>
                    <Select
                      value={formData.building_type_id}
                      onValueChange={(v) => setFormData(prev => ({ ...prev, building_type_id: v }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {buildingTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-3 h-3 rounded"
                                style={{ backgroundColor: type.color || '#3B82F6' }}
                              />
                              {type.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="building_group">Building Group (Optional)</Label>
                  <Input
                    id="building_group"
                    value={formData.building_group}
                    onChange={(e) => setFormData(prev => ({ ...prev, building_group: e.target.value }))}
                    placeholder="Enter building group identifier"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="floors">Number of Floors</Label>
                    <Input
                      id="floors"
                      type="number"
                      min="1"
                      value={formData.floors}
                      onChange={(e) => setFormData(prev => ({ ...prev, floors: e.target.value }))}
                      placeholder="e.g., 10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="construction_status">Construction Status</Label>
                    <Select
                      value={formData.construction_status}
                      onValueChange={(v) => setFormData(prev => ({ ...prev, construction_status: v }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {constructionStatuses.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="completion_date">Completion Date</Label>
                    <Input
                      id="completion_date"
                      type="date"
                      value={formData.completion_date}
                      onChange={(e) => setFormData(prev => ({ ...prev, completion_date: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address (Optional)</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="Building address if different from project"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Building Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Building Name:</span>
                  <span className="font-medium">{formData.name || 'Unnamed Building'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Type:</span>
                  <span className="font-medium">
                    {selectedType ? (
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2 h-2 rounded"
                          style={{ backgroundColor: selectedType.color || '#3B82F6' }}
                        />
                        {selectedType.name}
                      </span>
                    ) : '-'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Floors:</span>
                  <span className="font-medium">{formData.floors || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Complex:</span>
                  <span className="font-medium">{projectName}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/${locale}/admin/projects/${projectId}/buildings`)}
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
