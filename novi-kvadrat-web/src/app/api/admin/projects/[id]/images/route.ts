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
      .from('project_images')
      .select('*')
      .eq('project_id', id)
      .order('sort_order', { ascending: true })

    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Failed to fetch images:', error)
    return NextResponse.json(
      { error: 'Failed to fetch images' },
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

    // Get max sort_order
    const { data: existingImages } = await supabase
      .from('project_images')
      .select('sort_order')
      .eq('project_id', id)
      .order('sort_order', { ascending: false })
      .limit(1)

    const nextSortOrder = (existingImages?.[0]?.sort_order || 0) + 1

    // If setting as primary, unset other primary images
    if (body.is_primary) {
      await supabase
        .from('project_images')
        .update({ is_primary: false })
        .eq('project_id', id)
    }

    const { data, error } = await supabase
      .from('project_images')
      .insert([{
        project_id: id,
        url: body.url,
        caption: body.caption || null,
        image_type: body.image_type || 'exterior',
        is_primary: body.is_primary || false,
        sort_order: nextSortOrder
      }])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to add image:', error)
    return NextResponse.json(
      { message: 'Failed to add image' },
      { status: 500 }
    )
  }
}

