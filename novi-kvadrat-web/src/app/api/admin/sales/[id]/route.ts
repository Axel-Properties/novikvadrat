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
      .from('sales')
      .select(`
        *,
        buyer:buyers(id, first_name, last_name, email, phone),
        unit:units(id, unit_number, floor, total_area, price, status),
        project:projects(id, name),
        building:project_buildings(id, name),
        agent:agents(id, first_name, last_name)
      `)
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Sale not found' }, { status: 404 })
      }
      throw error
    }

    // Get sale payments
    const { data: payments } = await supabase
      .from('sale_payments')
      .select('*')
      .eq('sale_id', id)
      .order('due_date', { ascending: true })

    return NextResponse.json({
      ...data,
      buyer_name: data.buyer ? `${data.buyer.first_name} ${data.buyer.last_name}` : null,
      unit_number: data.unit?.unit_number || null,
      project_name: data.project?.name || null,
      building_name: data.building?.name || null,
      agent_name: data.agent ? `${data.agent.first_name} ${data.agent.last_name}` : null,
      payments: payments || []
    })
  } catch (error) {
    console.error('Failed to fetch sale:', error)
    return NextResponse.json({ error: 'Failed to fetch sale' }, { status: 500 })
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
      .from('sales')
      .update({
        unit_id: body.unit_id || null,
        buyer_id: body.buyer_id,
        project_id: body.project_id || null,
        building_id: body.building_id || null,
        agent_id: body.agent_id || null,
        sale_price: body.sale_price,
        original_price: body.original_price || null,
        discount_amount: body.discount_amount || 0,
        discount_reason: body.discount_reason || null,
        currency: body.currency || 'EUR',
        vat_included: body.vat_included ?? true,
        vat_amount: body.vat_amount || 0,
        first_buyer_vat_refund: body.first_buyer_vat_refund || false,
        down_payment_amount: body.down_payment_amount || 0,
        down_payment_percentage: body.down_payment_percentage || null,
        down_payment_date: body.down_payment_date || null,
        down_payment_paid: body.down_payment_paid || false,
        financing_type: body.financing_type || 'cash',
        mortgage_bank: body.mortgage_bank || null,
        mortgage_amount: body.mortgage_amount || null,
        mortgage_approved: body.mortgage_approved || false,
        reservation_date: body.reservation_date || null,
        contract_date: body.contract_date || null,
        expected_handover_date: body.expected_handover_date || null,
        actual_handover_date: body.actual_handover_date || null,
        status: body.status || 'inquiry',
        commission_percentage: body.commission_percentage || null,
        commission_amount: body.commission_amount || null,
        commission_paid: body.commission_paid || false,
        notes: body.notes || null,
        internal_notes: body.internal_notes || null
      })
      .eq('id', id)
      .select(`
        *,
        buyer:buyers(id, first_name, last_name, email, phone),
        unit:units(id, unit_number, floor, total_area, price),
        project:projects(id, name),
        building:project_buildings(id, name),
        agent:agents(id, first_name, last_name)
      `)
      .single()

    if (error) throw error

    return NextResponse.json({
      ...data,
      buyer_name: data.buyer ? `${data.buyer.first_name} ${data.buyer.last_name}` : null,
      unit_number: data.unit?.unit_number || null,
      project_name: data.project?.name || null,
      agent_name: data.agent ? `${data.agent.first_name} ${data.agent.last_name}` : null
    })
  } catch (error) {
    console.error('Failed to update sale:', error)
    return NextResponse.json({ message: 'Failed to update sale' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Check sale status - prevent deletion of completed sales
    const { data: sale } = await supabase
      .from('sales')
      .select('status')
      .eq('id', id)
      .single()

    if (sale?.status === 'completed') {
      return NextResponse.json(
        { message: 'Cannot delete completed sales. Cancel the sale first.' },
        { status: 400 }
      )
    }

    // Delete associated payments first
    await supabase
      .from('sale_payments')
      .delete()
      .eq('sale_id', id)

    const { error } = await supabase
      .from('sales')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete sale:', error)
    return NextResponse.json({ message: 'Failed to delete sale' }, { status: 500 })
  }
}
