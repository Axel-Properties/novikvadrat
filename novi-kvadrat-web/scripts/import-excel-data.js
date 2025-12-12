const fs = require('fs');
const path = require('path');

// Read the JSON data files
const cities = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/cities.json')));
const municipalities = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/municipalities.json')));
const developers = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/developers.json')));
const projects = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/projects.json')));
const layouts = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/layouts.json')));
const amenities = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/project_amenities.json')));

// Helper function to parse price values
function parsePrice(priceStr) {
  if (!priceStr || priceStr === 'On Request' || priceStr === 'Na upit') return null;
  const cleaned = String(priceStr).replace(/[^0-9.]/g, '');
  return cleaned ? parseFloat(cleaned) : null;
}

// Helper function to parse completion date
function parseCompletionDate(dateStr) {
  if (!dateStr) return null;
  
  // Convert to string if it's a number
  const dateString = String(dateStr);
  
  // Handle year-only format
  if (/^\d{4}$/.test(dateString)) {
    return `${dateString}-12-31`;
  }
  
  // Handle "Late 2025", "Q2 2027", etc.
  const yearMatch = dateString.match(/\d{4}/);
  if (yearMatch) {
    const year = yearMatch[0];
    if (dateString.toLowerCase().includes('late') || dateString.includes('Q4')) {
      return `${year}-12-31`;
    } else if (dateString.includes('Q3')) {
      return `${year}-09-30`;
    } else if (dateString.includes('Q2')) {
      return `${year}-06-30`;
    } else if (dateString.includes('Q1') || dateString.toLowerCase().includes('early')) {
      return `${year}-03-31`;
    }
    return `${year}-12-31`;
  }
  
  return null;
}

// Helper to create slug from name
function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Map construction status
function mapConstructionStatus(status) {
  const statusMap = {
    'U izgradnji': 'u_izgradnji',
    'Siva faza': 'siva_faza',
    'Useljivo': 'useljivo',
    'Završeno': 'completed',
    'U planiranju': 'planning'
  };
  return statusMap[status] || 'u_izgradnji';
}

// Map layout types
function mapLayoutType(type) {
  const typeMap = {
    'Garsonjera': 'garsonjera',
    'Jednosoban': 'jednosoban',
    'Jednoiposoban': 'jednoiposoban',
    'Dvosoban': 'dvosoban',
    'Dvoiposoban': 'dvoiposoban',
    'Trosoban': 'trosoban',
    'Troiposoban': 'troiposoban',
    'Četvorosoban': 'cetvorosoban',
    'Petosoban': 'petosoban',
    'Penthouse': 'penthouse'
  };
  return typeMap[type] || 'dvosoban';
}

// Process and display statistics
console.log('Data Summary:');
console.log('=============');
console.log(`Cities: ${cities.length}`);
console.log(`Municipalities: ${municipalities.length}`);
console.log(`Developers: ${developers.length}`);
console.log(`Projects: ${projects.length}`);
console.log(`Layouts: ${layouts.length}`);
console.log(`Projects with amenities: ${amenities.length}`);

// Prepare data for import
const importData = {
  cities: cities.map(city => ({
    name_en: city.name_en,
    name_sr_lat: city.name_sr_lat,
    name_sr_cyr: city.name_sr_cyr,
    slug: city.slug,
    latitude: city.latitude,
    longitude: city.longitude,
    is_active: true,
    sort_order: city.priority === 'Critical' ? 1 : city.priority === 'High' ? 2 : 3
  })),
  
  municipalities: municipalities.map(mun => ({
    city_name: mun.city,
    name_en: mun.name_en,
    name_sr_lat: mun.name_sr,
    name_sr_cyr: mun.name_sr,
    slug: createSlug(mun.name_en),
    municipality_type: 'municipality'
  })),
  
  developers: developers.map(dev => ({
    name: dev.name,
    slug: dev.slug,
    pib: String(dev.pib),
    description: dev.description,
    website: dev.website,
    email: dev.email,
    phone: dev.phone,
    founded_year: dev.founded_year,
    instagram: dev.instagram,
    facebook: dev.facebook,
    linkedin: dev.linkedin,
    is_verified: dev.priority === 'Critical' || dev.priority === 'High'
  })),
  
  projects: projects.map(proj => ({
    name: proj.project_name,
    slug: createSlug(proj.project_name),
    developer_name: proj.developer,
    city_name: proj.city,
    municipality_name: proj.municipality,
    address: proj.street_address,
    latitude: proj.latitude,
    longitude: proj.longitude,
    construction_status: mapConstructionStatus(proj.construction_status),
    completion_date: parseCompletionDate(proj.completion_date),
    price_from: parsePrice(proj.price_min_eur),
    price_to: parsePrice(proj.price_max_eur),
    price_per_sqm_from: parsePrice(proj['price_sqm_min [€]']),
    price_per_sqm_to: parsePrice(proj['price_sqm_max [€]']),
    vat_included: proj.vat_included === 'Da' ? true : proj.vat_included === 'Ne' ? false : true,
    total_units: parseInt(String(proj.total_units).replace(/[^0-9]/g, '')) || null,
    total_floors: parseInt(String(proj.floors).split(',')[0]) || null,
    data_source: proj.data_source
  })),
  
  layouts: layouts.filter(l => l.project_name).map(layout => ({
    project_name: layout.project_name,
    name: layout.layout_code || `${layout.type_sr} ${layout.total_area_m2}m²`,
    layout_type: mapLayoutType(layout.type_sr),
    total_area: layout.total_area_m2,
    bedrooms: layout.bedrooms || 1,
    bathrooms: layout.bathrooms || 1,
    has_terrace: layout.has_terrace === 'Da',
    price_from: parsePrice(layout.price_eur),
    available_units: layout.available === 'Dostupan' ? 1 : 0
  })),
  
  projectAmenities: amenities.map(am => ({
    project_name: am.project_name,
    has_reception: am.recepcija === 'Da',
    has_security: am.video_nadzor === 'Da',
    has_parking: am.podzemna_garaza === 'Da',
    has_elevator: am.lift === 'Da',
    has_smart_home: am.smart_home === 'Da',
    has_playground: am.decije_igraliste === 'Da',
    has_park: am.privatni_park === 'Da',
    has_gym: am.teretana === 'Da',
    has_pool: am.bazen === 'Da',
    other_amenities: am.other_amenities
  }))
};

// Save processed data
fs.writeFileSync(
  path.join(__dirname, '../data/processed_import_data.json'),
  JSON.stringify(importData, null, 2)
);

console.log('\nData processed and ready for import!');
console.log('Saved to: data/processed_import_data.json');

// Show sample data
console.log('\nSample processed data:');
console.log('First project:', JSON.stringify(importData.projects[0], null, 2));
console.log('\nFirst developer:', JSON.stringify(importData.developers[0], null, 2));