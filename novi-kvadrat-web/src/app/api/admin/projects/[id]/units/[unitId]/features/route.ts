import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// GET all features for a unit
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; unitId: string }> }
) {
  try {
    const { unitId } = await params

    const { data, error } = await supabase
      .from('unit_features')
      .select(`
        *,
        amenity:amenities(*)
      `)
      .eq('unit_id', unitId)

    if (error) throw error
    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Failed to fetch unit features:', error)
    return NextResponse.json(
      { error: 'Failed to fetch unit features' },
      { status: 500 }
    )
  }
}

// PUT update unit features (replace all)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; unitId: string }> }
) {
  try {
    const { unitId } = await params
    const body = await request.json()
    const { amenity_ids } = body

    if (!Array.isArray(amenity_ids)) {
      return NextResponse.json(
        { error: 'amenity_ids must be an array' },
        { status: 400 }
      )
    }

    // Delete existing features
    await supabase
      .from('unit_features')
      .delete()
      .eq('unit_id', unitId)

    // Insert new features
    if (amenity_ids.length > 0) {
      const features = amenity_ids.map((amenity_id: string) => ({
        unit_id: unitId,
        amenity_id
      }))

      const { error: insertError } = await supabase
        .from('unit_features')
        .insert(features)

      if (insertError) throw insertError
    }

    // Fetch and return updated features
    const { data, error } = await supabase
      .from('unit_features')
      .select(`
        *,
        amenity:amenities(*)
      `)
      .eq('unit_id', unitId)

    if (error) throw error
    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Failed to update unit features:', error)
    return NextResponse.json(
      { error: 'Failed to update unit features' },
      { status: 500 }
    )
  }
}
