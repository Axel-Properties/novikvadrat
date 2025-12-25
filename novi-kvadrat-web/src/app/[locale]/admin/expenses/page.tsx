'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { PageHeader, DataTable, Column } from '@/components/admin'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'
import { Loader2, Calendar, Euro, CheckCircle, Clock, XCircle, Receipt } from 'lucide-react'

interface Expense {
  id: string
  expense_number: string
  category_id: string | null
  category_name: string | null
  category_color: string | null
  vendor_id: string | null
  vendor_name: string | null
  project_id: string | null
  project_name: string | null
  title: string
  description: string | null
  amount: number
  tax_amount: number
  total_amount: number
  currency: string
  expense_date: string
  due_date: string | null
  paid_date: string | null
  status: string
  payment_method: string | null
  notes: string | null
  created_at: string
}

interface Category {
  id: string
  name: string
  color: string
}

interface Vendor {
  id: string
  name: string
}

interface Project {
  id: string
  name: string
}

const statusConfig: Record<string, { color: string; icon: any; label: string }> = {
  pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Pending' },
  approved: { color: 'bg-blue-100 text-blue-800', icon: CheckCircle, label: 'Approved' },
  paid: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Paid' },
  rejected: { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Rejected' },
  cancelled: { color: 'bg-gray-100 text-gray-800', icon: XCircle, label: 'Cancelled' }
}

export default function ExpensesPage() {
  const params = useParams()
  const { toast } = useToast()
  const locale = params.locale as string || 'en'
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteExpense, setDeleteExpense] = useState<Expense | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [categoryFilter, setCategoryFilter] = useState<string>('')

  // Stats
  const [stats, setStats] = useState({
    totalExpenses: 0,
    totalPaid: 0,
    totalPending: 0,
    thisMonth: 0
  })

  const [formData, setFormData] = useState({
    category_id: '',
    vendor_id: '',
    project_id: '',
    title: '',
    description: '',
    amount: '',
    tax_amount: '',
    currency: 'EUR',
    expense_date: '',
    due_date: '',
    paid_date: '',
    status: 'pending',
    payment_method: '',
    notes: ''
  })

  useEffect(() => {
    fetchExpenses()
    fetchCategories()
    fetchVendors()
    fetchProjects()
  }, [statusFilter, categoryFilter])

  const fetchExpenses = async () => {
    try {
      let url = '/api/admin/expenses'
      const params = new URLSearchParams()
      if (statusFilter) params.append('status', statusFilter)
      if (categoryFilter) params.append('category_id', categoryFilter)
      if (params.toString()) url += '?' + params.toString()

      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setExpenses(data)
        calculateStats(data)
      }
    } catch (error) {
      console.error('Failed to fetch expenses:', error)
      toast({
        title: 'Error',
        description: 'Failed to load expenses',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/expense-categories')
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  const fetchVendors = async () => {
    try {
      const response = await fetch('/api/admin/vendors?is_active=true')
      if (response.ok) {
        const data = await response.json()
        setVendors(data)
      }
    } catch (error) {
      console.error('Failed to fetch vendors:', error)
    }
  }

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/admin/projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    }
  }

  const calculateStats = (expensesData: Expense[]) => {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    const total = expensesData.reduce((sum, e) => sum + e.total_amount, 0)
    const paid = expensesData
      .filter(e => e.status === 'paid')
      .reduce((sum, e) => sum + e.total_amount, 0)
    const pending = expensesData
      .filter(e => e.status === 'pending')
      .reduce((sum, e) => sum + e.total_amount, 0)
    const thisMonth = expensesData
      .filter(e => {
        const expenseDate = new Date(e.expense_date)
        return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear
      })
      .reduce((sum, e) => sum + e.total_amount, 0)

    setStats({
      totalExpenses: total,
      totalPaid: paid,
      totalPending: pending,
      thisMonth: thisMonth
    })
  }

  const handleOpenDialog = (expense?: Expense) => {
    if (expense) {
      setEditingExpense(expense)
      setFormData({
        category_id: expense.category_id || '',
        vendor_id: expense.vendor_id || '',
        project_id: expense.project_id || '',
        title: expense.title,
        description: expense.description || '',
        amount: expense.amount.toString(),
        tax_amount: expense.tax_amount.toString(),
        currency: expense.currency,
        expense_date: expense.expense_date,
        due_date: expense.due_date || '',
        paid_date: expense.paid_date || '',
        status: expense.status,
        payment_method: expense.payment_method || '',
        notes: expense.notes || ''
      })
    } else {
      setEditingExpense(null)
      setFormData({
        category_id: '',
        vendor_id: '',
        project_id: '',
        title: '',
        description: '',
        amount: '',
        tax_amount: '0',
        currency: 'EUR',
        expense_date: new Date().toISOString().split('T')[0],
        due_date: '',
        paid_date: '',
        status: 'pending',
        payment_method: '',
        notes: ''
      })
    }
    setShowDialog(true)
  }

  const handleSubmit = async () => {
    if (!formData.title || !formData.amount || !formData.expense_date) {
      toast({
        title: 'Error',
        description: 'Title, amount, and expense date are required',
        variant: 'destructive'
      })
      return
    }

    setIsSubmitting(true)
    try {
      const url = editingExpense
        ? `/api/admin/expenses/${editingExpense.id}`
        : '/api/admin/expenses'
      const method = editingExpense ? 'PUT' : 'POST'

      const payload = {
        ...formData,
        amount: parseFloat(formData.amount),
        tax_amount: parseFloat(formData.tax_amount) || 0,
        category_id: formData.category_id || null,
        vendor_id: formData.vendor_id || null,
        project_id: formData.project_id || null,
        due_date: formData.due_date || null,
        paid_date: formData.paid_date || null,
        payment_method: formData.payment_method || null
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        const savedExpense = await response.json()
        if (editingExpense) {
          setExpenses(prev => prev.map(e => e.id === savedExpense.id ? savedExpense : e))
        } else {
          setExpenses(prev => [savedExpense, ...prev])
        }
        setShowDialog(false)
        fetchExpenses() // Refresh to update stats
        toast({
          title: 'Success',
          description: editingExpense ? 'Expense updated successfully' : 'Expense created successfully'
        })
      } else {
        const error = await response.json()
        throw new Error(error.message || 'Failed to save expense')
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save expense',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteExpense) return

    try {
      const response = await fetch(`/api/admin/expenses/${deleteExpense.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setExpenses(prev => prev.filter(e => e.id !== deleteExpense.id))
        fetchExpenses()
        toast({
          title: 'Success',
          description: 'Expense deleted successfully'
        })
      } else {
        throw new Error('Failed to delete')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete expense',
        variant: 'destructive'
      })
    } finally {
      setDeleteExpense(null)
    }
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatCurrency = (amount: number, currency: string = 'EUR') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(amount)
  }

  const columns: Column<Expense>[] = [
    {
      key: 'expense_number',
      title: 'Expense',
      render: (expense) => (
        <div>
          <span className="font-medium">{expense.expense_number}</span>
          <p className="text-sm text-gray-600 truncate max-w-[200px]">{expense.title}</p>
        </div>
      )
    },
    {
      key: 'category',
      title: 'Category',
      render: (expense) => (
        expense.category_name ? (
          <Badge
            style={{ backgroundColor: (expense.category_color || '#666666') + '20', color: expense.category_color || '#666666' }}
          >
            {expense.category_name}
          </Badge>
        ) : (
          <span className="text-gray-400">-</span>
        )
      )
    },
    {
      key: 'vendor',
      title: 'Vendor',
      render: (expense) => (
        <span className="text-sm">{expense.vendor_name || '-'}</span>
      )
    },
    {
      key: 'expense_date',
      title: 'Date',
      render: (expense) => (
        <div className="flex items-center gap-1 text-sm">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span>{formatDate(expense.expense_date)}</span>
        </div>
      )
    },
    {
      key: 'total_amount',
      title: 'Amount',
      render: (expense) => (
        <div className="font-medium">
          {formatCurrency(expense.total_amount, expense.currency)}
        </div>
      )
    },
    {
      key: 'status',
      title: 'Status',
      render: (expense) => {
        const config = statusConfig[expense.status] || statusConfig.pending
        const Icon = config.icon
        return (
          <Badge className={config.color}>
            <Icon className="h-3 w-3 mr-1" />
            {config.label}
          </Badge>
        )
      }
    }
  ]

  return (
    <>
      <PageHeader
        title="Expenses"
        description="Track and manage property expenses"
        action={{
          label: 'Add Expense',
          onClick: () => handleOpenDialog()
        }}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(stats.totalExpenses)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(stats.totalPaid)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {formatCurrency(stats.totalPending)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(stats.thisMonth)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <DataTable
        columns={columns}
        data={expenses}
        searchKey="title"
        searchPlaceholder="Search expenses..."
        isLoading={isLoading}
        emptyMessage="No expenses found. Add your first expense."
        onEdit={(expense) => handleOpenDialog(expense)}
        onDelete={(expense) => setDeleteExpense(expense)}
      />

      {/* Add/Edit Expense Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingExpense ? 'Edit Expense' : 'Add Expense'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Expense title"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category_id">Category</Label>
                  <Select
                    value={formData.category_id}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category_id: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vendor_id">Vendor</Label>
                  <Select
                    value={formData.vendor_id}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, vendor_id: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select vendor" />
                    </SelectTrigger>
                    <SelectContent>
                      {vendors.map((vendor) => (
                        <SelectItem key={vendor.id} value={vendor.id}>{vendor.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="project_id">Project (optional)</Label>
                <Select
                  value={formData.project_id}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, project_id: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>{project.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Amounts */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-700">Amounts</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount *</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax_amount">Tax Amount</Label>
                  <Input
                    id="tax_amount"
                    type="number"
                    value={formData.tax_amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, tax_amount: e.target.value }))}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={formData.currency}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="RSD">RSD</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expense_date">Expense Date *</Label>
                <Input
                  id="expense_date"
                  type="date"
                  value={formData.expense_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, expense_date: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="due_date">Due Date</Label>
                <Input
                  id="due_date"
                  type="date"
                  value={formData.due_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, due_date: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paid_date">Paid Date</Label>
                <Input
                  id="paid_date"
                  type="date"
                  value={formData.paid_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, paid_date: e.target.value }))}
                />
              </div>
            </div>

            {/* Status & Payment */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment_method">Payment Method</Label>
                <Select
                  value={formData.payment_method}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, payment_method: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Description & Notes */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Expense description..."
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Additional notes..."
                  rows={2}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {editingExpense ? 'Save Changes' : 'Add Expense'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteExpense} onOpenChange={() => setDeleteExpense(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Expense</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete expense "{deleteExpense?.expense_number}"?
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
