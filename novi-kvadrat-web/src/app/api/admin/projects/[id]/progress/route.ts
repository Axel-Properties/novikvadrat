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
      .from('construction_progress_spots')
      .select(`
        *,
        photos:construction_progress_photos(count)
      `)
      .eq('project_id', id)
      .order('sort_order', { ascending: true })

    if (error) throw error

    // Transform to include photo count
    const spots = (data || []).map((spot: any) => ({
      ...spot,
      photo_count: spot.photos?.[0]?.count || 0,
      photos: undefined
    }))

    return NextResponse.json(spots)
  } catch (error) {
    console.error('Failed to fetch construction progress:', error)
    return NextResponse.json(
      { error: 'Failed to fetch construction progress' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    // Get max sort_order
    const { data: existingSpots } = await supabase
      .from('construction_progress_spots')
      .select('sort_order')
      .eq('project_id', id)
      .order('sort_order', { ascending: false })
      .limit(1)

    const nextSortOrder = (existingSpots?.[0]?.sort_order || 0) + 1

    const { data, error } = await supabase
      .from('construction_progress_spots')
      .insert([{
        project_id: id,
        name: body.name,
        description: body.description || null,
        start_date: body.start_date || null,
        cover_image_url: body.cover_image_url || null,
        sort_order: nextSortOrder
      }])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ ...data, photo_count: 0 })
  } catch (error) {
    console.error('Failed to add progress spot:', error)
    return NextResponse.json(
      { message: 'Failed to add progress spot' },
      { status: 500 }
    )
  }
}
