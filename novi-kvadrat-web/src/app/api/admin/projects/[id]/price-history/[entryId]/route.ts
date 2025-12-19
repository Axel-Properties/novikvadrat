import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; entryId: string }> }
) {
  try {
    const { entryId } = await params

    const { error } = await supabase
      .from('project_price_history')
      .delete()
      .eq('id', entryId)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete price history entry:', error)
    return NextResponse.json(
      { message: 'Failed to delete price history entry' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; entryId: string }> }
) {
  try {
    const { entryId } = await params
    const body = await request.json()

    const { data, error } = await supabase
      .from('project_price_history')
      .update({
        price_min: body.price_min,
        price_per_sqm_min: body.price_per_sqm_min,
        currency: body.currency,
        recorded_at: body.recorded_at
      })
      .eq('id', entryId)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to update price history entry:', error)
    return NextResponse.json(
      { message: 'Failed to update price history entry' },
      { status: 500 }
    )
  }
}
