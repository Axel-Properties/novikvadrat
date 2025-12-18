import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// GET single unit with all details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; unitId: string }> }
) {
  try {
    const { unitId } = await params

    const { data, error } = await supabase
      .from('units')
      .select(`
        *,
        building:project_buildings(id, name, building_type:building_types(id, name, color)),
        unit_type:unit_types(id, name, name_sr),
        layout:layouts(id, name, layout_type),
        images:unit_images(*),
        features:unit_features(*, amenity:amenities(*))
      `)
      .eq('id', unitId)
      .single()

    if (error) throw error
    if (!data) {
      return NextResponse.json(
        { error: 'Unit not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to fetch unit:', error)
    return NextResponse.json(
      { error: 'Failed to fetch unit' },
      { status: 500 }
    )
  }
}

// PUT update unit
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; unitId: string }> }
) {
  try {
    const { unitId } = await params
    const body = await request.json()

    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString()
    }

    // Only update fields that are provided
    const fields = [
      'building_id', 'unit_number', 'floor', 'unit_type_id', 'layout_id',
      'property_category', 'status', 'orientation', 'view_type', 'furnishing_status',
      'total_area', 'living_area', 'terrace_area', 'balcony_area', 'garden_area',
      'bedrooms', 'bathrooms', 'has_terrace', 'has_balcony', 'has_garden',
      'has_parking', 'has_storage', 'parking_spots', 'parking_type',
      'description', 'internal_notes', 'price', 'price_per_sqm', 'original_price',
      'available_from', 'hero_image_url', 'floor_plan_2d_url', 'floor_plan_3d_url',
      'floor_plan_with_dimensions_url', 'virtual_tour_url', 'is_active', 'is_featured'
    ]

    for (const field of fields) {
      if (body[field] !== undefined) {
        // Type conversion for specific fields
        if (['floor', 'bedrooms', 'bathrooms', 'parking_spots'].includes(field)) {
          updateData[field] = body[field] ? parseInt(body[field]) : null
        } else if (['total_area', 'living_area', 'terrace_area', 'balcony_area', 'garden_area', 'price', 'price_per_sqm', 'original_price'].includes(field)) {
          updateData[field] = body[field] ? parseFloat(body[field]) : null
        } else {
          updateData[field] = body[field] || null
        }
      }
    }

    const { data, error } = await supabase
      .from('units')
      .update(updateData)
      .eq('id', unitId)
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
    console.error('Failed to update unit:', error)
    return NextResponse.json(
      { error: 'Failed to update unit' },
      { status: 500 }
    )
  }
}

// DELETE unit
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; unitId: string }> }
) {
  try {
    const { unitId } = await params

    // Delete related data first
    await supabase.from('unit_features').delete().eq('unit_id', unitId)
    await supabase.from('unit_images').delete().eq('unit_id', unitId)

    // Then delete the unit
    const { error } = await supabase
      .from('units')
      .delete()
      .eq('id', unitId)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete unit:', error)
    return NextResponse.json(
      { error: 'Failed to delete unit' },
      { status: 500 }
    )
  }
}
