# 📋 Data Collection Guide for Interns (English)

> **Welcome!** This guide will help you collect real estate data for the Serbian market. Please read it carefully before starting your work.

---

## 📥 Downloads

Before you begin, download these resources:

- **[⬇️ Download Excel Template](/downloads/serbia_data_collection.xlsx)** - Data entry spreadsheet
- **[🖨️ Print This Guide as PDF](/print-guide-en)** - Open and use browser's Print/Save as PDF

---

## 🎯 Your Goal

Your job is to find information about **new residential buildings** (called "Novogradnja" in Serbian) and enter it into our system. This includes:

- Information about **cities and neighborhoods**
- Information about **developers** (companies that build buildings)
- Information about **projects** (the buildings themselves)
- Information about **apartments** (individual units for sale)

---

## 📍 Step 1: Collect City & Location Data

### What to collect:

| Field | Example | Where to Find |
|-------|---------|---------------|
| City Name (English) | Belgrade | Google Maps |
| City Name (Serbian Latin) | Beograd | Serbian websites |
| City Name (Serbian Cyrillic) | Београд | Serbian websites |
| Municipality Name | Novi Beograd | City websites |
| Neighborhood Name | Blok 67 | Local knowledge, maps |
| GPS Coordinates | 44.8176, 20.4633 | Google Maps (right-click → coordinates) |

### How to get GPS coordinates:

1. Open Google Maps
2. Find the location
3. Right-click on the exact spot
4. Click on the coordinates that appear
5. They will be copied to your clipboard

---

## 🏢 Step 2: Collect Developer Information

### What to collect:

| Field | Example | Where to Find |
|-------|---------|---------------|
| Company Name | MPC Properties | Developer's website |
| Logo | (image file) | Developer's website |
| Description | Leading construction company... | About Us page |
| Website | www.mpcproperties.rs | Google search |
| Phone | +381 11 123 4567 | Contact page |
| Email | info@mpcproperties.rs | Contact page |
| Address | Bulevar Mihajla Pupina 10 | Contact page |

### Priority Developers to Research:

1. MPC Properties
2. PSP Farman
3. Galens
4. Coreside / A Blok
5. BIG CEE
6. Delta Real Estate
7. Đuro Đaković
8. Fidelinka

---

## 🏗️ Step 3: Collect Project Information

### Basic Information:

| Field | Example | Notes |
|-------|---------|-------|
| Project Name | Skyline Belgrade | Official project name |
| Developer | MPC Properties | From Step 2 |
| Location | Novi Beograd, Blok 67 | Full address |
| Status | Under Construction | See status options below |
| Completion Date | December 2025 | Expected completion |
| Number of Buildings | 3 | Total buildings in project |
| Number of Floors | 12 | Per building |
| Total Units | 450 | All apartments |

### Project Status Options:

- **Announced** - Just announced, not started
- **Pre-sale** - Selling before construction
- **Under Construction** - Currently being built
- **Completed** - Finished and ready

### Pricing Information:

| Field | Example | Notes |
|-------|---------|-------|
| Price per m² | 2,500 EUR | Always in EUR |
| Minimum Price | 75,000 EUR | Cheapest apartment |
| Maximum Price | 350,000 EUR | Most expensive apartment |
| VAT Included | Yes/No | Ask developer |

### Amenities (Check all that apply):

- ☐ Parking (underground/above ground)
- ☐ Storage units
- ☐ Elevator
- ☐ Security/Concierge
- ☐ Fitness room
- ☐ Swimming pool
- ☐ Children's playground
- ☐ Green spaces/Garden
- ☐ Commercial spaces
- ☐ Bicycle storage

---

## 🏠 Step 4: Collect Apartment Layout Data

### For each apartment type, collect:

| Field | Example | Notes |
|-------|---------|-------|
| Layout Type | Two-bedroom | See types below |
| Area (m²) | 65.5 | Net living area |
| Rooms | 2 | Number of rooms |
| Bedrooms | 2 | Separate bedrooms |
| Bathrooms | 1 | Number of bathrooms |
| Has Balcony | Yes | Yes/No |
| Balcony Size | 8.5 m² | If applicable |
| Floor | 5 | Which floor |
| Price | 163,750 EUR | Total price |

### Apartment Types in Serbian:

| Serbian | English | Typical Size |
|---------|---------|--------------|
| Garsonjera | Studio | 25-35 m² |
| Jednosoban | One-bedroom | 35-50 m² |
| Jednoiposoban | One-and-half room | 40-55 m² |
| Dvosoban | Two-bedroom | 50-70 m² |
| Dvoiposoban | Two-and-half room | 60-80 m² |
| Trosoban | Three-bedroom | 75-100 m² |
| Četvorosoban | Four-bedroom | 100-140 m² |
| Petosoban | Five-bedroom | 140+ m² |

---

## 📸 Step 5: Collect Images

### ⚠️ IMPORTANT: Image Requirements

| Requirement | Specification |
|-------------|---------------|
| **Minimum Resolution** | **1920 x 1080 pixels (Full HD)** |
| **Preferred Resolution** | 2560 x 1440 pixels or higher |
| **Format** | JPG or PNG |
| **Maximum File Size** | 10 MB per image |

### Folder Structure for Images:

Create folders on your computer exactly like this:

```
Serbia_Images/
├── Developers/
│   ├── MPC_Properties/
│   │   └── logo.png
│   ├── PSP_Farman/
│   │   └── logo.png
│   └── Galens/
│       └── logo.png
│
├── Projects/
│   ├── Skyline_Belgrade/
│   │   ├── exterior/
│   │   │   ├── building_front.jpg
│   │   │   ├── building_side.jpg
│   │   │   └── aerial_view.jpg
│   │   ├── interior/
│   │   │   ├── living_room.jpg
│   │   │   ├── kitchen.jpg
│   │   │   └── bedroom.jpg
│   │   ├── amenities/
│   │   │   ├── lobby.jpg
│   │   │   ├── gym.jpg
│   │   │   └── pool.jpg
│   │   └── floor_plans/
│   │       ├── studio_plan.jpg
│   │       ├── 2bed_plan.jpg
│   │       └── 3bed_plan.jpg
│   │
│   └── [Next_Project_Name]/
│       └── ...
│
└── Locations/
    ├── Belgrade/
    │   ├── Novi_Beograd/
    │   │   └── neighborhood_photo.jpg
    │   └── Vracar/
    │       └── neighborhood_photo.jpg
    └── Novi_Sad/
        └── ...
```

### Image Types to Collect:

1. **Developer Logo** - High quality, transparent background if possible
2. **Project Exterior** - Building from outside (at least 3 photos)
3. **Project Interior** - Sample apartments (living room, kitchen, bedrooms)
4. **Amenities** - Gym, pool, lobby, parking, playground
5. **Floor Plans** - Layout drawings for each apartment type
6. **Location Photos** - Neighborhood, nearby landmarks

### Where to Find Images:

- Developer's official website
- Project's official website
- Real estate portals (4zida.rs, nekretnine.rs, halooglasi.com)
- Developer's social media (Facebook, Instagram)

### ⚠️ Do NOT Use:

- Blurry or low-quality images
- Images with watermarks from other websites
- Images smaller than 1920 x 1080 pixels
- Stock photos not related to the actual project

---

## 🔍 Where to Find Information

### Primary Websites:

| Website | URL | What to Find |
|---------|-----|--------------|
| 4zida | www.4zida.rs | Projects, prices, apartments |
| Nekretnine.rs | www.nekretnine.rs | Projects, developers |
| Halooglasi | www.halooglasi.com | Listings, prices |
| City Expert | www.cityexpert.rs | New projects |
| Sasomange | www.sasomange.rs | Belgrade projects |

### Developer Websites:

Always check the official developer website for the most accurate information!

### Verification Tools:

| Tool | Purpose |
|------|---------|
| Google Maps | Verify addresses, get coordinates |
| APR (Serbian Business Registry) | Verify company information |
| Real estate portals | Cross-check prices |

---

## ✅ Quality Checklist

Before submitting your data, check:

### For Cities/Locations:
- [ ] All three name versions are correct (English, Latin, Cyrillic)
- [ ] GPS coordinates are accurate
- [ ] Spelling is correct

### For Developers:
- [ ] Company name matches official registration
- [ ] Website URL works
- [ ] Contact information is current
- [ ] Logo is high quality

### For Projects:
- [ ] Project name is official
- [ ] Location is complete and accurate
- [ ] Prices are in EUR
- [ ] Status is current
- [ ] At least 5 high-quality images

### For Apartments:
- [ ] All sizes are in square meters (m²)
- [ ] Prices match developer's official prices
- [ ] Room counts are accurate
- [ ] Floor plans are included

---

## 📝 Daily Reporting

At the end of each day, prepare a short report:

1. **What I completed today:**
   - Number of projects added
   - Number of apartments added
   - Number of images collected

2. **Issues or questions:**
   - Any information I couldn't find
   - Any confusing situations

3. **Plan for tomorrow:**
   - Which projects I will work on next

---

## ❓ Common Questions

**Q: The developer website is in Serbian Cyrillic only. What do I do?**
A: Use Google Translate to help, but always copy the original Cyrillic text for our database.

**Q: I found different prices on different websites. Which one do I use?**
A: Always prefer the developer's official website. If not available, use the most recent listing.

**Q: The project has no images. What do I do?**
A: Note this in your report. Try to find images on social media or real estate portals.

**Q: I'm not sure about some information. Should I guess?**
A: Never guess! Leave the field empty and note it in your report. We will verify later.

---

## 📞 Need Help?

If you have questions or encounter problems:

1. First, re-read this guide
2. Check the Excel template for examples
3. Ask your team lead

---

**Good luck with your data collection! Your work is very important for our platform.** 🎉
