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
      .from('project_amenities')
      .select('amenity_id')
      .eq('project_id', id)

    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Failed to fetch project amenities:', error)
    return NextResponse.json(
      { error: 'Failed to fetch project amenities' },
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
    const amenityIds: string[] = body.amenity_ids || []

    // Delete all existing amenities for this project
    await supabase
      .from('project_amenities')
      .delete()
      .eq('project_id', id)

    // Insert new amenities
    if (amenityIds.length > 0) {
      const { error } = await supabase
        .from('project_amenities')
        .insert(amenityIds.map(amenityId => ({
          project_id: id,
          amenity_id: amenityId
        })))

      if (error) throw error
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to update project amenities:', error)
    return NextResponse.json(
      { message: 'Failed to update project amenities' },
      { status: 500 }
    )
  }
}

