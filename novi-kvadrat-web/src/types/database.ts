export type Database = {
  public: {
    Tables: {
      cities: {
        Row: {
          id: string
          name_en: string
          name_sr_lat: string
          name_sr_cyr: string
          slug: string
          country: string
          latitude: number | null
          longitude: number | null
          is_active: boolean
          sort_order: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['cities']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['cities']['Insert']>
      }
      municipalities: {
        Row: {
          id: string
          city_id: string
          name_en: string
          name_sr_lat: string
          name_sr_cyr: string
          slug: string
          parent_id: string | null
          municipality_type: 'municipality' | 'neighborhood'
          latitude: number | null
          longitude: number | null
          polygon: any | null
          is_active: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['municipalities']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['municipalities']['Insert']>
      }
      developers: {
        Row: {
          id: string
          name: string
          slug: string
          pib: string | null
          logo_url: string | null
          cover_image_url: string | null
          description: string | null
          founded_year: number | null
          website: string | null
          email: string | null
          phone: string | null
          address: string | null
          facebook: string | null
          instagram: string | null
          linkedin: string | null
          is_verified: boolean
          verified_at: string | null
          apr_registration: string | null
          total_projects: number
          active_projects: number
          completed_projects: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['developers']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['developers']['Insert']>
      }
      projects: {
        Row: {
          id: string
          developer_id: string | null
          name: string
          slug: string
          description: string | null
          city_id: string | null
          municipality_id: string | null
          address: string | null
          latitude: number | null
          longitude: number | null
          construction_status: 'planning' | 'u_izgradnji' | 'siva_faza' | 'useljivo' | 'completed'
          construction_start_date: string | null
          completion_date: string | null
          completion_percentage: number | null
          total_buildings: number
          total_floors: number | null
          total_units: number | null
          available_units: number | null
          parking_spaces: number | null
          heating_type: 'centralno' | 'etazno' | 'gas' | 'toplotna_pumpa' | 'podno' | 'ta_pec' | null
          elevator: boolean
          garage: boolean
          energy_class: string | null
          price_from: number | null
          price_to: number | null
          price_per_sqm_from: number | null
          price_per_sqm_to: number | null
          vat_included: boolean
          first_buyer_vat_refund: boolean
          featured: boolean
          featured_order: number | null
          main_image_url: string | null
          video_url: string | null
          virtual_tour_url: string | null
          brochure_url: string | null
          is_active: boolean
          views_count: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['projects']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['projects']['Insert']>
      }
      amenities: {
        Row: {
          id: string
          name_en: string
          name_sr: string
          icon: string | null
          category: 'building' | 'apartment' | 'location' | 'outdoor' | 'security' | 'other'
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['amenities']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['amenities']['Insert']>
      }
      project_amenities: {
        Row: {
          project_id: string
          amenity_id: string
        }
        Insert: Database['public']['Tables']['project_amenities']['Row']
        Update: Partial<Database['public']['Tables']['project_amenities']['Insert']>
      }
      project_images: {
        Row: {
          id: string
          project_id: string
          url: string
          caption: string | null
          image_type: 'exterior' | 'interior' | 'floor_plan' | 'location' | 'construction' | 'amenity'
          is_primary: boolean
          sort_order: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['project_images']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['project_images']['Insert']>
      }
      layouts: {
        Row: {
          id: string
          project_id: string
          name: string
          layout_type: 'garsonjera' | 'jednosoban' | 'jednoiposoban' | 'dvosoban' | 'dvoiposoban' | 
                       'trosoban' | 'troiposoban' | 'cetvorosoban' | 'petosoban' | 'penthouse'
          total_area: number
          living_area: number | null
          terrace_area: number | null
          bedrooms: number
          bathrooms: number
          has_terrace: boolean
          has_loggia: boolean
          price_from: number | null
          price_to: number | null
          floor_plan_url: string | null
          floor_plan_3d_url: string | null
          total_units: number
          available_units: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['layouts']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['layouts']['Insert']>
      }
      project_price_history: {
        Row: {
          id: string
          project_id: string
          price_min: number
          price_per_sqm_min: number | null
          currency: string
          recorded_at: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['project_price_history']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['project_price_history']['Insert']>
      }
      project_buildings: {
        Row: {
          id: string
          project_id: string
          name: string
          address: string | null
          floors: number | null
          total_units: number | null
          available_units: number | null
          construction_status: 'planning' | 'u_izgradnji' | 'siva_faza' | 'useljivo' | 'completed' | null
          completion_date: string | null
          latitude: number | null
          longitude: number | null
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['project_buildings']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['project_buildings']['Insert']>
      }
      construction_progress_spots: {
        Row: {
          id: string
          project_id: string
          name: string
          description: string | null
          start_date: string | null
          latest_date: string | null
          cover_image_url: string | null
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['construction_progress_spots']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['construction_progress_spots']['Insert']>
      }
      construction_progress_photos: {
        Row: {
          id: string
          spot_id: string
          url: string
          caption: string | null
          taken_at: string
          sort_order: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['construction_progress_photos']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['construction_progress_photos']['Insert']>
      }
    }
  }
}

// Helper types for relationships
export type City = Database['public']['Tables']['cities']['Row']
export type Municipality = Database['public']['Tables']['municipalities']['Row']
export type Developer = Database['public']['Tables']['developers']['Row']
export type Project = Database['public']['Tables']['projects']['Row']
export type Amenity = Database['public']['Tables']['amenities']['Row']
export type ProjectImage = Database['public']['Tables']['project_images']['Row']
export type Layout = Database['public']['Tables']['layouts']['Row']
export type ProjectPriceHistory = Database['public']['Tables']['project_price_history']['Row']
export type ProjectBuilding = Database['public']['Tables']['project_buildings']['Row']
export type ConstructionProgressSpot = Database['public']['Tables']['construction_progress_spots']['Row']
export type ConstructionProgressPhoto = Database['public']['Tables']['construction_progress_photos']['Row']

// Extended types with relationships
export type ProjectWithDetails = Project & {
  developer?: Developer
  city?: City
  municipality?: Municipality
  images?: ProjectImage[]
  layouts?: Layout[]
  amenities?: Amenity[]
  priceHistory?: ProjectPriceHistory[]
  buildings?: ProjectBuilding[]
  constructionProgress?: ConstructionProgressSpotWithPhotos[]
}

export type ConstructionProgressSpotWithPhotos = ConstructionProgressSpot & {
  photos?: ConstructionProgressPhoto[]
  photo_count?: number
}

export type DeveloperWithProjects = Developer & {
  projects?: Project[]
}