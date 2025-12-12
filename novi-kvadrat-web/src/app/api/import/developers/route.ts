import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { developers } = await request.json()
    
    if (!developers || !Array.isArray(developers)) {
      return NextResponse.json(
        { success: false, error: 'Invalid developers data' },
        { status: 400 }
      )
    }

    const supabase = await createClient()
    
    let imported = 0
    let skipped = 0
    const errors: string[] = []

    for (const developer of developers) {
      // Check if developer already exists by PIB or slug
      const { data: existing } = await supabase
        .from('developers')
        .select('id')
        .or(`pib.eq.${developer.pib},slug.eq.${developer.slug}`)
        .single()

      if (existing) {
        skipped++
        continue
      }

      // Insert new developer
      const { error } = await supabase
        .from('developers')
        .insert({
          name: developer.name,
          slug: developer.slug,
          pib: developer.pib,
          website: developer.website,
          description: developer.description,
          founded_year: developer.founded_year,
          is_verified: developer.is_verified || false,
          logo_url: developer.logo_url,
          cover_image_url: developer.cover_image_url,
          email: developer.email,
          phone: developer.phone,
          address: developer.address,
          facebook: developer.facebook,
          instagram: developer.instagram,
          linkedin: developer.linkedin,
          apr_registration: developer.apr_registration,
          total_projects: 0,
          active_projects: 0,
          completed_projects: 0
        })

      if (error) {
        errors.push(`Failed to import ${developer.name}: ${error.message}`)
      } else {
        imported++
      }
    }

    return NextResponse.json({
      success: true,
      message: `Successfully imported ${imported} developers, skipped ${skipped} existing ones`,
      imported,
      skipped,
      errors: errors.length > 0 ? errors : undefined
    })
  } catch (error) {
    console.error('Import developers error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to import developers' 
      },
      { status: 500 }
    )
  }
}