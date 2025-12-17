'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { StatsCard } from '@/components/admin/stats-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Building2,
  FolderKanban,
  MapPin,
  Image,
  Layers,
  Users,
  Plus,
  ArrowRight,
  TrendingUp,
  Activity
} from 'lucide-react'
import Link from 'next/link'

interface DashboardStats {
  projects: number
  developers: number
  cities: number
  municipalities: number
  layouts: number
  images: number
  activeProjects: number
  completedProjects: number
}

export default function AdminDashboard() {
  const params = useParams()
  const locale = params.locale as string || 'en'
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    developers: 0,
    cities: 0,
    municipalities: 0,
    layouts: 0,
    images: 0,
    activeProjects: 0,
    completedProjects: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const [recentProjects, setRecentProjects] = useState<any[]>([])

  useEffect(() => {
    fetchStats()
    fetchRecentProjects()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchRecentProjects = async () => {
    try {
      const response = await fetch('/api/projects?limit=5&sort=newest')
      if (response.ok) {
        const data = await response.json()
        setRecentProjects(data.data || [])
      }
    } catch (error) {
      console.error('Failed to fetch recent projects:', error)
    }
  }

  const getHref = (href: string) => {
    if (href.startsWith('/admin')) {
      return `/${locale}${href}`
    }
    return href
  }

  const quickActions = [
    { label: 'Add Project', href: '/admin/projects/new', icon: FolderKanban },
    { label: 'Add Developer', href: '/admin/developers/new', icon: Building2 },
    { label: 'Import Data', href: '/admin/import-excel', icon: Plus },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome to Novi Kvadrat Admin Panel</p>
        </div>
        <div className="flex items-center gap-3">
          {quickActions.map((action) => (
            <Link key={action.href} href={getHref(action.href)}>
              <Button variant="outline" size="sm">
                <action.icon className="h-4 w-4 mr-2" />
                {action.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Projects"
          value={isLoading ? '...' : stats.projects}
          description={`${stats.activeProjects} active, ${stats.completedProjects} completed`}
          icon={FolderKanban}
        />
        <StatsCard
          title="Developers"
          value={isLoading ? '...' : stats.developers}
          description="Registered developers"
          icon={Building2}
        />
        <StatsCard
          title="Cities"
          value={isLoading ? '...' : stats.cities}
          description={`${stats.municipalities} municipalities`}
          icon={MapPin}
        />
        <StatsCard
          title="Layouts"
          value={isLoading ? '...' : stats.layouts}
          description="Apartment layouts"
          icon={Layers}
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Projects</CardTitle>
            <Link href={getHref('/admin/projects')}>
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {recentProjects.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No projects yet</p>
            ) : (
              <div className="space-y-4">
                {recentProjects.map((project) => (
                  <div key={project.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      {project.main_image_url ? (
                        <img 
                          src={project.main_image_url} 
                          alt={project.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FolderKanban className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{project.name}</p>
                      <p className="text-sm text-gray-500">
                        {project.developer?.name || 'No developer'} • {project.city?.name_sr_lat || 'No city'}
                      </p>
                    </div>
                    <Badge variant={
                      project.construction_status === 'completed' ? 'default' :
                      project.construction_status === 'useljivo' ? 'secondary' :
                      'outline'
                    }>
                      {project.construction_status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Active Projects</p>
                  <p className="text-xs text-gray-500">Under construction</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-blue-600">{stats.activeProjects}</p>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Activity className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Completed</p>
                  <p className="text-xs text-gray-500">Ready to move in</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-green-600">{stats.completedProjects}</p>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Image className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Images</p>
                  <p className="text-xs text-gray-500">Total uploaded</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-purple-600">{stats.images}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { label: 'Countries', href: '/admin/countries', icon: MapPin },
              { label: 'Cities', href: '/admin/cities', icon: MapPin },
              { label: 'Municipalities', href: '/admin/municipalities', icon: MapPin },
              { label: 'Developers', href: '/admin/developers', icon: Building2 },
              { label: 'Projects', href: '/admin/projects', icon: FolderKanban },
              { label: 'Amenities', href: '/admin/amenities', icon: Layers },
            ].map((link) => (
              <Link key={link.href} href={getHref(link.href)}>
                <div className="p-4 border rounded-lg hover:bg-gray-50 hover:border-blue-300 transition-colors text-center">
                  <link.icon className="h-6 w-6 mx-auto text-gray-600 mb-2" />
                  <p className="text-sm font-medium text-gray-700">{link.label}</p>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
