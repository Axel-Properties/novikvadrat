import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; spotId: string }> }
) {
  try {
    const { spotId } = await params

    // Delete spot (cascade will delete photos)
    const { error } = await supabase
      .from('construction_progress_spots')
      .delete()
      .eq('id', spotId)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete progress spot:', error)
    return NextResponse.json(
      { message: 'Failed to delete progress spot' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; spotId: string }> }
) {
  try {
    const { spotId } = await params
    const body = await request.json()

    const { data, error } = await supabase
      .from('construction_progress_spots')
      .update({
        name: body.name,
        description: body.description,
        start_date: body.start_date,
        cover_image_url: body.cover_image_url,
        sort_order: body.sort_order
      })
      .eq('id', spotId)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to update progress spot:', error)
    return NextResponse.json(
      { message: 'Failed to update progress spot' },
      { status: 500 }
    )
  }
}
