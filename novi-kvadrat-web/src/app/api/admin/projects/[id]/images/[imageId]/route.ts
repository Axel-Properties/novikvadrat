import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; imageId: string }> }
) {
  try {
    const { id, imageId } = await params
    const body = await request.json()

    // If setting as primary, unset other primary images
    if (body.is_primary) {
      await supabase
        .from('project_images')
        .update({ is_primary: false })
        .eq('project_id', id)
    }

    const updateData: any = {}
    if (body.url !== undefined) updateData.url = body.url
    if (body.caption !== undefined) updateData.caption = body.caption
    if (body.image_type !== undefined) updateData.image_type = body.image_type
    if (body.is_primary !== undefined) updateData.is_primary = body.is_primary
    if (body.sort_order !== undefined) updateData.sort_order = body.sort_order

    const { data, error } = await supabase
      .from('project_images')
      .update(updateData)
      .eq('id', imageId)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to update image:', error)
    return NextResponse.json(
      { message: 'Failed to update image' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; imageId: string }> }
) {
  try {
    const { imageId } = await params

    const { error } = await supabase
      .from('project_images')
      .delete()
      .eq('id', imageId)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete image:', error)
    return NextResponse.json(
      { message: 'Failed to delete image' },
      { status: 500 }
    )
  }
}

