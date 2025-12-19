import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { LayoutsPageClient } from './layouts-client'
import LayoutsLoading from './loading'

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

async function getLayoutsData(projectId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('layouts')
    .select('*')
    .eq('project_id', projectId)
    .order('name', { ascending: true })

  if (error) {
    console.error('Failed to fetch layouts:', error)
    return []
  }

  return data || []
}

export default async function ProjectLayoutsPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>
}) {
  const { id: projectId, locale } = await params

  // Fetch all data in parallel
  const [project, layouts] = await Promise.all([
    getProjectData(projectId),
    getLayoutsData(projectId),
  ])

  return (
    <Suspense fallback={<LayoutsLoading />}>
      <LayoutsPageClient
        projectId={projectId}
        locale={locale}
        initialProjectName={project.name}
        initialLayouts={layouts}
      />
    </Suspense>
  )
}
