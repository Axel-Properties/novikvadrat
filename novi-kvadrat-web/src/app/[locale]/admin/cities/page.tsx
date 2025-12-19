'use client'

import { useEffect, useState } from 'react'
import { PageHeader, DataTable, Column } from '@/components/admin'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useToast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'
import { Check, X } from 'lucide-react'

interface City {
  id: string
  name_en: string
  name_sr_lat: string
  name_sr_cyr: string
  slug: string
  country: string
  is_active: boolean
  sort_order: number
  created_at: string
  municipalities_count?: number
}

interface Country {
  id: string
  name_en: string
  name_sr_lat: string
  country_code: string
}

export default function CitiesPage() {
  const [cities, setCities] = useState<City[]>([])
  const [countries, setCountries] = useState<Country[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteCity, setDeleteCity] = useState<City | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchCities()
    fetchCountries()
  }, [])

  const fetchCities = async () => {
    try {
      const response = await fetch('/api/admin/cities')
      if (response.ok) {
        const data = await response.json()
        setCities(data)
      }
    } catch (error) {
      console.error('Failed to fetch cities:', error)
      toast({
        title: 'Error',
        description: 'Failed to load cities',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCountries = async () => {
    try {
      const response = await fetch('/api/admin/countries')
      if (response.ok) {
        const data = await response.json()
        setCountries(data.filter((c: any) => c.is_active !== false))
      }
    } catch (error) {
      console.error('Failed to fetch countries:', error)
    }
  }

  const getCountryName = (countryValue: string) => {
    if (!countryValue) return '-'
    
    // Try to find by country code first
    const country = countries.find(c => c.country_code === countryValue)
    if (country) return country.name_en
    
    // Try to find by name
    const countryByName = countries.find(c => 
      c.name_en === countryValue || 
      c.name_sr_lat === countryValue
    )
    if (countryByName) return countryByName.name_en
    
    // Fallback to original value
    return countryValue
  }

  const handleDelete = async () => {
    if (!deleteCity) return

    try {
      const response = await fetch(`/api/admin/cities/${deleteCity.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setCities(prev => prev.filter(c => c.id !== deleteCity.id))
        toast({
          title: 'Success',
          description: 'City deleted successfully'
        })
      } else {
        throw new Error('Failed to delete')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete city',
        variant: 'destructive'
      })
    } finally {
      setDeleteCity(null)
    }
  }

  const columns: Column<City>[] = [
    {
      key: 'name_sr_lat',
      title: 'Name (SR Latin)',
      render: (city) => (
        <span className="font-medium">{city.name_sr_lat}</span>
      )
    },
    {
      key: 'name_en',
      title: 'Name (EN)'
    },
    {
      key: 'name_sr_cyr',
      title: 'Name (SR Cyrillic)'
    },
    {
      key: 'slug',
      title: 'Slug',
      render: (city) => (
        <code className="text-sm bg-gray-100 px-2 py-1 rounded">{city.slug}</code>
      )
    },
    {
      key: 'country',
      title: 'Country',
      render: (city) => {
        const countryName = getCountryName(city.country)
        return (
          <span className="text-gray-700">{countryName}</span>
        )
      }
    },
    {
      key: 'municipalities_count',
      title: 'Municipalities',
      render: (city) => (
        <Badge variant="secondary">{city.municipalities_count || 0}</Badge>
      )
    },
    {
      key: 'is_active',
      title: 'Status',
      render: (city) => (
        city.is_active ? (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <Check className="h-3 w-3 mr-1" />
            Active
          </Badge>
        ) : (
          <Badge variant="secondary">
            <X className="h-3 w-3 mr-1" />
            Inactive
          </Badge>
        )
      )
    },
    {
      key: 'sort_order',
      title: 'Order'
    }
  ]

  return (
    <>
      <PageHeader
        title="Cities"
        description="Manage cities in the platform"
        action={{
          label: 'Add City',
          href: '/admin/cities/new'
        }}
      />

      <DataTable
        columns={columns}
        data={cities}
        searchKey="name_sr_lat"
        searchPlaceholder="Search cities..."
        isLoading={isLoading}
        emptyMessage="No cities found. Add your first city."
        editHref={(city) => `/admin/cities/${city.id}`}
        onDelete={(city) => setDeleteCity(city)}
      />

      <AlertDialog open={!!deleteCity} onOpenChange={() => setDeleteCity(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete City</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteCity?.name_sr_lat}"? This action cannot be undone.
              All municipalities in this city will also be affected.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Toaster />
    </>
  )
}
