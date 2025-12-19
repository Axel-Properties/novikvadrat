'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { PageHeader, ProjectSubNav } from '@/components/admin'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/toaster'
import {
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { ProjectBuildingWithType, UnitWithDetails } from '@/types/database'

interface CalendarEvent {
  id: string
  title: string
  date: string
  type: 'availability' | 'completion' | 'milestone'
  unitId?: string
  buildingId?: string
}

interface CalendarPageClientProps {
  projectId: string
  locale: string
  initialProjectName: string
  initialBuildings: ProjectBuildingWithType[]
  initialUnits: UnitWithDetails[]
}

export function CalendarPageClient({
  projectId,
  locale,
  initialProjectName,
  initialBuildings,
  initialUnits,
}: CalendarPageClientProps) {
  const [buildings] = useState<ProjectBuildingWithType[]>(initialBuildings)
  const [units] = useState<UnitWithDetails[]>(initialUnits)
  const [projectName] = useState(initialProjectName)
  const [currentMonth, setCurrentMonth] = useState(new Date())

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

  return (
    <>
      <PageHeader
        title="Calendar"
        description={projectName}
        backHref={`/${locale}/admin/projects/${projectId}`}
      />

      <ProjectSubNav />

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
                          className={`text-xs p-1 rounded truncate ${event.type === 'availability' ? 'bg-green-100 text-green-800' :
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
                      <div className={`w-2 h-2 rounded ${event.type === 'availability' ? 'bg-green-500' : 'bg-blue-500'
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

      <Toaster />
    </>
  )
}
