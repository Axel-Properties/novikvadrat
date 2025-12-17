import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const cityId = searchParams.get('city_id')
    const status = searchParams.get('status')

    let query = supabase
      .from('projects')
      .select(`
        *,
        developer:developers(name),
        city:cities(name_sr_lat)
      `)
      .order('created_at', { ascending: false })

    if (cityId) {
      query = query.eq('city_id', cityId)
    }
    if (status) {
      query = query.eq('construction_status', status)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from('projects')
      .insert([{
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
        vat_included: body.vat_included ?? true,
        first_buyer_vat_refund: body.first_buyer_vat_refund || false,
        main_image_url: body.main_image_url || null,
        video_url: body.video_url || null,
        virtual_tour_url: body.virtual_tour_url || null,
        brochure_url: body.brochure_url || null,
        featured: body.featured || false,
        featured_order: body.featured_order,
        is_active: body.is_active ?? true
      }])
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
    console.error('Failed to create project:', error)
    return NextResponse.json(
      { message: 'Failed to create project' },
      { status: 500 }
    )
  }
}

