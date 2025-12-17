import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    if (!data) {
      return NextResponse.json(
        { message: 'Project not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to fetch project:', error)
    return NextResponse.json(
      { message: 'Failed to fetch project' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const { data, error } = await supabase
      .from('projects')
      .update({
        name: body.name,
        slug: body.slug,
        developer_id: body.developer_id,
        description: body.description || null,
        city_id: body.city_id,
        municipality_id: body.municipality_id,
        address: body.address || null,
        latitude: body.latitude,
        longitude: body.longitude,
        construction_status: body.construction_status,
        construction_start_date: body.construction_start_date || null,
        completion_date: body.completion_date || null,
        completion_percentage: body.completion_percentage || 0,
        total_buildings: body.total_buildings,
        total_floors: body.total_floors,
        total_units: body.total_units,
        available_units: body.available_units,
        parking_spaces: body.parking_spaces,
        heating_type: body.heating_type || null,
        elevator: body.elevator || false,
        garage: body.garage || false,
        energy_class: body.energy_class || null,
        price_from: body.price_from,
        price_to: body.price_to,
        price_per_sqm_from: body.price_per_sqm_from,
        price_per_sqm_to: body.price_per_sqm_to,
        vat_included: body.vat_included,
        first_buyer_vat_refund: body.first_buyer_vat_refund,
        main_image_url: body.main_image_url || null,
        video_url: body.video_url || null,
        virtual_tour_url: body.virtual_tour_url || null,
        brochure_url: body.brochure_url || null,
        featured: body.featured,
        featured_order: body.featured_order,
        is_active: body.is_active
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { message: 'A project with this slug already exists' },
          { status: 400 }
        )
      }
      throw error
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to update project:', error)
    return NextResponse.json(
      { message: 'Failed to update project' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Delete related records first
    await supabase.from('project_images').delete().eq('project_id', id)
    await supabase.from('layouts').delete().eq('project_id', id)
    await supabase.from('project_amenities').delete().eq('project_id', id)
    await supabase.from('project_buildings').delete().eq('project_id', id)
    await supabase.from('project_price_history').delete().eq('project_id', id)

    // Then delete the project
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete project:', error)
    return NextResponse.json(
      { message: 'Failed to delete project' },
      { status: 500 }
    )
  }
}

