# Component Library

## Reusable UI Components for the Platform

---

## Overview

This document defines the reusable component library for the real estate platform. Components are organized by category and include specifications for props, variants, and usage guidelines.

**Tech Stack:**
- React 18+ with TypeScript
- Tailwind CSS for styling
- Radix UI for accessible primitives
- Framer Motion for animations

---

## 1. Core Components

### 1.1 Button

```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isDisabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  children: ReactNode;
  onClick?: () => void;
}
```

**Variants:**
```
┌─────────────────────────────────────────────────────────┐
│ PRIMARY    │ [█████ Search █████]  │ Blue filled      │
│ SECONDARY  │ [░░░░░ Search ░░░░░]  │ Gray filled      │
│ OUTLINE    │ [───── Search ─────]  │ Border only      │
│ GHOST      │ [      Search      ]  │ No background    │
│ DANGER     │ [█████ Delete █████]  │ Red filled       │
└─────────────────────────────────────────────────────────┘
```

---

### 1.2 Input

```typescript
interface InputProps {
  type: 'text' | 'email' | 'password' | 'number' | 'tel';
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  isRequired?: boolean;
  isDisabled?: boolean;
  value: string;
  onChange: (value: string) => void;
}
```

**Visual States:**
- DEFAULT: Standard input
- FOCUSED: Blue border
- ERROR: Red border with error message
- DISABLED: Grayed out

---

### 1.3 Select / Dropdown

```typescript
interface SelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  isMultiple?: boolean;
  isSearchable?: boolean;
  isDisabled?: boolean;
  error?: string;
}

interface SelectOption {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}
```

---

### 1.4 Range Slider

```typescript
interface RangeSliderProps {
  label?: string;
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  formatValue?: (value: number) => string;
  showInputs?: boolean;
}
```

**Visual:**
```
┌─────────────────────────────────────────────────────────┐
│ Price Range                                             │
│ ┌──────────┐                           ┌──────────┐    │
│ │ $50,000  │                           │ $150,000 │    │
│ └──────────┘                           └──────────┘    │
│ ○────────────●═══════════════●────────────────────○    │
│ $0                                           $500,000  │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Property Components

### 2.1 PropertyCard

```typescript
interface PropertyCardProps {
  id: string;
  type: 'project' | 'listing';
  listingType?: 'sale' | 'rent' | 'daily';
  
  // Display
  title: string;
  images: string[];
  price: number;
  pricePerSqm?: number;
  currency?: string;
  
  // Details
  rooms?: number;
  area: number;
  floor?: number;
  totalFloors?: number;
  
  // Location
  district: string;
  city: string;
  
  // Meta
  isNew?: boolean;
  isFeatured?: boolean;
  isVerified?: boolean;
  completionDate?: string;
  
  // Actions
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
  onClick?: () => void;
}
```

**Listing Card Layout:**
```
┌─────────────────────────────────────────┐
│ ┌─────────────────────────────────────┐ │
│ │           PROPERTY IMAGE            │ │
│ │ [NEW]                    [♡] [📷12] │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ $85,000                    $1,307/m²   │
│ ─────────────────────────────────────── │
│ 🛏 2 rooms  •  📐 65 m²  •  🏢 5/16   │
│ 📍 Vake, Tbilisi                       │
│ ─────────────────────────────────────── │
│ 🏗 New Building  •  Owner  •  2h ago   │
└─────────────────────────────────────────┘
```

**Project Card Layout:**
```
┌─────────────────────────────────────────┐
│ ┌─────────────────────────────────────┐ │
│ │          PROJECT RENDER             │ │
│ │ [FEATURED]               [♡]        │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Archi Vashlijvari                      │
│ by Archi ✓                             │
│ ─────────────────────────────────────── │
│ From $52,000              $1,100/m²    │
│ ─────────────────────────────────────── │
│ 📐 35-150 m²  •  🏢 12-18 floors      │
│ 📍 Vashlijvari, Tbilisi                │
│ ─────────────────────────────────────── │
│ ████████████░░░░░ 68%  •  Q2 2025     │
└─────────────────────────────────────────┘
```

---

### 2.2 LayoutCard

```typescript
interface LayoutCardProps {
  id: string;
  code: string;
  floorPlan2D: string;
  floorPlan3D?: string;
  
  rooms: number;
  area: number;
  
  floorRange: { min: number; max: number };
  orientation?: string[];
  
  priceRange: { min: number; max: number };
  
  availableUnits: number;
  totalUnits: number;
  
  onClick?: () => void;
}
```

---

### 2.3 DeveloperCard

```typescript
interface DeveloperCardProps {
  id: string;
  name: string;
  slug: string;
  logo: string;
  
  isVerified: boolean;
  
  activeProjects: number;
  completedProjects: number;
  
  cities?: string[];
  
  onClick?: () => void;
}
```

**Visual:**
```
┌─────────────────────────────────────────┐
│  ┌───────────────────┐                  │
│  │       LOGO        │                  │
│  └───────────────────┘                  │
│                                         │
│  Archi                                  │
│  ✓ Verified Developer                  │
│  ─────────────────────────────────────  │
│  🏗 12 Active Projects                 │
│  ✅ 45 Completed Projects              │
│  ─────────────────────────────────────  │
│  [     View All Projects     ]          │
└─────────────────────────────────────────┘
```

---

### 2.4 AgentCard

```typescript
interface AgentCardProps {
  id: string;
  name: string;
  avatar: string;
  
  isVerified: boolean;
  rating: number;
  reviewCount: number;
  
  activeListings: number;
  totalSold: number;
  
  specializations?: string[];
  
  phone?: string;
  onContact?: () => void;
}
```

---

## 3. Filter Components

### 3.1 FilterPanel

```typescript
interface FilterPanelProps {
  filters: FilterConfig[];
  values: Record<string, any>;
  onChange: (key: string, value: any) => void;
  onReset: () => void;
  onApply: () => void;
  
  resultCount?: number;
  isLoading?: boolean;
}

interface FilterConfig {
  key: string;
  label: string;
  type: 'select' | 'multi-select' | 'range' | 'checkbox' | 'radio';
  options?: SelectOption[];
  range?: { min: number; max: number; step?: number };
  isCollapsible?: boolean;
  defaultExpanded?: boolean;
}
```

---

### 3.2 QuickFilterTags

```typescript
interface QuickFilterTagsProps {
  tags: QuickFilterTag[];
  onTagClick: (tag: QuickFilterTag) => void;
}

interface QuickFilterTag {
  id: string;
  label: string;
  filterKey: string;
  filterValue: any;
  isActive?: boolean;
}
```

**Visual:**
```
┌─────────────────────────────────────────────────────────────┐
│ [Saburtalo ✓] [Vake] [Under $100K] [2+ rooms] [New Building]│
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Navigation Components

### 4.1 Header

```typescript
interface HeaderProps {
  logo: ReactNode;
  navItems: NavItem[];
  currentCity?: string;
  currentLanguage?: string;
  onCityChange?: (city: string) => void;
  onLanguageChange?: (lang: string) => void;
  user?: User | null;
  onLogin?: () => void;
  onLogout?: () => void;
}
```

---

### 4.2 MegaMenu

```typescript
interface MegaMenuProps {
  items: MegaMenuItem[];
  isOpen: boolean;
  onClose: () => void;
}

interface MegaMenuItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  badge?: string;
  children?: MegaMenuItem[];
}
```

---

### 4.3 Breadcrumbs

```typescript
interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
}

interface BreadcrumbItem {
  label: string;
  href?: string;
}
```

---

## 5. Feedback Components

### 5.1 Toast / Notification

```typescript
interface ToastProps {
  variant: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}
```

---

### 5.2 Skeleton Loader

```typescript
interface SkeletonProps {
  variant: 'text' | 'circle' | 'rect' | 'card';
  width?: string | number;
  height?: string | number;
  count?: number;
}
```

---

### 5.3 Empty State

```typescript
interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}
```

**Visual:**
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    🏠 (Large Icon)                         │
│                                                             │
│              No properties found                            │
│                                                             │
│     Try adjusting your filters or search criteria          │
│                                                             │
│              [Clear Filters]  [New Search]                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```
