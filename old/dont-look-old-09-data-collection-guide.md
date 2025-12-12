# Data Collection Guide

## Instructions for Interns & Data Entry Team

---

## Overview

This guide provides step-by-step instructions for collecting and entering data into the real estate platform. Follow these guidelines carefully to ensure data quality and consistency.

---

## 1. City & Location Data

### 1.1 Cities Collection

**Source:** Official Georgian government data, Google Maps

**Fields to Collect:**
| Field | Description | Example |
|-------|-------------|---------|
| name_en | English name | Tbilisi |
| name_ka | Georgian name | თბილისი |
| name_ru | Russian name | Тбилиси |
| slug | URL-friendly | tbilisi |
| latitude | GPS coordinate | 41.7151 |
| longitude | GPS coordinate | 44.8271 |

**Priority Cities:**
1. Tbilisi (Capital - highest priority)
2. Batumi (Tourist hub)
3. Kutaisi (Third largest)
4. Rustavi (Industrial)

**Data Entry Template:**
```csv
name_en,name_ka,name_ru,slug,latitude,longitude
Tbilisi,თბილისი,Тбилиси,tbilisi,41.7151,44.8271
Batumi,ბათუმი,Батуми,batumi,41.6168,41.6367
```

---

### 1.2 Districts Collection

**Source:** Municipal data, Google Maps, korter.ge reference

**Fields to Collect:**
| Field | Description | Example |
|-------|-------------|---------|
| city | Parent city | Tbilisi |
| name_en | English name | Vake |
| name_ka | Georgian name | ვაკე |
| slug | URL-friendly | vake |
| latitude | Center point | 41.7089 |
| longitude | Center point | 44.7456 |

**Tbilisi Districts (Priority Order):**
```
1. Vake (ვაკე) - Premium residential
2. Saburtalo (საბურთალო) - Mixed residential/commercial
3. Vera (ვერა) - Central, historic
4. Mtatsminda (მთაწმინდა) - Central, tourist
5. Old Tbilisi (ძველი თბილისი) - Historic center
6. Dighomi (დიღომი) - New developments
7. Gldani (გლდანი) - Residential
8. Nadzaladevi (ნაძალადევი) - Mixed
9. Isani (ისანი) - Developing
10. Samgori (სამგორი) - Industrial/residential
```

**Sub-districts Example (Vake):**
```
Vake
├── Vake Park Area
├── Bagebi
├── Vashlijvari
├── Nutsubidze Plateau
└── Tkhinvali
```

---

### 1.3 Metro Stations Collection

**Source:** Tbilisi Metro official, Google Maps

**Tbilisi Metro Stations:**
```
AKHMETELI-VARKETILI LINE (Red):
1. Akhmeteli Theatre
2. Sarajishvili
3. Guramishvili
4. Grmagele
5. Didube
6. Gotsiridze
7. Nadzaladevi
8. Station Square
9. Marjanishvili
10. Rustaveli
11. Freedom Square
12. Avlabari
13. 300 Aragveli
14. Isani
15. Samgori
16. Varketili

SABURTALO LINE (Blue):
- Medical University
- Delisi
- Vazha-Pshavela
- State University
```

---

## 2. Developer Data Collection

### 2.1 Developer Profile Data

**Required Fields:**
| Field | Required | Description |
|-------|----------|-------------|
| name | ✓ | Company name |
| slug | ✓ | URL-friendly name |
| logo_url | ✓ | Company logo |
| description | ✓ | About company |
| website | ○ | Official website |
| email | ○ | Contact email |
| phone | ○ | Contact phone |

**Quality Checklist:**
- [ ] Logo is high-resolution (min 200x200px)
- [ ] Description is at least 100 words
- [ ] All URLs are valid and working
- [ ] Phone number includes country code (+995)

**Top 20 Developers to Collect First:**

| # | Developer | Projects | Priority |
|---|-----------|----------|----------|
| 1 | Archi | 50+ | High |
| 2 | m² Group | 40+ | High |
| 3 | Axis | 30+ | High |
| 4 | Biltmore | 15+ | High |
| 5 | Crystal | 20+ | High |
| 6 | Redix | 25+ | High |
| 7 | Lisi Development | 20+ | High |
| 8 | Dirsi | 15+ | Medium |
| 9 | Ornament | 12+ | Medium |
| 10 | iCo | 10+ | Medium |

---

## 3. Project Data Collection

### 3.1 Project Basic Information

**Required Fields:**
| Field | Required | Description |
|-------|----------|-------------|
| name | ✓ | Project name |
| developer | ✓ | Developer company |
| city | ✓ | City location |
| district | ✓ | District/neighborhood |
| address | ✓ | Street address |
| latitude | ✓ | GPS coordinate |
| longitude | ✓ | GPS coordinate |
| project_type | ✓ | residential/commercial/mixed |
| construction_status | ✓ | Status |
| completion_percentage | ✓ | 0-100 |

**How to Get GPS Coordinates:**
1. Go to Google Maps
2. Search for the project or address
3. Right-click on the exact location
4. Click on the coordinates to copy
5. Format: latitude, longitude (e.g., 41.7151, 44.8271)

### 3.2 Project Pricing Information

| Field | Description | Example |
|-------|-------------|---------|
| price_min | Minimum apartment price | 45000 |
| price_max | Maximum apartment price | 350000 |
| price_per_sqm_min | Min price per m² | 1100 |
| price_per_sqm_max | Max price per m² | 1800 |
| currency | Price currency | USD |

### 3.3 Project Amenities Checklist

```
BUILDING AMENITIES:
[ ] Swimming Pool (Indoor)
[ ] Swimming Pool (Outdoor)
[ ] Fitness Center / Gym
[ ] Spa / Sauna
[ ] Underground Parking
[ ] Ground Parking
[ ] 24/7 Security
[ ] Concierge Service
[ ] Lobby
[ ] Elevator(s)
[ ] Commercial Space

OUTDOOR AMENITIES:
[ ] Children's Playground
[ ] Garden / Green Space
[ ] BBQ Area
[ ] Tennis Court
[ ] Basketball Court
[ ] Walking Paths
```

### 3.4 Project Images

**Required Images:**
1. Main Facade - REQUIRED
2. Aerial/Drone View - REQUIRED
3. Lobby/Entrance - REQUIRED
4. Amenities - If available
5. Sample Interiors - Minimum 3
6. Construction Progress - For under-construction

**Image Requirements:**
- Minimum resolution: 1200x800 pixels
- Format: JPG or PNG
- File size: Under 2MB each
- No watermarks from other platforms

---

## 4. Layout Data Collection

### 4.1 Layout Basic Information

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| code | ✓ | Layout identifier | A-12, B-03 |
| rooms | ✓ | Total rooms | 2 |
| bedrooms | ○ | Number of bedrooms | 1 |
| bathrooms | ✓ | Number of bathrooms | 1 |
| total_area | ✓ | Total area in m² | 65.5 |
| living_area | ○ | Living area in m² | 48.2 |
| kitchen_area | ○ | Kitchen area in m² | 12.3 |
| balcony_area | ○ | Balcony area in m² | 5.0 |

### 4.2 Floor Plan Images

**Required for each layout:**
1. 2D Floor Plan (PNG/JPG) - REQUIRED
2. 3D Floor Plan (if available)

**Quality Requirements:**
- Clean, readable dimensions
- Room labels visible
- Minimum 800x600 pixels

---

## 5. Quality Checklist

Before submitting any entry, verify:

**Project Entry:**
- [ ] All required fields filled
- [ ] GPS coordinates verified on map
- [ ] Prices in correct currency
- [ ] At least 5 images uploaded
- [ ] Developer correctly linked
- [ ] District correctly assigned

**Layout Entry:**
- [ ] Layout code is unique within project
- [ ] Total area equals sum of room areas (±1m²)
- [ ] Floor plan image is clear and readable

**Unit Entry:**
- [ ] Unit number format is consistent
- [ ] Floor number is valid for building
- [ ] Price matches layout price range
- [ ] Status is current

---

## 6. Data Sources

| Source | URL | Data Available |
|--------|-----|----------------|
| korter.ge | https://korter.ge | Projects, layouts, prices |
| myhome.ge | https://myhome.ge | Secondary listings |
| ss.ge | https://ss.ge | Secondary listings |
| Developer websites | Various | Official project data |
| Google Maps | maps.google.com | GPS coordinates |
