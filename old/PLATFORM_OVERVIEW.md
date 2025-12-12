# Novi Kvadrat - Real Estate Platform

## Project Overview
Novi Kvadrat is a modern real estate platform designed for the Georgian market, featuring new developments, secondary market properties, and rentals. The platform is built with cutting-edge technologies and follows best practices for performance, scalability, and user experience.

## Tech Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library with Radix UI primitives
- **Icons**: Lucide React

### Backend & Database
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (ready for implementation)
- **File Storage**: Supabase Storage (configured)

### Deployment
- **Hosting**: Vercel (configured for deployment)
- **CDN**: Vercel Edge Network

## Design System

### Color Palette (Blue Theme)
- **Primary Blue**: #1A56DB (matching logo)
- **Primary Variants**: 50-950 shades
- **Secondary**: Neutral grays
- **Semantic Colors**: Success (green), Warning (yellow), Error (red)

### Typography
- **Font**: Inter (system fallback fonts)
- **Sizes**: xs to 5xl
- **Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

## Project Structure

```
novi-kvadrat-web/
├── src/
│   ├── app/                 # Next.js app router pages
│   ├── components/          # React components
│   │   ├── ui/             # Core UI components
│   │   ├── layout/         # Layout components
│   │   └── cards/          # Property card components
│   ├── lib/                # Utilities and configuration
│   ├── types/              # TypeScript type definitions
│   └── styles/             # Global styles
├── public/                 # Static assets
└── [configuration files]
```

## Key Features Implemented

### 1. Core UI Components
- **Button**: Multiple variants (primary, secondary, outline, ghost, danger)
- **Input**: With label, error, and helper text support
- **Select**: Dropdown with Radix UI
- **Card**: Flexible card component
- **Badge**: Status and category badges

### 2. Layout Components
- **Header**: 
  - Responsive navigation with mega menus
  - City and language selectors
  - User authentication integration ready
  - Mobile-friendly hamburger menu
- **Footer**: 
  - Multi-column layout with links
  - Social media integration
  - Contact information

### 3. Property Components
- **PropertyCard**: For individual property listings
  - Price display with per sqm calculation
  - Room, area, and floor information
  - Favorite toggle functionality
  - Verification badges
- **ProjectCard**: For new development projects
  - Developer information with verification
  - Construction progress bar
  - Completion date display
- **DeveloperCard**: For developer profiles
  - Project statistics
  - Rating system
  - City coverage

### 4. Home Page
- Hero section with search functionality
- Statistics dashboard
- Category browsing
- Featured projects carousel
- Latest properties grid
- Top developers showcase
- Popular cities navigation
- Call-to-action section

## Database Schema (Ready in Supabase)

### Core Tables
- `users` - User accounts and profiles
- `cities` - City information
- `districts` - District/area information
- `developers` - Developer companies
- `projects` - New development projects
- `property_listings` - Secondary market properties
- `layouts` - Floor plans and apartment types
- `apartment_units` - Individual units in projects

## Internationalization (Ready to Implement)
- Support for Georgian (ka), English (en), and Russian (ru)
- Locale-based routing structure prepared
- Translation files structure ready

## Next Steps for Development

### Phase 1 - Core Functionality
1. Complete i18n implementation with next-intl
2. Connect Supabase database with actual data
3. Implement user authentication flow
4. Add property search and filter functionality

### Phase 2 - Property Management
1. Property listing submission forms
2. Image upload and management
3. Advanced search with map integration
4. Saved searches and alerts

### Phase 3 - User Features
1. User dashboard
2. Favorite properties management
3. Contact forms and inquiry system
4. Review and rating system

### Phase 4 - Admin Panel
1. Content management system
2. Property moderation
3. Analytics dashboard
4. Developer/realtor verification

## Environment Variables Required

Create a `.env.local` file with:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_APP_NAME=Novi Kvadrat
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run type checking
npm run type-check

# Run linting
npm run lint
```

## Deployment to Vercel

1. Push code to GitHub repository
2. Import project in Vercel dashboard
3. Configure environment variables
4. Deploy

## Performance Optimizations

- Image optimization with Next.js Image component
- Lazy loading for components and images
- Server-side rendering for SEO
- Static generation for marketing pages
- Edge caching with Vercel

## Security Features

- Secure authentication with Supabase
- Environment variables for sensitive data
- HTTPS enforcement
- SQL injection prevention with Supabase
- XSS protection with React

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Mobile Responsiveness

- Fully responsive design
- Touch-optimized interactions
- Progressive Web App ready
- Mobile-first approach

---

## Contact & Support

For questions or support regarding the platform development:
- Project: Novi Kvadrat
- Platform Type: Real Estate Marketplace
- Target Market: Georgia