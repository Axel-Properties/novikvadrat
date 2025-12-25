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
      .from('expense_categories')
      .update({
        name: body.name,
        name_sr: body.name_sr || null,
        description: body.description || null,
        icon: body.icon || 'folder',
        color: body.color || '#6B7280',
        parent_id: body.parent_id || null,
        sort_order: body.sort_order || 0,
        is_active: body.is_active ?? true
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to update expense category:', error)
    return NextResponse.json(
      { message: 'Failed to update expense category' },
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

    // Check if category has expenses
    const { data: expenses } = await supabase
      .from('expenses')
      .select('id')
      .eq('category_id', id)
      .limit(1)

    if (expenses && expenses.length > 0) {
      return NextResponse.json(
        { message: 'Cannot delete category with associated expenses' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('expense_categories')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete expense category:', error)
    return NextResponse.json(
      { message: 'Failed to delete expense category' },
      { status: 500 }
    )
  }
}
