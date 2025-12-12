import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const supabase = await createClient()
    
    // Parse query parameters
    const city = searchParams.get('city')
    const municipality = searchParams.get('municipality')
    const status = searchParams.get('status')
    const priceMin = searchParams.get('price_min')
    const priceMax = searchParams.get('price_max')
    const pricePerSqmMin = searchParams.get('price_per_sqm_min')
    const pricePerSqmMax = searchParams.get('price_per_sqm_max')
    const developer = searchParams.get('developer')
    const featured = searchParams.get('featured')
    const sort = searchParams.get('sort') || 'featured'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    
    // Start building the query
    let query = supabase
      .from('projects')
      .select(`
        *,
        developer:developers(id, name, slug, is_verified),
        city:cities(id, name_en, name_sr_lat, slug),
        municipality:municipalities(id, name_en, name_sr_lat, slug)
      `, { count: 'exact' })
      .eq('is_active', true)
    
    // Apply filters
    if (city) {
      const { data: cityData } = await supabase
        .from('cities')
        .select('id')
        .eq('slug', city)
        .single()
      
      if (cityData) {
        query = query.eq('city_id', cityData.id)
      }
    }
    
    if (municipality) {
      const { data: municipalityData } = await supabase
        .from('municipalities')
        .select('id')
        .eq('slug', municipality)
        .single()
      
      if (municipalityData) {
        query = query.eq('municipality_id', municipalityData.id)
      }
    }
    
    if (status) {
      query = query.eq('construction_status', status)
    }
    
    if (priceMin) {
      query = query.gte('price_from', priceMin)
    }
    
    if (priceMax) {
      query = query.lte('price_to', priceMax)
    }
    
    if (pricePerSqmMin) {
      query = query.gte('price_per_sqm_from', pricePerSqmMin)
    }
    
    if (pricePerSqmMax) {
      query = query.lte('price_per_sqm_to', pricePerSqmMax)
    }
    
    if (developer) {
      const { data: developerData } = await supabase
        .from('developers')
        .select('id')
        .eq('slug', developer)
        .single()
      
      if (developerData) {
        query = query.eq('developer_id', developerData.id)
      }
    }
    
    if (featured === 'true') {
      query = query.eq('featured', true)
    }
    
    // Apply sorting
    switch (sort) {
      case 'price_asc':
        query = query.order('price_from', { ascending: true, nullsLast: true })
        break
      case 'price_desc':
        query = query.order('price_from', { ascending: false, nullsFirst: true })
        break
      case 'newest':
        query = query.order('created_at', { ascending: false })
        break
      case 'completion':
        query = query.order('completion_date', { ascending: true, nullsLast: true })
        break
      case 'featured':
      default:
        query = query
          .order('featured', { ascending: false })
          .order('featured_order', { ascending: true, nullsLast: true })
          .order('created_at', { ascending: false })
        break
    }
    
    // Apply pagination
    const offset = (page - 1) * limit
    query = query.range(offset, offset + limit - 1)
    
    // Execute query
    const { data, error, count } = await query
    
    if (error) {
      throw error
    }
    
    // Get aggregations for filters
    const aggregations = await getAggregations(supabase, city)
    
    return NextResponse.json({
      success: true,
      data: data || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
      },
      aggregations
    })
  } catch (error) {
    console.error('Projects API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch projects' 
      },
      { status: 500 }
    )
  }
}

async function getAggregations(supabase: any, citySlug?: string | null) {
  const aggregations: any = {}
  
  // Get municipalities for the selected city
  if (citySlug) {
    const { data: city } = await supabase
      .from('cities')
      .select('id')
      .eq('slug', citySlug)
      .single()
    
    if (city) {
      const { data: municipalities } = await supabase
        .from('municipalities')
        .select('id, name_en, name_sr_lat, slug')
        .eq('city_id', city.id)
        .order('name_en')
      
      aggregations.municipalities = municipalities || []
    }
  }
  
  // Get construction statuses with counts
  const { data: statuses } = await supabase
    .from('projects')
    .select('construction_status')
    .eq('is_active', true)
    .not('construction_status', 'is', null)
  
  if (statuses) {
    const statusCounts = statuses.reduce((acc: any, proj: any) => {
      acc[proj.construction_status] = (acc[proj.construction_status] || 0) + 1
      return acc
    }, {})
    
    aggregations.statuses = Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count,
      label: getStatusLabel(status as string)
    }))
  }
  
  // Get price ranges
  const { data: priceData } = await supabase
    .from('projects')
    .select('price_from, price_to')
    .eq('is_active', true)
    .not('price_from', 'is', null)
  
  if (priceData && priceData.length > 0) {
    const prices = priceData.map((p: any) => p.price_from).filter(Boolean)
    aggregations.priceRange = {
      min: Math.min(...prices),
      max: Math.max(...prices)
    }
  }
  
  return aggregations
}

function getStatusLabel(status: string): string {
  const labels: { [key: string]: string } = {
    'planning': 'U planiranju',
    'u_izgradnji': 'U izgradnji',
    'siva_faza': 'Siva faza',
    'useljivo': 'Useljivo',
    'completed': 'Završeno'
  }
  return labels[status] || status
}