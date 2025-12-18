import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// POST bulk operations on units
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { action, unit_ids, status } = body

    if (!Array.isArray(unit_ids) || unit_ids.length === 0) {
      return NextResponse.json(
        { error: 'unit_ids must be a non-empty array' },
        { status: 400 }
      )
    }

    // Verify all units belong to the project
    const { data: units } = await supabase
      .from('units')
      .select('id')
      .eq('project_id', id)
      .in('id', unit_ids)

    if (!units || units.length !== unit_ids.length) {
      return NextResponse.json(
        { error: 'Some units do not belong to this project' },
        { status: 400 }
      )
    }

    let result = { success: false, affected: 0 }

    switch (action) {
      case 'change_status':
        if (!status) {
          return NextResponse.json(
            { error: 'status is required for change_status action' },
            { status: 400 }
          )
        }

        const validStatuses = ['available', 'reserved', 'sold', 'rented', 'unavailable', 'coming_soon']
        if (!validStatuses.includes(status)) {
          return NextResponse.json(
            { error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
            { status: 400 }
          )
        }

        const { data: updatedUnits, error: updateError } = await supabase
          .from('units')
          .update({ status, updated_at: new Date().toISOString() })
          .in('id', unit_ids)
          .select('id')

        if (updateError) throw updateError
        result = { success: true, affected: updatedUnits?.length || 0 }
        break

      case 'delete':
        // Delete related data first
        for (const unitId of unit_ids) {
          await supabase.from('unit_features').delete().eq('unit_id', unitId)
          await supabase.from('unit_images').delete().eq('unit_id', unitId)
        }

        // Then delete the units
        const { error: deleteError } = await supabase
          .from('units')
          .delete()
          .in('id', unit_ids)

        if (deleteError) throw deleteError
        result = { success: true, affected: unit_ids.length }
        break

      case 'set_active':
        const { data: activatedUnits, error: activeError } = await supabase
          .from('units')
          .update({ is_active: true, updated_at: new Date().toISOString() })
          .in('id', unit_ids)
          .select('id')

        if (activeError) throw activeError
        result = { success: true, affected: activatedUnits?.length || 0 }
        break

      case 'set_inactive':
        const { data: deactivatedUnits, error: inactiveError } = await supabase
          .from('units')
          .update({ is_active: false, updated_at: new Date().toISOString() })
          .in('id', unit_ids)
          .select('id')

        if (inactiveError) throw inactiveError
        result = { success: true, affected: deactivatedUnits?.length || 0 }
        break

      default:
        return NextResponse.json(
          { error: `Invalid action. Must be one of: change_status, delete, set_active, set_inactive` },
          { status: 400 }
        )
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Failed to perform bulk operation:', error)
    return NextResponse.json(
      { error: 'Failed to perform bulk operation' },
      { status: 500 }
    )
  }
}
