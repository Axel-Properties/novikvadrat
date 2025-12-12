import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const supabase = await createClient()
    
    // Fetch project with all related data
    const { data: project, error } = await supabase
      .from('projects')
      .select(`
        *,
        developer:developers(*),
        city:cities(*),
        municipality:municipalities(*),
        images:project_images(*),
        layouts:layouts(*),
        amenities:project_amenities(
          amenity:amenities(*)
        )
      `)
      .eq('slug', slug)
      .eq('is_active', true)
      .single()
    
    if (error) {
      throw error
    }
    
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }
    
    // Increment view count
    await supabase
      .from('projects')
      .update({ views_count: (project.views_count || 0) + 1 })
      .eq('id', project.id)
    
    // Get similar projects
    const { data: similarProjects } = await supabase
      .from('projects')
      .select(`
        id,
        name,
        slug,
        price_from,
        price_per_sqm_from,
        main_image_url,
        municipality:municipalities(name_sr_lat)
      `)
      .eq('city_id', project.city_id)
      .neq('id', project.id)
      .eq('is_active', true)
      .limit(4)
    
    // Get price history for price dynamics chart
    const { data: priceHistory } = await supabase
      .from('project_price_history')
      .select('*')
      .eq('project_id', project.id)
      .order('recorded_at', { ascending: true })
    
    // Get project buildings (for multi-building projects)
    const { data: buildings } = await supabase
      .from('project_buildings')
      .select('*')
      .eq('project_id', project.id)
      .order('sort_order', { ascending: true })
    
    // Get construction progress spots with photo count
    const { data: constructionProgressRaw } = await supabase
      .from('construction_progress_spots')
      .select(`
        *,
        photos:construction_progress_photos(count)
      `)
      .eq('project_id', project.id)
      .order('sort_order', { ascending: true })
    
    // Transform construction progress to include photo count
    const constructionProgress = constructionProgressRaw?.map((spot: any) => ({
      ...spot,
      photo_count: spot.photos?.[0]?.count || 0,
      photos: undefined // Remove the nested count query result
    })) || []
    
    return NextResponse.json({
      success: true,
      data: {
        ...project,
        amenities: project.amenities?.map((a: any) => a.amenity) || [],
        similarProjects: similarProjects || [],
        priceHistory: priceHistory || [],
        buildings: buildings || [],
        constructionProgress
      }
    })
  } catch (error) {
    console.error('Project detail API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch project' 
      },
      { status: 500 }
    )
  }
}