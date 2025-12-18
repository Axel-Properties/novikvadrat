import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// GET all building types for a project
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const { data, error } = await supabase
      .from('building_types')
      .select('*')
      .eq('project_id', id)
      .order('sort_order', { ascending: true })

    if (error) throw error
    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Failed to fetch building types:', error)
    return NextResponse.json(
      { error: 'Failed to fetch building types' },
      { status: 500 }
    )
  }
}

// POST create new building type
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    // Get max sort_order
    const { data: existing } = await supabase
      .from('building_types')
      .select('sort_order')
      .eq('project_id', id)
      .order('sort_order', { ascending: false })
      .limit(1)

    const nextSortOrder = existing && existing.length > 0 ? existing[0].sort_order + 1 : 0

    const { data, error } = await supabase
      .from('building_types')
      .insert([{
        project_id: id,
        name: body.name,
        name_sr: body.name_sr || null,
        description: body.description || null,
        color: body.color || '#3B82F6',
        sort_order: body.sort_order ?? nextSortOrder
      }])
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'A building type with this name already exists for this project' },
          { status: 400 }
        )
      }
      throw error
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to create building type:', error)
    return NextResponse.json(
      { error: 'Failed to create building type' },
      { status: 500 }
    )
  }
}
