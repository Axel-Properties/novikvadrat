import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// GET single building type
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ typeId: string }> }
) {
  try {
    const { typeId } = await params

    const { data, error } = await supabase
      .from('building_types')
      .select('*')
      .eq('id', typeId)
      .single()

    if (error) throw error
    if (!data) {
      return NextResponse.json(
        { error: 'Building type not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to fetch building type:', error)
    return NextResponse.json(
      { error: 'Failed to fetch building type' },
      { status: 500 }
    )
  }
}

// PUT update building type
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ typeId: string }> }
) {
  try {
    const { typeId } = await params
    const body = await request.json()

    const { data, error } = await supabase
      .from('building_types')
      .update({
        name: body.name,
        name_sr: body.name_sr,
        description: body.description,
        color: body.color,
        sort_order: body.sort_order,
        updated_at: new Date().toISOString()
      })
      .eq('id', typeId)
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'A building type with this name already exists' },
          { status: 400 }
        )
      }
      throw error
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to update building type:', error)
    return NextResponse.json(
      { error: 'Failed to update building type' },
      { status: 500 }
    )
  }
}

// DELETE building type
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ typeId: string }> }
) {
  try {
    const { typeId } = await params

    const { error } = await supabase
      .from('building_types')
      .delete()
      .eq('id', typeId)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete building type:', error)
    return NextResponse.json(
      { error: 'Failed to delete building type' },
      { status: 500 }
    )
  }
}
