import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// GET single unit type
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; typeId: string }> }
) {
  try {
    const { typeId } = await params

    const { data, error } = await supabase
      .from('unit_types')
      .select('*')
      .eq('id', typeId)
      .single()

    if (error) throw error
    if (!data) {
      return NextResponse.json(
        { error: 'Unit type not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to fetch unit type:', error)
    return NextResponse.json(
      { error: 'Failed to fetch unit type' },
      { status: 500 }
    )
  }
}

// PUT update unit type
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; typeId: string }> }
) {
  try {
    const { typeId } = await params
    const body = await request.json()

    const { data, error } = await supabase
      .from('unit_types')
      .update({
        name: body.name,
        name_sr: body.name_sr,
        description: body.description,
        default_price_multiplier: body.default_price_multiplier ? parseFloat(body.default_price_multiplier) : 1.00,
        sort_order: body.sort_order,
        updated_at: new Date().toISOString()
      })
      .eq('id', typeId)
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'A unit type with this name already exists for this project' },
          { status: 400 }
        )
      }
      throw error
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to update unit type:', error)
    return NextResponse.json(
      { error: 'Failed to update unit type' },
      { status: 500 }
    )
  }
}

// DELETE unit type
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; typeId: string }> }
) {
  try {
    const { typeId } = await params

    const { error } = await supabase
      .from('unit_types')
      .delete()
      .eq('id', typeId)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete unit type:', error)
    return NextResponse.json(
      { error: 'Failed to delete unit type' },
      { status: 500 }
    )
  }
}
