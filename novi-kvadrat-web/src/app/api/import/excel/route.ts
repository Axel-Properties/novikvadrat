import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    
    // Read the processed data
    const dataPath = path.join(process.cwd(), 'data', 'processed_import_data.json')
    const importData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
    
    const results = {
      cities: { imported: 0, skipped: 0, errors: [] as string[] },
      municipalities: { imported: 0, skipped: 0, errors: [] as string[] },
      developers: { imported: 0, skipped: 0, errors: [] as string[] },
      projects: { imported: 0, skipped: 0, errors: [] as string[] },
      layouts: { imported: 0, skipped: 0, errors: [] as string[] },
      amenities: { imported: 0, skipped: 0, errors: [] as string[] }
    }
    
    // 1. Import Cities
    console.log('Importing cities...')
    for (const city of importData.cities) {
      const { data: existing } = await supabase
        .from('cities')
        .select('id')
        .eq('slug', city.slug)
        .single()
      
      if (existing) {
        results.cities.skipped++
        continue
      }
      
      const { error } = await supabase
        .from('cities')
        .insert(city)
      
      if (error) {
        results.cities.errors.push(`${city.name_en}: ${error.message}`)
      } else {
        results.cities.imported++
      }
    }
    
    // 2. Import Municipalities
    console.log('Importing municipalities...')
    for (const municipality of importData.municipalities) {
      // Get city ID
      const { data: city } = await supabase
        .from('cities')
        .select('id')
        .or(`name_en.eq.${municipality.city_name},name_sr_lat.eq.${municipality.city_name}`)
        .single()
      
      if (!city) {
        results.municipalities.errors.push(`City not found: ${municipality.city_name}`)
        continue
      }
      
      const { data: existing } = await supabase
        .from('municipalities')
        .select('id')
        .eq('city_id', city.id)
        .eq('slug', municipality.slug)
        .single()
      
      if (existing) {
        results.municipalities.skipped++
        continue
      }
      
      const { error } = await supabase
        .from('municipalities')
        .insert({
          ...municipality,
          city_id: city.id
        })
      
      if (error) {
        results.municipalities.errors.push(`${municipality.name_en}: ${error.message}`)
      } else {
        results.municipalities.imported++
      }
    }
    
    // 3. Import Developers
    console.log('Importing developers...')
    for (const developer of importData.developers) {
      const { data: existing } = await supabase
        .from('developers')
        .select('id')
        .or(`slug.eq.${developer.slug},pib.eq.${developer.pib}`)
        .single()
      
      if (existing) {
        results.developers.skipped++
        continue
      }
      
      const { error } = await supabase
        .from('developers')
        .insert(developer)
      
      if (error) {
        results.developers.errors.push(`${developer.name}: ${error.message}`)
      } else {
        results.developers.imported++
      }
    }
    
    // 4. Import Projects
    console.log('Importing projects...')
    const projectIdMap: { [key: string]: string } = {}
    
    for (const project of importData.projects) {
      // Get developer ID
      let developer_id = null
      if (project.developer_name) {
        const { data: developer } = await supabase
          .from('developers')
          .select('id')
          .eq('name', project.developer_name)
          .single()
        
        if (developer) {
          developer_id = developer.id
        }
      }
      
      // Get city ID
      let city_id = null
      let municipality_id = null
      
      if (project.city_name) {
        const { data: city } = await supabase
          .from('cities')
          .select('id')
          .or(`name_en.eq.${project.city_name},name_sr_lat.eq.${project.city_name}`)
          .single()
        
        if (city) {
          city_id = city.id
          
          // Get municipality ID
          if (project.municipality_name) {
            const { data: municipality } = await supabase
              .from('municipalities')
              .select('id')
              .eq('city_id', city.id)
              .or(`name_en.eq.${project.municipality_name},name_sr_lat.eq.${project.municipality_name}`)
              .single()
            
            if (municipality) {
              municipality_id = municipality.id
            }
          }
        }
      }
      
      // Check if project exists
      const { data: existing } = await supabase
        .from('projects')
        .select('id')
        .eq('slug', project.slug)
        .single()
      
      if (existing) {
        projectIdMap[project.name] = existing.id
        results.projects.skipped++
        continue
      }
      
      // Insert project
      const { data: newProject, error } = await supabase
        .from('projects')
        .insert({
          name: project.name,
          slug: project.slug,
          developer_id,
          city_id,
          municipality_id,
          address: project.address,
          latitude: project.latitude,
          longitude: project.longitude,
          construction_status: project.construction_status,
          completion_date: project.completion_date,
          price_from: project.price_from,
          price_to: project.price_to,
          price_per_sqm_from: project.price_per_sqm_from,
          price_per_sqm_to: project.price_per_sqm_to,
          vat_included: project.vat_included,
          total_units: project.total_units,
          total_floors: project.total_floors,
          is_active: true
        })
        .select('id')
        .single()
      
      if (error) {
        results.projects.errors.push(`${project.name}: ${error.message}`)
      } else {
        results.projects.imported++
        if (newProject) {
          projectIdMap[project.name] = newProject.id
        }
      }
    }
    
    // 5. Import Layouts
    console.log('Importing layouts...')
    for (const layout of importData.layouts) {
      const projectId = projectIdMap[layout.project_name]
      
      if (!projectId) {
        // Try to find project by name
        const { data: project } = await supabase
          .from('projects')
          .select('id')
          .eq('name', layout.project_name)
          .single()
        
        if (!project) {
          results.layouts.errors.push(`Project not found: ${layout.project_name}`)
          continue
        }
        projectIdMap[layout.project_name] = project.id
      }
      
      const { error } = await supabase
        .from('layouts')
        .insert({
          project_id: projectIdMap[layout.project_name],
          name: layout.name,
          layout_type: layout.layout_type,
          total_area: layout.total_area,
          bedrooms: layout.bedrooms,
          bathrooms: layout.bathrooms,
          has_terrace: layout.has_terrace,
          price_from: layout.price_from,
          available_units: layout.available_units,
          total_units: 1
        })
      
      if (error) {
        results.layouts.errors.push(`${layout.name}: ${error.message}`)
      } else {
        results.layouts.imported++
      }
    }
    
    // 6. Import Amenities
    console.log('Importing amenities...')
    
    // First, ensure basic amenities exist
    const basicAmenities = [
      { name_en: 'Reception', name_sr: 'Recepcija', icon: 'reception', category: 'building' },
      { name_en: 'Security', name_sr: 'Obezbeđenje', icon: 'security', category: 'security' },
      { name_en: 'Underground Parking', name_sr: 'Podzemna garaža', icon: 'parking', category: 'building' },
      { name_en: 'Elevator', name_sr: 'Lift', icon: 'elevator', category: 'building' },
      { name_en: 'Smart Home', name_sr: 'Smart Home sistem', icon: 'smart-home', category: 'apartment' },
      { name_en: 'Playground', name_sr: 'Dečije igralište', icon: 'playground', category: 'outdoor' },
      { name_en: 'Private Park', name_sr: 'Privatni park', icon: 'park', category: 'outdoor' },
      { name_en: 'Gym', name_sr: 'Teretana', icon: 'gym', category: 'building' },
      { name_en: 'Swimming Pool', name_sr: 'Bazen', icon: 'pool', category: 'outdoor' },
      { name_en: 'Video Surveillance', name_sr: 'Video nadzor', icon: 'cctv', category: 'security' }
    ]
    
    const amenityIdMap: { [key: string]: string } = {}
    
    for (const amenity of basicAmenities) {
      const { data: existing } = await supabase
        .from('amenities')
        .select('id')
        .eq('name_en', amenity.name_en)
        .single()
      
      if (existing) {
        amenityIdMap[amenity.name_en] = existing.id
      } else {
        const { data: newAmenity } = await supabase
          .from('amenities')
          .insert(amenity)
          .select('id')
          .single()
        
        if (newAmenity) {
          amenityIdMap[amenity.name_en] = newAmenity.id
        }
      }
    }
    
    // Link amenities to projects
    for (const projectAmenity of importData.projectAmenities) {
      const projectId = projectIdMap[projectAmenity.project_name]
      
      if (!projectId) {
        const { data: project } = await supabase
          .from('projects')
          .select('id')
          .eq('name', projectAmenity.project_name)
          .single()
        
        if (!project) continue
        projectIdMap[projectAmenity.project_name] = project.id
      }
      
      const amenityLinks = []
      
      if (projectAmenity.has_reception && amenityIdMap['Reception']) {
        amenityLinks.push({ project_id: projectIdMap[projectAmenity.project_name], amenity_id: amenityIdMap['Reception'] })
      }
      if (projectAmenity.has_security && amenityIdMap['Video Surveillance']) {
        amenityLinks.push({ project_id: projectIdMap[projectAmenity.project_name], amenity_id: amenityIdMap['Video Surveillance'] })
      }
      if (projectAmenity.has_parking && amenityIdMap['Underground Parking']) {
        amenityLinks.push({ project_id: projectIdMap[projectAmenity.project_name], amenity_id: amenityIdMap['Underground Parking'] })
      }
      if (projectAmenity.has_elevator && amenityIdMap['Elevator']) {
        amenityLinks.push({ project_id: projectIdMap[projectAmenity.project_name], amenity_id: amenityIdMap['Elevator'] })
      }
      if (projectAmenity.has_smart_home && amenityIdMap['Smart Home']) {
        amenityLinks.push({ project_id: projectIdMap[projectAmenity.project_name], amenity_id: amenityIdMap['Smart Home'] })
      }
      if (projectAmenity.has_playground && amenityIdMap['Playground']) {
        amenityLinks.push({ project_id: projectIdMap[projectAmenity.project_name], amenity_id: amenityIdMap['Playground'] })
      }
      if (projectAmenity.has_park && amenityIdMap['Private Park']) {
        amenityLinks.push({ project_id: projectIdMap[projectAmenity.project_name], amenity_id: amenityIdMap['Private Park'] })
      }
      if (projectAmenity.has_gym && amenityIdMap['Gym']) {
        amenityLinks.push({ project_id: projectIdMap[projectAmenity.project_name], amenity_id: amenityIdMap['Gym'] })
      }
      if (projectAmenity.has_pool && amenityIdMap['Swimming Pool']) {
        amenityLinks.push({ project_id: projectIdMap[projectAmenity.project_name], amenity_id: amenityIdMap['Swimming Pool'] })
      }
      
      if (amenityLinks.length > 0) {
        const { error } = await supabase
          .from('project_amenities')
          .insert(amenityLinks)
        
        if (!error) {
          results.amenities.imported += amenityLinks.length
        }
      }
    }
    
    return NextResponse.json({
      success: true,
      message: 'Excel data import completed',
      results
    })
  } catch (error) {
    console.error('Import error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to import data' 
      },
      { status: 500 }
    )
  }
}