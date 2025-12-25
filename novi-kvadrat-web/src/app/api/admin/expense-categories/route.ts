import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('expense_categories')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Failed to fetch expense categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch expense categories' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from('expense_categories')
      .insert([{
        name: body.name,
        name_sr: body.name_sr || null,
        description: body.description || null,
        icon: body.icon || 'folder',
        color: body.color || '#6B7280',
        parent_id: body.parent_id || null,
        sort_order: body.sort_order || 0,
        is_active: body.is_active ?? true
      }])
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { message: 'A category with this name already exists' },
          { status: 400 }
        )
      }
      throw error
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to create expense category:', error)
    return NextResponse.json(
      { message: 'Failed to create expense category' },
      { status: 500 }
    )
  }
}
