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
import { Star, FolderKanban } from 'lucide-react'

interface Project {
  id: string
  name: string
  slug: string
  main_image_url: string | null
  construction_status: string
  price_from: number | null
  total_units: number | null
  featured: boolean
  is_active: boolean
  created_at: string
  developer?: { name: string }
  city?: { name_sr_lat: string }
}

interface City {
  id: string
  name_sr_lat: string
}

const statusColors: Record<string, string> = {
  planning: 'bg-gray-100 text-gray-800',
  u_izgradnji: 'bg-yellow-100 text-yellow-800',
  siva_faza: 'bg-orange-100 text-orange-800',
  useljivo: 'bg-green-100 text-green-800',
  completed: 'bg-blue-100 text-blue-800'
}

const statusLabels: Record<string, string> = {
  planning: 'Planning',
  u_izgradnji: 'Under Construction',
  siva_faza: 'Gray Phase',
  useljivo: 'Move-in Ready',
  completed: 'Completed'
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [cities, setCities] = useState<City[]>([])
  const [selectedCity, setSelectedCity] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)
  const [deleteProject, setDeleteProject] = useState<Project | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchCities()
    fetchProjects()
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [selectedCity, selectedStatus])

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

  const fetchProjects = async () => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      if (selectedCity !== 'all') params.append('city_id', selectedCity)
      if (selectedStatus !== 'all') params.append('status', selectedStatus)
      
      const response = await fetch(`/api/admin/projects?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error)
      toast({
        title: 'Error',
        description: 'Failed to load projects',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteProject) return

    try {
      const response = await fetch(`/api/admin/projects/${deleteProject.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setProjects(prev => prev.filter(p => p.id !== deleteProject.id))
        toast({
          title: 'Success',
          description: 'Project deleted successfully'
        })
      } else {
        throw new Error('Failed to delete')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete project',
        variant: 'destructive'
      })
    } finally {
      setDeleteProject(null)
    }
  }

  const formatPrice = (price: number | null) => {
    if (!price) return '-'
    return new Intl.NumberFormat('sr-RS', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(price)
  }

  const columns: Column<Project>[] = [
    {
      key: 'image',
      title: '',
      className: 'w-[60px]',
      render: (project) => (
        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
          {project.main_image_url ? (
            <img 
              src={project.main_image_url} 
              alt={project.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FolderKanban className="h-5 w-5 text-gray-400" />
            </div>
          )}
        </div>
      )
    },
    {
      key: 'name',
      title: 'Name',
      render: (project) => (
        <div>
          <span className="font-medium">{project.name}</span>
          {project.featured && (
            <Star className="h-4 w-4 text-yellow-500 inline ml-2 fill-yellow-500" />
          )}
        </div>
      )
    },
    {
      key: 'developer',
      title: 'Developer',
      render: (project) => project.developer?.name || '-'
    },
    {
      key: 'city',
      title: 'City',
      render: (project) => project.city?.name_sr_lat || '-'
    },
    {
      key: 'construction_status',
      title: 'Status',
      render: (project) => (
        <Badge className={statusColors[project.construction_status] || 'bg-gray-100'}>
          {statusLabels[project.construction_status] || project.construction_status}
        </Badge>
      )
    },
    {
      key: 'price_from',
      title: 'Price From',
      render: (project) => formatPrice(project.price_from)
    },
    {
      key: 'total_units',
      title: 'Units',
      render: (project) => project.total_units || '-'
    }
  ]

  return (
    <>
      <PageHeader
        title="Projects"
        description="Manage real estate projects"
        action={{
          label: 'Add Project',
          href: '/admin/projects/new'
        }}
      >
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="planning">Planning</SelectItem>
            <SelectItem value="u_izgradnji">Under Construction</SelectItem>
            <SelectItem value="siva_faza">Gray Phase</SelectItem>
            <SelectItem value="useljivo">Move-in Ready</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedCity} onValueChange={setSelectedCity}>
          <SelectTrigger className="w-[180px]">
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
        data={projects}
        searchKey="name"
        searchPlaceholder="Search projects..."
        isLoading={isLoading}
        emptyMessage="No projects found. Add your first project."
        editHref={(project) => `/admin/projects/${project.id}`}
        onDelete={(project) => setDeleteProject(project)}
      />

      <AlertDialog open={!!deleteProject} onOpenChange={() => setDeleteProject(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteProject?.name}"? This action cannot be undone.
              All images, layouts, and other data associated with this project will also be deleted.
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
