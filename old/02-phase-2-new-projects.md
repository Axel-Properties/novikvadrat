# 📦 Phase 2: New Projects Module

## Overview

| Attribute | Value |
|-----------|-------|
| **Duration** | 3-4 weeks |
| **Platform** | Lovable → Next.js |
| **Priority** | Critical |
| **Dependencies** | Phase 1 |

---

## Objectives

1. ✅ Build new projects listing with advanced filters
2. ✅ Create project detail pages with all tabs
3. ✅ Implement floor plans/layouts module
4. ✅ Build construction progress tracking
5. ✅ Create developer profiles
6. ✅ Integrate map functionality
7. ✅ Build mortgage calculator

---

## Pages to Build

### 2.1 New Projects Listing Page

**Route:** `/en/new-projects-in-{city}`

**Alternative Routes (filtered):**
```
/en/new-projects-{city}-{district}-district
/en/new-projects-in-{microdistrict}
/en/new-projects-{city}-metro-{station}
/en/new-projects-{city}-installment
/en/finished-new-projects-{city}
/en/new-projects-{city}-ready-in-{year}
/en/new-projects-{city}-black-frame
/en/new-projects-{city}-white-frame
/en/new-projects-{city}-green-frame
```

#### Page Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│ HEADER                                                               │
├─────────────────────────────────────────────────────────────────────┤
│ PAGE TITLE SECTION                                                   │
│ "New residential complexes in {City}"                               │
├─────────────────────────────────────────────────────────────────────┤
│ FILTER BAR                                                           │
│ ┌──────────────────────┬──────────────┬────────────────────┐        │
│ │ 📍 Districts,        │ ⚙️ Filters   │ 🗺️ Projects on map │        │
│ │ microdistricts and   │              │                    │        │
│ │ subway               │              │                    │        │
│ └──────────────────────┴──────────────┴────────────────────┘        │
├─────────────────────────────────────────────────────────────────────┤
│ QUICK FILTER TAGS (Horizontal Scroll)                               │
│ [Saburtalo] [Vake] [Gldani] [...] [Installment] [2025] [...]        │
├─────────────────────────────────────────────────────────────────────┤
│ RESULTS HEADER                                                       │
│ "{count} developments"              Sort: recommended by Korter ▼   │
├─────────────────────────────────────────────────────────────────────┤
│ PROJECT CARDS GRID                                                   │
│ ┌────────────┬────────────┬────────────┬────────────┐              │
│ │ Project 1  │ Project 2  │ Project 3  │ Project 4  │              │
│ └────────────┴────────────┴────────────┴────────────┘              │
│ (20 items per page)                                                 │
├─────────────────────────────────────────────────────────────────────┤
│ PAGINATION                                                           │
│ [◄] [1] [2] [3] [4] [5] ... [30] [►]                               │
├─────────────────────────────────────────────────────────────────────┤
│ FOOTER                                                               │
└─────────────────────────────────────────────────────────────────────┘
```

---

### Filter Modal Interface

```typescript
interface ProjectFilters {
  // Price
  priceType: 'total' | 'per_sqm';
  currency: 'GEL' | 'USD';
  priceMin: number | null;
  priceMax: number | null;
  
  // Rooms
  rooms: ('studio' | '1' | '2' | '3' | '4+')[];
  
  // Area
  areaMin: number | null;
  areaMax: number | null;
  
  // Completion
  completion: ('finished' | '2025' | '2026' | '2027+')[];
  
  // Purchase terms
  purchaseTerms: ('mortgage_tbc' | 'mortgage' | 'installment')[];
  
  // Type of repair
  repairType: ('black_frame' | 'white_frame' | 'green_frame' | 'furnished')[];
  
  // Infrastructure
  infrastructure: ('pool' | 'commercial' | 'gym')[];
  
  // Location
  districts: string[];
  microdistricts: string[];
  metroStations: string[];
}
```

---

### Location Data

#### Tbilisi Districts
```typescript
const tbilisiDistricts = [
  { slug: 'saburtalo-district', name: 'Saburtalo' },
  { slug: 'vake-district', name: 'Vake' },
  { slug: 'gldani-district', name: 'Gldani' },
  { slug: 'didube-district', name: 'Didube' },
  { slug: 'chugureti-district', name: 'Chugureti' },
  { slug: 'isani-district', name: 'Isani' },
  { slug: 'krtsanisi-district', name: 'Krtsanisi' },
  { slug: 'mtatsminda-district', name: 'Mtatsminda' },
  { slug: 'samgori-district', name: 'Samgori' },
  { slug: 'nadzaladevi-district', name: 'Nadzaladevi' },
];
```

#### Tbilisi Microdistricts
```typescript
const tbilisiMicrodistricts = [
  { slug: 'didi-dighomi', name: 'Didi Dighomi', district: 'saburtalo' },
  { slug: 'vashlijvari', name: 'Vashlijvari', district: 'saburtalo' },
  { slug: 'bagebi', name: 'Bagebi', district: 'vake' },
  { slug: 'mukhiani', name: 'Mukhiani', district: 'gldani' },
  { slug: 'avchala', name: 'Avchala', district: 'gldani' },
  { slug: 'digomi', name: 'Digomi', district: 'didube' },
  { slug: 'vazisubani', name: 'Vazisubani', district: 'isani' },
  { slug: 'avlabari', name: 'Avlabari', district: 'isani' },
  { slug: 'vera', name: 'Vera', district: 'mtatsminda' },
  { slug: 'sololaki', name: 'Sololaki', district: 'mtatsminda' },
];
```

#### Tbilisi Metro Stations
```typescript
const tbilisiMetroStations = [
  { slug: 'metro-rustaveli', name: 'Rustaveli' },
  { slug: 'metro-tavisuplebis-moedani', name: 'Tavisuplebis Moedani' },
  { slug: 'metro-marjanishvili', name: 'Marjanishvili' },
  { slug: 'metro-didube', name: 'Didube' },
  { slug: 'metro-avlabari', name: 'Avlabari' },
  { slug: 'metro-samgori', name: 'Samgori' },
  { slug: 'metro-varketili', name: 'Varketili' },
  { slug: 'metro-delisi', name: 'Delisi' },
  { slug: 'metro-vazha-pshavela', name: 'Vazha-Pshavela' },
  { slug: 'metro-state-university', name: 'State University' },
];
```

---

### Sorting Options

```typescript
const sortingOptions = [
  { value: 'recommended', label: 'recommended by Platform' },
  { value: 'price_asc', label: 'price: low to high' },
  { value: 'price_desc', label: 'price: high to low' },
  { value: 'newest', label: 'newest first' },
  { value: 'completion', label: 'completion date' },
];
```

---

### Project Card Component

```typescript
interface ProjectCardProps {
  id: string;
  slug: string;
  name: string;
  images: string[];
  address: string;
  district: string;
  city: string;
  priceFrom: number | null;
  pricePerSqm: number | null;
  developer: {
    id: string;
    name: string;
    slug: string;
  };
  status: 'under_construction' | 'completed';
  completionDate: string | null;
  hasLayouts: boolean;
}
```

**Card Layout:**
```
┌─────────────────────────────────────────┐
│ [■■] (Layout indicator if hasLayouts)   │
│                                         │
│         [Project Image]                 │
│                                         │
│                                    [❤️] │
├─────────────────────────────────────────┤
│ Project Name                            │
│ Address                                 │
│ District                                │
├─────────────────────────────────────────┤
│ from $XX,XXX       $X,XXX per m²        │
├─────────────────────────────────────────┤
│ Developer Name                          │
│ [Show phone]      [Get consultation]    │
└─────────────────────────────────────────┘
```

---

## 2.2 Project Detail Page

**Route:** `/en/{project-slug}-{city}`

### Page Structure

```
┌─────────────────────────────────────────────────────────────────────┐
│ HEADER                                                               │
├─────────────────────────────────────────────────────────────────────┤
│ BREADCRUMB                                                           │
│ Home > New projects Tbilisi > District                              │
├─────────────────────────────────────────────────────────────────────┤
│ HERO SECTION (Split Layout)                                          │
│ ┌─────────────────────────┬─────────────────────────────────────────┤
│ │                         │ Project Name              [↗️][❤️]      │
│ │    IMAGE GALLERY        │ City                                    │
│ │    (Main + Thumbnails)  │ Address                                 │
│ │                         │                                         │
│ │                         │ 🔄 1 house under construction,          │
│ │                         │    next delivery in Q2 2027             │
│ │                         │                                         │
│ │    ◄ 1/12 ►            │ Price per m²: from $1,215               │
│ │                         │ Developer: [Archi]                      │
│ │                         │                                         │
│ │                         │ [📞 Show number] [📝 Fill out app]      │
│ └─────────────────────────┴─────────────────────────────────────────┤
├─────────────────────────────────────────────────────────────────────┤
│ TAB NAVIGATION (Sticky on scroll)                                   │
│ [Layouts & prices] [On map] [Documents] [Progress] [Mortgage]       │
├─────────────────────────────────────────────────────────────────────┤
│ LAYOUTS AND PRICES SECTION                                          │
│ ┌─────────────┬─────────────┬─────────────┐                        │
│ │ 2-room      │ 3-room      │ 4-room      │                        │
│ │ 51.3-55 m²  │ 55.7-80.6m² │ 95.5 m²     │                        │
│ │ [3D Image]  │ [3D Image]  │ [3D Image]  │                        │
│ └─────────────┴─────────────┴─────────────┘                        │
├─────────────────────────────────────────────────────────────────────┤
│ FOOTER                                                               │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2.3 Developer Profile Page

**Route:** `/en/{developer-slug}`

### Page Structure

```
┌─────────────────────────────────────────────────────────────────────┐
│ HEADER                                                               │
├─────────────────────────────────────────────────────────────────────┤
│ DEVELOPER HEADER                                                     │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ [LOGO]  Developer Name                               [Website]  │ │
│ │         ✓ Verified Developer                                    │ │
│ │                                                                 │ │
│ │ 🏗️ 12 Active Projects  |  ✅ 45 Completed  |  📍 Tbilisi, Batumi│ │
│ └─────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────┤
│ TABS                                                                 │
│ [Active Projects] [Completed Projects] [About]                      │
├─────────────────────────────────────────────────────────────────────┤
│ PROJECT CARDS GRID                                                   │
│ ┌────────────┬────────────┬────────────┬────────────┐              │
│ │ Project 1  │ Project 2  │ Project 3  │ Project 4  │              │
│ └────────────┴────────────┴────────────┴────────────┘              │
├─────────────────────────────────────────────────────────────────────┤
│ FOOTER                                                               │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Phase 2 Deliverables Checklist

- [ ] New projects listing page with filters
- [ ] Project card component
- [ ] Filter modal with all options
- [ ] Location filter (districts, microdistricts, metro)
- [ ] Project detail page
- [ ] Layout cards component
- [ ] Construction progress timeline
- [ ] Developer profile page
- [ ] Map integration (Mapbox)
- [ ] Mortgage calculator widget
- [ ] Mobile responsive design
- [ ] URL structure implementation
