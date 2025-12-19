import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { EditLayoutPageClient } from './layout-client'
import LayoutDetailLoading from './loading'

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

async function getLayoutData(projectId: string, layoutId: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('layouts')
    .select('*')
    .eq('project_id', projectId)
    .eq('id', layoutId)
    .single()

  if (error || !data) {
    return null
  }

  return data
}

export default async function EditLayoutPage({
  params,
}: {
  params: Promise<{ id: string; layoutId: string; locale: string }>
}) {
  const { id: projectId, layoutId, locale } = await params

  // Fetch all data in parallel
  const [project, layout] = await Promise.all([
    getProjectData(projectId),
    getLayoutData(projectId, layoutId),
  ])

  if (!layout) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Layout not found</p>
      </div>
    )
  }

  return (
    <Suspense fallback={<LayoutDetailLoading />}>
      <EditLayoutPageClient
        projectId={projectId}
        layoutId={layoutId}
        locale={locale}
        initialProjectName={project.name}
        initialLayout={layout}
      />
    </Suspense>
  )
}
