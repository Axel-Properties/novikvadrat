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
      .from('layouts')
      .select('*')
      .eq('project_id', id)
      .order('name', { ascending: true })

    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Failed to fetch layouts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch layouts' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const { data, error } = await supabase
      .from('layouts')
      .insert([{
        project_id: id,
        name: body.name,
        layout_type: body.layout_type,
        total_area: body.total_area,
        living_area: body.living_area,
        terrace_area: body.terrace_area,
        bedrooms: body.bedrooms,
        bathrooms: body.bathrooms,
        has_terrace: body.has_terrace || false,
        has_loggia: body.has_loggia || false,
        price_from: body.price_from,
        price_to: body.price_to,
        floor_plan_url: body.floor_plan_url,
        total_units: body.total_units,
        available_units: body.available_units
      }])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to create layout:', error)
    return NextResponse.json(
      { message: 'Failed to create layout' },
      { status: 500 }
    )
  }
}

