import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// GET all buildings for a project
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const { data, error } = await supabase
      .from('project_buildings')
      .select(`
        *,
        building_type:building_types(id, name, name_sr, color)
      `)
      .eq('project_id', id)
      .order('sort_order', { ascending: true })

    if (error) throw error
    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Failed to fetch buildings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch buildings' },
      { status: 500 }
    )
  }
}

// POST create new building
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    // Get max sort_order
    const { data: existing } = await supabase
      .from('project_buildings')
      .select('sort_order')
      .eq('project_id', id)
      .order('sort_order', { ascending: false })
      .limit(1)

    const nextSortOrder = existing && existing.length > 0 ? existing[0].sort_order + 1 : 0

    const { data, error } = await supabase
      .from('project_buildings')
      .insert([{
        project_id: id,
        name: body.name,
        building_type_id: body.building_type_id || null,
        building_group: body.building_group || null,
        address: body.address || null,
        floors: body.floors ? parseInt(body.floors) : null,
        total_units: body.total_units ? parseInt(body.total_units) : 0,
        available_units: body.available_units ? parseInt(body.available_units) : 0,
        construction_status: body.construction_status || null,
        completion_date: body.completion_date || null,
        latitude: body.latitude ? parseFloat(body.latitude) : null,
        longitude: body.longitude ? parseFloat(body.longitude) : null,
        sort_order: body.sort_order ?? nextSortOrder
      }])
      .select(`
        *,
        building_type:building_types(id, name, name_sr, color)
      `)
      .single()

    if (error) throw error

    // Update project total_buildings count
    try {
      const { error: rpcError } = await supabase.rpc('update_project_building_count', { p_project_id: id })
      if (rpcError) {
        // If RPC doesn't exist, update manually
        const { data: buildings } = await supabase
          .from('project_buildings')
          .select('id')
          .eq('project_id', id)

        await supabase
          .from('projects')
          .update({ total_buildings: buildings?.length || 0 })
          .eq('id', id)
      }
    } catch {
      // Silently fail - count update is not critical
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to create building:', error)
    return NextResponse.json(
      { error: 'Failed to create building' },
      { status: 500 }
    )
  }
}
