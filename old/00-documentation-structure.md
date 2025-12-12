# 🏠 Real Estate Platform - Project Overview

## Documentation Structure

```
/docs
├── 00-PROJECT-OVERVIEW.md
├── 01-PHASE-1-FOUNDATION.md
├── 02-PHASE-2-NEW-PROJECTS.md
├── 03-PHASE-3-SECONDARY-MARKET.md
├── 04-PHASE-4-USER-ACCOUNTS.md
├── 05-PHASE-5-ADMIN-PANEL.md
├── 06-PAGE-TREE-COMPLETE.md
├── 07-DATABASE-SCHEMA.md
├── 08-API-ENDPOINTS.md
├── 09-DATA-COLLECTION-GUIDE.md
├── 10-UX-RECOMMENDATIONS.md
└── 11-COMPONENT-LIBRARY.md
```

---

## Project Information

| Field | Value |
|-------|-------|
| **Project Name** | Blueprint Real Estate Platform |
| **Reference Platform** | korter.ge |
| **Target Market** | Georgia (Initially) |
| **Languages** | Georgian, English, Russian |
| **Prototype Platform** | Lovable |
| **Production Stack** | Next.js 14+, TypeScript, Tailwind CSS |

---

## Development Phases Summary

| Phase | Name | Duration | Platform | Status |
|-------|------|----------|----------|--------|
| 1 | Foundation & Core Structure | 2-3 weeks | Lovable | 🔴 Not Started |
| 2 | New Projects Module | 3-4 weeks | Lovable → Next.js | 🔴 Not Started |
| 3 | Secondary Market & Rentals | 2-3 weeks | Next.js | 🔴 Not Started |
| 4 | User Accounts & Advanced | 2-3 weeks | Next.js | 🔴 Not Started |
| 5 | Admin Panel & CMS | 3-4 weeks | Next.js | 🔴 Not Started |

---

## Core Features Overview

### 1. New Projects (Primary Market)
- Residential complexes listing
- Developer profiles
- Floor plans & layouts
- Construction progress tracking
- Mortgage calculator integration
- Cottages/townhouses

### 2. Secondary Market (Sale)
- Apartments for sale
- Houses for sale
- Commercial property
- Offices, Warehouses, Land
- Garages & parking

### 3. Rental Market
- Long-term rentals (apartments, houses)
- Daily rentals
- Commercial rentals

### 4. User Features
- User registration/login
- Favorites/saved properties
- Search history
- Property alerts
- Property listing submission

### 5. Professional Features
- Realtor profiles
- Developer profiles
- Agency management

---

## Tech Stack Details

### Prototype Phase (Lovable)
- Rapid UI prototyping
- Component library setup
- Design system validation
- User flow testing

### Production Phase (Next.js)

**Frontend:**
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Shadcn/ui components
- React Query (data fetching)
- Zustand (state management)
- React Hook Form + Zod (forms)

**Backend:**
- Next.js API Routes / Server Actions
- PostgreSQL (Supabase)
- Prisma ORM
- NextAuth.js (authentication)

**Maps:**
- Mapbox GL JS

**File Storage:**
- Supabase Storage / Cloudinary

**Deployment:**
- Vercel (frontend)
- Supabase (database)

---

## Key Metrics to Track

| Metric | Description |
|--------|-------------|
| Total Projects | Count of new development projects |
| Total Properties | Count of all property listings |
| Total Developers | Registered developer companies |
| Total Realtors | Registered real estate agents |
| Active Users | Monthly active users |
| Properties Views | Page views on property listings |
| Inquiries | Contact form submissions |

---

## Supported Cities (Initial)

| City | Priority | Projects Count (Reference) |
|------|----------|---------------------------|
| Tbilisi | High | 584 |
| Batumi | High | 264 |
| Kutaisi | Medium | 34 |
| Rustavi | Medium | 40 |
| Bakuriani | Medium | 13 |
| Gudauri | Medium | 7 |
| Borjomi | Low | 4 |
| Other cities | Low | Various |

---

## Project Team Roles

| Role | Responsibilities |
|------|-----------------|
| Project Manager | Timeline, coordination, stakeholder communication |
| UI/UX Designer | Design system, wireframes, prototypes |
| Frontend Developer | React/Next.js implementation |
| Backend Developer | API, database, integrations |
| Data Collection Intern | Property data, images, developer info |
| QA Tester | Testing, bug reporting |

---

## Success Criteria

### Phase 1 Complete When:
- [ ] Homepage functional with all sections
- [ ] Navigation working across all pages
- [ ] Mobile responsive design
- [ ] Design system documented

### Phase 2 Complete When:
- [ ] Project listing with filters working
- [ ] Project detail pages complete
- [ ] Layouts/floor plans functional
- [ ] Map integration working
- [ ] Developer profiles complete

### MVP Complete When:
- [ ] Phases 1-3 deployed
- [ ] 100+ projects listed
- [ ] 10+ developers onboarded
- [ ] Search & filters fully functional
- [ ] Mobile app-like experience

---

## Components to Build

### UI Components

| Component | Description | Priority |
|-----------|-------------|----------|
| `Button` | Primary, secondary, outline, ghost variants | Critical |
| `Input` | Text, number, search inputs | Critical |
| `Select` | Dropdown select | Critical |
| `Modal` | Dialog/modal overlay | Critical |
| `Dropdown` | Dropdown menu | Critical |
| `Card` | Base card component | Critical |
| `Badge` | Status badges | High |
| `Avatar` | User/company avatars | High |
| `Skeleton` | Loading skeletons | High |
| `Toast` | Notification toasts | Medium |
| `Tabs` | Tab navigation | Medium |
| `Tooltip` | Hover tooltips | Low |

### Layout Components

| Component | Description | Priority |
|-----------|-------------|----------|
| `Header` | Main navigation header | Critical |
| `Footer` | Page footer | Critical |
| `MegaMenu` | Navigation mega menu | Critical |
| `PageContainer` | Page wrapper | Critical |
| `Sidebar` | Sidebar layout | Medium |

### Card Components

| Component | Description | Priority |
|-----------|-------------|----------|
| `ProjectCard` | New project card | Critical |
| `PropertyCard` | Property listing card | Critical |
| `DeveloperCard` | Developer profile card | Critical |
| `RealtorCard` | Realtor profile card | High |
| `CategoryCard` | Homepage category card | High |

### Form Components

| Component | Description | Priority |
|-----------|-------------|----------|
| `SearchForm` | Global search | High |
| `FilterForm` | Listing filters | High |
| `ContactForm` | Contact/inquiry form | Medium |

---

## Design System

### Colors

```css
:root {
  /* Primary */
  --color-primary: #FF6B00;
  --color-primary-hover: #E55F00;
  --color-primary-light: #FFF4ED;
  
  /* Neutral */
  --color-white: #FFFFFF;
  --color-gray-50: #F9FAFB;
  --color-gray-100: #F3F4F6;
  --color-gray-200: #E5E7EB;
  --color-gray-300: #D1D5DB;
  --color-gray-400: #9CA3AF;
  --color-gray-500: #6B7280;
  --color-gray-600: #4B5563;
  --color-gray-700: #374151;
  --color-gray-800: #1F2937;
  --color-gray-900: #111827;
  --color-black: #000000;
  
  /* Semantic */
  --color-success: #10B981;
  --color-success-light: #D1FAE5;
  --color-warning: #F59E0B;
  --color-warning-light: #FEF3C7;
  --color-error: #EF4444;
  --color-error-light: #FEE2E2;
  --color-info: #3B82F6;
  --color-info-light: #DBEAFE;
}
```

### Typography

```css
:root {
  /* Font Family */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  /* Font Sizes */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  
  /* Font Weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}
```

### Spacing

```css
:root {
  --space-0: 0;
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
}
```

### Border Radius

```css
:root {
  --radius-none: 0;
  --radius-sm: 0.25rem;   /* 4px */
  --radius-md: 0.5rem;    /* 8px */
  --radius-lg: 0.75rem;   /* 12px */
  --radius-xl: 1rem;      /* 16px */
  --radius-2xl: 1.5rem;   /* 24px */
  --radius-full: 9999px;
}
```

### Shadows

```css
:root {
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}
```

---

## Breakpoints

```css
/* Mobile First Approach */
--screen-sm: 640px;   /* Small devices */
--screen-md: 768px;   /* Medium devices */
--screen-lg: 1024px;  /* Large devices */
--screen-xl: 1280px;  /* Extra large */
--screen-2xl: 1536px; /* 2X Extra large */
```

---

## UX Recommendations

### Improvements Over Reference (korter.ge)

| Area | Current (korter.ge) | Recommendation |
|------|---------------------|----------------|
| Hero Search | No search in hero | Add prominent search bar in hero section |
| Featured Properties | Basic project list | Add "Featured" or "Hot deals" section |
| Market Overview | None | Add price trend widget/infographic |
| Social Proof | Limited | Add testimonials or success stories |
| Quick Actions | Basic | Add floating "Contact us" button |
| Loading States | Basic | Implement skeleton loaders everywhere |
| Animations | Minimal | Add subtle scroll animations |
| Dark Mode | Not available | Consider dark mode support |

### Mobile-Specific Improvements

1. **Sticky CTA**: Add sticky "Search" or "Filter" button on mobile
2. **Bottom Navigation**: Consider bottom tab bar for key actions
3. **Pull to Refresh**: Implement for listing pages
4. **Swipe Gestures**: Enable swipe on cards for quick actions
5. **Haptic Feedback**: Add for button presses (if PWA)
