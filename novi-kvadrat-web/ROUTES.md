# Available Routes in Novi Kvadrat

## Working Pages

### Home Page
- **URL**: `/`
- **Description**: Main landing page with featured projects and developers

### Projects Listing
- **URL**: `/novogradnja/beograd` - Belgrade projects (84 projects)
- **URL**: `/novogradnja/novi-sad` - Novi Sad projects (15 projects)
- **URL**: `/novogradnja/nis` - Niš projects (8 projects)
- **URL**: `/novogradnja/kragujevac` - Kragujevac projects
- **Description**: Browse all real estate projects by city

### Project Details
- **URL**: `/projekat/[slug]`
- **Example**: `/projekat/kej-garden-residence-2`
- **Example**: `/projekat/west-65`
- **Description**: Detailed view of individual projects with images, layouts, amenities

### Admin Pages
- **URL**: `/admin/import` - Original import page for sample data
- **URL**: `/admin/import-excel` - Import data from Excel file (104 projects, 97 developers)

### API Endpoints
- **GET** `/api/projects` - List projects with filters
- **GET** `/api/projects/[slug]` - Get project details
- **POST** `/api/import/developers` - Import developers
- **POST** `/api/import/projects` - Import projects
- **POST** `/api/import/excel` - Import all Excel data
- **GET** `/api/test-db` - Test database connection

## Database Statistics
- **Cities**: 17 (Belgrade, Novi Sad, Niš, etc.)
- **Developers**: 97 companies
- **Projects**: 104 real projects
- **Layouts**: 253 apartment configurations
- **Municipalities**: 10+ (Stari Grad, Vračar, Novi Beograd, etc.)

## Sample Projects in Database
1. Kej Garden Residence 2 (Novi Sad)
2. Sunny Hill (Niš)
3. Victory Gardens (Belgrade)
4. Belgrade Waterfront projects
5. Airport City Belgrade
6. West 65
7. Skyline Belgrade
8. And 97 more...

## Placeholder Routes (redirect to /novogradnja/beograd)
- `/developer/[slug]` - Developer profiles (not implemented yet)
- `/property/[id]` - Individual property pages (not implemented yet)

## Next Steps
1. Create developer profile pages
2. Add search functionality
3. Implement property listings (for resale)
4. Add Serbian language toggle (Cyrillic/Latin)
5. Create mortgage calculator
6. Add map view for projects