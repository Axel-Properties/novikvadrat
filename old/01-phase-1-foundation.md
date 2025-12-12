# 📦 Phase 1: Foundation & Core Structure

## Overview

| Attribute | Value |
|-----------|-------|
| **Duration** | 2-3 weeks |
| **Platform** | Lovable |
| **Priority** | Critical |
| **Dependencies** | None |

---

## Objectives

1. ✅ Set up project foundation and folder structure
2. ✅ Create reusable UI component library
3. ✅ Implement design system (colors, typography, spacing)
4. ✅ Build navigation structure with mega menus
5. ✅ Create homepage layout with all sections
6. ✅ Implement language and city switching
7. ✅ Ensure mobile responsiveness

---

## Pages to Build

### 1.1 Homepage

**Route:** `/` and `/{locale}/` (e.g., `/en/`, `/ka/`, `/ru/`)

#### Page Sections

```
┌─────────────────────────────────────────────────────────────┐
│ 1. HEADER (Sticky)                                          │
│    - Logo                                                   │
│    - Navigation with mega menus                             │
│    - Search button                                          │
│    - Add property button                                    │
│    - Sign in button                                         │
│    - Favorites icon                                         │
│    - Language selector                                      │
│    - City selector                                          │
├─────────────────────────────────────────────────────────────┤
│ 2. HERO SECTION                                             │
│    - Title: "Apartments and new developments in {City}"     │
│    - View on map button                                     │
│    - Add property CTA with illustration                     │
├─────────────────────────────────────────────────────────────┤
│ 3. CATEGORY CARDS (Horizontal Scroll)                       │
│    - Residential projects                                   │
│    - Apartments for sale                                    │
│    - Cottages                                               │
│    - Houses for sale                                        │
│    - Apartments for rent                                    │
│    - Houses for rent                                        │
├─────────────────────────────────────────────────────────────┤
│ 4. POPULAR PROJECTS                                         │
│    - Section header with "All projects" link                │
│    - Horizontal scrollable project cards                    │
├─────────────────────────────────────────────────────────────┤
│ 5. NEW REALTORS                                             │
│    - Section header with "All realtors" link                │
│    - Grid of realtor cards (2 rows x 4 columns)             │
├─────────────────────────────────────────────────────────────┤
│ 6. DEVELOPERS                                               │
│    - Section header with "All developers" link              │
│    - Horizontal scrollable developer cards                  │
├─────────────────────────────────────────────────────────────┤
│ 7. QUICK LINKS GRID                                         │
│    - Projects in other cities                               │
│    - Apartments for sale by city                            │
│    - Developers in other cities                             │
│    - Popular searches                                       │
├─────────────────────────────────────────────────────────────┤
│ 8. FOOTER                                                   │
│    - Logo                                                   │
│    - Country selector                                       │
│    - Language selector                                      │
│    - About links                                            │
│    - Terms links                                            │
│    - App store badges                                       │
│    - Social media links                                     │
│    - Copyright                                              │
└─────────────────────────────────────────────────────────────┘
```

#### Data Requirements

```typescript
// types/homepage.ts

interface HomepageData {
  city: string;
  stats: CategoryStats;
  popularProjects: ProjectCardData[];
  newRealtors: RealtorCardData[];
  developers: DeveloperCardData[];
  citiesWithProjects: CityLinkData[];
  apartmentsByCitySale: CityPropertyCount[];
  developersByCities: CityDeveloperCount[];
  popularSearches: PopularSearchLink[];
}

interface CategoryStats {
  residentialProjects: number;
  apartmentsForSale: number;
  cottages: number;
  housesForSale: number;
  apartmentsForRent: number;
  housesForRent: number;
}

interface ProjectCardData {
  id: string;
  slug: string;
  name: string;
  image: string;
  address: string;
  district: string;
  priceFrom: number | null;
  pricePerSqm: number | null;
  developer: {
    id: string;
    name: string;
    slug: string;
  };
}

interface RealtorCardData {
  id: string;
  name: string;
  avatar: string;
  agencyName: string | null;
  agencyType: 'agent' | 'realtor_of_agency';
  propertiesCount: number;
  specialization: 'sale' | 'rent' | 'daily_rental' | 'sale_and_rent';
}

interface DeveloperCardData {
  id: string;
  slug: string;
  name: string;
  logo: string;
  projectsOnSale: number;
  priceFrom: number;
}

interface CityLinkData {
  name: string;
  slug: string;
  projectsCount: number;
}
```

---

### 1.2 Header Component

#### Structure

```
┌─────────────────────────────────────────────────────────────────────────┐
│ [Logo]                                                                   │
│                                                                          │
│ [New projects ▼] [Sale ▼] [Rent ▼] [Daily rental ▼] [Mortgage]          │
│                                                                          │
│ [🔍 Search] [+ Add property] [Sign in] [❤️ Favorites] [🌐 EN] [📍 City] │
└─────────────────────────────────────────────────────────────────────────┘
```

#### Mega Menu: New Projects

```typescript
const newProjectsMenu = [
  { label: 'Residential projects', href: '/en/new-projects-in-{city}' },
  { label: 'Cottages', href: '/en/cottages-in-{city}' },
  { label: 'Developers', href: '/en/developers-in-{city}' },
  { label: '📙 Real Estate Buyer\'s Guide', href: '/en/guide/real-estate-investing' },
];
```

#### Mega Menu: Sale

```typescript
const saleMenu = [
  { label: 'Apartments for sale', href: '/en/apartments-for-sale-{city}' },
  { label: 'Houses for sale', href: '/en/houses-for-sale-{city}' },
  { label: 'Commercial property for sale', href: '/en/commercial-property-sale-{city}' },
  { label: 'Offices for sale', href: '/en/offices-for-sale-{city}' },
  { label: 'Warehouses for sale', href: '/en/warehouses-for-sale-{city}' },
  { label: 'Land for sale', href: '/en/land-for-sale-{city}' },
  { label: 'Garages and parking spaces for sale', href: '/en/garages-parkings-for-sale-{city}' },
  { label: 'Realtors', href: '/en/realtors-{city}' },
];
```

#### Mega Menu: Rent

```typescript
const rentMenu = [
  { label: 'Apartments for rent', href: '/en/apartments-for-rent-{city}' },
  { label: 'Houses for rent', href: '/en/houses-for-rent-{city}' },
  { label: 'Commercial property for rent', href: '/en/commercial-property-rent-{city}' },
  { label: 'Offices for rent', href: '/en/offices-for-rent-{city}' },
  { label: 'Warehouses for rent', href: '/en/warehouses-for-rent-{city}' },
  { label: 'Garages and parking spaces for rent', href: '/en/garages-parkings-for-rent-{city}' },
  { label: 'Realtors', href: '/en/realtors-{city}?sections=rent' },
];
```

#### Mega Menu: Daily Rental

```typescript
const dailyRentalMenu = [
  { label: 'Daily apartment rentals', href: '/en/apartments-for-daily-rent-{city}' },
  { label: 'Daily house rentals', href: '/en/houses-for-daily-rent-{city}' },
  { label: 'Realtors', href: '/en/realtors-{city}?sections=daily_rent' },
];
```

---

### 1.3 City Selector Data

```typescript
interface CitySelectorData {
  popularCities: CityOption[];
  otherCities: CityOption[];
}

interface CityOption {
  name: string;
  slug: string;
  developmentsCount?: number;
}

const cities: CitySelectorData = {
  popularCities: [
    { name: 'Tbilisi', slug: 'tbilisi', developmentsCount: 584 },
    { name: 'Batumi', slug: 'batumi', developmentsCount: 264 },
  ],
  otherCities: [
    { name: 'Bakuriani', slug: 'bakuriani', developmentsCount: 13 },
    { name: 'Bazaleti', slug: 'bazaleti', developmentsCount: 3 },
    { name: 'Borjomi', slug: 'borjomi', developmentsCount: 4 },
    { name: 'Chakvi', slug: 'chakvi' },
    { name: 'Gonio', slug: 'gonio' },
    { name: 'Gudauri', slug: 'gudauri' },
    { name: 'Kutaisi', slug: 'kutaisi' },
    { name: 'Rustavi', slug: 'rustavi' },
    { name: 'Zugdidi', slug: 'zugdidi' },
  ],
};
```

### 1.4 Language Selector Data

```typescript
const languages = [
  { code: 'ka', name: 'ქართული', flag: '🇬🇪' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
];
```

---

### 1.5 Footer Component

#### Structure

```
┌─────────────────────────────────────────────────────────────────────────┐
│ [Logo]                                                                   │
│                                                                          │
│ ┌─────────────────┐                                                      │
│ │ 🇬🇪 Georgia ▼   │  About Platform        Terms of Use                 │
│ │                 │  • Platform Worldwide  • Cookies Policy              │
│ │ Countries:      │  • Contact Us          • Privacy Policy              │
│ │ Azerbaijan      │  • Jobs [New badge]    • Application Terms           │
│ │ Georgia         │  • Buyer's Guide       • Terms of Use                │
│ │ Kazakhstan      │                                                      │
│ └─────────────────┘                                                      │
│                                                                          │
│ ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐           │
│ │ EN English ▼    │  │ [Google Play]   │  │ [App Store]     │           │
│ └─────────────────┘  └─────────────────┘  └─────────────────┘           │
│                                                                          │
│ [Instagram] [Facebook]                                                   │
│                                                                          │
│ © platform.ge 2024 — 2025                                               │
└─────────────────────────────────────────────────────────────────────────┘
```

#### Footer Links Data

```typescript
const footerData = {
  countries: [
    { name: 'Azerbaijan', url: 'https://platform.az' },
    { name: 'Georgia', url: 'https://platform.ge' },
    { name: 'Kazakhstan', url: 'https://platform.kz' },
    { name: 'Kyrgyzstan', url: 'https://platform.kg' },
    { name: 'Moldova', url: 'https://platform.md' },
    { name: 'Poland', url: 'https://platform.com.pl' },
    { name: 'Romania', url: 'https://platform.ro' },
    { name: 'UAE', url: 'https://platform.ae' },
    { name: 'Ukraine', url: 'https://platform.ua' },
    { name: 'United Kingdom', url: 'https://platform.co.uk' },
  ],
  aboutLinks: [
    { label: 'Platform in the World', href: 'https://platform.com/' },
    { label: 'Contact Platform', href: '/en/message' },
    { label: 'Platform Jobs', href: 'https://platform.com/en/sales-manager', badge: 'New' },
    { label: "Real Estate Buyer's Guide", href: '/en/guide/real-estate-investing' },
  ],
  termsLinks: [
    { label: 'The usage of cookies', href: '/cookies-policy' },
    { label: 'Privacy policy', href: '/privacy-policy' },
    { label: 'Application terms', href: '/en/application-terms' },
    { label: 'Terms of Use', href: '/terms-of-service' },
  ],
  appLinks: {
    googlePlay: 'https://play.google.com/store/apps/details?id=...',
    appStore: 'https://apps.apple.com/app/...',
  },
  socialLinks: {
    instagram: 'https://www.instagram.com/platform.ge/',
    facebook: 'https://www.facebook.com/platform.ge',
  },
};
```

---

## 1.6 Technical Specifications

### Component Library Setup

```
/components
├── /ui
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Select.tsx
│   ├── Modal.tsx
│   ├── Dropdown.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── Avatar.tsx
│   ├── Skeleton.tsx
│   └── Toast.tsx
├── /layout
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── MegaMenu.tsx
│   ├── Sidebar.tsx
│   └── PageContainer.tsx
├── /cards
│   ├── ProjectCard.tsx
│   ├── PropertyCard.tsx
│   ├── DeveloperCard.tsx
│   ├── RealtorCard.tsx
│   └── CategoryCard.tsx
└── /forms
    ├── SearchForm.tsx
    ├── FilterForm.tsx
    └── ContactForm.tsx
```

### Design Tokens

```css
:root {
  /* Colors */
  --color-primary: #FF6B00;
  --color-primary-hover: #E55F00;
  --color-secondary: #1A1A1A;
  --color-text: #333333;
  --color-text-light: #666666;
  --color-text-muted: #999999;
  --color-background: #FFFFFF;
  --color-surface: #F5F5F5;
  --color-border: #E0E0E0;
  --color-success: #10B981;
  --color-error: #EF4444;
  
  /* Typography */
  --font-family: 'Inter', -apple-system, sans-serif;
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  --font-size-2xl: 24px;
  --font-size-3xl: 30px;
  
  /* Spacing */
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-5: 20px;
  --spacing-6: 24px;
  --spacing-8: 32px;
  --spacing-10: 40px;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
}
```

---

## 1.7 Phase 1 Deliverables Checklist

- [ ] Project setup with Lovable
- [ ] Design system implementation
- [ ] Header with mega menu navigation
- [ ] Footer with all sections
- [ ] Homepage layout
- [ ] Category cards component
- [ ] Project card component
- [ ] Developer card component
- [ ] Realtor card component
- [ ] Language switcher
- [ ] City switcher
- [ ] Mobile responsive navigation
- [ ] Basic SEO setup

---

## UX Recommendations

### Components to Build

1. `Header` - Sticky navigation with mega menu
2. `MegaMenu` - Dropdown for New Projects, Sale, Rent, Daily Rental
3. `HeroSection` - Split layout with CTA
4. `CategoryCard` - Icon + Label + Count
5. `ProjectCard` - Image, title, address, price, developer, CTA buttons
6. `RealtorCard` - Avatar, name, agency, properties count, specialization
7. `DeveloperCard` - Logo, name, projects count, price range
8. `Footer` - Multi-column layout
9. `LanguageSwitcher` - Dropdown with flags
10. `CitySwitcher` - Location selector

### UX Best Practices

- ✅ Add skeleton loaders for async content
- ✅ Implement lazy loading for images
- ✅ Add smooth scroll animations
- ✅ Make category cards horizontally scrollable on mobile
- ⭐ **IMPROVEMENT**: Add search bar in hero section
- ⭐ **IMPROVEMENT**: Add featured/promoted projects section
- ⭐ **IMPROVEMENT**: Add price trend widget showing market overview
