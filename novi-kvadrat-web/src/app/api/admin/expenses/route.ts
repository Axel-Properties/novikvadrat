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
    const categoryId = searchParams.get('category_id')
    const vendorId = searchParams.get('vendor_id')
    const projectId = searchParams.get('project_id')
    const startDate = searchParams.get('start_date')
    const endDate = searchParams.get('end_date')

    let query = supabase
      .from('expenses')
      .select(`
        *,
        category:expense_categories(id, name, name_sr, color, icon),
        vendor:vendors(id, name, company_name),
        project:projects(id, name),
        building:project_buildings(id, name),
        unit:units(id, unit_number)
      `)
      .order('expense_date', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    if (categoryId) {
      query = query.eq('category_id', categoryId)
    }

    if (vendorId) {
      query = query.eq('vendor_id', vendorId)
    }

    if (projectId) {
      query = query.eq('project_id', projectId)
    }

    if (startDate) {
      query = query.gte('expense_date', startDate)
    }

    if (endDate) {
      query = query.lte('expense_date', endDate)
    }

    const { data, error } = await query

    if (error) throw error

    // Transform data
    const expenses = data?.map(expense => ({
      ...expense,
      category_name: expense.category?.name || null,
      category_color: expense.category?.color || null,
      vendor_name: expense.vendor?.name || null,
      project_name: expense.project?.name || null
    })) || []

    return NextResponse.json(expenses)
  } catch (error) {
    console.error('Failed to fetch expenses:', error)
    return NextResponse.json(
      { error: 'Failed to fetch expenses' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from('expenses')
      .insert([{
        category_id: body.category_id || null,
        vendor_id: body.vendor_id || null,
        project_id: body.project_id || null,
        building_id: body.building_id || null,
        unit_id: body.unit_id || null,
        title: body.title,
        description: body.description || null,
        amount: body.amount,
        tax_amount: body.tax_amount || 0,
        currency: body.currency || 'EUR',
        expense_date: body.expense_date,
        due_date: body.due_date || null,
        paid_date: body.paid_date || null,
        status: body.status || 'pending',
        payment_method: body.payment_method || null,
        payment_reference: body.payment_reference || null,
        is_recurring: body.is_recurring || false,
        recurrence_frequency: body.recurrence_frequency || null,
        recurrence_end_date: body.recurrence_end_date || null,
        receipt_url: body.receipt_url || null,
        invoice_url: body.invoice_url || null,
        requires_approval: body.requires_approval || false,
        notes: body.notes || null
      }])
      .select(`
        *,
        category:expense_categories(id, name, name_sr, color, icon),
        vendor:vendors(id, name, company_name),
        project:projects(id, name)
      `)
      .single()

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    return NextResponse.json({
      ...data,
      category_name: data.category?.name || null,
      category_color: data.category?.color || null,
      vendor_name: data.vendor?.name || null,
      project_name: data.project?.name || null
    })
  } catch (error) {
    console.error('Failed to create expense:', error)
    return NextResponse.json(
      { message: 'Failed to create expense' },
      { status: 500 }
    )
  }
}
