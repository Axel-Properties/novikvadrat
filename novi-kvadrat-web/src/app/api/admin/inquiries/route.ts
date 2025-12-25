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
    const projectId = searchParams.get('project_id')
    const priority = searchParams.get('priority')
    const search = searchParams.get('search')

    let query = supabase
      .from('inquiries')
      .select(`
        *,
        buyer:buyers(id, first_name, last_name),
        project:projects(id, name),
        building:project_buildings(id, name),
        unit:units(id, unit_number)
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

    if (projectId) {
      query = query.eq('project_id', projectId)
    }

    if (priority) {
      query = query.eq('priority', priority)
    }

    if (search) {
      query = query.or(`contact_name.ilike.%${search}%,contact_email.ilike.%${search}%,contact_phone.ilike.%${search}%,inquiry_number.ilike.%${search}%`)
    }

    const { data, error } = await query

    if (error) throw error

    const inquiries = data?.map(inquiry => ({
      ...inquiry,
      project_name: inquiry.project?.name || null,
      building_name: inquiry.building?.name || null,
      unit_number: inquiry.unit?.unit_number || null,
      buyer_name: inquiry.buyer ? `${inquiry.buyer.first_name} ${inquiry.buyer.last_name}` : null
    })) || []

    return NextResponse.json(inquiries)
  } catch (error) {
    console.error('Failed to fetch inquiries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch inquiries' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from('inquiries')
      .insert([{
        contact_name: body.contact_name,
        contact_email: body.contact_email || null,
        contact_phone: body.contact_phone || null,
        buyer_id: body.buyer_id || null,
        project_id: body.project_id || null,
        building_id: body.building_id || null,
        unit_id: body.unit_id || null,
        inquiry_type: body.inquiry_type || 'general',
        message: body.message || null,
        source: body.source || 'website',
        source_url: body.source_url || null,
        source_campaign: body.source_campaign || null,
        assigned_to: body.assigned_to || null,
        assigned_agent_id: body.assigned_agent_id || null,
        status: body.status || 'new',
        priority: body.priority || 'medium',
        budget_range: body.budget_range || null,
        timeline: body.timeline || null,
        next_follow_up_date: body.next_follow_up_date || null,
        next_follow_up_type: body.next_follow_up_type || null,
        notes: body.notes || null
      }])
      .select(`
        *,
        buyer:buyers(id, first_name, last_name),
        project:projects(id, name),
        building:project_buildings(id, name),
        unit:units(id, unit_number)
      `)
      .single()

    if (error) throw error

    return NextResponse.json({
      ...data,
      project_name: data.project?.name || null,
      unit_number: data.unit?.unit_number || null
    })
  } catch (error) {
    console.error('Failed to create inquiry:', error)
    return NextResponse.json(
      { message: 'Failed to create inquiry' },
      { status: 500 }
    )
  }
}
