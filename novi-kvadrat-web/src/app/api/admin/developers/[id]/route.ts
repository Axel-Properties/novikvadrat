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
      .from('developers')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    if (!data) {
      return NextResponse.json(
        { message: 'Developer not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to fetch developer:', error)
    return NextResponse.json(
      { message: 'Failed to fetch developer' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const updateData: any = {
      name: body.name,
      slug: body.slug,
      pib: body.pib || null,
      apr_registration: body.apr_registration || null,
      founded_year: body.founded_year || null,
      description: body.description || null,
      email: body.email || null,
      phone: body.phone || null,
      address: body.address || null,
      website: body.website || null,
      facebook: body.facebook || null,
      instagram: body.instagram || null,
      linkedin: body.linkedin || null,
      logo_url: body.logo_url || null,
      cover_image_url: body.cover_image_url || null,
      is_verified: body.is_verified
    }

    // If verified status changed to true, set verified_at
    if (body.is_verified) {
      updateData.verified_at = new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('developers')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json(
          { message: 'A developer with this slug or PIB already exists' },
          { status: 400 }
        )
      }
      throw error
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to update developer:', error)
    return NextResponse.json(
      { message: 'Failed to update developer' },
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

    // First, unlink any projects
    await supabase
      .from('projects')
      .update({ developer_id: null })
      .eq('developer_id', id)

    // Then delete the developer
    const { error } = await supabase
      .from('developers')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete developer:', error)
    return NextResponse.json(
      { message: 'Failed to delete developer' },
      { status: 500 }
    )
  }
}

