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
      .from('vendors')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Vendor not found' },
          { status: 404 }
        )
      }
      throw error
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to fetch vendor:', error)
    return NextResponse.json(
      { error: 'Failed to fetch vendor' },
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

    const { data, error } = await supabase
      .from('vendors')
      .update({
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
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Failed to update vendor:', error)
    return NextResponse.json(
      { message: 'Failed to update vendor' },
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

    // Check if vendor has expenses
    const { data: expenses } = await supabase
      .from('expenses')
      .select('id')
      .eq('vendor_id', id)
      .limit(1)

    if (expenses && expenses.length > 0) {
      return NextResponse.json(
        { message: 'Cannot delete vendor with associated expenses' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('vendors')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete vendor:', error)
    return NextResponse.json(
      { message: 'Failed to delete vendor' },
      { status: 500 }
    )
  }
}
