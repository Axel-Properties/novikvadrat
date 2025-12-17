import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  try {
    // Get cities with municipality count
    const { data: cities, error } = await supabase
      .from('cities')
      .select(`
        *,
        municipalities:municipalities(count)
      `)
      .order('sort_order', { ascending: true })
      .order('name_sr_lat', { ascending: true })

    if (error) throw error

    // Transform data to include municipality count
    const citiesWithCount = cities?.map(city => ({
      ...city,
      municipalities_count: city.municipalities?.[0]?.count || 0,
      municipalities: undefined
    })) || []

    return NextResponse.json(citiesWithCount)
  } catch (error) {
    console.error('Failed to fetch cities:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cities' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from('cities')
      .insert([{
        name_en: body.name_en,
        name_sr_lat: body.name_sr_lat,
        name_sr_cyr: body.name_sr_cyr,
        slug: body.slug,
        country: body.country,
        latitude: body.latitude,
        longitude: body.longitude,
        is_active: body.is_active ?? true,
        sort_order: body.sort_order ?? 0
      }])
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { message: 'A city with this slug already exists' },
          { status: 400 }
        )
      }
      throw error
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to create city:', error)
    return NextResponse.json(
      { message: 'Failed to create city' },
      { status: 500 }
    )
  }
}

