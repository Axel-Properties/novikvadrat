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
      .from('rental_payments')
      .select(`
        *,
        contract:rental_contracts(
          id,
          contract_number,
          tenant:tenants(id, first_name, last_name),
          unit:units(id, unit_number),
          project:projects(id, name)
        )
      `)
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Payment not found' },
          { status: 404 }
        )
      }
      throw error
    }

    return NextResponse.json({
      ...data,
      contract_number: data.contract?.contract_number || null,
      tenant_name: data.contract?.tenant
        ? `${data.contract.tenant.first_name} ${data.contract.tenant.last_name}`
        : null
    })
  } catch (error) {
    console.error('Failed to fetch payment:', error)
    return NextResponse.json(
      { error: 'Failed to fetch payment' },
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
      .from('rental_payments')
      .update({
        period_start: body.period_start,
        period_end: body.period_end,
        due_date: body.due_date,
        base_amount: body.base_amount,
        utilities_amount: body.utilities_amount || 0,
        parking_amount: body.parking_amount || 0,
        other_fees: body.other_fees || 0,
        late_fee: body.late_fee || 0,
        discount: body.discount || 0,
        total_amount: body.total_amount,
        amount_paid: body.amount_paid || 0,
        currency: body.currency || 'EUR',
        status: body.status,
        payment_date: body.payment_date || null,
        payment_method: body.payment_method || null,
        transaction_reference: body.transaction_reference || null,
        receipt_number: body.receipt_number || null,
        receipt_url: body.receipt_url || null,
        notes: body.notes || null
      })
      .eq('id', id)
      .select(`
        *,
        contract:rental_contracts(
          id,
          contract_number,
          tenant:tenants(id, first_name, last_name),
          unit:units(id, unit_number),
          project:projects(id, name)
        )
      `)
      .single()

    if (error) throw error

    return NextResponse.json({
      ...data,
      contract_number: data.contract?.contract_number || null,
      tenant_name: data.contract?.tenant
        ? `${data.contract.tenant.first_name} ${data.contract.tenant.last_name}`
        : null
    })
  } catch (error) {
    console.error('Failed to update payment:', error)
    return NextResponse.json(
      { message: 'Failed to update payment' },
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
      .from('rental_payments')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete payment:', error)
    return NextResponse.json(
      { message: 'Failed to delete payment' },
      { status: 500 }
    )
  }
}
