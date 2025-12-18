import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// GET all units for a project with optional filters
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)

    let query = supabase
      .from('units')
      .select(`
        *,
        building:project_buildings(id, name, building_type:building_types(id, name, color)),
        unit_type:unit_types(id, name, name_sr),
        layout:layouts(id, name, layout_type)
      `)
      .eq('project_id', id)

    // Apply filters
    const buildingId = searchParams.get('building_id')
    if (buildingId) {
      query = query.eq('building_id', buildingId)
    }

    const status = searchParams.get('status')
    if (status) {
      query = query.eq('status', status)
    }

    const floor = searchParams.get('floor')
    if (floor) {
      query = query.eq('floor', parseInt(floor))
    }

    const propertyCategory = searchParams.get('property_category')
    if (propertyCategory) {
      query = query.eq('property_category', propertyCategory)
    }

    const { data, error } = await query.order('unit_number', { ascending: true })

    if (error) throw error
    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Failed to fetch units:', error)
    return NextResponse.json(
      { error: 'Failed to fetch units' },
      { status: 500 }
    )
  }
}

// POST create new unit
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const { data, error } = await supabase
      .from('units')
      .insert([{
        project_id: id,
        building_id: body.building_id,
        unit_number: body.unit_number,
        floor: parseInt(body.floor),
        unit_type_id: body.unit_type_id || null,
        layout_id: body.layout_id || null,
        property_category: body.property_category || 'apartment',
        status: body.status || 'available',
        orientation: body.orientation || null,
        view_type: body.view_type || null,
        furnishing_status: body.furnishing_status || 'unfurnished',
        total_area: parseFloat(body.total_area),
        living_area: body.living_area ? parseFloat(body.living_area) : null,
        terrace_area: body.terrace_area ? parseFloat(body.terrace_area) : null,
        balcony_area: body.balcony_area ? parseFloat(body.balcony_area) : null,
        garden_area: body.garden_area ? parseFloat(body.garden_area) : null,
        bedrooms: body.bedrooms ? parseInt(body.bedrooms) : 0,
        bathrooms: body.bathrooms ? parseInt(body.bathrooms) : 1,
        has_terrace: body.has_terrace || false,
        has_balcony: body.has_balcony || false,
        has_garden: body.has_garden || false,
        has_parking: body.has_parking || false,
        has_storage: body.has_storage || false,
        parking_spots: body.parking_spots ? parseInt(body.parking_spots) : 0,
        parking_type: body.parking_type || null,
        description: body.description || null,
        internal_notes: body.internal_notes || null,
        price: body.price ? parseFloat(body.price) : null,
        price_per_sqm: body.price_per_sqm ? parseFloat(body.price_per_sqm) : null,
        original_price: body.original_price ? parseFloat(body.original_price) : null,
        available_from: body.available_from || null,
        hero_image_url: body.hero_image_url || null,
        floor_plan_2d_url: body.floor_plan_2d_url || null,
        floor_plan_3d_url: body.floor_plan_3d_url || null,
        floor_plan_with_dimensions_url: body.floor_plan_with_dimensions_url || null,
        virtual_tour_url: body.virtual_tour_url || null,
        is_active: body.is_active !== false,
        is_featured: body.is_featured || false
      }])
      .select(`
        *,
        building:project_buildings(id, name),
        unit_type:unit_types(id, name),
        layout:layouts(id, name, layout_type)
      `)
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'A unit with this number already exists in this building' },
          { status: 400 }
        )
      }
      throw error
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to create unit:', error)
    return NextResponse.json(
      { error: 'Failed to create unit' },
      { status: 500 }
    )
  }
}
