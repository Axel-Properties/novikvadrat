import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { CalendarPageClient } from './calendar-client'
import CalendarLoading from './loading'

async function getProjectData(projectId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('projects')
    .select('id, name')
    .eq('id', projectId)
    .single()

  if (error || !data) {
    return { name: '' }
  }

  return data
}

async function getBuildingsData(projectId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('project_buildings')
    .select(`
      *,
      building_type:building_types(id, name, name_sr, color)
    `)
    .eq('project_id', projectId)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Failed to fetch buildings:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code
    })
    return []
  }

  return data || []
}

async function getUnitsData(projectId: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('units')
    .select(`
      *,
      building:project_buildings(id, name, building_type:building_types(id, name, color)),
      unit_type:unit_types(id, name, name_sr),
      layout:layouts(id, name, layout_type)
    `)
    .eq('project_id', projectId)
    .order('unit_number', { ascending: true })

  if (error) {
    console.error('Failed to fetch units:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code
    })
    return []
  }

  return data || []
}

export default async function ProjectCalendarPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>
}) {
  const { id: projectId, locale } = await params

  // Fetch all data in parallel
  const [project, buildings, units] = await Promise.all([
    getProjectData(projectId),
    getBuildingsData(projectId),
    getUnitsData(projectId),
  ])

  return (
    <Suspense fallback={<CalendarLoading />}>
      <CalendarPageClient
        projectId={projectId}
        locale={locale}
        initialProjectName={project.name}
        initialBuildings={buildings}
        initialUnits={units}
      />
    </Suspense>
  )
}
