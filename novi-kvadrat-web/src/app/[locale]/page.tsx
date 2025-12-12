'use client'

import Link from 'next/link'
import { ArrowRight, TrendingUp, Home, Building2, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PropertyCard } from '@/components/cards/property-card'
import { ProjectCard } from '@/components/cards/project-card'
import { DeveloperCard } from '@/components/cards/developer-card'
import { HeroSearchCard } from '@/components/hero'
import { useRouter, usePathname } from 'next/navigation'
import { useTranslations } from '@/hooks/use-translations'
import { type Locale } from '@/i18n/config'

export default function HomePage() {
  const router = useRouter()
  const pathname = usePathname()
  const { t, locale } = useTranslations()
  
  // Extract locale from pathname for links
  const segments = pathname.split('/').filter(Boolean)
  const currentLocale = segments[0] as Locale || 'sr'
  // Sample data for demonstration
  const featuredProjects = [
    {
      id: '1',
      slug: 'kej-garden-residence-2',
      name: 'Belgrade Waterfront - BW Terra',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      address: 'Savski Venac',
      district: 'Savski Venac',
      priceFrom: 250000,
      pricePerSqm: 3500,
      developer: {
        id: '1',
        name: 'Eagle Hills',
        slug: 'eagle-hills',
        isVerified: true
      },
      completionPercentage: 68,
      completionDate: 'Q2 2025',
      isFeatured: true
    },
    {
      id: '2',
      slug: 'west-65',
      name: 'West 65',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
      address: 'Novi Beograd',
      district: 'Blok 65',
      priceFrom: 180000,
      pricePerSqm: 2800,
      developer: {
        id: '2',
        name: 'PSP Farman',
        slug: 'psp-farman',
        isVerified: true
      },
      completionPercentage: 45,
      completionDate: 'Q4 2025'
    }
  ]

  const featuredProperties = [
    {
      id: '1',
      title: 'Modern 2-bedroom apartment with stunning city views',
      images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop'],
      price: 195000,
      pricePerSqm: 3000,
      rooms: 2,
      area: 65,
      floor: 5,
      totalFloors: 16,
      district: 'Vračar',
      city: 'Belgrade',
      isNew: true,
      isVerified: true
    },
    {
      id: '2',
      title: 'Spacious 3-bedroom apartment in the heart of the city',
      images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop'],
      price: 280000,
      pricePerSqm: 3500,
      rooms: 3,
      area: 80,
      floor: 8,
      totalFloors: 12,
      district: 'Stari Grad',
      city: 'Belgrade',
      isFeatured: true
    }
  ]

  const topDevelopers = [
    {
      id: '1',
      slug: 'eagle-hills',
      name: 'Eagle Hills',
      logo: 'https://via.placeholder.com/100/3B82F6/FFFFFF?text=EH',
      projectsOnSale: 8,
      completedProjects: 15,
      priceFrom: 220000,
      isVerified: true,
      rating: 4.5,
      cities: ['Belgrade']
    },
    {
      id: '2',
      slug: 'afi-europe',
      name: 'AFI Europe',
      logo: 'https://via.placeholder.com/100/3B82F6/FFFFFF?text=AFI',
      projectsOnSale: 5,
      completedProjects: 12,
      priceFrom: 150000,
      isVerified: true,
      rating: 4.3,
      cities: ['Belgrade', 'Novi Sad']
    }
  ]

  const categories = [
    { icon: Building2, title: 'Novogradnja Beograd', count: 104, href: '/novogradnja/beograd' },
    { icon: Home, title: 'Novogradnja Novi Sad', count: 15, href: '/novogradnja/novi-sad' },
    { icon: Home, title: 'Novogradnja Niš', count: 8, href: '/novogradnja/nis' },
    { icon: Home, title: 'Svi Projekti', count: 104, href: '/novogradnja/beograd' },
  ]

  const popularCities = [
    { name: 'Belgrade', slug: 'beograd', count: 84 },
    { name: 'Novi Sad', slug: 'novi-sad', count: 15 },
    { name: 'Niš', slug: 'nis', count: 8 },
    { name: 'Kragujevac', slug: 'kragujevac', count: 5 },
  ]

  // Get current city from URL or default to 'beograd'
  // This will be synced with the header city selector
  const getCurrentCity = () => {
    if (segments.length >= 3 && segments[1] === 'novogradnja') {
      return segments[2]
    }
    return 'beograd' // Default city
  }
  const currentCity = getCurrentCity()

  const handleSearchProperties = (data: any) => {
    const params = new URLSearchParams()
    if (data.searchQuery) params.set('q', data.searchQuery)
    if (data.purpose) params.set('purpose', data.purpose)
    if (data.completionStatus !== 'all') params.set('status', data.completionStatus)
    if (data.propertyTypes.length > 0) params.set('types', data.propertyTypes.join(','))
    if (data.beds.length > 0) params.set('beds', data.beds.join(','))
    if (data.minPrice) params.set('minPrice', String(data.minPrice))
    if (data.maxPrice) params.set('maxPrice', String(data.maxPrice))
    router.push(`/${currentLocale}/novogradnja/${currentCity}?${params.toString()}`)
  }

  const handleSearchProjects = (data: any) => {
    const params = new URLSearchParams()
    if (data.searchQuery) params.set('q', data.searchQuery)
    if (data.propertyTypes.length > 0) params.set('types', data.propertyTypes.join(','))
    if (data.handoverBy) params.set('handover', data.handoverBy)
    if (data.completion !== 'any') params.set('completion', data.completion)
    router.push(`/${currentLocale}/novogradnja/${currentCity}?${params.toString()}`)
  }

  const handleSearchAgents = (data: any) => {
    const params = new URLSearchParams()
    if (data.searchQuery) params.set('q', data.searchQuery)
    if (data.purpose) params.set('purpose', data.purpose)
    // Navigate to agents page when available
    console.log('Search agents:', data)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[500px] lg:min-h-[600px] flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&h=1080&fit=crop)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-12 lg:py-20">
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              {t('home.title')}
            </h1>
            <p className="text-lg text-white/90 drop-shadow-md">
              {t('home.subtitle')}
            </p>
          </div>
          
          {/* Hero Search Card */}
          <HeroSearchCard
            currentCity={currentCity}
            onSearchProperties={handleSearchProperties}
            onSearchProjects={handleSearchProjects}
            onSearchAgents={handleSearchAgents}
          />
        </div>
      </section>

      {/* Statistics */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">104</div>
              <div className="text-sm text-gray-600 mt-1">Projekata</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">253</div>
              <div className="text-sm text-gray-600 mt-1">Stanova</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">97</div>
              <div className="text-sm text-gray-600 mt-1">Gradjevinara</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">17</div>
              <div className="text-sm text-gray-600 mt-1">Gradova</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.title} href={category.href}>
                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
                  <CardContent className="p-6">
                    <category.icon className="h-10 w-10 text-blue-600 mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-1">{category.title}</h3>
                    <p className="text-sm text-gray-600">{category.count} listings</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">{t('home.featuredProjects')}</h2>
            <Link href={`/${currentLocale}/novogradnja/beograd`}>
              <Button variant="ghost" className="gap-2">
                {t('common.viewAll')} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
            <div className="flex items-center justify-center">
              <Link href="/novogradnja/beograd" className="block w-full">
                <Card className="h-full min-h-[400px] flex items-center justify-center hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardContent className="text-center p-6">
                    <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <p className="font-semibold text-gray-900">View All Projects</p>
                    <p className="text-sm text-gray-600 mt-1">850+ projects available</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">{t('home.latestProperties')}</h2>
            <Link href="/novogradnja/beograd">
              <Button variant="ghost" className="gap-2">
                View All Properties <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id + '-2'} {...property} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Developers */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">{t('home.topDevelopers')}</h2>
            <Link href="/admin/import">
              <Button variant="ghost" className="gap-2">
                View All Developers <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topDevelopers.map((developer) => (
              <DeveloperCard key={developer.id} {...developer} />
            ))}
            {topDevelopers.map((developer) => (
              <DeveloperCard key={developer.id + '-2'} {...developer} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Cities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Cities</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCities.map((city) => (
              <Link key={city.name} href={`/novogradnja/${city.slug}`}>
                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{city.name}</h3>
                        <p className="text-sm text-gray-600">{city.count} projects</p>
                      </div>
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their perfect property through Novi Kvadrat
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              Start Searching
            </Button>
            <Button size="lg" variant="outline" className="bg-blue-700 text-white border-white hover:bg-blue-800">
              List Your Property
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}