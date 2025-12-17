'use client'

import { useEffect, useState } from 'react'
import { PageHeader, DataTable, Column } from '@/components/admin'
import { Badge } from '@/components/ui/badge'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'
import { Check, X } from 'lucide-react'

interface Municipality {
  id: string
  city_id: string
  name_en: string
  name_sr_lat: string
  name_sr_cyr: string
  slug: string
  municipality_type: 'municipality' | 'neighborhood'
  is_active: boolean
  created_at: string
  city?: { name_sr_lat: string }
}

interface City {
  id: string
  name_sr_lat: string
}

export default function MunicipalitiesPage() {
  const [municipalities, setMunicipalities] = useState<Municipality[]>([])
  const [cities, setCities] = useState<City[]>([])
  const [selectedCity, setSelectedCity] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)
  const [deleteMunicipality, setDeleteMunicipality] = useState<Municipality | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchCities()
    fetchMunicipalities()
  }, [])

  useEffect(() => {
    fetchMunicipalities()
  }, [selectedCity])

  const fetchCities = async () => {
    try {
      const response = await fetch('/api/admin/cities')
      if (response.ok) {
        const data = await response.json()
        setCities(data)
      }
    } catch (error) {
      console.error('Failed to fetch cities:', error)
    }
  }

  const fetchMunicipalities = async () => {
    try {
      const url = selectedCity === 'all' 
        ? '/api/admin/municipalities'
        : `/api/admin/municipalities?city_id=${selectedCity}`
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setMunicipalities(data)
      }
    } catch (error) {
      console.error('Failed to fetch municipalities:', error)
      toast({
        title: 'Error',
        description: 'Failed to load municipalities',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteMunicipality) return

    try {
      const response = await fetch(`/api/admin/municipalities/${deleteMunicipality.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setMunicipalities(prev => prev.filter(m => m.id !== deleteMunicipality.id))
        toast({
          title: 'Success',
          description: 'Municipality deleted successfully'
        })
      } else {
        throw new Error('Failed to delete')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete municipality',
        variant: 'destructive'
      })
    } finally {
      setDeleteMunicipality(null)
    }
  }

  const columns: Column<Municipality>[] = [
    {
      key: 'name_sr_lat',
      title: 'Name (SR Latin)',
      render: (m) => <span className="font-medium">{m.name_sr_lat}</span>
    },
    {
      key: 'name_en',
      title: 'Name (EN)'
    },
    {
      key: 'city',
      title: 'City',
      render: (m) => m.city?.name_sr_lat || '-'
    },
    {
      key: 'slug',
      title: 'Slug',
      render: (m) => (
        <code className="text-sm bg-gray-100 px-2 py-1 rounded">{m.slug}</code>
      )
    },
    {
      key: 'municipality_type',
      title: 'Type',
      render: (m) => (
        <Badge variant="outline" className="capitalize">
          {m.municipality_type}
        </Badge>
      )
    },
    {
      key: 'is_active',
      title: 'Status',
      render: (m) => (
        m.is_active ? (
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
    }
  ]

  return (
    <>
      <PageHeader
        title="Municipalities"
        description="Manage municipalities and neighborhoods"
        action={{
          label: 'Add Municipality',
          href: '/admin/municipalities/new'
        }}
      >
        <Select value={selectedCity} onValueChange={setSelectedCity}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by city" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cities</SelectItem>
            {cities.map((city) => (
              <SelectItem key={city.id} value={city.id}>
                {city.name_sr_lat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </PageHeader>

      <DataTable
        columns={columns}
        data={municipalities}
        searchKey="name_sr_lat"
        searchPlaceholder="Search municipalities..."
        isLoading={isLoading}
        emptyMessage="No municipalities found."
        editHref={(m) => `/admin/municipalities/${m.id}`}
        onDelete={(m) => setDeleteMunicipality(m)}
      />

      <AlertDialog open={!!deleteMunicipality} onOpenChange={() => setDeleteMunicipality(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Municipality</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteMunicipality?.name_sr_lat}"? 
              This action cannot be undone.
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
