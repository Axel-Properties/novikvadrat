import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { projects } = await request.json()
    
    if (!projects || !Array.isArray(projects)) {
      return NextResponse.json(
        { success: false, error: 'Invalid projects data' },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    
    let imported = 0
    let skipped = 0
    const errors: string[] = []

    for (const project of projects) {
      // Check if project already exists by slug
      const { data: existing } = await supabase
        .from('projects')
        .select('id')
        .eq('slug', project.slug)
        .single()

      if (existing) {
        skipped++
        continue
      }

      // Get developer ID by name
      let developer_id = null
      if (project.developer) {
        const { data: developer } = await supabase
          .from('developers')
          .select('id')
          .eq('name', project.developer)
          .single()
        
        if (developer) {
          developer_id = developer.id
        }
      }

      // Get city ID by name
      let city_id = null
      if (project.city) {
        const { data: city } = await supabase
          .from('cities')
          .select('id')
          .or(`name_en.eq.${project.city},name_sr_lat.eq.${project.city}`)
          .single()
        
        if (city) {
          city_id = city.id

          // Get municipality ID if provided
          if (project.municipality) {
            const { data: municipality } = await supabase
              .from('municipalities')
              .select('id')
              .eq('city_id', city.id)
              .or(`name_en.eq.${project.municipality},name_sr_lat.eq.${project.municipality}`)
              .single()
            
            if (municipality) {
              project.municipality_id = municipality.id
            }
          }
        }
      }

      // Map status to database enum
      const statusMap: { [key: string]: string } = {
        'planning': 'planning',
        'u_izgradnji': 'u_izgradnji',
        'siva_faza': 'siva_faza',
        'useljivo': 'useljivo',
        'completed': 'completed'
      }

      // Insert new project
      const { error } = await supabase
        .from('projects')
        .insert({
          name: project.name,
          slug: project.slug,
          developer_id,
          city_id,
          municipality_id: project.municipality_id,
          description: project.description,
          address: project.address,
          latitude: project.latitude,
          longitude: project.longitude,
          construction_status: statusMap[project.status] || 'u_izgradnji',
          construction_start_date: project.construction_start_date,
          completion_date: project.completion ? `${project.completion}-12-31` : null,
          completion_percentage: project.completion_percentage,
          total_buildings: project.total_buildings || 1,
          total_floors: project.total_floors,
          total_units: project.total_units,
          available_units: project.available_units,
          parking_spaces: project.parking_spaces,
          heating_type: project.heating_type,
          elevator: project.elevator,
          garage: project.garage,
          energy_class: project.energy_class,
          price_from: project.price_from,
          price_to: project.price_to,
          price_per_sqm_from: project.price_per_sqm_from,
          price_per_sqm_to: project.price_per_sqm_to,
          vat_included: project.vat_included !== false,
          first_buyer_vat_refund: project.first_buyer_vat_refund || false,
          featured: project.featured || false,
          featured_order: project.featured_order,
          main_image_url: project.main_image_url,
          video_url: project.video_url,
          virtual_tour_url: project.virtual_tour_url,
          brochure_url: project.brochure_url,
          is_active: true,
          views_count: 0
        })

      if (error) {
        errors.push(`Failed to import ${project.name}: ${error.message}`)
      } else {
        imported++
        
        // Update developer's project count if we have a developer_id
        if (developer_id) {
          try {
            await supabase.rpc('increment', {
              table_name: 'developers',
              column_name: 'total_projects',
              row_id: developer_id
            })
          } catch {
            // If RPC doesn't exist, update manually
            await supabase
              .from('developers')
              .update({ 
                total_projects: project.status === 'completed' ? 0 : 1,
                active_projects: project.status === 'completed' ? 0 : 1,
                completed_projects: project.status === 'completed' ? 1 : 0
              })
              .eq('id', developer_id)
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: `Successfully imported ${imported} projects, skipped ${skipped} existing ones`,
      imported,
      skipped,
      errors: errors.length > 0 ? errors : undefined
    })
  } catch (error) {
    console.error('Import projects error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to import projects' 
      },
      { status: 500 }
    )
  }
}