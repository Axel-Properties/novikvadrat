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
      .from('rental_contracts')
      .select(`
        *,
        tenant:tenants(id, first_name, last_name, email, phone),
        unit:units(id, unit_number, floor, total_area),
        project:projects(id, name),
        building:project_buildings(id, name)
      `)
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Rental contract not found' },
          { status: 404 }
        )
      }
      throw error
    }

    return NextResponse.json({
      ...data,
      tenant_name: data.tenant ? `${data.tenant.first_name} ${data.tenant.last_name}` : null,
      unit_number: data.unit?.unit_number || null,
      project_name: data.project?.name || null,
      building_name: data.building?.name || null
    })
  } catch (error) {
    console.error('Failed to fetch rental contract:', error)
    return NextResponse.json(
      { error: 'Failed to fetch rental contract' },
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
      .from('rental_contracts')
      .update({
        tenant_id: body.tenant_id,
        unit_id: body.unit_id || null,
        project_id: body.project_id || null,
        building_id: body.building_id || null,
        rent_amount: body.rent_amount,
        currency: body.currency || 'EUR',
        deposit_amount: body.deposit_amount || 0,
        deposit_paid: body.deposit_paid || false,
        deposit_paid_date: body.deposit_paid_date || null,
        start_date: body.start_date,
        end_date: body.end_date || null,
        is_indefinite: body.is_indefinite || false,
        payment_frequency: body.payment_frequency || 'monthly',
        payment_due_day: body.payment_due_day || 1,
        late_fee_enabled: body.late_fee_enabled || false,
        late_fee_type: body.late_fee_type || 'fixed',
        late_fee_amount: body.late_fee_amount || 0,
        late_fee_grace_days: body.late_fee_grace_days || 0,
        utilities_included: body.utilities_included || false,
        utilities_amount: body.utilities_amount || 0,
        parking_included: body.parking_included || false,
        parking_amount: body.parking_amount || 0,
        other_fees: body.other_fees || 0,
        other_fees_description: body.other_fees_description || null,
        status: body.status || 'active',
        termination_date: body.termination_date || null,
        termination_reason: body.termination_reason || null,
        contract_document_url: body.contract_document_url || null,
        notes: body.notes || null,
        internal_notes: body.internal_notes || null,
        auto_renew: body.auto_renew || false,
        renewal_notice_days: body.renewal_notice_days || 30
      })
      .eq('id', id)
      .select(`
        *,
        tenant:tenants(id, first_name, last_name, email, phone),
        unit:units(id, unit_number, floor, total_area),
        project:projects(id, name),
        building:project_buildings(id, name)
      `)
      .single()

    if (error) throw error

    return NextResponse.json({
      ...data,
      tenant_name: data.tenant ? `${data.tenant.first_name} ${data.tenant.last_name}` : null,
      unit_number: data.unit?.unit_number || null,
      project_name: data.project?.name || null,
      building_name: data.building?.name || null
    })
  } catch (error) {
    console.error('Failed to update rental contract:', error)
    return NextResponse.json(
      { message: 'Failed to update rental contract' },
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

    const { error } = await supabase
      .from('rental_contracts')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete rental contract:', error)
    return NextResponse.json(
      { message: 'Failed to delete rental contract' },
      { status: 500 }
    )
  }
}
