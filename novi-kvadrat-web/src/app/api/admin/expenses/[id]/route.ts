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
      .from('expenses')
      .select(`
        *,
        category:expense_categories(id, name, name_sr, color, icon),
        vendor:vendors(id, name, company_name),
        project:projects(id, name),
        building:project_buildings(id, name),
        unit:units(id, unit_number)
      `)
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Expense not found' },
          { status: 404 }
        )
      }
      throw error
    }

    return NextResponse.json({
      ...data,
      category_name: data.category?.name || null,
      vendor_name: data.vendor?.name || null,
      project_name: data.project?.name || null
    })
  } catch (error) {
    console.error('Failed to fetch expense:', error)
    return NextResponse.json(
      { error: 'Failed to fetch expense' },
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
      .from('expenses')
      .update({
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
        status: body.status,
        payment_method: body.payment_method || null,
        payment_reference: body.payment_reference || null,
        is_recurring: body.is_recurring || false,
        recurrence_frequency: body.recurrence_frequency || null,
        recurrence_end_date: body.recurrence_end_date || null,
        receipt_url: body.receipt_url || null,
        invoice_url: body.invoice_url || null,
        requires_approval: body.requires_approval || false,
        notes: body.notes || null
      })
      .eq('id', id)
      .select(`
        *,
        category:expense_categories(id, name, name_sr, color, icon),
        vendor:vendors(id, name, company_name),
        project:projects(id, name)
      `)
      .single()

    if (error) throw error

    return NextResponse.json({
      ...data,
      category_name: data.category?.name || null,
      vendor_name: data.vendor?.name || null,
      project_name: data.project?.name || null
    })
  } catch (error) {
    console.error('Failed to update expense:', error)
    return NextResponse.json(
      { message: 'Failed to update expense' },
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
      .from('expenses')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete expense:', error)
    return NextResponse.json(
      { message: 'Failed to delete expense' },
      { status: 500 }
    )
  }
}
