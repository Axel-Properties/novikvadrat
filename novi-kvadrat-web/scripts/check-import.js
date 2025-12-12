const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkData() {
  console.log('Checking imported data...\n')
  
  // Check cities
  const { data: cities, error: citiesError } = await supabase
    .from('cities')
    .select('*')
    .order('sort_order')
  
  console.log(`Cities: ${cities?.length || 0} imported`)
  if (cities?.length > 0) {
    console.log('  Sample:', cities.slice(0, 3).map(c => c.name_en).join(', '))
  }
  
  // Check developers
  const { data: developers, error: devError } = await supabase
    .from('developers')
    .select('*')
    .limit(5)
  
  console.log(`\nDevelopers: ${developers?.length || 0} found`)
  if (developers?.length > 0) {
    console.log('  Sample:', developers.slice(0, 3).map(d => d.name).join(', '))
  }
  
  // Count total developers
  const { count: devCount } = await supabase
    .from('developers')
    .select('*', { count: 'exact', head: true })
  console.log(`  Total developers in database: ${devCount}`)
  
  // Check projects
  const { data: projects, error: projError } = await supabase
    .from('projects')
    .select('*, developer:developers(name), city:cities(name_sr_lat)')
    .limit(5)
  
  console.log(`\nProjects: ${projects?.length || 0} found`)
  if (projects?.length > 0) {
    projects.slice(0, 3).forEach(p => {
      console.log(`  - ${p.name} (${p.city?.name_sr_lat}) by ${p.developer?.name}`)
    })
  }
  
  // Count total projects
  const { count: projCount } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true })
  console.log(`  Total projects in database: ${projCount}`)
  
  // Check layouts
  const { count: layoutCount } = await supabase
    .from('layouts')
    .select('*', { count: 'exact', head: true })
  console.log(`\nLayouts: ${layoutCount} total`)
  
  // Check municipalities
  const { data: municipalities } = await supabase
    .from('municipalities')
    .select('*')
    .limit(10)
  console.log(`\nMunicipalities: ${municipalities?.length || 0} found`)
  if (municipalities?.length > 0) {
    console.log('  Sample:', municipalities.slice(0, 3).map(m => m.name_sr_lat).join(', '))
  }
  
  // Summary
  console.log('\n=== IMPORT SUMMARY ===')
  console.log(`✓ Cities: ${cities?.length || 0}`)
  console.log(`✓ Developers: ${devCount || 0}`)
  console.log(`✓ Projects: ${projCount || 0}`)
  console.log(`✓ Layouts: ${layoutCount || 0}`)
  console.log(`✓ Municipalities: ${municipalities?.length || 0}`)
  
  if (projCount > 0) {
    console.log('\n✅ Data import successful! You can now view projects at:')
    console.log('   http://localhost:3000/novogradnja/beograd')
  } else {
    console.log('\n⚠️ No projects found. You may need to run the import.')
  }
}

checkData().catch(console.error)