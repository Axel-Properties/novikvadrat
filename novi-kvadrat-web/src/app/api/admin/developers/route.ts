import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('developers')
      .select('*')
      .order('name', { ascending: true })

    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Failed to fetch developers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch developers' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from('developers')
      .insert([{
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
        is_verified: body.is_verified || false,
        total_projects: 0,
        active_projects: 0,
        completed_projects: 0
      }])
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
    console.error('Failed to create developer:', error)
    return NextResponse.json(
      { message: 'Failed to create developer' },
      { status: 500 }
    )
  }
}

