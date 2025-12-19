import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; spotId: string }> }
) {
  try {
    const { spotId } = await params

    const { data, error } = await supabase
      .from('construction_progress_photos')
      .select('*')
      .eq('spot_id', spotId)
      .order('taken_at', { ascending: false })
      .order('sort_order', { ascending: true })

    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Failed to fetch photos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch photos' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; spotId: string }> }
) {
  try {
    const { spotId } = await params
    const body = await request.json()

    // Get max sort_order
    const { data: existingPhotos } = await supabase
      .from('construction_progress_photos')
      .select('sort_order')
      .eq('spot_id', spotId)
      .order('sort_order', { ascending: false })
      .limit(1)

    const nextSortOrder = (existingPhotos?.[0]?.sort_order || 0) + 1

    const { data, error } = await supabase
      .from('construction_progress_photos')
      .insert([{
        spot_id: spotId,
        url: body.url,
        caption: body.caption || null,
        taken_at: body.taken_at,
        sort_order: nextSortOrder
      }])
      .select()
      .single()

    if (error) throw error

    // Update spot's latest_date if this photo is newer
    const { data: spot } = await supabase
      .from('construction_progress_spots')
      .select('latest_date, start_date')
      .eq('id', spotId)
      .single()

    if (spot) {
      const photoDate = new Date(body.taken_at)
      const latestDate = spot.latest_date ? new Date(spot.latest_date) : null
      const startDate = spot.start_date ? new Date(spot.start_date) : null

      let shouldUpdate = false
      let newLatestDate = spot.latest_date
      let newStartDate = spot.start_date

      if (!latestDate || photoDate > latestDate) {
        newLatestDate = body.taken_at
        shouldUpdate = true
      }

      if (!startDate || photoDate < startDate) {
        newStartDate = body.taken_at
        shouldUpdate = true
      }

      if (shouldUpdate) {
        await supabase
          .from('construction_progress_spots')
          .update({
            latest_date: newLatestDate,
            start_date: newStartDate || spot.start_date
          })
          .eq('id', spotId)
      }

      // Update cover image if this is the first photo or if spot has no cover
      const { data: spotWithCover } = await supabase
        .from('construction_progress_spots')
        .select('cover_image_url')
        .eq('id', spotId)
        .single()

      if (!spotWithCover?.cover_image_url) {
        await supabase
          .from('construction_progress_spots')
          .update({ cover_image_url: body.url })
          .eq('id', spotId)
      }
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to add photo:', error)
    return NextResponse.json(
      { message: 'Failed to add photo' },
      { status: 500 }
    )
  }
}
