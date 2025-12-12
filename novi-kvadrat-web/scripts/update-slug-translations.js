const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

// Helper to transliterate Serbian Latin to Cyrillic
function toCyrillic(text) {
  const latinToCyrillic = {
    'a': 'а', 'b': 'б', 'v': 'в', 'g': 'г', 'd': 'д', 'đ': 'ђ', 'e': 'е', 
    'ž': 'ж', 'z': 'з', 'i': 'и', 'j': 'ј', 'k': 'к', 'l': 'л', 'lj': 'љ',
    'm': 'м', 'n': 'н', 'nj': 'њ', 'o': 'о', 'p': 'п', 'r': 'р', 's': 'с',
    't': 'т', 'ć': 'ћ', 'u': 'у', 'f': 'ф', 'h': 'х', 'c': 'ц', 'č': 'ч',
    'dž': 'џ', 'š': 'ш',
    'A': 'А', 'B': 'Б', 'V': 'В', 'G': 'Г', 'D': 'Д', 'Đ': 'Ђ', 'E': 'Е',
    'Ž': 'Ж', 'Z': 'З', 'I': 'И', 'J': 'Ј', 'K': 'К', 'L': 'Л', 'Lj': 'Љ',
    'M': 'М', 'N': 'Н', 'Nj': 'Њ', 'O': 'О', 'P': 'П', 'R': 'Р', 'S': 'С',
    'T': 'Т', 'Ć': 'Ћ', 'U': 'У', 'F': 'Ф', 'H': 'Х', 'C': 'Ц', 'Č': 'Ч',
    'Dž': 'Џ', 'Š': 'Ш'
  }
  
  let result = text
  // First replace digraphs
  result = result.replace(/lj/g, 'љ').replace(/Lj/g, 'Љ')
  result = result.replace(/nj/g, 'њ').replace(/Nj/g, 'Њ')
  result = result.replace(/dž/g, 'џ').replace(/Dž/g, 'Џ')
  
  // Then replace single letters
  for (const [latin, cyrillic] of Object.entries(latinToCyrillic)) {
    if (latin.length === 1) {
      result = result.replace(new RegExp(latin, 'g'), cyrillic)
    }
  }
  
  return result
}

// Helper to create English slug from Serbian
function toEnglishSlug(text) {
  const translations = {
    'novogradnja': 'new-development',
    'projekat': 'project',
    'gradjevinar': 'developer',
    'beograd': 'belgrade',
    'novi-sad': 'novi-sad',
    'zgrada': 'building',
    'stan': 'apartment',
    'kuca': 'house',
    'poslovan-prostor': 'commercial',
    'garaza': 'garage'
  }
  
  // Check if we have a direct translation
  const lower = text.toLowerCase()
  for (const [serbian, english] of Object.entries(translations)) {
    if (lower.includes(serbian)) {
      return lower.replace(serbian, english)
    }
  }
  
  // Otherwise keep the original but ensure it's URL-safe
  return text
    .toLowerCase()
    .replace(/[ćčžšđ]/g, (char) => {
      const map = { 'ć': 'c', 'č': 'c', 'ž': 'z', 'š': 's', 'đ': 'dj' }
      return map[char] || char
    })
}

async function updateSlugTranslations() {
  console.log('Updating slug translations...\n')
  
  try {
    // Update projects
    console.log('Updating projects...')
    const { data: projects } = await supabase
      .from('projects')
      .select('id, slug, name')
      .limit(200)
    
    if (projects) {
      for (const project of projects) {
        if (!project.slug_en) {
          const updates = {
            slug_en: toEnglishSlug(project.slug),
            slug_sr: project.slug,
            slug_sr_cyr: toCyrillic(project.slug)
          }
          
          await supabase
            .from('projects')
            .update(updates)
            .eq('id', project.id)
        }
      }
      console.log(`✓ Updated ${projects.length} projects`)
    }
    
    // Update developers
    console.log('Updating developers...')
    const { data: developers } = await supabase
      .from('developers')
      .select('id, slug, name')
      .limit(200)
    
    if (developers) {
      for (const developer of developers) {
        if (!developer.slug_en) {
          const updates = {
            slug_en: toEnglishSlug(developer.slug),
            slug_sr: developer.slug,
            slug_sr_cyr: toCyrillic(developer.slug)
          }
          
          await supabase
            .from('developers')
            .update(updates)
            .eq('id', developer.id)
        }
      }
      console.log(`✓ Updated ${developers.length} developers`)
    }
    
    console.log('\n✅ All slug translations updated successfully!')
    
  } catch (error) {
    console.error('Error updating translations:', error)
  }
}

updateSlugTranslations()