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
    const buyerId = searchParams.get('buyer_id')
    const projectId = searchParams.get('project_id')
    const agentId = searchParams.get('agent_id')

    let query = supabase
      .from('sales')
      .select(`
        *,
        buyer:buyers(id, first_name, last_name, email, phone),
        unit:units(id, unit_number, floor, total_area, price),
        project:projects(id, name),
        building:project_buildings(id, name),
        agent:agents(id, first_name, last_name)
      `)
      .order('created_at', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    if (buyerId) {
      query = query.eq('buyer_id', buyerId)
    }

    if (projectId) {
      query = query.eq('project_id', projectId)
    }

    if (agentId) {
      query = query.eq('agent_id', agentId)
    }

    const { data, error } = await query

    if (error) throw error

    const sales = data?.map(sale => ({
      ...sale,
      buyer_name: sale.buyer ? `${sale.buyer.first_name} ${sale.buyer.last_name}` : null,
      unit_number: sale.unit?.unit_number || null,
      project_name: sale.project?.name || null,
      building_name: sale.building?.name || null,
      agent_name: sale.agent ? `${sale.agent.first_name} ${sale.agent.last_name}` : null
    })) || []

    return NextResponse.json(sales)
  } catch (error) {
    console.error('Failed to fetch sales:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sales' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from('sales')
      .insert([{
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
        status: body.status || 'inquiry',
        commission_percentage: body.commission_percentage || null,
        commission_amount: body.commission_amount || null,
        notes: body.notes || null
      }])
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
    console.error('Failed to create sale:', error)
    return NextResponse.json(
      { message: 'Failed to create sale' },
      { status: 500 }
    )
  }
}
