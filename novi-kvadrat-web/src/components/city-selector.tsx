'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MapPin, ChevronDown } from 'lucide-react'
import { type Locale } from '@/i18n/config'

interface City {
  id: string
  name_en: string
  name_sr_lat: string
  name_sr_cyr: string
  slug: string
  country: string
}

interface CitySelectorProps {
  currentCity?: string
  currentLocale?: Locale
}

export function CitySelector({ currentCity, currentLocale = 'sr' }: CitySelectorProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [cities, setCities] = useState<City[]>([])
  const [loading, setLoading] = useState(true)

  // Extract current city slug from pathname if not provided
  const getCurrentCitySlug = () => {
    if (currentCity) return currentCity
    
    const segments = pathname.split('/').filter(Boolean)
    // Check if we're on a city page: /[locale]/novogradnja/[city]
    if (segments.length >= 3 && segments[1] === 'novogradnja') {
      return segments[2]
    }
    return null
  }

  const currentCitySlug = getCurrentCitySlug()

  useEffect(() => {
    async function fetchCities() {
      try {
        const response = await fetch('/api/cities?country=Serbia')
        const result = await response.json()
        if (result.success) {
          setCities(result.data || [])
        }
      } catch (error) {
        console.error('Failed to fetch cities:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCities()
  }, [])

  const handleCityChange = (citySlug: string) => {
    // Get current path segments
    const segments = pathname.split('/').filter(Boolean)
    
    // Remove current locale if present
    let localeIndex = -1
    if (segments[0] === 'en' || segments[0] === 'sr' || segments[0] === 'sr-cyrl') {
      localeIndex = 0
    }
    
    // Build new path
    const locale = localeIndex >= 0 ? segments[localeIndex] : currentLocale
    const restOfPath = localeIndex >= 0 ? segments.slice(1) : segments
    
    // If we're on a city page, replace the city slug
    if (restOfPath[0] === 'novogradnja' && restOfPath[1]) {
      restOfPath[1] = citySlug
    } else if (restOfPath[0] === 'novogradnja') {
      restOfPath.push(citySlug)
    } else {
      // Navigate to city projects page
      const newPath = `/${locale}/novogradnja/${citySlug}`
      router.push(newPath)
      return
    }
    
    const newPath = `/${locale}/${restOfPath.join('/')}`
    router.push(newPath)
  }

  const getCityName = (city: City) => {
    switch (currentLocale) {
      case 'en':
        return city.name_en
      case 'sr-cyrl':
        return city.name_sr_cyr
      case 'sr':
      default:
        return city.name_sr_lat
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1">
          <MapPin className="h-4 w-4" />
          <span className="text-sm font-medium">Cities in Serbia</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="!overflow-y-auto !overflow-x-hidden min-w-[200px] max-h-[400px] custom-scrollbar bg-white"
      >
        {loading ? (
          <DropdownMenuItem disabled>Loading...</DropdownMenuItem>
        ) : cities.length === 0 ? (
          <DropdownMenuItem disabled>No cities found</DropdownMenuItem>
        ) : (
          cities.map((city) => (
            <DropdownMenuItem
              key={city.id}
              onClick={() => handleCityChange(city.slug)}
              className={currentCitySlug === city.slug ? 'bg-primary-50' : ''}
            >
              <MapPin className="h-4 w-4 mr-2" />
              <span className="font-medium">{getCityName(city)}</span>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}




