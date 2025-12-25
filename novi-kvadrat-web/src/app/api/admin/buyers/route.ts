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
    const source = searchParams.get('source')
    const agentId = searchParams.get('agent_id')
    const search = searchParams.get('search')

    let query = supabase
      .from('buyers')
      .select(`
        *,
        agent:agents(id, first_name, last_name)
      `)
      .order('created_at', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    if (source) {
      query = query.eq('source', source)
    }

    if (agentId) {
      query = query.eq('assigned_agent_id', agentId)
    }

    if (search) {
      query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`)
    }

    const { data, error } = await query

    if (error) throw error

    const buyers = data?.map(buyer => ({
      ...buyer,
      full_name: `${buyer.first_name} ${buyer.last_name}`,
      agent_name: buyer.agent ? `${buyer.agent.first_name} ${buyer.agent.last_name}` : null
    })) || []

    return NextResponse.json(buyers)
  } catch (error) {
    console.error('Failed to fetch buyers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch buyers' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from('buyers')
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
        is_company: body.is_company || false,
        company_name: body.company_name || null,
        company_tax_id: body.company_tax_id || null,
        budget_min: body.budget_min || null,
        budget_max: body.budget_max || null,
        preferred_locations: body.preferred_locations || [],
        preferred_property_types: body.preferred_property_types || [],
        preferred_bedrooms_min: body.preferred_bedrooms_min || null,
        preferred_bedrooms_max: body.preferred_bedrooms_max || null,
        source: body.source || 'website',
        source_details: body.source_details || null,
        assigned_agent_id: body.assigned_agent_id || null,
        status: body.status || 'active',
        priority: body.priority || 'medium',
        purchase_timeline: body.purchase_timeline || null,
        financing_type: body.financing_type || null,
        pre_approved: body.pre_approved || false,
        notes: body.notes || null
      }])
      .select(`
        *,
        agent:agents(id, first_name, last_name)
      `)
      .single()

    if (error) throw error

    return NextResponse.json({
      ...data,
      full_name: `${data.first_name} ${data.last_name}`,
      agent_name: data.agent ? `${data.agent.first_name} ${data.agent.last_name}` : null
    })
  } catch (error) {
    console.error('Failed to create buyer:', error)
    return NextResponse.json(
      { message: 'Failed to create buyer' },
      { status: 500 }
    )
  }
}
