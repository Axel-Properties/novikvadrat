// Hero Search Card Component Exports
export { HeroSearchCard } from './hero-search-card'
export { PurposeToggle } from './filters/purpose-toggle'
export { CompletionStatusFilter } from './filters/completion-status-filter'
export { PropertyTypeDropdown } from './filters/property-type-dropdown'
export { BedsAndBathsFilter } from './filters/beds-and-baths-filter'
export { PriceRangeFilter } from './filters/price-range-filter'

// Types
export type {
  Purpose,
  CompletionStatus,
  PropertyCategory,
  ResidentialPropertyType,
  CommercialPropertyType,
  PropertyType,
  BedCount,
  BathCount,
  HandoverYear,
  PaymentPlan,
  CompletionLevel,
  PropertiesFormData,
  NewProjectsFormData,
  AgentsFormData,
  HeroSearchCardProps,
  PurposeToggleProps,
  CompletionStatusFilterProps,
  PropertyTypeDropdownProps,
  BedsAndBathsFilterProps,
  PriceRangeFilterProps,
} from './types'

export {
  defaultPropertiesFormData,
  defaultNewProjectsFormData,
  defaultAgentsFormData,
  RESIDENTIAL_PROPERTY_TYPES,
  COMMERCIAL_PROPERTY_TYPES,
  BED_OPTIONS,
  BATH_OPTIONS,
  HANDOVER_YEARS,
  PAYMENT_PLANS,
  COMPLETION_LEVELS,
} from './types'
