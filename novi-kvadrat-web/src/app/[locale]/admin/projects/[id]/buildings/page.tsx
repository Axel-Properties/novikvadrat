'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
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
import { useToast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'
import { ProjectBuildingWithType } from '@/types/database'

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

export default function BuildingsPage() {
  const params = useParams()
  const projectId = params.id as string
  const locale = params.locale as string || 'en'
  const { toast } = useToast()

  const [buildings, setBuildings] = useState<ProjectBuildingWithType[]>([])
  const [projectName, setProjectName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [deleteBuilding, setDeleteBuilding] = useState<ProjectBuildingWithType | null>(null)

  useEffect(() => {
    fetchBuildings()
    fetchProjectName()
  }, [projectId])

  const fetchProjectName = async () => {
    try {
      const response = await fetch(`/api/admin/projects/${projectId}`)
      if (response.ok) {
        const data = await response.json()
        setProjectName(data.name)
      }
    } catch (error) {
      console.error('Failed to fetch project:', error)
    }
  }

  const fetchBuildings = async () => {
    try {
      const response = await fetch(`/api/admin/projects/${projectId}/buildings`)
      if (response.ok) {
        const data = await response.json()
        setBuildings(data)
      }
    } catch (error) {
      console.error('Failed to fetch buildings:', error)
      toast({
        title: 'Error',
        description: 'Failed to load buildings',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteBuilding) return

    try {
      const response = await fetch(
        `/api/admin/projects/${projectId}/buildings/${deleteBuilding.id}`,
        { method: 'DELETE' }
      )

      if (response.ok) {
        setBuildings(prev => prev.filter(b => b.id !== deleteBuilding.id))
        toast({
          title: 'Success',
          description: 'Building deleted successfully'
        })
      } else {
        throw new Error('Failed to delete')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete building',
        variant: 'destructive'
      })
    } finally {
      setDeleteBuilding(null)
    }
  }

  const columns: Column<ProjectBuildingWithType>[] = [
    {
      key: 'name',
      title: 'Name',
      render: (building) => <span className="font-medium">{building.name}</span>
    },
    {
      key: 'building_type',
      title: 'Type',
      render: (building) => building.building_type ? (
        <Badge style={{ backgroundColor: building.building_type.color + '20', color: building.building_type.color }}>
          {building.building_type.name}
        </Badge>
      ) : (
        <span className="text-gray-400">-</span>
      )
    },
    {
      key: 'building_group',
      title: 'Group',
      render: (building) => building.building_group || '-'
    },
    {
      key: 'floors',
      title: 'Floors',
      render: (building) => building.floors || '-'
    },
    {
      key: 'total_units',
      title: 'Units',
      render: (building) => (
        <span>
          {building.available_units || 0} / {building.total_units || 0}
          <span className="text-gray-400 text-xs ml-1">avail.</span>
        </span>
      )
    },
    {
      key: 'construction_status',
      title: 'Status',
      render: (building) => building.construction_status ? (
        <Badge className={statusColors[building.construction_status] || 'bg-gray-100'}>
          {statusLabels[building.construction_status] || building.construction_status}
        </Badge>
      ) : (
        <span className="text-gray-400">-</span>
      )
    }
  ]

  return (
    <>
      <PageHeader
        title="Buildings"
        description={`Manage buildings for: ${projectName}`}
        backHref={`/${locale}/admin/projects/${projectId}`}
        action={{
          label: 'Add Building',
          href: `/${locale}/admin/projects/${projectId}/buildings/new`
        }}
      />

      <DataTable
        columns={columns}
        data={buildings}
        searchKey="name"
        searchPlaceholder="Search buildings..."
        isLoading={isLoading}
        emptyMessage="No buildings found. Add your first building."
        editHref={(building) => `/${locale}/admin/projects/${projectId}/buildings/${building.id}`}
        onDelete={(building) => setDeleteBuilding(building)}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteBuilding} onOpenChange={() => setDeleteBuilding(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Building</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteBuilding?.name}"?
              This will also delete all units in this building.
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
