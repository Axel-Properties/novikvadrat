'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { PageHeader } from '@/components/admin'
import { StatsCard } from '@/components/admin/stats-card'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  Calendar as CalendarIcon,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react'
import {
  ProjectBuildingWithType,
  UnitWithDetails,
  UNIT_STATUS
} from '@/types/database'

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

interface CalendarEvent {
  id: string
  title: string
  date: string
  type: 'availability' | 'completion' | 'milestone'
  unitId?: string
  buildingId?: string
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

export default function PropertiesDashboardPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  const locale = params.locale as string || 'en'
  const { toast } = useToast()

  const [stats, setStats] = useState<PropertyStats | null>(null)
  const [buildings, setBuildings] = useState<ProjectBuildingWithType[]>([])
  const [units, setUnits] = useState<UnitWithDetails[]>([])
  const [projectName, setProjectName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  useEffect(() => {
    fetchAllData()
  }, [projectId])

  const fetchAllData = async () => {
    setIsLoading(true)
    await Promise.all([
      fetchProjectName(),
      fetchStats(),
      fetchBuildings(),
      fetchUnits()
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

  const fetchUnits = async () => {
    try {
      const response = await fetch(`/api/admin/projects/${projectId}/units`)
      if (response.ok) {
        const data = await response.json()
        setUnits(data)
      }
    } catch (error) {
      console.error('Failed to fetch units:', error)
    }
  }

  // Generate calendar events from units and buildings
  const getCalendarEvents = (): CalendarEvent[] => {
    const events: CalendarEvent[] = []

    // Add unit availability dates
    units.forEach(unit => {
      if (unit.available_from) {
        events.push({
          id: `unit-${unit.id}`,
          title: `${unit.unit_number} Available`,
          date: unit.available_from,
          type: 'availability',
          unitId: unit.id
        })
      }
    })

    // Add building completion dates
    buildings.forEach(building => {
      if (building.completion_date) {
        events.push({
          id: `building-${building.id}`,
          title: `${building.name} Completion`,
          date: building.completion_date,
          type: 'completion',
          buildingId: building.id
        })
      }
    })

    return events
  }

  const calendarEvents = getCalendarEvents()

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()

    return { daysInMonth, startingDay }
  }

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return calendarEvents.filter(event => event.date === dateStr)
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const { daysInMonth, startingDay } = getDaysInMonth(currentMonth)
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: startingDay }, (_, i) => i)

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
        title="Properties Management"
        description={`Manage buildings and units for: ${projectName}`}
        backHref={`/${locale}/admin/projects/${projectId}`}
      />

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="buildings" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Buildings
          </TabsTrigger>
          <TabsTrigger value="units" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Units
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            Calendar
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="space-y-6">
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

            {/* Quick Actions */}
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
                  <Link href={`/${locale}/admin/projects/${projectId}/building-types`}>
                    <Button variant="outline" className="w-full justify-start">
                      <Building2 className="h-4 w-4 mr-2" />
                      Manage Building Types
                    </Button>
                  </Link>
                  <Link href={`/${locale}/admin/projects/${projectId}/unit-types`}>
                    <Button variant="outline" className="w-full justify-start">
                      <Home className="h-4 w-4 mr-2" />
                      Manage Unit Types
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
        </TabsContent>

        {/* Buildings Tab */}
        <TabsContent value="buildings">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Buildings</CardTitle>
                <CardDescription>{buildings.length} buildings in this project</CardDescription>
              </div>
              <Link href={`/${locale}/admin/projects/${projectId}/buildings/new`}>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Building
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {buildings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {buildings.map((building) => (
                    <Card key={building.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold">{building.name}</h3>
                            {building.building_type && (
                              <Badge
                                style={{
                                  backgroundColor: building.building_type.color + '20',
                                  color: building.building_type.color
                                }}
                                className="mt-1"
                              >
                                {building.building_type.name}
                              </Badge>
                            )}
                          </div>
                          <Link href={`/${locale}/admin/projects/${projectId}/buildings/${building.id}`}>
                            <Button variant="ghost" size="icon">
                              <ArrowUpRight className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                        <div className="text-sm text-gray-500 space-y-1">
                          <div className="flex justify-between">
                            <span>Floors:</span>
                            <span>{building.floors || '-'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Units:</span>
                            <span>{building.available_units || 0} / {building.total_units || 0} avail.</span>
                          </div>
                          {building.construction_status && (
                            <div className="flex justify-between items-center">
                              <span>Status:</span>
                              <Badge className={statusColors[building.construction_status]}>
                                {statusLabels[building.construction_status]}
                              </Badge>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No buildings yet</p>
                  <Link href={`/${locale}/admin/projects/${projectId}/buildings/new`}>
                    <Button variant="link">Add your first building</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Units Tab */}
        <TabsContent value="units">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Units</CardTitle>
                <CardDescription>{units.length} units in this project</CardDescription>
              </div>
              <div className="flex gap-2">
                <Link href={`/${locale}/admin/projects/${projectId}/units`}>
                  <Button variant="outline">
                    View All
                  </Button>
                </Link>
                <Link href={`/${locale}/admin/projects/${projectId}/units/new`}>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Unit
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {units.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Unit</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Building</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Floor</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Area</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Price</th>
                        <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Status</th>
                        <th className="text-right py-3 px-2 text-sm font-medium text-gray-500"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {units.slice(0, 10).map((unit) => (
                        <tr key={unit.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-2">
                            <span className="font-medium">{unit.unit_number}</span>
                          </td>
                          <td className="py-3 px-2">{unit.building?.name || '-'}</td>
                          <td className="py-3 px-2">{unit.floor}</td>
                          <td className="py-3 px-2">{unit.total_area} m²</td>
                          <td className="py-3 px-2">
                            {unit.price ? `€${unit.price.toLocaleString()}` : '-'}
                          </td>
                          <td className="py-3 px-2">
                            <Badge className={UNIT_STATUS[unit.status]?.color}>
                              {UNIT_STATUS[unit.status]?.label}
                            </Badge>
                          </td>
                          <td className="py-3 px-2 text-right">
                            <Link href={`/${locale}/admin/projects/${projectId}/units/${unit.id}`}>
                              <Button variant="ghost" size="sm">Edit</Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {units.length > 10 && (
                    <div className="text-center py-4">
                      <Link href={`/${locale}/admin/projects/${projectId}/units`}>
                        <Button variant="link">View all {units.length} units</Button>
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Home className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No units yet</p>
                  <Link href={`/${locale}/admin/projects/${projectId}/units/new`}>
                    <Button variant="link">Add your first unit</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Calendar Tab */}
        <TabsContent value="calendar">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>Unit availability & construction milestones</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={prevMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="font-medium min-w-[140px] text-center">
                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                <Button variant="outline" size="icon" onClick={nextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Calendar Legend */}
              <div className="flex gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded bg-green-500" />
                  <span>Availability</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded bg-blue-500" />
                  <span>Completion</span>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="border rounded-lg overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-7 bg-gray-50 border-b">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Days */}
                <div className="grid grid-cols-7">
                  {/* Empty cells for days before month starts */}
                  {emptyDays.map((_, index) => (
                    <div key={`empty-${index}`} className="min-h-[80px] p-2 border-b border-r bg-gray-50" />
                  ))}

                  {/* Day cells */}
                  {days.map((day) => {
                    const dayEvents = getEventsForDate(day)
                    const isToday = new Date().toDateString() === new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toDateString()

                    return (
                      <div
                        key={day}
                        className={`min-h-[80px] p-2 border-b border-r ${isToday ? 'bg-blue-50' : ''}`}
                      >
                        <div className={`text-sm ${isToday ? 'font-bold text-blue-600' : 'text-gray-600'}`}>
                          {day}
                        </div>
                        <div className="mt-1 space-y-1">
                          {dayEvents.slice(0, 2).map((event) => (
                            <div
                              key={event.id}
                              className={`text-xs p-1 rounded truncate ${
                                event.type === 'availability' ? 'bg-green-100 text-green-800' :
                                event.type === 'completion' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}
                              title={event.title}
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-gray-500">
                              +{dayEvents.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="mt-6">
                <h3 className="font-medium mb-3">Upcoming Events</h3>
                {calendarEvents.length > 0 ? (
                  <div className="space-y-2">
                    {calendarEvents
                      .filter(event => new Date(event.date) >= new Date())
                      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                      .slice(0, 5)
                      .map((event) => (
                        <div key={event.id} className="flex items-center gap-3 p-2 border rounded">
                          <div className={`w-2 h-2 rounded ${
                            event.type === 'availability' ? 'bg-green-500' : 'bg-blue-500'
                          }`} />
                          <div className="flex-1">
                            <div className="font-medium text-sm">{event.title}</div>
                            <div className="text-xs text-gray-500">
                              {new Date(event.date).toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No upcoming events</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Toaster />
    </>
  )
}
