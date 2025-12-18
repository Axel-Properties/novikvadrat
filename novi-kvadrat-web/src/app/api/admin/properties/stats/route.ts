import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// GET properties statistics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get('project_id')

    let query = supabase
      .from('units')
      .select('id, status, building_id, floor, price, total_area')

    if (projectId) {
      query = query.eq('project_id', projectId)
    }

    const { data: units, error } = await query

    if (error) throw error

    // Calculate statistics
    const stats = {
      total_units: units?.length || 0,
      available: units?.filter(u => u.status === 'available').length || 0,
      reserved: units?.filter(u => u.status === 'reserved').length || 0,
      sold: units?.filter(u => u.status === 'sold').length || 0,
      rented: units?.filter(u => u.status === 'rented').length || 0,
      unavailable: units?.filter(u => u.status === 'unavailable').length || 0,
      coming_soon: units?.filter(u => u.status === 'coming_soon').length || 0,
    }

    // Calculate additional metrics
    const unitsWithPrice = units?.filter(u => u.price) || []
    const totalValue = unitsWithPrice.reduce((sum, u) => sum + (u.price || 0), 0)
    const avgPrice = unitsWithPrice.length > 0 ? totalValue / unitsWithPrice.length : 0

    const unitsWithArea = units?.filter(u => u.total_area) || []
    const totalArea = unitsWithArea.reduce((sum, u) => sum + (u.total_area || 0), 0)
    const avgArea = unitsWithArea.length > 0 ? totalArea / unitsWithArea.length : 0

    // Get building count
    const uniqueBuildings = new Set(units?.map(u => u.building_id))

    // Floor distribution
    const floorCounts: Record<number, number> = {}
    units?.forEach(u => {
      if (u.floor !== null) {
        floorCounts[u.floor] = (floorCounts[u.floor] || 0) + 1
      }
    })

    return NextResponse.json({
      ...stats,
      total_buildings: uniqueBuildings.size,
      total_value: Math.round(totalValue),
      avg_price: Math.round(avgPrice),
      total_area: Math.round(totalArea * 100) / 100,
      avg_area: Math.round(avgArea * 100) / 100,
      floor_distribution: floorCounts
    })
  } catch (error) {
    console.error('Failed to fetch property stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}
