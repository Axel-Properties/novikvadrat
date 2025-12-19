'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { PageHeader, DataTable, Column, ProjectSubNav } from '@/components/admin'
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
import { Badge } from '@/components/ui/badge'

interface Layout {
  id: string
  name: string
  layout_type: string
  total_area: number
  living_area: number | null
  terrace_area: number | null
  bedrooms: number | null
  bathrooms: number | null
  has_terrace: boolean
  has_loggia: boolean
  price_from: number | null
  price_to: number | null
  floor_plan_url: string | null
  total_units: number | null
  available_units: number | null
}

const layoutTypes = [
  { value: 'garsonjera', label: 'Garsonjera (Studio)' },
  { value: 'jednosoban', label: 'Jednosoban (1 Bedroom)' },
  { value: 'jednoiposoban', label: 'Jednoiposoban (1.5 Bedroom)' },
  { value: 'dvosoban', label: 'Dvosoban (2 Bedroom)' },
  { value: 'dvoiposoban', label: 'Dvoiposoban (2.5 Bedroom)' },
  { value: 'trosoban', label: 'Trosoban (3 Bedroom)' },
  { value: 'troiposoban', label: 'Troiposoban (3.5 Bedroom)' },
  { value: 'cetvorosoban', label: 'Četvorosoban (4 Bedroom)' },
  { value: 'petosoban', label: 'Petosoban (5 Bedroom)' },
  { value: 'penthouse', label: 'Penthouse' },
]

interface LayoutsPageClientProps {
  projectId: string
  locale: string
  initialProjectName: string
  initialLayouts: Layout[]
}

export function LayoutsPageClient({
  projectId,
  locale,
  initialProjectName,
  initialLayouts,
}: LayoutsPageClientProps) {
  const { toast } = useToast()
  const [layouts, setLayouts] = useState<Layout[]>(initialLayouts)
  const [projectName] = useState(initialProjectName)
  const [deleteLayout, setDeleteLayout] = useState<Layout | null>(null)

  const handleDelete = async () => {
    if (!deleteLayout) return

    try {
      const response = await fetch(`/api/admin/projects/${projectId}/layouts/${deleteLayout.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setLayouts(prev => prev.filter(l => l.id !== deleteLayout.id))
        toast({
          title: 'Success',
          description: 'Layout deleted successfully'
        })
      } else {
        throw new Error('Failed to delete')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete layout',
        variant: 'destructive'
      })
    } finally {
      setDeleteLayout(null)
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

  const columns: Column<Layout>[] = [
    {
      key: 'name',
      title: 'Name',
      render: (layout) => <span className="font-medium">{layout.name}</span>
    },
    {
      key: 'layout_type',
      title: 'Type',
      render: (layout) => (
        <Badge variant="outline">
          {layoutTypes.find(t => t.value === layout.layout_type)?.label || layout.layout_type}
        </Badge>
      )
    },
    {
      key: 'total_area',
      title: 'Area (m²)',
      render: (layout) => `${layout.total_area} m²`
    },
    {
      key: 'bedrooms',
      title: 'Bed/Bath',
      render: (layout) => `${layout.bedrooms || '-'} / ${layout.bathrooms || '-'}`
    },
    {
      key: 'price_from',
      title: 'Price Range',
      render: (layout) => `${formatPrice(layout.price_from)} - ${formatPrice(layout.price_to)}`
    },
    {
      key: 'units',
      title: 'Available',
      render: (layout) => (
        <span>{layout.available_units || 0} / {layout.total_units || 0}</span>
      )
    }
  ]

  return (
    <>
      <PageHeader
        title="Layouts"
        description={projectName}
        backHref={`/${locale}/admin/projects/${projectId}`}
        action={{
          label: 'Add Layout',
          href: `/${locale}/admin/projects/${projectId}/layouts/new`
        }}
      />

      <ProjectSubNav />

      <DataTable
        columns={columns}
        data={layouts}
        searchKey="name"
        searchPlaceholder="Search layouts..."
        emptyMessage="No layouts added yet"
        editHref={(layout) => `/${locale}/admin/projects/${projectId}/layouts/${layout.id}`}
        onDelete={(layout) => setDeleteLayout(layout)}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteLayout} onOpenChange={() => setDeleteLayout(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Layout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteLayout?.name}"? This action cannot be undone.
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
