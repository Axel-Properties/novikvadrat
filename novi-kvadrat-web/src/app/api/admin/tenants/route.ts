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
    const search = searchParams.get('search')

    let query = supabase
      .from('tenants')
      .select('*')
      .order('last_name', { ascending: true })

    if (isActive !== null && isActive !== '') {
      query = query.eq('is_active', isActive === 'true')
    }

    if (search) {
      query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`)
    }

    const { data, error } = await query

    if (error) throw error

    // Add computed full_name field
    const tenantsWithFullName = data?.map(tenant => ({
      ...tenant,
      full_name: `${tenant.first_name} ${tenant.last_name}`
    })) || []

    return NextResponse.json(tenantsWithFullName)
  } catch (error) {
    console.error('Failed to fetch tenants:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tenants' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from('tenants')
      .insert([{
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email || null,
        phone: body.phone || null,
        phone_secondary: body.phone_secondary || null,
        id_number: body.id_number || null,
        id_type: body.id_type || 'personal_id',
        address: body.address || null,
        city: body.city || null,
        postal_code: body.postal_code || null,
        country: body.country || 'Serbia',
        emergency_contact_name: body.emergency_contact_name || null,
        emergency_contact_phone: body.emergency_contact_phone || null,
        emergency_contact_relation: body.emergency_contact_relation || null,
        documents: body.documents || [],
        notes: body.notes || null,
        is_active: body.is_active ?? true
      }])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    return NextResponse.json({
      ...data,
      full_name: `${data.first_name} ${data.last_name}`
    })
  } catch (error) {
    console.error('Failed to create tenant:', error)
    return NextResponse.json(
      { message: 'Failed to create tenant' },
      { status: 500 }
    )
  }
}
