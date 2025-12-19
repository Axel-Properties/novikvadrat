import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { BuildingsPageClient } from './buildings-client'
import BuildingsLoading from './loading'

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
    console.error('Failed to fetch buildings:', error)
    return []
  }

  return data || []
}

export default async function BuildingsPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>
}) {
  const { id: projectId, locale } = await params

  // Fetch all data in parallel
  const [project, buildings] = await Promise.all([
    getProjectData(projectId),
    getBuildingsData(projectId),
  ])

  return (
    <Suspense fallback={<BuildingsLoading />}>
      <BuildingsPageClient
        projectId={projectId}
        locale={locale}
        initialProjectName={project.name}
        initialBuildings={buildings}
      />
    </Suspense>
  )
}
