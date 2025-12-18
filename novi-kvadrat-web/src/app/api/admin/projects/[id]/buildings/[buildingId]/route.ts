import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// GET single building
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; buildingId: string }> }
) {
  try {
    const { buildingId } = await params

    const { data, error } = await supabase
      .from('project_buildings')
      .select(`
        *,
        building_type:building_types(id, name, name_sr, color)
      `)
      .eq('id', buildingId)
      .single()

    if (error) throw error
    if (!data) {
      return NextResponse.json(
        { error: 'Building not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to fetch building:', error)
    return NextResponse.json(
      { error: 'Failed to fetch building' },
      { status: 500 }
    )
  }
}

// PUT update building
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; buildingId: string }> }
) {
  try {
    const { buildingId } = await params
    const body = await request.json()

    const { data, error } = await supabase
      .from('project_buildings')
      .update({
        name: body.name,
        building_type_id: body.building_type_id || null,
        building_group: body.building_group || null,
        address: body.address || null,
        floors: body.floors ? parseInt(body.floors) : null,
        construction_status: body.construction_status || null,
        completion_date: body.completion_date || null,
        latitude: body.latitude ? parseFloat(body.latitude) : null,
        longitude: body.longitude ? parseFloat(body.longitude) : null,
        sort_order: body.sort_order,
        updated_at: new Date().toISOString()
      })
      .eq('id', buildingId)
      .select(`
        *,
        building_type:building_types(id, name, name_sr, color)
      `)
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to update building:', error)
    return NextResponse.json(
      { error: 'Failed to update building' },
      { status: 500 }
    )
  }
}

// DELETE building
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; buildingId: string }> }
) {
  try {
    const { id, buildingId } = await params

    // First delete all units in this building
    await supabase
      .from('units')
      .delete()
      .eq('building_id', buildingId)

    // Then delete the building
    const { error } = await supabase
      .from('project_buildings')
      .delete()
      .eq('id', buildingId)

    if (error) throw error

    // Update project total_buildings count
    const { data: remainingBuildings } = await supabase
      .from('project_buildings')
      .select('id')
      .eq('project_id', id)

    await supabase
      .from('projects')
      .update({ total_buildings: remainingBuildings?.length || 0 })
      .eq('id', id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete building:', error)
    return NextResponse.json(
      { error: 'Failed to delete building' },
      { status: 500 }
    )
  }
}
