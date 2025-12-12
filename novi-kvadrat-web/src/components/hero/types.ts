// Hero Search Form Types

export type Purpose = 'buy' | 'rent'

export type CompletionStatus = 'all' | 'ready' | 'off-plan'

export type PropertyCategory = 'residential' | 'commercial'

export type ResidentialPropertyType = 
  | 'apartment'
  | 'house'
  | 'villa'
  | 'townhouse'
  | 'penthouse'
  | 'studio'
  | 'duplex'
  | 'land'

export type CommercialPropertyType = 
  | 'office'
  | 'retail'
  | 'warehouse'
  | 'building'
  | 'land'

export type PropertyType = ResidentialPropertyType | CommercialPropertyType

export type BedCount = 'studio' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | '8+'

export type BathCount = 1 | 2 | 3 | 4 | 5 | '6+'

export type HandoverYear = '2024' | '2025' | '2026' | '2027' | '2028+'

export type PaymentPlan = 'any' | 'installments' | 'mortgage' | 'cash'

export type CompletionLevel = 'any' | 'notStarted' | 'underConstruction' | 'almostReady' | 'completed'

// Form Data Interfaces

export interface PropertiesFormData {
  purpose: Purpose
  searchQuery: string
  completionStatus: CompletionStatus
  propertyCategory: PropertyCategory
  propertyTypes: PropertyType[]
  beds: BedCount[]
  baths: BathCount[]
  minPrice: number | null
  maxPrice: number | null
}

export interface NewProjectsFormData {
  searchQuery: string
  propertyCategory: PropertyCategory
  propertyTypes: PropertyType[]
  handoverBy: HandoverYear | null
  paymentPlan: PaymentPlan
  completion: CompletionLevel
}

export interface AgentsFormData {
  purpose: Purpose
  searchQuery: string
}

// Callback Types

export type OnSearchProperties = (data: PropertiesFormData) => void
export type OnSearchProjects = (data: NewProjectsFormData) => void
export type OnSearchAgents = (data: AgentsFormData) => void

// Component Props

export interface HeroSearchCardProps {
  currentCity?: string
  onSearchProperties?: OnSearchProperties
  onSearchProjects?: OnSearchProjects
  onSearchAgents?: OnSearchAgents
  className?: string
}

export interface PurposeToggleProps {
  value: Purpose
  onChange: (value: Purpose) => void
  className?: string
}

export interface CompletionStatusFilterProps {
  value: CompletionStatus
  onChange: (value: CompletionStatus) => void
  className?: string
}

export interface PropertyTypeDropdownProps {
  category: PropertyCategory
  selectedTypes: PropertyType[]
  onCategoryChange: (category: PropertyCategory) => void
  onTypesChange: (types: PropertyType[]) => void
  className?: string
}

export interface BedsAndBathsFilterProps {
  beds: BedCount[]
  baths: BathCount[]
  onBedsChange: (beds: BedCount[]) => void
  onBathsChange: (baths: BathCount[]) => void
  className?: string
}

export interface PriceRangeFilterProps {
  minPrice: number | null
  maxPrice: number | null
  onMinPriceChange: (value: number | null) => void
  onMaxPriceChange: (value: number | null) => void
  className?: string
}

// Default Values

export const defaultPropertiesFormData: PropertiesFormData = {
  purpose: 'buy',
  searchQuery: '',
  completionStatus: 'all',
  propertyCategory: 'residential',
  propertyTypes: [],
  beds: [],
  baths: [],
  minPrice: null,
  maxPrice: null,
}

export const defaultNewProjectsFormData: NewProjectsFormData = {
  searchQuery: '',
  propertyCategory: 'residential',
  propertyTypes: [],
  handoverBy: null,
  paymentPlan: 'any',
  completion: 'any',
}

export const defaultAgentsFormData: AgentsFormData = {
  purpose: 'buy',
  searchQuery: '',
}

// Constants

export const RESIDENTIAL_PROPERTY_TYPES: ResidentialPropertyType[] = [
  'apartment',
  'house',
  'villa',
  'townhouse',
  'penthouse',
  'studio',
  'duplex',
  'land',
]

export const COMMERCIAL_PROPERTY_TYPES: CommercialPropertyType[] = [
  'office',
  'retail',
  'warehouse',
  'building',
  'land',
]

export const BED_OPTIONS: BedCount[] = ['studio', 1, 2, 3, 4, 5, 6, 7, '8+']

export const BATH_OPTIONS: BathCount[] = [1, 2, 3, 4, 5, '6+']

export const HANDOVER_YEARS: HandoverYear[] = ['2024', '2025', '2026', '2027', '2028+']

export const PAYMENT_PLANS: PaymentPlan[] = ['any', 'installments', 'mortgage', 'cash']

export const COMPLETION_LEVELS: CompletionLevel[] = [
  'any',
  'notStarted',
  'underConstruction',
  'almostReady',
  'completed',
]
