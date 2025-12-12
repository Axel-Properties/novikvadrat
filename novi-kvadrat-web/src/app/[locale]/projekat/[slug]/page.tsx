'use client'

import { useState, useEffect } from 'react'
import { useParams, usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from '@/hooks/use-translations'
import { type Locale } from '@/i18n/config'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import MortgageCalculator from '@/components/mortgage-calculator'
import {
  ImageGallery,
  PriceDynamicsChart,
  ProjectMap,
  ProjectBuildings,
  ConstructionProgress
} from '@/components/project-detail'
import { 
  MapPin, Building2, Calendar, Heart, Phone, Share2, 
  Loader2, Home, Car, Dumbbell,
  ShieldCheck, Wifi, Trees, Waves, Store, Camera, ArrowUpDown,
  Thermometer, FileText, BarChart3, ExternalLink
} from 'lucide-react'
import type { 
  ProjectPriceHistory, 
  ProjectBuilding, 
  ConstructionProgressSpotWithPhotos 
} from '@/types/database'

interface Project {
  id: string
  name: string
  slug: string
  description: string
  address: string
  latitude: number
  longitude: number
  construction_status: string
  construction_start_date: string
  completion_date: string
  completion_percentage: number
  total_buildings: number
  total_floors: number
  total_units: number
  available_units: number
  parking_spaces: number
  heating_type: string
  elevator: boolean
  garage: boolean
  energy_class: string
  price_from: number
  price_to: number
  price_per_sqm_from: number
  price_per_sqm_to: number
  vat_included: boolean
  first_buyer_vat_refund: boolean
  featured: boolean
  main_image_url: string
  video_url: string
  virtual_tour_url: string
  brochure_url: string
  views_count: number
  developer: {
    id: string
    name: string
    slug: string
    logo_url: string
    website: string
    phone: string
    email: string
    is_verified: boolean
    total_projects: number
    completed_projects: number
  }
  city?: {
    id: string
    name_en: string
    name_sr_lat: string
    slug: string
  }
  municipality?: {
    id: string
    name_en: string
    name_sr_lat: string
    slug: string
  }
  images: Array<{
    id: string
    url: string
    caption: string
    image_type: string
    sort_order: number
  }>
  layouts: Array<{
    id: string
    name: string
    layout_type: string
    total_area: number
    living_area: number
    terrace_area: number
    bedrooms: number
    bathrooms: number
    has_terrace: boolean
    has_loggia: boolean
    price_from: number
    price_to: number
    floor_plan_url: string
    floor_plan_3d_url: string
    total_units: number
    available_units: number
  }>
  amenities: Array<{
    id: string
    name_en: string
    name_sr: string
    icon: string
    category: string
  }>
  similarProjects: Array<{
    id: string
    name: string
    slug: string
    price_from: number
    price_per_sqm_from: number
    main_image_url: string
    municipality?: {
      name_sr_lat: string
    }
  }>
  priceHistory?: ProjectPriceHistory[]
  buildings?: ProjectBuilding[]
  constructionProgress?: ConstructionProgressSpotWithPhotos[]
}

const amenityIcons: { [key: string]: any } = {
  'parking': Car,
  'elevator': ArrowUpDown,
  'gym': Dumbbell,
  'pool': Waves,
  'security': ShieldCheck,
  'playground': Trees,
  'commercial': Store,
  'cctv': Camera,
  'smart-home': Wifi,
  'heating': Thermometer
}

export default function ProjectDetailPage() {
  const params = useParams()
  const pathname = usePathname()
  const { t, locale } = useTranslations()
  const slug = params.slug as string
  
  const segments = pathname.split('/').filter(Boolean)
  const currentLocale = segments[0] as Locale || 'sr'
  
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSaved, setIsSaved] = useState(false)
  const [showPhone, setShowPhone] = useState(false)

  useEffect(() => {
    fetchProject()
  }, [slug])

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/projects/${slug}`)
      const data = await response.json()
      
      if (data.success) {
        setProject(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch project:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('sr-RS', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project?.name,
          text: `Check out ${project?.name}`,
          url: window.location.href
        })
      } catch (err) {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Building2 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">Projekat nije pronađen</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="text-sm">
            <Link href="/" className="text-gray-600 hover:text-blue-600">Početna</Link>
            <span className="mx-2 text-gray-400">/</span>
            {project.city && (
              <>
                <Link href={`/novogradnja/${project.city.slug}`} className="text-gray-600 hover:text-blue-600">
                  Novogradnja {project.city.name_sr_lat}
                </Link>
                <span className="mx-2 text-gray-400">/</span>
              </>
            )}
            <span className="text-gray-900">{project.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section with Gallery */}
      <div className="bg-white pb-6">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Image Gallery - Takes 2/3 */}
            <div className="lg:col-span-2">
              <ImageGallery
                mainImage={project.main_image_url}
                images={project.images || []}
                projectName={project.name}
                videoUrl={project.video_url}
                virtualTourUrl={project.virtual_tour_url}
              />
            </div>

            {/* Quick Info Sidebar */}
            <div className="space-y-4">
              {/* Project Title & Actions */}
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold">{project.name}</h1>
                  <div className="flex items-center text-gray-600 mt-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">
                      {project.municipality?.name_sr_lat && `${project.municipality.name_sr_lat}, `}
                      {project.city?.name_sr_lat || 'Belgrade'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setIsSaved(!isSaved)}
                  >
                    <Heart className={`h-4 w-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                </div>
              </div>

              {/* Status Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-sm py-1">
                  {t(`projects.status.${project.construction_status === 'u_izgradnji' ? 'underConstruction' : 
                    project.construction_status === 'siva_faza' ? 'grayFrame' :
                    project.construction_status === 'useljivo' ? 'readyToMove' :
                    project.construction_status === 'planning' ? 'planning' :
                    project.construction_status === 'completed' ? 'completed' : 
                    project.construction_status}`)}
                </Badge>
                {project.completion_date && (
                  <Badge variant="outline" className="text-sm py-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    {t('common.completion')} {new Date(project.completion_date).getFullYear()}
                  </Badge>
                )}
                {project.completion_percentage && (
                  <Badge variant="outline" className="text-sm py-1">
                    <BarChart3 className="h-3 w-3 mr-1" />
                    {project.completion_percentage}%
                  </Badge>
                )}
              </div>

              {/* Price Card */}
              <Card>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-600">{t('projectDetail.priceFrom')}</p>
                      <p className="text-xl font-bold text-blue-600">
                        {project.price_from ? formatPrice(project.price_from) : t('projectDetail.onRequest')}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">{t('projectDetail.pricePerSqm')}</p>
                      <p className="text-xl font-bold">
                        {project.price_per_sqm_from ? formatPrice(project.price_per_sqm_from) : t('projectDetail.onRequest')}
                      </p>
                    </div>
                  </div>
                  
                  {(project.vat_included || project.first_buyer_vat_refund) && (
                    <div className="mt-3 pt-3 border-t space-y-1">
                      {project.vat_included && (
                        <div className="flex items-center text-green-600 text-sm">
                          <ShieldCheck className="h-4 w-4 mr-2" />
                          {t('projectDetail.priceWithVat')}
                        </div>
                      )}
                      {project.first_buyer_vat_refund && (
                        <div className="flex items-center text-green-600 text-sm">
                          <ShieldCheck className="h-4 w-4 mr-2" />
                          {t('projectDetail.vatRefundFirstBuyer')}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Developer Card */}
              {project.developer && (
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center mb-4">
                      {project.developer.logo_url ? (
                        <Image
                          src={project.developer.logo_url}
                          alt={project.developer.name}
                          width={40}
                          height={40}
                          className="rounded mr-3"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 rounded mr-3 flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                      <div>
                        <Link 
                          href={`/gradjevinar/${project.developer.slug}`}
                          className="font-semibold hover:text-blue-600 flex items-center gap-1"
                        >
                          {project.developer.name}
                          {project.developer.is_verified && (
                            <ShieldCheck className="h-4 w-4 text-blue-500" />
                          )}
                        </Link>
                        <p className="text-xs text-gray-600">
                          {project.developer.total_projects} {t('projectDetail.projects')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1"
                        onClick={() => setShowPhone(!showPhone)}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        {showPhone ? project.developer.phone : t('projectDetail.showPhone')}
                      </Button>
                    </div>
                    <Button variant="outline" className="w-full mt-2">
                      {t('projectDetail.scheduleConsultation')}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Price Dynamics Chart */}
      {project.priceHistory && project.priceHistory.length > 0 && (
        <div className="container mx-auto px-4 py-6">
          <PriceDynamicsChart 
            priceHistory={project.priceHistory}
            currency="€"
            title={`Minimal price change dynamics`}
          />
        </div>
      )}

      {/* Map Section */}
      <div className="container mx-auto px-4 py-6">
        <ProjectMap
          projectName={project.name}
          address={project.address}
          latitude={project.latitude}
          longitude={project.longitude}
          buildings={project.buildings}
          cityName={project.city?.name_sr_lat}
          municipalityName={project.municipality?.name_sr_lat}
        />
      </div>

      {/* Project Buildings Section */}
      {project.buildings && project.buildings.length > 0 && (
        <div className="container mx-auto px-4">
          <ProjectBuildings 
            buildings={project.buildings}
            title={t('projectDetail.projectHouses') || 'Project houses'}
          />
        </div>
      )}

      {/* Tabs Section */}
      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview">{t('projectDetail.tabs.overview')}</TabsTrigger>
            <TabsTrigger value="layouts">{t('projectDetail.tabs.layouts')}</TabsTrigger>
            <TabsTrigger value="amenities">{t('projectDetail.tabs.amenities')}</TabsTrigger>
            <TabsTrigger value="mortgage">{t('projectDetail.tabs.mortgage')}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>{t('projectDetail.aboutProject')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">
                    {project.description || t('projectDetail.projectDescriptionPlaceholder')}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">{t('projectDetail.numberOfBuildings')}</p>
                      <p className="font-semibold">{project.total_buildings}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t('projectDetail.numberOfFloors')}</p>
                      <p className="font-semibold">{project.total_floors}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t('projectDetail.totalApartments')}</p>
                      <p className="font-semibold">{project.total_units}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t('projectDetail.availableApartments')}</p>
                      <p className="font-semibold">{project.available_units}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t('projectDetail.parkingSpaces')}</p>
                      <p className="font-semibold">{project.parking_spaces || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t('projectDetail.heating')}</p>
                      <p className="font-semibold">{project.heating_type ? t(`projectDetail.heatingTypes.${project.heating_type}`) : 'N/A'}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-6">
                    {project.elevator && (
                      <Badge variant="secondary">
                        <ArrowUpDown className="h-4 w-4 mr-1" />
                        {t('projectDetail.elevator')}
                      </Badge>
                    )}
                    {project.garage && (
                      <Badge variant="secondary">
                        <Car className="h-4 w-4 mr-1" />
                        {t('projectDetail.garage')}
                      </Badge>
                    )}
                    {project.energy_class && (
                      <Badge variant="secondary">
                        {t('projectDetail.energyClass')} {project.energy_class}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('projectDetail.documents')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {project.brochure_url && (
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => window.open(project.brochure_url, '_blank')}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      {t('projectDetail.downloadBrochure')}
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </Button>
                  )}
                  {project.virtual_tour_url && (
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => window.open(project.virtual_tour_url, '_blank')}
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      {t('projectDetail.virtualTour')}
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="layouts" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('projectDetail.availableLayouts')}</CardTitle>
              </CardHeader>
              <CardContent>
                {project.layouts && project.layouts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {project.layouts.map((layout) => (
                      <Card key={layout.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative h-48 bg-gray-100">
                          {layout.floor_plan_url ? (
                            <Image
                              src={layout.floor_plan_url}
                              alt={layout.name}
                              fill
                              className="object-contain p-4"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <Home className="h-12 w-12 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <CardContent className="pt-4">
                          <h4 className="font-semibold mb-2">{layout.name}</h4>
                          <p className="text-sm text-gray-600 mb-3">
                            {layout.layout_type ? t(`projectDetail.layoutTypes.${layout.layout_type}`) : layout.layout_type}
                          </p>
                          
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">{t('projectDetail.area')}:</span>
                              <span className="font-medium">{layout.total_area} m²</span>
                            </div>
                            {layout.terrace_area && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">{t('projectDetail.terrace')}:</span>
                                <span className="font-medium">{layout.terrace_area} m²</span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span className="text-gray-600">{t('projectDetail.rooms')}:</span>
                              <span className="font-medium">{layout.bedrooms}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">{t('projectDetail.bathrooms')}:</span>
                              <span className="font-medium">{layout.bathrooms}</span>
                            </div>
                          </div>
                          
                          <div className="mt-4 pt-4 border-t">
                            <p className="text-lg font-bold text-blue-600">
                              {layout.price_from ? formatPrice(layout.price_from) : t('projectDetail.onRequest')}
                            </p>
                            <p className="text-xs text-gray-600">
                              {t('projectDetail.available')}: {layout.available_units}/{layout.total_units}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">{t('projectDetail.layoutsComingSoon')}</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="amenities" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('projectDetail.amenitiesAndFeatures')}</CardTitle>
              </CardHeader>
              <CardContent>
                {project.amenities && project.amenities.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {project.amenities.map((amenity) => {
                      const IconComponent = amenityIcons[amenity.icon] || Home
                      return (
                        <div key={amenity.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <IconComponent className="h-5 w-5 mr-3 text-blue-600" />
                          <span className="text-sm">{amenity.name_sr}</span>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <p className="text-gray-600">{t('projectDetail.amenitiesComingSoon')}</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mortgage" className="mt-6">
            <MortgageCalculator defaultPrice={project.price_from || 150000} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Construction Progress Section */}
      {project.constructionProgress && project.constructionProgress.length > 0 && (
        <div className="container mx-auto px-4 pb-8">
          <ConstructionProgress
            projectName={project.name}
            spots={project.constructionProgress}
          />
        </div>
      )}

      {/* Similar Projects */}
      {project.similarProjects && project.similarProjects.length > 0 && (
        <div className="bg-gray-100 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">{t('projectDetail.similarProjects')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {project.similarProjects.map((similar) => (
                <Card key={similar.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <Link href={`/projekat/${similar.slug}`}>
                    <div className="relative h-48">
                      {similar.main_image_url ? (
                        <Image
                          src={similar.main_image_url}
                          alt={similar.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <Building2 className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="font-semibold mb-1">{similar.name}</h3>
                      {similar.municipality?.name_sr_lat && (
                        <p className="text-sm text-gray-600 mb-2">{similar.municipality.name_sr_lat}</p>
                      )}
                      <p className="text-lg font-bold text-blue-600">
                        {similar.price_from ? formatPrice(similar.price_from) : t('projectDetail.onRequest')}
                      </p>
                      {similar.price_per_sqm_from && (
                        <p className="text-sm text-gray-600">
                          {formatPrice(similar.price_per_sqm_from)}/m²
                        </p>
                      )}
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
