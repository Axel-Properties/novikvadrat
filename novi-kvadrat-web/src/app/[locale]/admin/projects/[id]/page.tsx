'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { PageHeader, ProjectSubNav } from '@/components/admin'
import { StatsCard } from '@/components/admin/stats-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'
import {
  Building2,
  Home,
  Loader2,
  Plus,
  CheckCircle,
  Clock,
  XCircle,
  BarChart3,
  Settings,
  MapPin,
  Euro
} from 'lucide-react'
import { UNIT_STATUS } from '@/types/database'

interface PropertyStats {
  total_units: number
  available: number
  reserved: number
  sold: number
  rented: number
  unavailable: number
  coming_soon: number
  total_buildings: number
  total_value: number
  avg_price: number
  total_area: number
  avg_area: number
}

interface ProjectData {
  id: string
  name: string
  slug: string
  description: string | null
  address: string | null
  construction_status: string
  completion_percentage: number
  price_from: number | null
  price_to: number | null
  is_active: boolean
  city?: { name_sr_lat: string }
  developer?: { name: string }
}

const statusColors: Record<string, string> = {
  planning: 'bg-gray-100 text-gray-800',
  u_izgradnji: 'bg-yellow-100 text-yellow-800',
  siva_faza: 'bg-orange-100 text-orange-800',
  useljivo: 'bg-green-100 text-green-800',
  completed: 'bg-blue-100 text-blue-800'
}

const statusLabels: Record<string, string> = {
  planning: 'Planning',
  u_izgradnji: 'Under Construction',
  siva_faza: 'Gray Phase',
  useljivo: 'Move-in Ready',
  completed: 'Completed'
}

export default function ProjectOverviewPage() {
  const params = useParams()
  const projectId = params.id as string
  const locale = params.locale as string || 'en'
  const { toast } = useToast()

  const [project, setProject] = useState<ProjectData | null>(null)
  const [stats, setStats] = useState<PropertyStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchAllData()
  }, [projectId])

  const fetchAllData = async () => {
    setIsLoading(true)
    await Promise.all([
      fetchProject(),
      fetchStats()
    ])
    setIsLoading(false)
  }

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/admin/projects/${projectId}`)
      if (response.ok) {
        const data = await response.json()
        setProject(data)
      }
    } catch (error) {
      console.error('Failed to fetch project:', error)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch(`/api/admin/properties/stats?project_id=${projectId}`)
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
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
        title={project?.name || 'Project'}
        description="Project Overview"
        backHref="/admin/projects"
      >
        <Link href={`/${locale}/admin/projects/${projectId}/edit`}>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Edit Project
          </Button>
        </Link>
      </PageHeader>

      <ProjectSubNav />

      <div className="space-y-6">
        {/* Project Info Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Badge className={statusColors[project?.construction_status || 'planning']}>
                  {statusLabels[project?.construction_status || 'planning']}
                </Badge>
                {project?.is_active ? (
                  <Badge variant="outline" className="text-green-600 border-green-600">Active</Badge>
                ) : (
                  <Badge variant="outline" className="text-gray-500">Inactive</Badge>
                )}
              </div>
              {project?.city && (
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{project.city.name_sr_lat}</span>
                </div>
              )}
              {project?.developer && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Building2 className="h-4 w-4" />
                  <span>{project.developer.name}</span>
                </div>
              )}
              {(project?.price_from || project?.price_to) && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Euro className="h-4 w-4" />
                  <span>
                    {project.price_from?.toLocaleString() || '?'} - {project.price_to?.toLocaleString() || '?'}
                  </span>
                </div>
              )}
              {project?.completion_percentage !== undefined && (
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="text-sm">Progress: {project.completion_percentage}%</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatsCard
            title="Total Units"
            value={stats?.total_units || 0}
            icon={Home}
          />
          <StatsCard
            title="Available"
            value={stats?.available || 0}
            icon={CheckCircle}
            className="border-l-4 border-l-green-500"
          />
          <StatsCard
            title="Reserved"
            value={stats?.reserved || 0}
            icon={Clock}
            className="border-l-4 border-l-yellow-500"
          />
          <StatsCard
            title="Sold"
            value={stats?.sold || 0}
            icon={XCircle}
            className="border-l-4 border-l-blue-500"
          />
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Buildings</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stats?.total_buildings || 0}</p>
                </div>
                <Building2 className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Value</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    €{(stats?.total_value || 0).toLocaleString()}
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Avg. Price</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    €{(stats?.avg_price || 0).toLocaleString()}
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Status Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href={`/${locale}/admin/projects/${projectId}/buildings/new`}>
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Building
                </Button>
              </Link>
              <Link href={`/${locale}/admin/projects/${projectId}/units/new`}>
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Unit
                </Button>
              </Link>
              <Link href={`/${locale}/admin/projects/${projectId}/layouts/new`}>
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Layout
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(UNIT_STATUS).map(([key, { label, color }]) => {
                  const count = stats?.[key as keyof PropertyStats] as number || 0
                  const percentage = stats?.total_units ? Math.round((count / stats.total_units) * 100) : 0
                  return (
                    <div key={key} className="flex items-center gap-3">
                      <div className="w-24 text-sm">{label}</div>
                      <div className="flex-1 bg-gray-100 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${color.split(' ')[0]}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <div className="w-12 text-sm text-right text-gray-500">{count}</div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Toaster />
    </>
  )
}
