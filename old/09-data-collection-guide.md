# Data Collection Guide: Serbia Market

## Instructions for Interns & Data Operations Team

## Overview

This guide provides step-by-step instructions for collecting and entering real estate data specifically for the **Serbian market**. The primary focus is on **New Developments (Novogradnja)**. Follow these guidelines carefully to ensure data quality, especially regarding verifying legal status via Katastar (GeoSrbija) where possible.

---

## 1. City & Location Data

### 1.1 Cities Collection

**Source:** Official Statistical Office of the Republic of Serbia, Google Maps

**Fields to Collect:**

| Field | Description | Example |
|-------|-------------|---------|
| name_en | English name | Belgrade |
| name_sr_lat | Serbian (Latin) | Beograd |
| name_sr_cyr | Serbian (Cyrillic) | Београд |
| slug | URL-friendly | beograd |
| latitude | Center GPS | 44.7866 |
| longitude | Center GPS | 20.4489 |

**Priority Cities:**

1. **Belgrade** (Capital - High Priority)
2. **Novi Sad** (Tech/Cultural Hub - High Priority)
3. **Niš** (South Serbia Hub - Medium Priority)
4. **Kragujevac** (Industrial Hub - Medium Priority)
5. **Zlatibor/Kopaonik** (Tourist/Investment Hubs - Seasonal Priority)

**Data Entry Template:**

```csv
name_en,name_sr_lat,name_sr_cyr,slug,latitude,longitude
Belgrade,Beograd,Београд,beograd,44.7866,20.4489
Novi Sad,Novi Sad,Нови Сад,novi-sad,45.2671,19.8335
```

### 1.2 Municipalities & Neighborhoods (Opštine i Naselja)

**Context:** In Belgrade, "City Districts" are technically "Municipalities" (Opštine). Within Opštine, there are Neighborhoods (Naselja). 

*Example:* Municipality: *Novi Beograd*, Neighborhood: *Belville* or *Blok 65*.

**Source:** GeoSrbija (Katastar), Google Maps, CityExpert reference

**Fields to Collect:**

| Field | Description | Example |
|-------|-------------|---------|
| city | Parent city | Belgrade |
| name_en | English name | Vracar |
| name_sr | Serbian name | Vračar |
| type | Municipality/Neighborhood | Municipality |
| parent | Parent Municipality | (if Neighborhood) |

**Belgrade Municipalities (Priority Order):**

1. **Stari Grad** (Historical Center)
2. **Vračar** (Premium/Historical)
3. **Savski Venac** (Belgrade Waterfront Area - **Critical**)
4. **Novi Beograd** (Business Hub - **Critical**)
5. **Zvezdara** (Residential)
6. **Voždovac** (Mixed)
7. **Zemun** (Historical/Residential)
8. **Palilula** (Developing)
9. **Čukarica** (Banovo Brdo)

**Sub-districts Example (Novi Beograd):**

```
Novi Beograd (Municipality)
├── Blok 65 (West 65, Airport City area)
├── Savski Blokovi
├── Bežanijska Kosa
├── Belville
└── Ušće
```

---

## 2. Developer Data Collection

### 2.1 Developer Profile Data

**Source:** Company websites, APR (Serbian Business Registers Agency), 4zida, Halo Oglasi.

**Required Fields:**

| Field | Required | Description | How to Find |
|-------|----------|-------------|-------------|
| name | ✓ | Company name | Official website, APR |
| slug | ✓ | URL-friendly name | Create from name |
| logo_url | ✓ | Company logo | Website, LinkedIn |
| description | ✓ | About company | Website "O nama" page |
| pib | ○ | Tax ID (PIB) | Validating legitimate businesses |
| website | ○ | Official website | Google search |
| email | ○ | Contact email | "Kontakt" page |
| phone | ○ | Contact phone | "Kontakt" page |

**Developer Data Template:**

```json
{
  "name": "Galens Invest",
  "slug": "galens-invest",
  "pib": "101234567",
  "description": "Jedna od vodećih građevinskih firmi u Srbiji...",
  "website": "https://galens.rs",
  "founded_year": 2004,
  "social": {
    "instagram": "https://instagram.com/galensinvest"
  }
}
```

### 2.2 Developer List (Serbia Priority)

**Top Developers to Collect First:**

| # | Developer | Major Projects | Priority |
|---|-----------|----------------|----------|
| 1 | **Eagle Hills (Belgrade Waterfront)** | Belgrade Waterfront | **Critical** |
| 2 | **AFI Europe Serbia** | Skyline, Airport City | **High** |
| 3 | **Galens Invest** | Pupin's Palace, NS Projects | **High** |
| 4 | **Merin Holdings** | Kennedy Residence, Tri Nove | **High** |
| 5 | **MPC Properties** | Ušće Towers, Navigator | **High** |
| 6 | **Energoprojekt** | Park 11, Sunnyville | **High** |
| 7 | **PSP Farman** | West 65, West Tower | **High** |
| 8 | **Zoned** | Zoned Panorama | Medium |
| 9 | **Shikun & Binui** | Wellport, Voždove Kapije | Medium |
| 10 | **Elixir Group** | Residential projects | Medium |
| 11 | **Granit Invest** | Various | Medium |
| 12 | **Karin Komerc** | Novi Sad projects | Medium |
| 13 | **Greda** | Valjevo/Belgrade | Low |
| 14 | **Exing B&P** | Residential | Low |
| 15 | **Dijagoninvest** | Novi Sad | Low |

---

## 3. Project Data Collection

### 3.1 Project Basic Information

**Source:** Developer websites, Halo Oglasi, 4zida, City Expert, Sasomange.

**Crucial Adaptation for Serbia:**

- **Currency:** Always collect prices in **EUR (€)**. Real estate in Serbia is advertised and traded in Euros, even though the official currency is RSD.
- **Heating Type:** Important in Serbia (Centralno, Etažno, Gas, Toplotne pumpe).

**Required Fields:**

| Field | Required | Description |
|-------|----------|-------------|
| name | ✓ | Project name (e.g., "Skyline Belgrade") |
| developer | ✓ | Developer company |
| city | ✓ | e.g., Belgrade |
| municipality | ✓ | e.g., Savski Venac |
| street | ✓ | Street name |
| heating_type | ✓ | CG (Central), EG (Electric), Gas |
| construction_status | ✓ | u izgradnji (under const), useljivo (ready) |
| completion_date | ○ | Planirani rok završetka |

### 3.2 Pricing Information (EUR)

**Note:** Prices in Serbia often include VAT (PDV) of 10% for new apartments. Always check if the price is "sa PDV-om" (with VAT) or "bez PDV-a" (without VAT).

| Field | Description | Example |
|-------|-------------|---------|
| price_min | Minimum unit price | 150000 |
| price_sqm_min | Min price per m² | 2500 |
| price_sqm_max | Max price per m² | 4200 |
| vat_included | Is VAT included? | true/false |

### 3.3 Features & Amenities (Serbian Context)

**Standard Amenities Checklist:**

**Building:**
- [ ] Recepcija / Concierge (Reception)
- [ ] Video Nadzor (CCTV/Security)
- [ ] Podzemna Garaža (Underground Parking)
- [ ] Lift (Elevator)
- [ ] Smart Home Sistem
- [ ] Energetski Pasoš (Energy Passport)

**Outdoor:**
- [ ] Dečije igralište (Playground)
- [ ] Privatni park (Private park)
- [ ] Teretana (Gym)
- [ ] Bazen (Pool - rare, but premium)

### 3.4 Project Images Collection

**Source:** Developer Website > "Galerija" or "Napredak Radova".

**Naming:** `project-slug-type-number.jpg` (e.g., `bw-terra-facade-01.jpg`)

---

## 4. Layout Data (Struktura Stanova)

### 4.1 Layout Basic Information

In Serbia, apartment types are defined by the number of rooms (sobe).

- **Garsonjera:** Studio
- **Jednosoban:** 1 Room (Living/Bedroom combined or separate kitchen)
- **Dvosoban:** 2 Rooms (1 Living + 1 Bedroom)
- **Trosoban:** 3 Rooms (1 Living + 2 Bedrooms)

**Fields to Collect:**

| Field | Description | Example |
|-------|-------------|---------|
| code | Layout ID | Tip A |
| type_sr | Local type name | Dvoiposoban (2.5 rooms) |
| bedrooms | Sleeping rooms | 2 |
| bathrooms | Kupatila | 1 |
| terrace | Has terrace? | Yes |
| total_area | Kvadrature (m²) | 65.5 |

### 4.2 Room Breakdown (Prostorije)

**Example JSON:**

```json
{
  "layout_code": "Tip-C",
  "type_sr": "Trosoban",
  "rooms": [
    { "name": "Dnevna soba", "type": "living_room", "area": 22.5 },
    { "name": "Spavaća soba 1", "type": "bedroom", "area": 14.8 },
    { "name": "Kuhinja", "type": "kitchen", "area": 12.3 },
    { "name": "Kupatilo", "type": "bathroom", "area": 4.5 },
    { "name": "Terasa", "type": "terrace", "area": 5.2 }
  ],
  "total_area": 65.5
}
```

---

## 5. Data Sources & Tools (Serbia Specific)

### 5.1 Primary Sources (Portals)

| Source | URL | Use For |
|--------|-----|---------|
| **Halo Oglasi** | halooglasi.com/nekretnine | Listings, prices per m² |
| **4zida** | 4zida.rs | New projects (Novogradnja section) |
| **City Expert** | cityexpert.rs | Verified floor plans, 360 views |
| **Sasomange** | sasomange.rs | Secondary validation |
| **Beobuild** | beobuild.rs | Construction progress news/photos |

### 5.2 Verification Tools

| Tool | URL | Use For |
|------|-----|---------|
| **GeoSrbija (Katastar)** | geosrbija.rs | Verifying lot numbers, building outlines |
| **APR** | apr.gov.rs | Verifying developer company status |
| **Google Street View** | maps.google.com | Checking actual location surroundings |

---

## 6. Intern Workflow (Dnevni Raspored)

### 6.1 The "Search & Verify" Loop

1. **Select a Project:** Take a project from the "To-Do" list (e.g., "Kennedy Residence").
2. **Find Official Source:** Go to the developer's official website first.
3. **Cross-Reference:** Search the project name on *Halo Oglasi* or *4zida* to see current asking prices.
4. **Extract Images:** Download high-res renders. Do NOT download images with "Halo Oglasi" watermarks.
5. **Enter Data:** Fill in the spreadsheet.
6. **Flag Uncertainties:** If price includes VAT or not is unclear, mark column `check_vat`.

### 6.2 Common Serbian Real Estate Terms (Glossary)

- **Novogradnja:** New Construction
- **U izgradnji:** Under construction
- **Useljivo:** Ready to move in
- **Povraćaj PDV-a:** VAT Refund (important note for first-time buyers, mention in description if applicable)
- **Siva faza:** Grey phase (unfinished interior)
- **Ključ u ruke:** Turnkey (finished)

---

## 7. Reporting

### 7.1 Daily Report

Submit via Slack/Email by 17:00.

```
DATUM: 2023-10-27
COLLECTOR: [Vaše Ime]

UNETO DANAS:
- Projekti: [Broj] (npr. Belgrade Waterfront - Terra, Verde)
- Stanovi: [Broj]
- Slike: [Broj]

PROBLEMI:
- Ne mogu da nađem cene za projekat [Ime]
- Sajt investitora [Ime] ne radi

PLAN ZA SUTRA:
- Završetak unosa za opštinu Vračar
```
