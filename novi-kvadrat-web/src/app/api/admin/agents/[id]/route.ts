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
      .from('agents')
      .select(`
        *,
        user:users(id, email, name)
      `)
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
      }
      throw error
    }

    // Get assigned projects
    const { data: projects } = await supabase
      .from('agent_projects')
      .select(`
        *,
        project:projects(id, name, status)
      `)
      .eq('agent_id', id)

    // Get active buyers
    const { data: buyers } = await supabase
      .from('buyers')
      .select('id, first_name, last_name, status')
      .eq('assigned_agent_id', id)
      .in('status', ['active', 'qualified', 'negotiating'])

    // Get recent sales
    const { data: sales } = await supabase
      .from('sales')
      .select(`
        id, sale_price, status, contract_date,
        project:projects(name),
        buyer:buyers(first_name, last_name)
      `)
      .eq('agent_id', id)
      .order('created_at', { ascending: false })
      .limit(10)

    return NextResponse.json({
      ...data,
      full_name: `${data.first_name} ${data.last_name}`,
      assigned_projects: projects || [],
      active_buyers: buyers || [],
      recent_sales: sales || []
    })
  } catch (error) {
    console.error('Failed to fetch agent:', error)
    return NextResponse.json({ error: 'Failed to fetch agent' }, { status: 500 })
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
      .from('agents')
      .update({
        user_id: body.user_id || null,
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        phone: body.phone || null,
        phone_secondary: body.phone_secondary || null,
        photo_url: body.photo_url || null,
        bio_en: body.bio_en || null,
        bio_sr: body.bio_sr || null,
        title: body.title || null,
        license_number: body.license_number || null,
        license_expiry_date: body.license_expiry_date || null,
        years_experience: body.years_experience || null,
        languages: body.languages || ['Serbian', 'English'],
        specializations: body.specializations || [],
        property_types: body.property_types || [],
        areas_served: body.areas_served || [],
        default_commission_rate: body.default_commission_rate || 3.00,
        commission_split_rate: body.commission_split_rate || 50.00,
        linkedin_url: body.linkedin_url || null,
        instagram_url: body.instagram_url || null,
        facebook_url: body.facebook_url || null,
        twitter_url: body.twitter_url || null,
        is_active: body.is_active ?? true,
        is_featured: body.is_featured || false,
        availability_status: body.availability_status || 'available',
        notes: body.notes || null,
        internal_notes: body.internal_notes || null,
        hired_date: body.hired_date || null
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
    console.error('Failed to update agent:', error)
    return NextResponse.json({ message: 'Failed to update agent' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Check if agent has active sales or inquiries
    const { data: activeSales } = await supabase
      .from('sales')
      .select('id')
      .eq('agent_id', id)
      .not('status', 'in', '("completed","cancelled","refunded")')
      .limit(1)

    if (activeSales && activeSales.length > 0) {
      return NextResponse.json(
        { message: 'Cannot delete agent with active sales' },
        { status: 400 }
      )
    }

    // Agent projects are deleted via CASCADE
    const { error } = await supabase
      .from('agents')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete agent:', error)
    return NextResponse.json({ message: 'Failed to delete agent' }, { status: 500 })
  }
}
