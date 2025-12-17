import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const { data, error } = await supabase
      .from('amenities')
      .update({
        name_en: body.name_en,
        name_sr: body.name_sr,
        icon: body.icon || null,
        category: body.category
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to update amenity:', error)
    return NextResponse.json(
      { message: 'Failed to update amenity' },
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

    // Delete from project_amenities first
    await supabase
      .from('project_amenities')
      .delete()
      .eq('amenity_id', id)

    // Then delete the amenity
    const { error } = await supabase
      .from('amenities')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete amenity:', error)
    return NextResponse.json(
      { message: 'Failed to delete amenity' },
      { status: 500 }
    )
  }
}

