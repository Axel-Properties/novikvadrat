'use client'

import { useEffect, useState, useTransition } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { PageHeader, DataTable, Column, ProjectSubNav } from '@/components/admin'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useToast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'
import { ChevronDown, Loader2, Trash2, Home, Filter } from 'lucide-react'
import { UnitWithDetails, ProjectBuildingWithType, UNIT_STATUS } from '@/types/database'

interface UnitsPageClientProps {
  projectId: string
  locale: string
  initialProjectName: string
  initialBuildings: ProjectBuildingWithType[]
  initialUnits: UnitWithDetails[]
}

export function UnitsPageClient({
  projectId,
  locale,
  initialProjectName,
  initialBuildings,
  initialUnits,
}: UnitsPageClientProps) {
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const [units, setUnits] = useState<UnitWithDetails[]>(initialUnits)
  const [buildings] = useState<ProjectBuildingWithType[]>(initialBuildings)
  const [projectName] = useState(initialProjectName)
  const [selectedUnits, setSelectedUnits] = useState<Set<string>>(new Set())
  const [isBulkProcessing, setIsBulkProcessing] = useState(false)
  const [deleteUnits, setDeleteUnits] = useState<string[] | null>(null)

  // Filters from URL
  const filterBuilding = searchParams.get('building_id') || 'all'
  const filterStatus = searchParams.get('status') || 'all'
  const filterFloor = searchParams.get('floor') || 'all'

  // Update filters in URL
  const updateFilters = (newFilters: { building_id?: string; status?: string; floor?: string }) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (newFilters.building_id && newFilters.building_id !== 'all') {
      params.set('building_id', newFilters.building_id)
    } else {
      params.delete('building_id')
    }
    
    if (newFilters.status && newFilters.status !== 'all') {
      params.set('status', newFilters.status)
    } else {
      params.delete('status')
    }
    
    if (newFilters.floor && newFilters.floor !== 'all') {
      params.set('floor', newFilters.floor)
    } else {
      params.delete('floor')
    }

    startTransition(() => {
      router.push(`/${locale}/admin/projects/${projectId}/units?${params.toString()}`)
    })
  }

  useEffect(() => {
    // Refetch when filters change (client-side navigation)
    const fetchUnits = async () => {
      try {
        const params = new URLSearchParams()
        if (filterBuilding && filterBuilding !== 'all') params.set('building_id', filterBuilding)
        if (filterStatus && filterStatus !== 'all') params.set('status', filterStatus)
        if (filterFloor && filterFloor !== 'all') params.set('floor', filterFloor)

        const response = await fetch(`/api/admin/projects/${projectId}/units?${params}`)
        if (response.ok) {
          const data = await response.json()
          setUnits(data)
        }
      } catch (error) {
        console.error('Failed to fetch units:', error)
      }
    }

    fetchUnits()
  }, [filterBuilding, filterStatus, filterFloor, projectId])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUnits(new Set(units.map(u => u.id)))
    } else {
      setSelectedUnits(new Set())
    }
  }

  const handleSelectUnit = (unitId: string, checked: boolean) => {
    const newSelected = new Set(selectedUnits)
    if (checked) {
      newSelected.add(unitId)
    } else {
      newSelected.delete(unitId)
    }
    setSelectedUnits(newSelected)
  }

  const handleBulkStatusChange = async (newStatus: string) => {
    if (selectedUnits.size === 0) return

    setIsBulkProcessing(true)
    try {
      const response = await fetch(`/api/admin/projects/${projectId}/units/bulk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'change_status',
          unit_ids: Array.from(selectedUnits),
          status: newStatus
        })
      })

      if (response.ok) {
        // Refetch units
        const params = new URLSearchParams(searchParams.toString())
        const fetchResponse = await fetch(`/api/admin/projects/${projectId}/units?${params}`)
        if (fetchResponse.ok) {
          const data = await fetchResponse.json()
          setUnits(data)
        }
        setSelectedUnits(new Set())
        toast({
          title: 'Success',
          description: `Updated ${selectedUnits.size} units to ${UNIT_STATUS[newStatus]?.label || newStatus}`
        })
      } else {
        throw new Error('Failed to update units')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update units',
        variant: 'destructive'
      })
    } finally {
      setIsBulkProcessing(false)
    }
  }

  const handleBulkDelete = async () => {
    if (!deleteUnits) return

    setIsBulkProcessing(true)
    try {
      const response = await fetch(`/api/admin/projects/${projectId}/units/bulk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'delete',
          unit_ids: deleteUnits
        })
      })

      if (response.ok) {
        // Refetch units
        const params = new URLSearchParams(searchParams.toString())
        const fetchResponse = await fetch(`/api/admin/projects/${projectId}/units?${params}`)
        if (fetchResponse.ok) {
          const data = await fetchResponse.json()
          setUnits(data)
        }
        setSelectedUnits(new Set())
        toast({
          title: 'Success',
          description: `Deleted ${deleteUnits.length} units`
        })
      } else {
        throw new Error('Failed to delete units')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete units',
        variant: 'destructive'
      })
    } finally {
      setIsBulkProcessing(false)
      setDeleteUnits(null)
    }
  }

  const handleDeleteUnit = async (unit: UnitWithDetails) => {
    try {
      const response = await fetch(
        `/api/admin/projects/${projectId}/units/${unit.id}`,
        { method: 'DELETE' }
      )

      if (response.ok) {
        setUnits(prev => prev.filter(u => u.id !== unit.id))
        toast({
          title: 'Success',
          description: 'Unit deleted successfully'
        })
      } else {
        throw new Error('Failed to delete')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete unit',
        variant: 'destructive'
      })
    }
  }

  // Get unique floors for filter
  const floors = [...new Set(units.map(u => u.floor))].sort((a, b) => a - b)

  const columns: Column<UnitWithDetails>[] = [
    {
      key: 'select',
      title: (
        <Checkbox
          checked={selectedUnits.size === units.length && units.length > 0}
          onCheckedChange={handleSelectAll}
        />
      ),
      className: 'w-[40px]',
      render: (unit) => (
        <Checkbox
          checked={selectedUnits.has(unit.id)}
          onCheckedChange={(checked) => handleSelectUnit(unit.id, checked as boolean)}
          onClick={(e) => e.stopPropagation()}
        />
      )
    },
    {
      key: 'unit_number',
      title: 'Unit',
      render: (unit) => (
        <div className="flex items-center gap-2">
          <Home className="h-4 w-4 text-gray-400" />
          <span className="font-medium">{unit.unit_number}</span>
          {unit.is_featured && (
            <Badge className="bg-yellow-100 text-yellow-800 text-xs">Featured</Badge>
          )}
        </div>
      )
    },
    {
      key: 'building',
      title: 'Building',
      render: (unit) => unit.building?.name || '-'
    },
    {
      key: 'floor',
      title: 'Floor',
      render: (unit) => unit.floor
    },
    {
      key: 'property_category',
      title: 'Type',
      render: (unit) => (
        <span className="capitalize">{unit.property_category?.replace('_', ' ')}</span>
      )
    },
    {
      key: 'total_area',
      title: 'Area',
      render: (unit) => `${unit.total_area} m²`
    },
    {
      key: 'bedrooms',
      title: 'Rooms',
      render: (unit) => (
        <span>
          {unit.bedrooms} bed / {unit.bathrooms} bath
        </span>
      )
    },
    {
      key: 'price',
      title: 'Price',
      render: (unit) => unit.price ? (
        <span className="font-medium">€{unit.price.toLocaleString()}</span>
      ) : '-'
    },
    {
      key: 'status',
      title: 'Status',
      render: (unit) => (
        <Badge className={UNIT_STATUS[unit.status]?.color || 'bg-gray-100'}>
          {UNIT_STATUS[unit.status]?.label || unit.status}
        </Badge>
      )
    }
  ]

  return (
    <>
      <PageHeader
        title="Units"
        description={projectName}
        backHref={`/${locale}/admin/projects/${projectId}`}
        action={{
          label: 'Add Unit',
          href: `/${locale}/admin/projects/${projectId}/units/new`
        }}
      />

      <ProjectSubNav />

      {/* Filters and Bulk Actions */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <Select 
            value={filterBuilding} 
            onValueChange={(value) => updateFilters({ building_id: value })}
            disabled={isPending}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Buildings" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Buildings</SelectItem>
              {buildings.map((building) => (
                <SelectItem key={building.id} value={building.id}>
                  {building.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select 
            value={filterStatus} 
            onValueChange={(value) => updateFilters({ status: value })}
            disabled={isPending}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {Object.entries(UNIT_STATUS).map(([value, { label }]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select 
            value={filterFloor} 
            onValueChange={(value) => updateFilters({ floor: value })}
            disabled={isPending}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="All Floors" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Floors</SelectItem>
              {floors.map((floor) => (
                <SelectItem key={floor} value={floor.toString()}>
                  Floor {floor}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Bulk Actions */}
        {selectedUnits.size > 0 && (
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-gray-500">
              {selectedUnits.size} selected
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" disabled={isBulkProcessing}>
                  {isBulkProcessing ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : null}
                  Change Status
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {Object.entries(UNIT_STATUS).map(([value, { label, color }]) => (
                  <DropdownMenuItem
                    key={value}
                    onClick={() => handleBulkStatusChange(value)}
                  >
                    <Badge className={`${color} mr-2`}>{label}</Badge>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700"
              onClick={() => setDeleteUnits(Array.from(selectedUnits))}
              disabled={isBulkProcessing}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        )}
      </div>

      <DataTable
        columns={columns}
        data={units}
        searchKey="unit_number"
        searchPlaceholder="Search units..."
        isLoading={isPending}
        emptyMessage="No units found. Add your first unit or adjust filters."
        editHref={(unit) => `/${locale}/admin/projects/${projectId}/units/${unit.id}`}
        onDelete={(unit) => handleDeleteUnit(unit)}
      />

      {/* Bulk Delete Confirmation */}
      <AlertDialog open={!!deleteUnits} onOpenChange={() => setDeleteUnits(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Units</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {deleteUnits?.length} selected units?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBulkDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete Units
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Toaster />
    </>
  )
}
