'use client'

import { useState, useEffect } from 'react'
import { useParams, usePathname } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  MapPin, Building2, Home, Calendar, Euro, Heart, Phone, 
  Filter, Map, ChevronLeft, ChevronRight, Loader2 
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from '@/hooks/use-translations'
import { type Locale } from '@/i18n/config'

interface Developer {
  id: string
  name: string
  slug: string
  is_verified: boolean
}

interface City {
  id: string
  name_en: string
  name_sr_lat: string
  slug: string
}

interface Municipality {
  id: string
  name_en: string
  name_sr_lat: string
  slug: string
}

interface Project {
  id: string
  name: string
  slug: string
  description: string
  city_id: string
  municipality_id: string
  address: string
  construction_status: string
  completion_date: string
  price_from: number
  price_to: number
  price_per_sqm_from: number
  price_per_sqm_to: number
  total_units: number
  available_units: number
  featured: boolean
  main_image_url: string
  developer: Developer
  city: City
  municipality: Municipality
}

const statusColors: { [key: string]: string } = {
  'planning': 'bg-gray-100 text-gray-800',
  'u_izgradnji': 'bg-blue-100 text-blue-800',
  'siva_faza': 'bg-yellow-100 text-yellow-800',
  'useljivo': 'bg-green-100 text-green-800',
  'completed': 'bg-purple-100 text-purple-800'
}

const cityNames: { [key: string]: string } = {
  'beograd': 'Beograd',
  'novi-sad': 'Novi Sad',
  'nis': 'Niš',
  'kragujevac': 'Kragujevac'
}

export default function ProjectsListingPage() {
  const params = useParams()
  const pathname = usePathname()
  const { t, locale } = useTranslations()
  const city = params.city as string
  const cityName = cityNames[city] || city
  
  // Extract locale from pathname for links
  const segments = pathname.split('/').filter(Boolean)
  const currentLocale = segments[0] as Locale || 'sr'

  // Status labels with translations
  const statusLabels: { [key: string]: string } = {
    'planning': t('projects.status.planning'),
    'u_izgradnji': t('projects.status.underConstruction'),
    'siva_faza': t('projects.status.grayFrame'),
    'useljivo': t('projects.status.readyToMove'),
    'completed': t('projects.status.completed')
  }

  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [sortBy, setSortBy] = useState('featured')
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>('')
  const [selectedStatus, setSelectedStatus] = useState<string>('')
  const [municipalities, setMunicipalities] = useState<Municipality[]>([])
  const [savedProjects, setSavedProjects] = useState<Set<string>>(new Set())

  useEffect(() => {
    fetchProjects()
  }, [city, page, sortBy, selectedMunicipality, selectedStatus])

  const fetchProjects = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        city,
        page: page.toString(),
        limit: '12',
        sort: sortBy
      })
      
      if (selectedMunicipality) {
        params.append('municipality', selectedMunicipality)
      }
      
      if (selectedStatus) {
        params.append('status', selectedStatus)
      }

      const response = await fetch(`/api/projects?${params}`)
      const data = await response.json()
      
      if (data.success) {
        setProjects(data.data)
        setTotalPages(data.pagination.totalPages)
        setTotal(data.pagination.total)
        if (data.aggregations?.municipalities) {
          setMunicipalities(data.aggregations.municipalities)
        }
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleSaveProject = (projectId: string) => {
    setSavedProjects(prev => {
      const newSet = new Set(prev)
      if (newSet.has(projectId)) {
        newSet.delete(projectId)
      } else {
        newSet.add(projectId)
      }
      return newSet
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('sr-RS', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const ProjectCard = ({ project }: { project: Project }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
      <div className="relative h-48">
        {project.main_image_url ? (
          <Image
            src={project.main_image_url}
            alt={project.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <Building2 className="h-12 w-12 text-gray-400" />
          </div>
        )}
        <button
          onClick={() => toggleSaveProject(project.id)}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:shadow-md transition-shadow"
        >
          <Heart 
            className={`h-5 w-5 ${savedProjects.has(project.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>
        {project.featured && (
          <Badge className="absolute top-2 left-2 bg-yellow-500">
            {t('projectDetail.featured')}
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4 flex flex-col flex-1 min-h-0">
        <div className="flex-1 flex flex-col">
          <Link href={`/projekat/${project.slug}`}>
            <h3 className="font-semibold text-lg mb-2 hover:text-blue-600">{project.name}</h3>
          </Link>
          
          <div className="flex items-center text-sm text-gray-600 mb-1">
            <MapPin className="h-4 w-4 mr-1" />
            {project.municipality?.name_sr_lat}, {project.city?.name_sr_lat}
          </div>
          
          {project.address && (
            <p className="text-sm text-gray-600 mb-3">{project.address}</p>
          )}
          
          <div className="flex items-center justify-between mb-3">
            <Badge className={statusColors[project.construction_status] || 'bg-gray-100'}>
              {statusLabels[project.construction_status] || project.construction_status}
            </Badge>
            {project.completion_date && (
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(project.completion_date).getFullYear()}
              </div>
            )}
          </div>
          
          <div className="border-t pt-3 mb-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">{t('common.from')}</p>
                <p className="text-xl font-bold text-blue-600">
                  {project.price_from ? formatPrice(project.price_from) : t('projects.onRequest')}
                </p>
              </div>
              {project.price_per_sqm_from && (
                <div className="text-right">
                  <p className="text-sm text-gray-600">{t('common.perSqm')}</p>
                  <p className="font-semibold">{formatPrice(project.price_per_sqm_from)}</p>
                </div>
              )}
            </div>
          </div>
          
          {project.developer && (
            <div className="border-t pt-3 mb-3">
              <Link 
                href={`/gradjevinar/${project.developer.slug}`}
                className="text-sm text-gray-600 hover:text-blue-600 flex items-center"
              >
                <Building2 className="h-4 w-4 mr-1" />
                {project.developer.name}
                {project.developer.is_verified && (
                  <Badge variant="outline" className="ml-2 text-xs">
                    {t('developer.verified')}
                  </Badge>
                )}
              </Link>
            </div>
          )}
        </div>
        
        <div className="flex gap-2 mt-auto pt-3 border-t">
          <Button variant="outline" size="sm" className="flex-1">
            <Phone className="h-4 w-4 mr-1" />
            {t('common.call')}
          </Button>
          <Button size="sm" className="flex-1">
            {t('common.consultation')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-2">
            {t('nav.newDevelopments')} {cityName}
          </h1>
          <p className="text-gray-600">
            {t('projects.projectsCount', { count: total })}
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-3">
            <Select value={selectedMunicipality || 'all'} onValueChange={(value) => setSelectedMunicipality(value === 'all' ? '' : value)}>
              <SelectTrigger className="w-[200px]">
                <MapPin className="h-4 w-4 mr-2" />
                <SelectValue placeholder={t('projects.filters.allMunicipalities')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('projects.filters.allMunicipalities')}</SelectItem>
                {municipalities.map((municipality) => (
                  <SelectItem key={municipality.id} value={municipality.slug}>
                    {municipality.name_sr_lat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus || 'all'} onValueChange={(value) => setSelectedStatus(value === 'all' ? '' : value)}>
              <SelectTrigger className="w-[180px]">
                <Home className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('projects.filters.allStatuses')}</SelectItem>
                <SelectItem value="u_izgradnji">{t('projects.status.underConstruction')}</SelectItem>
                <SelectItem value="siva_faza">{t('projects.status.grayFrame')}</SelectItem>
                <SelectItem value="useljivo">{t('projects.status.readyToMove')}</SelectItem>
                <SelectItem value="completed">{t('projects.status.completed')}</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              {t('projects.filters.moreFilters')}
            </Button>

            <Button variant="outline">
              <Map className="h-4 w-4 mr-2" />
              {t('projects.filters.projectsOnMap')}
            </Button>

            <div className="ml-auto">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">{t('projects.filters.recommended')}</SelectItem>
                  <SelectItem value="price_asc">{t('projects.filters.priceLowHigh')}</SelectItem>
                  <SelectItem value="price_desc">{t('projects.filters.priceHighLow')}</SelectItem>
                  <SelectItem value="newest">{t('projects.filters.newest')}</SelectItem>
                  <SelectItem value="completion">{t('projects.filters.completionDate')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Filter Tags */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-gray-100 whitespace-nowrap">
              Stari Grad
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-gray-100 whitespace-nowrap">
              Vračar
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-gray-100 whitespace-nowrap">
              Novi Beograd
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-gray-100 whitespace-nowrap">
              Zvezdara
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-gray-100 whitespace-nowrap">
              Na rate
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-gray-100 whitespace-nowrap">
              2025
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-gray-100 whitespace-nowrap">
              Povraćaj PDV-a
            </Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {projects.length === 0 && (
              <div className="text-center py-12">
                <Building2 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">{t('projects.noProjectsFound')}</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-8 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-10 h-10 p-0 text-gray-500 bg-transparent border-gray-300 hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (page <= 3) {
                    pageNum = i + 1
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = page - 2 + i
                  }
                  
                  const isActive = page === pageNum
                  
                  return (
                    <Button
                      key={pageNum}
                      variant={isActive ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPage(pageNum)}
                      className={`w-10 h-10 p-0 ${isActive ? '' : 'text-gray-500 bg-transparent border-gray-300 hover:bg-gray-50 hover:text-gray-700'}`}
                    >
                      {pageNum}
                    </Button>
                  )
                })}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="w-10 h-10 p-0 text-gray-500 bg-transparent border-gray-300 hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}