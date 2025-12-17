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

    let query = supabase
      .from('municipalities')
      .select(`
        *,
        city:cities(name_sr_lat)
      `)
      .order('name_sr_lat', { ascending: true })

    if (cityId) {
      query = query.eq('city_id', cityId)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Failed to fetch municipalities:', error)
    return NextResponse.json(
      { error: 'Failed to fetch municipalities' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from('municipalities')
      .insert([{
        name_en: body.name_en,
        name_sr_lat: body.name_sr_lat,
        name_sr_cyr: body.name_sr_cyr,
        slug: body.slug,
        city_id: body.city_id,
        municipality_type: body.municipality_type,
        latitude: body.latitude,
        longitude: body.longitude,
        is_active: body.is_active ?? true
      }])
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { message: 'A municipality with this slug already exists' },
          { status: 400 }
        )
      }
      throw error
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to create municipality:', error)
    return NextResponse.json(
      { message: 'Failed to create municipality' },
      { status: 500 }
    )
  }
}

