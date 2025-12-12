// User Types
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  userType: 'buyer' | 'seller' | 'agent' | 'developer'
  isVerified?: boolean
}

// Location Types
export interface City {
  id: string
  name: string
  nameKa: string
  nameRu: string
  slug: string
  projectsCount?: number
}

export interface District {
  id: string
  name: string
  cityId: string
  slug: string
}

// Navigation Types
export interface NavItem {
  label: string
  href?: string
  icon?: React.ReactNode
  children?: NavItem[]
  badge?: string
}

// Property Types
export interface PropertyCard {
  id: string
  title: string
  images: string[]
  price: number
  pricePerSqm?: number
  currency: string
  rooms?: number
  area: number
  floor?: number
  totalFloors?: number
  district: string
  city: string
  isNew?: boolean
  isFeatured?: boolean
  isVerified?: boolean
  completionDate?: string
  isFavorite?: boolean
}

export interface ProjectCard {
  id: string
  slug: string
  name: string
  image: string
  address: string
  district: string
  priceFrom: number | null
  pricePerSqm: number | null
  developer: {
    id: string
    name: string
    slug: string
    isVerified?: boolean
  }
  completionPercentage?: number
  completionDate?: string
}

export interface DeveloperCard {
  id: string
  slug: string
  name: string
  logo: string
  projectsOnSale: number
  completedProjects?: number
  priceFrom: number
  isVerified?: boolean
}

export interface RealtorCard {
  id: string
  name: string
  avatar: string
  agencyName?: string
  agencyType: 'agent' | 'realtor_of_agency'
  propertiesCount: number
  specialization: 'sale' | 'rent' | 'daily_rental' | 'sale_and_rent'
  rating?: number
  reviewCount?: number
}

// Filter Types
export interface FilterOption {
  value: string
  label: string
  count?: number
}