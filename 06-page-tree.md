# Complete Page Tree

## All Routes and Page Hierarchy

---

## Public Pages

```
/
├── /en/                                    # English Homepage
│   ├── /ka/                               # Georgian Homepage
│   └── /ru/                               # Russian Homepage
│
├── NEW PROJECTS MODULE
│   ├── /en/new-projects-in-{city}         # Project listings
│   │   └── ?filters                       # With query params
│   ├── /en/new-projects-in-{city}-on-map  # Map view
│   ├── /en/{project-slug}-{city}          # Project detail
│   │   ├── /layouts                       # Layouts listing
│   │   │   └── /{layout-id}              # Layout detail
│   │   ├── /construction-progress         # Progress page
│   │   ├── /documents                     # Documents tab
│   │   └── /map                          # Location tab
│   └── /en/cottages-in-{city}            # Cottages listing
│
├── SECONDARY MARKET MODULE
│   ├── /en/apartments-for-sale-{city}     # Sale listings
│   ├── /en/apartments-for-rent-{city}     # Rent listings
│   ├── /en/daily-rental-{city}            # Daily rental
│   ├── /en/commercial-for-sale-{city}     # Commercial
│   ├── /en/land-for-sale-{city}           # Land
│   ├── /en/houses-for-sale-{city}         # Houses
│   ├── /en/{type}-{city}/{slug}/{id}      # Property detail
│   └── /en/{type}-{city}-on-map           # Map views
│
├── DEVELOPERS & AGENTS
│   ├── /en/developers-in-{city}           # Developer listing
│   ├── /en/{developer-slug}               # Developer profile
│   ├── /en/agents-in-{city}               # Agent listing
│   └── /en/realtor-profile/{id}           # Agent profile
│
├── STATIC PAGES
│   ├── /en/about                          # About us
│   ├── /en/contact                        # Contact
│   ├── /en/terms                          # Terms of service
│   ├── /en/privacy                        # Privacy policy
│   ├── /en/faq                            # FAQ
│   └── /en/how-it-works                   # How it works
│
└── AUTH PAGES
    ├── /en/login                          # Login
    ├── /en/register                       # Register
    ├── /en/forgot-password                # Password reset
    └── /en/verify-email                   # Email verification
```

---

## User Dashboard Pages

```
/en/dashboard/
├── /                                      # Dashboard home
├── /profile                               # Edit profile
├── /favorites                             # Saved properties
├── /saved-searches                        # Saved searches & alerts
├── /messages                              # Messaging inbox
│   └── /{conversation-id}                # Conversation view
├── /my-listings                           # User's listings
│   ├── /new                              # Add new listing
│   └── /{id}/edit                        # Edit listing
├── /settings                              # Account settings
│   ├── /notifications                    # Notification prefs
│   ├── /privacy                          # Privacy settings
│   └── /security                         # Password, 2FA
└── /billing                               # Payment history
```

---

## Admin Panel Pages

```
/admin/
├── /                                      # Admin dashboard
├── /users                                 # User management
│   └── /{id}                             # User detail
├── /moderation                            # Listing moderation
│   └── /{id}                             # Review listing
├── /listings                              # All listings
│   └── /{id}/edit                        # Edit listing
├── /projects                              # Project management
│   ├── /new                              # Add project
│   └── /{id}/edit                        # Edit project
├── /developers                            # Developer management
│   ├── /applications                     # Applications
│   └── /{id}                             # Developer detail
├── /agents                                # Agent management
├── /content                               # Content management
│   ├── /pages                            # Static pages
│   ├── /seo                              # SEO templates
│   └── /translations                     # Translations
├── /analytics                             # Reports & analytics
├── /settings                              # System settings
└── /admins                                # Admin user management
```

---

## URL Parameter Patterns

### City Slugs
```
tbilisi, batumi, kutaisi, rustavi, zugdidi, poti, 
gori, samtredia, khashuri, senaki, zestafoni, 
marneuli, telavi, akhaltsikhe, kobuleti, ozurgeti,
kaspi, chiatura, tskhaltubo, sagarejo, gardabani,
borjomi, tkibuli, khoni, bolnisi
```

### Property Type Slugs
```
apartments-for-sale
apartments-for-rent
daily-rental
houses-for-sale
commercial-for-sale
offices-for-sale
warehouses-for-sale
land-for-sale
garages-for-sale
```

### Filter Query Parameters
```
?price_min=50000
&price_max=100000
&rooms=2,3
&area_min=50
&area_max=100
&district=vake,saburtalo
&metro=medical-university
&building_type=new
&condition=renovated
&floor_min=2
&floor_max=10
&has_balcony=true
&has_parking=true
&sort=price_asc
&page=1
```
