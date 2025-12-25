import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const isActive = searchParams.get('is_active')
    const isFeatured = searchParams.get('is_featured')
    const availability = searchParams.get('availability_status')
    const search = searchParams.get('search')

    let query = supabase
      .from('agents')
      .select(`
        *,
        user:users(id, email, name)
      `)
      .order('last_name', { ascending: true })

    if (isActive !== null) {
      query = query.eq('is_active', isActive === 'true')
    }

    if (isFeatured !== null) {
      query = query.eq('is_featured', isFeatured === 'true')
    }

    if (availability) {
      query = query.eq('availability_status', availability)
    }

    if (search) {
      query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`)
    }

    const { data, error } = await query

    if (error) throw error

    const agents = data?.map(agent => ({
      ...agent,
      full_name: `${agent.first_name} ${agent.last_name}`
    })) || []

    return NextResponse.json(agents)
  } catch (error) {
    console.error('Failed to fetch agents:', error)
    return NextResponse.json(
      { error: 'Failed to fetch agents' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from('agents')
      .insert([{
        user_id: body.user_id || null,
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        phone: body.phone || null,
        phone_secondary: body.phone_secondary || null,
        photo_url: body.photo_url || null,
        bio_en: body.bio_en || null,
        bio_sr: body.bio_sr || null,
        title: body.title || null,
        license_number: body.license_number || null,
        license_expiry_date: body.license_expiry_date || null,
        years_experience: body.years_experience || null,
        languages: body.languages || ['Serbian', 'English'],
        specializations: body.specializations || [],
        property_types: body.property_types || [],
        areas_served: body.areas_served || [],
        default_commission_rate: body.default_commission_rate || 3.00,
        commission_split_rate: body.commission_split_rate || 50.00,
        linkedin_url: body.linkedin_url || null,
        instagram_url: body.instagram_url || null,
        facebook_url: body.facebook_url || null,
        twitter_url: body.twitter_url || null,
        is_active: body.is_active ?? true,
        is_featured: body.is_featured || false,
        availability_status: body.availability_status || 'available',
        notes: body.notes || null,
        internal_notes: body.internal_notes || null,
        hired_date: body.hired_date || null
      }])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      ...data,
      full_name: `${data.first_name} ${data.last_name}`
    })
  } catch (error) {
    console.error('Failed to create agent:', error)
    return NextResponse.json(
      { message: 'Failed to create agent' },
      { status: 500 }
    )
  }
}
