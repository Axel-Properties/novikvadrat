import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const searchParams = request.nextUrl.searchParams
    const country = searchParams.get('country') || 'Serbia'
    
    // Fetch cities from database
    const { data: cities, error } = await supabase
      .from('cities')
      .select('id, name_en, name_sr_lat, name_sr_cyr, slug, country')
      .eq('country', country)
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
    
    if (error) {
      throw error
    }
    
    return NextResponse.json({
      success: true,
      data: cities || []
    })
  } catch (error) {
    console.error('Cities API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch cities' 
      },
      { status: 500 }
    )
  }
}

