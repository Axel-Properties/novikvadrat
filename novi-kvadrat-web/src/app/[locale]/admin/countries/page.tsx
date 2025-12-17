'use client'

import { useEffect, useState } from 'react'
import { PageHeader, DataTable, Column } from '@/components/admin'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'
import { Loader2, Check, X } from 'lucide-react'

interface Country {
  id: string
  name_en: string
  name_sr_lat: string
  name_sr_cyr: string
  country_code: string
  is_active: boolean
  created_at: string
}

const emptyCountry = {
  name_en: '',
  name_sr_lat: '',
  name_sr_cyr: '',
  country_code: '',
  is_active: true
}

export default function CountriesPage() {
  const { toast } = useToast()
  const [countries, setCountries] = useState<Country[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteCountry, setDeleteCountry] = useState<Country | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [editingCountry, setEditingCountry] = useState<Country | null>(null)
  const [formData, setFormData] = useState(emptyCountry)

  useEffect(() => {
    fetchCountries()
  }, [])

  const fetchCountries = async () => {
    try {
      const response = await fetch('/api/admin/countries')
      if (response.ok) {
        const data = await response.json()
        setCountries(data)
      }
    } catch (error) {
      console.error('Failed to fetch countries:', error)
      toast({
        title: 'Error',
        description: 'Failed to load countries',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenDialog = (country?: Country) => {
    if (country) {
      setEditingCountry(country)
      setFormData({
        name_en: country.name_en,
        name_sr_lat: country.name_sr_lat,
        name_sr_cyr: country.name_sr_cyr,
        country_code: country.country_code,
        is_active: country.is_active
      })
    } else {
      setEditingCountry(null)
      setFormData(emptyCountry)
    }
    setShowDialog(true)
  }

  const handleSubmit = async () => {
    if (!formData.name_en || !formData.country_code) {
      toast({
        title: 'Error',
        description: 'Name and country code are required',
        variant: 'destructive'
      })
      return
    }

    setIsSubmitting(true)
    try {
      const url = editingCountry 
        ? `/api/admin/countries/${editingCountry.id}`
        : '/api/admin/countries'

      const response = await fetch(url, {
        method: editingCountry ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const savedCountry = await response.json()
        if (editingCountry) {
          setCountries(prev => prev.map(c => c.id === savedCountry.id ? savedCountry : c))
        } else {
          setCountries(prev => [...prev, savedCountry])
        }
        setShowDialog(false)
        toast({
          title: 'Success',
          description: `Country ${editingCountry ? 'updated' : 'created'} successfully`
        })
      } else {
        const error = await response.json()
        throw new Error(error.message || 'Failed to save country')
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save country',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteCountry) return

    try {
      const response = await fetch(`/api/admin/countries/${deleteCountry.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setCountries(prev => prev.filter(c => c.id !== deleteCountry.id))
        toast({
          title: 'Success',
          description: 'Country deleted successfully'
        })
      } else {
        throw new Error('Failed to delete')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete country',
        variant: 'destructive'
      })
    } finally {
      setDeleteCountry(null)
    }
  }

  const columns: Column<Country>[] = [
    {
      key: 'name_en',
      title: 'Name (EN)',
      render: (country) => <span className="font-medium">{country.name_en}</span>
    },
    {
      key: 'name_sr_lat',
      title: 'Name (SR)'
    },
    {
      key: 'country_code',
      title: 'Code',
      render: (country) => (
        <code className="text-sm bg-gray-100 px-2 py-1 rounded">{country.country_code}</code>
      )
    },
    {
      key: 'is_active',
      title: 'Status',
      render: (country) => (
        country.is_active ? (
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
        title="Countries"
        description="Manage countries in the platform"
        action={{
          label: 'Add Country',
          onClick: () => handleOpenDialog()
        }}
      />

      <DataTable
        columns={columns}
        data={countries}
        searchKey="name_en"
        searchPlaceholder="Search countries..."
        isLoading={isLoading}
        emptyMessage="No countries found. Add your first country."
        onEdit={(country) => handleOpenDialog(country)}
        onDelete={(country) => setDeleteCountry(country)}
      />

      {/* Country Form Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCountry ? 'Edit Country' : 'Add Country'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name_en">Name (English) *</Label>
              <Input
                id="name_en"
                value={formData.name_en}
                onChange={(e) => setFormData(prev => ({ ...prev, name_en: e.target.value }))}
                placeholder="e.g., Serbia"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name_sr_lat">Name (Serbian Latin) *</Label>
                <Input
                  id="name_sr_lat"
                  value={formData.name_sr_lat}
                  onChange={(e) => setFormData(prev => ({ ...prev, name_sr_lat: e.target.value }))}
                  placeholder="e.g., Srbija"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name_sr_cyr">Name (Serbian Cyrillic) *</Label>
                <Input
                  id="name_sr_cyr"
                  value={formData.name_sr_cyr}
                  onChange={(e) => setFormData(prev => ({ ...prev, name_sr_cyr: e.target.value }))}
                  placeholder="e.g., Србија"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="country_code">Country Code (2 chars) *</Label>
              <Input
                id="country_code"
                value={formData.country_code}
                onChange={(e) => setFormData(prev => ({ ...prev, country_code: e.target.value.toUpperCase() }))}
                placeholder="e.g., RS"
                maxLength={2}
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
              />
              <Label htmlFor="is_active">Active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {editingCountry ? 'Save Changes' : 'Add Country'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteCountry} onOpenChange={() => setDeleteCountry(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Country</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteCountry?.name_en}"? 
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
