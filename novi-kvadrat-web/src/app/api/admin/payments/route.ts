import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const contractId = searchParams.get('contract_id')
    const tenantId = searchParams.get('tenant_id')
    const startDate = searchParams.get('start_date')
    const endDate = searchParams.get('end_date')

    let query = supabase
      .from('rental_payments')
      .select(`
        *,
        contract:rental_contracts(
          id,
          contract_number,
          rent_amount,
          tenant:tenants(id, first_name, last_name),
          unit:units(id, unit_number),
          project:projects(id, name)
        )
      `)
      .order('due_date', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    if (contractId) {
      query = query.eq('contract_id', contractId)
    }

    if (tenantId) {
      query = query.eq('tenant_id', tenantId)
    }

    if (startDate) {
      query = query.gte('due_date', startDate)
    }

    if (endDate) {
      query = query.lte('due_date', endDate)
    }

    const { data, error } = await query

    if (error) throw error

    // Transform data
    const payments = data?.map(payment => ({
      ...payment,
      contract_number: payment.contract?.contract_number || null,
      tenant_name: payment.contract?.tenant
        ? `${payment.contract.tenant.first_name} ${payment.contract.tenant.last_name}`
        : null,
      unit_number: payment.contract?.unit?.unit_number || null,
      project_name: payment.contract?.project?.name || null
    })) || []

    return NextResponse.json(payments)
  } catch (error) {
    console.error('Failed to fetch payments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch payments' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from('rental_payments')
      .insert([{
        contract_id: body.contract_id,
        tenant_id: body.tenant_id || null,
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
        status: body.status || 'pending',
        payment_date: body.payment_date || null,
        payment_method: body.payment_method || null,
        transaction_reference: body.transaction_reference || null,
        receipt_number: body.receipt_number || null,
        receipt_url: body.receipt_url || null,
        notes: body.notes || null
      }])
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

    if (error) {
      console.error('Supabase error:', error)
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
    console.error('Failed to create payment:', error)
    return NextResponse.json(
      { message: 'Failed to create payment' },
      { status: 500 }
    )
  }
}
