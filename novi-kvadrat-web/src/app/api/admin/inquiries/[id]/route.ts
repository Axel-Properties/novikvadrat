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
      .from('inquiries')
      .select(`
        *,
        buyer:buyers(id, first_name, last_name, email, phone),
        project:projects(id, name),
        building:project_buildings(id, name),
        unit:units(id, unit_number, floor, total_area, price)
      `)
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 })
      }
      throw error
    }

    // Get activities
    const { data: activities } = await supabase
      .from('inquiry_activities')
      .select('*')
      .eq('inquiry_id', id)
      .order('created_at', { ascending: false })

    return NextResponse.json({
      ...data,
      project_name: data.project?.name || null,
      building_name: data.building?.name || null,
      unit_number: data.unit?.unit_number || null,
      buyer_name: data.buyer ? `${data.buyer.first_name} ${data.buyer.last_name}` : null,
      activities: activities || []
    })
  } catch (error) {
    console.error('Failed to fetch inquiry:', error)
    return NextResponse.json({ error: 'Failed to fetch inquiry' }, { status: 500 })
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
      .from('inquiries')
      .update({
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
        status: body.status,
        is_qualified: body.is_qualified || false,
        qualification_score: body.qualification_score || null,
        budget_confirmed: body.budget_confirmed || false,
        budget_range: body.budget_range || null,
        timeline: body.timeline || null,
        priority: body.priority || 'medium',
        next_follow_up_date: body.next_follow_up_date || null,
        next_follow_up_type: body.next_follow_up_type || null,
        follow_up_notes: body.follow_up_notes || null,
        viewing_scheduled_at: body.viewing_scheduled_at || null,
        viewing_completed_at: body.viewing_completed_at || null,
        viewing_notes: body.viewing_notes || null,
        notes: body.notes || null,
        internal_notes: body.internal_notes || null
      })
      .eq('id', id)
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
    console.error('Failed to update inquiry:', error)
    return NextResponse.json({ message: 'Failed to update inquiry' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Activities are deleted automatically via CASCADE
    const { error } = await supabase
      .from('inquiries')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete inquiry:', error)
    return NextResponse.json({ message: 'Failed to delete inquiry' }, { status: 500 })
  }
}
