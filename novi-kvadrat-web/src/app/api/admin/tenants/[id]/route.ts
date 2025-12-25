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
      .from('tenants')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Tenant not found' },
          { status: 404 }
        )
      }
      throw error
    }

    return NextResponse.json({
      ...data,
      full_name: `${data.first_name} ${data.last_name}`
    })
  } catch (error) {
    console.error('Failed to fetch tenant:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tenant' },
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
      .from('tenants')
      .update({
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
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      ...data,
      full_name: `${data.first_name} ${data.last_name}`
    })
  } catch (error) {
    console.error('Failed to update tenant:', error)
    return NextResponse.json(
      { message: 'Failed to update tenant' },
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

    // Check if tenant has active contracts
    const { data: activeContracts } = await supabase
      .from('rental_contracts')
      .select('id')
      .eq('tenant_id', id)
      .eq('status', 'active')
      .limit(1)

    if (activeContracts && activeContracts.length > 0) {
      return NextResponse.json(
        { message: 'Cannot delete tenant with active rental contracts' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('tenants')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete tenant:', error)
    return NextResponse.json(
      { message: 'Failed to delete tenant' },
      { status: 500 }
    )
  }
}
