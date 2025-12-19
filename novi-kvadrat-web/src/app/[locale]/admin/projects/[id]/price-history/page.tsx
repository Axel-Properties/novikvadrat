'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { PageHeader, ProjectSubNav } from '@/components/admin'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { Loader2, Plus, Trash2, TrendingUp, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { PriceDynamicsChart } from '@/components/project-detail/price-dynamics-chart'
import type { ProjectPriceHistory } from '@/types/database'

export default function ProjectPriceHistoryPage() {
  const params = useParams()
  const { toast } = useToast()
  const [priceHistory, setPriceHistory] = useState<ProjectPriceHistory[]>([])
  const [projectName, setProjectName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteEntry, setDeleteEntry] = useState<ProjectPriceHistory | null>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [newEntry, setNewEntry] = useState({
    price_min: '',
    price_per_sqm_min: '',
    currency: 'EUR',
    recorded_at: new Date().toISOString().split('T')[0]
  })

  useEffect(() => {
    fetchProjectAndPriceHistory()
  }, [params.id])

  const fetchProjectAndPriceHistory = async () => {
    try {
      const [projectRes, priceHistoryRes] = await Promise.all([
        fetch(`/api/admin/projects/${params.id}`),
        fetch(`/api/admin/projects/${params.id}/price-history`)
      ])

      if (projectRes.ok) {
        const project = await projectRes.json()
        setProjectName(project.name)
      }

      if (priceHistoryRes.ok) {
        const data = await priceHistoryRes.json()
        setPriceHistory(data || [])
      }
    } catch (error) {
      console.error('Failed to fetch:', error)
      toast({
        title: 'Error',
        description: 'Failed to load price history',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddEntry = async () => {
    if (!newEntry.price_min || !newEntry.recorded_at) {
      toast({
        title: 'Error',
        description: 'Price and date are required',
        variant: 'destructive'
      })
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/admin/projects/${params.id}/price-history`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price_min: parseFloat(newEntry.price_min),
          price_per_sqm_min: newEntry.price_per_sqm_min ? parseFloat(newEntry.price_per_sqm_min) : null,
          currency: newEntry.currency,
          recorded_at: newEntry.recorded_at
        })
      })

      if (response.ok) {
        const addedEntry = await response.json()
        setPriceHistory(prev => [...prev, addedEntry].sort((a, b) => 
          new Date(a.recorded_at).getTime() - new Date(b.recorded_at).getTime()
        ))
        setShowAddDialog(false)
        setNewEntry({
          price_min: '',
          price_per_sqm_min: '',
          currency: 'EUR',
          recorded_at: new Date().toISOString().split('T')[0]
        })
        toast({
          title: 'Success',
          description: 'Price history entry added successfully'
        })
      } else {
        throw new Error('Failed to add entry')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add price history entry',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteEntry) return

    try {
      const response = await fetch(`/api/admin/projects/${params.id}/price-history/${deleteEntry.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setPriceHistory(prev => prev.filter(entry => entry.id !== deleteEntry.id))
        toast({
          title: 'Success',
          description: 'Price history entry deleted successfully'
        })
      } else {
        throw new Error('Failed to delete')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete price history entry',
        variant: 'destructive'
      })
    } finally {
      setDeleteEntry(null)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  // Calculate price change
  const getPriceChange = (index: number) => {
    if (index === 0) return null
    const current = priceHistory[index]
    const previous = priceHistory[index - 1]
    const change = ((current.price_min - previous.price_min) / previous.price_min) * 100
    return change
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    )
  }

  return (
    <>
      <PageHeader
        title="Price History"
        description={projectName}
        backHref={`/admin/projects/${params.id}`}
        action={{
          label: 'Add Entry',
          onClick: () => setShowAddDialog(true)
        }}
      />

      <ProjectSubNav />

      {/* Price Chart */}
      {priceHistory.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Price Dynamics Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <PriceDynamicsChart 
              priceHistory={priceHistory}
              currency="€"
              title="Price Change Over Time"
            />
          </CardContent>
        </Card>
      )}

      {/* Price History Table */}
      {priceHistory.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <TrendingUp className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500 mb-4">No price history entries yet</p>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add First Entry
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Price History Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 text-sm font-medium text-gray-700">Date</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-700">Min Price</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-700">Price/m²</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-700">Change</th>
                    <th className="text-right p-3 text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {priceHistory.map((entry, index) => {
                    const change = getPriceChange(index)
                    return (
                      <tr key={entry.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{formatDate(entry.recorded_at)}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className="font-semibold">{formatPrice(entry.price_min)}</span>
                        </td>
                        <td className="p-3">
                          {entry.price_per_sqm_min ? (
                            <span className="text-sm text-gray-600">
                              {formatPrice(entry.price_per_sqm_min)}
                            </span>
                          ) : (
                            <span className="text-sm text-gray-400">N/A</span>
                          )}
                        </td>
                        <td className="p-3">
                          {change !== null && (
                            <Badge 
                              variant={change > 0 ? 'error' : change < 0 ? 'success' : 'secondary'}
                              className={change > 0 ? 'bg-red-100 text-red-800' : change < 0 ? 'bg-green-100 text-green-800' : ''}
                            >
                              {change > 0 ? '+' : ''}{change.toFixed(2)}%
                            </Badge>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setDeleteEntry(entry)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add Entry Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Price History Entry</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recorded_at">Date *</Label>
              <Input
                id="recorded_at"
                type="date"
                value={newEntry.recorded_at}
                onChange={(e) => setNewEntry(prev => ({ ...prev, recorded_at: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price_min">Minimum Price (€) *</Label>
              <Input
                id="price_min"
                type="number"
                step="0.01"
                value={newEntry.price_min}
                onChange={(e) => setNewEntry(prev => ({ ...prev, price_min: e.target.value }))}
                placeholder="150000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price_per_sqm_min">Price per m² (€)</Label>
              <Input
                id="price_per_sqm_min"
                type="number"
                step="0.01"
                value={newEntry.price_per_sqm_min}
                onChange={(e) => setNewEntry(prev => ({ ...prev, price_per_sqm_min: e.target.value }))}
                placeholder="2500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Input
                id="currency"
                value={newEntry.currency}
                onChange={(e) => setNewEntry(prev => ({ ...prev, currency: e.target.value.toUpperCase() }))}
                placeholder="EUR"
                maxLength={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddEntry} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Add Entry
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteEntry} onOpenChange={() => setDeleteEntry(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Price History Entry</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the price entry from {deleteEntry && formatDate(deleteEntry.recorded_at)}? This action cannot be undone.
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
