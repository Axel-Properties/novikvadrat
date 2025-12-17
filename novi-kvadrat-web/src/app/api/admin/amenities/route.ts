import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('amenities')
      .select(`
        *,
        project_amenities:project_amenities(count)
      `)
      .order('category', { ascending: true })
      .order('name_en', { ascending: true })

    if (error) throw error

    // Transform data to include projects count
    const amenitiesWithCount = data?.map(amenity => ({
      ...amenity,
      projects_count: amenity.project_amenities?.[0]?.count || 0,
      project_amenities: undefined
    })) || []

    return NextResponse.json(amenitiesWithCount)
  } catch (error) {
    console.error('Failed to fetch amenities:', error)
    return NextResponse.json(
      { error: 'Failed to fetch amenities' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from('amenities')
      .insert([{
        name_en: body.name_en,
        name_sr: body.name_sr,
        icon: body.icon || null,
        category: body.category || 'other'
      }])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to create amenity:', error)
    return NextResponse.json(
      { message: 'Failed to create amenity' },
      { status: 500 }
    )
  }
}

