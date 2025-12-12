import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    
    // Test queries
    const [cities, municipalities, developers] = await Promise.all([
      supabase.from('cities').select('*').order('sort_order'),
      supabase.from('municipalities').select('*').limit(5),
      supabase.from('developers').select('*').limit(5)
    ])
    
    return NextResponse.json({
      success: true,
      data: {
        cities: cities.data || [],
        citiesCount: cities.data?.length || 0,
        municipalities: municipalities.data || [],
        municipalitiesCount: municipalities.data?.length || 0,
        developers: developers.data || [],
        developersCount: developers.data?.length || 0
      },
      errors: {
        cities: cities.error,
        municipalities: municipalities.error,
        developers: developers.error
      }
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}