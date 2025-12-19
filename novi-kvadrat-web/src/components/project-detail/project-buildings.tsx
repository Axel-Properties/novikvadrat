'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Building2, CheckCircle, Clock, ChevronRight } from 'lucide-react'
import type { ProjectBuilding } from '@/types/database'

interface ProjectBuildingsProps {
  buildings: ProjectBuilding[]
  title?: string
  onBuildingClick?: (building: ProjectBuilding) => void
}

const statusConfig: Record<string, { 
  label: string
  icon: typeof CheckCircle
  className: string 
}> = {
  completed: {
    label: 'Delivered',
    icon: CheckCircle,
    className: 'text-green-600'
  },
  useljivo: {
    label: 'Ready to move',
    icon: CheckCircle,
    className: 'text-green-600'
  },
  u_izgradnji: {
    label: 'Under construction',
    icon: Clock,
    className: 'text-blue-600'
  },
  siva_faza: {
    label: 'Gray frame',
    icon: Clock,
    className: 'text-orange-600'
  },
  planning: {
    label: 'Planning',
    icon: Clock,
    className: 'text-gray-600'
  }
}

export function ProjectBuildings({ 
  buildings, 
  title = 'Project houses',
  onBuildingClick 
}: ProjectBuildingsProps) {
  if (buildings.length === 0) {
    return null
  }

  const formatCompletionDate = (dateStr: string | null) => {
    if (!dateStr) return null
    const date = new Date(dateStr)
    const now = new Date()
    const year = date.getFullYear()
    const quarter = Math.ceil((date.getMonth() + 1) / 3)
    
    if (date < now) {
      return `Completed in ${year}`
    }
    return `Completion in Q${quarter} ${year}`
  }

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-gray-600 text-sm mt-1">
            Total {buildings.length} {buildings.length === 1 ? 'house' : 'houses'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {buildings.map((building) => {
          const status = statusConfig[building.construction_status || 'planning']
          const StatusIcon = status.icon
          const completionText = formatCompletionDate(building.completion_date)

          return (
            <Card 
              key={building.id}
              className={`group hover:shadow-lg transition-all duration-200 ${
                onBuildingClick ? 'cursor-pointer' : ''
              }`}
              onClick={() => onBuildingClick?.(building)}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Building Name & Address */}
                    <h3 className="text-lg font-semibold text-gray-900">
                      {building.address || building.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-0.5">
                      {building.name}
                    </p>

                    {/* Floors */}
                    {building.floors && (
                      <p className="text-gray-700 mt-3">
                        {building.floors} {building.floors === 1 ? 'floor' : 'floors'}
                      </p>
                    )}

                    {/* Status */}
                    <div className={`flex items-center gap-2 mt-4 ${status.className}`}>
                      <StatusIcon className="h-5 w-5" />
                      <span className="font-medium">{status.label}</span>
                    </div>

                    {/* Completion Date */}
                    {completionText && (
                      <p className="text-gray-500 text-sm mt-1">
                        {completionText}
                      </p>
                    )}

                    {/* Units Info */}
                    {building.available_units !== null && building.total_units && (
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm text-gray-600">
                          {building.available_units} apartments from developer
                        </p>
                        <p className="font-semibold text-gray-900 mt-1">
                          price upon request
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Arrow indicator */}
                  {onBuildingClick && (
                    <div className="ml-4 p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}



