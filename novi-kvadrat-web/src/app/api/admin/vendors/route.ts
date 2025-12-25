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
    const vendorType = searchParams.get('vendor_type')

    let query = supabase
      .from('vendors')
      .select('*')
      .order('name', { ascending: true })

    if (isActive !== null && isActive !== '') {
      query = query.eq('is_active', isActive === 'true')
    }

    if (vendorType) {
      query = query.eq('vendor_type', vendorType)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Failed to fetch vendors:', error)
    return NextResponse.json(
      { error: 'Failed to fetch vendors' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from('vendors')
      .insert([{
        name: body.name,
        company_name: body.company_name || null,
        vendor_type: body.vendor_type || 'service_provider',
        email: body.email || null,
        phone: body.phone || null,
        phone_secondary: body.phone_secondary || null,
        website: body.website || null,
        address: body.address || null,
        city: body.city || null,
        postal_code: body.postal_code || null,
        country: body.country || 'Serbia',
        tax_id: body.tax_id || null,
        registration_number: body.registration_number || null,
        bank_account: body.bank_account || null,
        bank_name: body.bank_name || null,
        service_categories: body.service_categories || [],
        specializations: body.specializations || [],
        rating: body.rating || null,
        notes: body.notes || null,
        is_active: body.is_active ?? true,
        is_preferred: body.is_preferred || false
      }])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to create vendor:', error)
    return NextResponse.json(
      { message: 'Failed to create vendor' },
      { status: 500 }
    )
  }
}
