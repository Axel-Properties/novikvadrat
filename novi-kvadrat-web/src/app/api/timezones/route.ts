import { NextResponse } from 'next/server'
import { getTimezoneNames, getTimezoneNamesByRegion } from '@/lib/timezones'

/**
 * API endpoint to get timezone names
 * 
 * Query params:
 * - region: Filter by region (e.g., "Europe", "America")
 * 
 * Example:
 * GET /api/timezones
 * GET /api/timezones?region=Europe
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const region = searchParams.get('region') || undefined

    const timezones = region
      ? await getTimezoneNamesByRegion(region)
      : await getTimezoneNames()

    return NextResponse.json({
      success: true,
      data: timezones,
      count: timezones.length
    })
  } catch (error) {
    console.error('Error fetching timezones:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch timezones'
      },
      { status: 500 }
    )
  }
}
