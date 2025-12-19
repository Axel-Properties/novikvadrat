'use client'

import { useEffect, useState } from 'react'
import { PageHeader, DataTable, Column } from '@/components/admin'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
import { Check, X, CheckCircle, Building2 } from 'lucide-react'

interface Developer {
  id: string
  name: string
  slug: string
  pib: string | null
  logo_url: string | null
  is_verified: boolean
  total_projects: number
  active_projects: number
  completed_projects: number
  created_at: string
}

export default function DevelopersPage() {
  const [developers, setDevelopers] = useState<Developer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteDeveloper, setDeleteDeveloper] = useState<Developer | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchDevelopers()
  }, [])

  const fetchDevelopers = async () => {
    try {
      const response = await fetch('/api/admin/developers')
      if (response.ok) {
        const data = await response.json()
        setDevelopers(data)
      }
    } catch (error) {
      console.error('Failed to fetch developers:', error)
      toast({
        title: 'Error',
        description: 'Failed to load developers',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteDeveloper) return

    try {
      const response = await fetch(`/api/admin/developers/${deleteDeveloper.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setDevelopers(prev => prev.filter(d => d.id !== deleteDeveloper.id))
        toast({
          title: 'Success',
          description: 'Developer deleted successfully'
        })
      } else {
        throw new Error('Failed to delete')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete developer',
        variant: 'destructive'
      })
    } finally {
      setDeleteDeveloper(null)
    }
  }

  const columns: Column<Developer>[] = [
    {
      key: 'logo',
      title: '',
      className: 'w-[60px]',
      render: (dev) => (
        <Avatar className="h-10 w-10">
          <AvatarImage src={dev.logo_url || ''} alt={dev.name} />
          <AvatarFallback>
            <Building2 className="h-5 w-5 text-gray-400" />
          </AvatarFallback>
        </Avatar>
      )
    },
    {
      key: 'name',
      title: 'Name',
      render: (dev) => (
        <div>
          <span className="font-medium">{dev.name}</span>
          {dev.is_verified && (
            <CheckCircle className="h-4 w-4 text-blue-500 inline ml-2" />
          )}
        </div>
      )
    },
    {
      key: 'pib',
      title: 'PIB',
      render: (dev) => dev.pib || '-'
    },
    {
      key: 'slug',
      title: 'Slug',
      render: (dev) => (
        <code className="text-sm bg-gray-100 px-2 py-1 rounded">{dev.slug}</code>
      )
    },
    {
      key: 'projects',
      title: 'Projects',
      render: (dev) => (
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{dev.total_projects} total</Badge>
          <Badge variant="outline" className="text-green-600">{dev.active_projects} active</Badge>
        </div>
      )
    },
    {
      key: 'is_verified',
      title: 'Verified',
      render: (dev) => (
        dev.is_verified ? (
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            <Check className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        ) : (
          <Badge variant="secondary">
            <X className="h-3 w-3 mr-1" />
            Unverified
          </Badge>
        )
      )
    }
  ]

  return (
    <>
      <PageHeader
        title="Developers"
        description="Manage real estate developers"
        action={{
          label: 'Add Developer',
          href: '/admin/developers/new'
        }}
      />

      <DataTable
        columns={columns}
        data={developers}
        searchKey="name"
        searchPlaceholder="Search developers..."
        isLoading={isLoading}
        emptyMessage="No developers found. Add your first developer."
        rowHref={(dev) => `/admin/developers/${dev.id}`}
        editHref={(dev) => `/admin/developers/${dev.id}`}
        onDelete={(dev) => setDeleteDeveloper(dev)}
      />

      <AlertDialog open={!!deleteDeveloper} onOpenChange={() => setDeleteDeveloper(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Developer</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteDeveloper?.name}"? This action cannot be undone.
              All projects associated with this developer will be unlinked.
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
