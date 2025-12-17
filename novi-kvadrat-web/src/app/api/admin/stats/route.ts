import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  try {
    // Fetch all counts in parallel
    const [
      projectsResult,
      developersResult,
      citiesResult,
      municipalitiesResult,
      layoutsResult,
      imagesResult,
      activeProjectsResult,
      completedProjectsResult
    ] = await Promise.all([
      supabase.from('projects').select('id', { count: 'exact', head: true }),
      supabase.from('developers').select('id', { count: 'exact', head: true }),
      supabase.from('cities').select('id', { count: 'exact', head: true }),
      supabase.from('municipalities').select('id', { count: 'exact', head: true }),
      supabase.from('layouts').select('id', { count: 'exact', head: true }),
      supabase.from('project_images').select('id', { count: 'exact', head: true }),
      supabase.from('projects').select('id', { count: 'exact', head: true }).in('construction_status', ['u_izgradnji', 'siva_faza', 'planning']),
      supabase.from('projects').select('id', { count: 'exact', head: true }).in('construction_status', ['completed', 'useljivo'])
    ])

    return NextResponse.json({
      projects: projectsResult.count || 0,
      developers: developersResult.count || 0,
      cities: citiesResult.count || 0,
      municipalities: municipalitiesResult.count || 0,
      layouts: layoutsResult.count || 0,
      images: imagesResult.count || 0,
      activeProjects: activeProjectsResult.count || 0,
      completedProjects: completedProjectsResult.count || 0
    })
  } catch (error) {
    console.error('Failed to fetch stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}

