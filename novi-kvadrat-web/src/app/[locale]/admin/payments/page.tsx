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
import { Loader2, Calendar, Euro, AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react'

interface Payment {
  id: string
  payment_number: string
  contract_id: string
  contract_number: string | null
  tenant_name: string | null
  period_start: string
  period_end: string
  due_date: string
  base_amount: number
  utilities_amount: number
  parking_amount: number
  other_fees: number
  late_fee: number
  discount: number
  total_amount: number
  amount_paid: number
  balance: number
  currency: string
  status: string
  payment_date: string | null
  payment_method: string | null
  transaction_reference: string | null
  notes: string | null
  created_at: string
}

interface RentalContract {
  id: string
  contract_number: string
  tenant_name: string
  rent_amount: number
}

const statusConfig: Record<string, { color: string; icon: any; label: string }> = {
  pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Pending' },
  partial: { color: 'bg-blue-100 text-blue-800', icon: AlertCircle, label: 'Partial' },
  paid: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Paid' },
  overdue: { color: 'bg-red-100 text-red-800', icon: AlertCircle, label: 'Overdue' },
  cancelled: { color: 'bg-gray-100 text-gray-800', icon: XCircle, label: 'Cancelled' },
  refunded: { color: 'bg-purple-100 text-purple-800', icon: XCircle, label: 'Refunded' }
}

export default function PaymentsPage() {
  const params = useParams()
  const { toast } = useToast()
  const locale = params.locale as string || 'en'
  const [payments, setPayments] = useState<Payment[]>([])
  const [contracts, setContracts] = useState<RentalContract[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deletePayment, setDeletePayment] = useState<Payment | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('')

  // Stats
  const [stats, setStats] = useState({
    totalCollected: 0,
    totalPending: 0,
    totalOverdue: 0,
    overdueCount: 0
  })

  const [formData, setFormData] = useState({
    contract_id: '',
    period_start: '',
    period_end: '',
    due_date: '',
    base_amount: '',
    utilities_amount: '',
    parking_amount: '',
    other_fees: '',
    late_fee: '',
    discount: '',
    total_amount: '',
    amount_paid: '',
    currency: 'EUR',
    status: 'pending',
    payment_date: '',
    payment_method: '',
    transaction_reference: '',
    notes: ''
  })

  useEffect(() => {
    fetchPayments()
    fetchContracts()
  }, [statusFilter])

  const fetchPayments = async () => {
    try {
      const url = statusFilter
        ? `/api/admin/payments?status=${statusFilter}`
        : '/api/admin/payments'
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setPayments(data)
        calculateStats(data)
      }
    } catch (error) {
      console.error('Failed to fetch payments:', error)
      toast({
        title: 'Error',
        description: 'Failed to load payments',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchContracts = async () => {
    try {
      const response = await fetch('/api/admin/rentals?status=active')
      if (response.ok) {
        const data = await response.json()
        setContracts(data)
      }
    } catch (error) {
      console.error('Failed to fetch contracts:', error)
    }
  }

  const calculateStats = (paymentsData: Payment[]) => {
    const collected = paymentsData
      .filter(p => p.status === 'paid')
      .reduce((sum, p) => sum + p.amount_paid, 0)
    const pending = paymentsData
      .filter(p => p.status === 'pending')
      .reduce((sum, p) => sum + p.total_amount, 0)
    const overdue = paymentsData.filter(p => p.status === 'overdue')
    const overdueAmount = overdue.reduce((sum, p) => sum + p.balance, 0)

    setStats({
      totalCollected: collected,
      totalPending: pending,
      totalOverdue: overdueAmount,
      overdueCount: overdue.length
    })
  }

  const handleOpenDialog = (payment?: Payment) => {
    if (payment) {
      setEditingPayment(payment)
      setFormData({
        contract_id: payment.contract_id,
        period_start: payment.period_start,
        period_end: payment.period_end,
        due_date: payment.due_date,
        base_amount: payment.base_amount.toString(),
        utilities_amount: payment.utilities_amount.toString(),
        parking_amount: payment.parking_amount.toString(),
        other_fees: payment.other_fees.toString(),
        late_fee: payment.late_fee.toString(),
        discount: payment.discount.toString(),
        total_amount: payment.total_amount.toString(),
        amount_paid: payment.amount_paid.toString(),
        currency: payment.currency,
        status: payment.status,
        payment_date: payment.payment_date || '',
        payment_method: payment.payment_method || '',
        transaction_reference: payment.transaction_reference || '',
        notes: payment.notes || ''
      })
    } else {
      setEditingPayment(null)
      setFormData({
        contract_id: '',
        period_start: '',
        period_end: '',
        due_date: '',
        base_amount: '',
        utilities_amount: '0',
        parking_amount: '0',
        other_fees: '0',
        late_fee: '0',
        discount: '0',
        total_amount: '',
        amount_paid: '0',
        currency: 'EUR',
        status: 'pending',
        payment_date: '',
        payment_method: '',
        transaction_reference: '',
        notes: ''
      })
    }
    setShowDialog(true)
  }

  const calculateTotal = () => {
    const base = parseFloat(formData.base_amount) || 0
    const utilities = parseFloat(formData.utilities_amount) || 0
    const parking = parseFloat(formData.parking_amount) || 0
    const other = parseFloat(formData.other_fees) || 0
    const late = parseFloat(formData.late_fee) || 0
    const discount = parseFloat(formData.discount) || 0
    return base + utilities + parking + other + late - discount
  }

  const handleSubmit = async () => {
    if (!formData.contract_id || !formData.due_date || !formData.base_amount) {
      toast({
        title: 'Error',
        description: 'Contract, due date, and base amount are required',
        variant: 'destructive'
      })
      return
    }

    setIsSubmitting(true)
    try {
      const url = editingPayment
        ? `/api/admin/payments/${editingPayment.id}`
        : '/api/admin/payments'
      const method = editingPayment ? 'PUT' : 'POST'

      const total = calculateTotal()

      const payload = {
        ...formData,
        base_amount: parseFloat(formData.base_amount),
        utilities_amount: parseFloat(formData.utilities_amount) || 0,
        parking_amount: parseFloat(formData.parking_amount) || 0,
        other_fees: parseFloat(formData.other_fees) || 0,
        late_fee: parseFloat(formData.late_fee) || 0,
        discount: parseFloat(formData.discount) || 0,
        total_amount: total,
        amount_paid: parseFloat(formData.amount_paid) || 0,
        payment_date: formData.payment_date || null,
        payment_method: formData.payment_method || null,
        transaction_reference: formData.transaction_reference || null
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        const savedPayment = await response.json()
        if (editingPayment) {
          setPayments(prev => prev.map(p => p.id === savedPayment.id ? savedPayment : p))
        } else {
          setPayments(prev => [savedPayment, ...prev])
        }
        setShowDialog(false)
        fetchPayments() // Refresh to update stats
        toast({
          title: 'Success',
          description: editingPayment ? 'Payment updated successfully' : 'Payment created successfully'
        })
      } else {
        const error = await response.json()
        throw new Error(error.message || 'Failed to save payment')
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save payment',
        variant: 'destructive'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!deletePayment) return

    try {
      const response = await fetch(`/api/admin/payments/${deletePayment.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setPayments(prev => prev.filter(p => p.id !== deletePayment.id))
        fetchPayments() // Refresh to update stats
        toast({
          title: 'Success',
          description: 'Payment deleted successfully'
        })
      } else {
        throw new Error('Failed to delete')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete payment',
        variant: 'destructive'
      })
    } finally {
      setDeletePayment(null)
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

  const columns: Column<Payment>[] = [
    {
      key: 'payment_number',
      title: 'Payment',
      render: (payment) => (
        <div>
          <span className="font-medium">{payment.payment_number}</span>
          <p className="text-sm text-gray-500">{payment.tenant_name}</p>
        </div>
      )
    },
    {
      key: 'period',
      title: 'Period',
      render: (payment) => (
        <div className="text-sm">
          <span>{formatDate(payment.period_start)}</span>
          <span className="text-gray-400 mx-1">-</span>
          <span>{formatDate(payment.period_end)}</span>
        </div>
      )
    },
    {
      key: 'due_date',
      title: 'Due Date',
      render: (payment) => (
        <div className="flex items-center gap-1 text-sm">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span>{formatDate(payment.due_date)}</span>
        </div>
      )
    },
    {
      key: 'total_amount',
      title: 'Amount',
      render: (payment) => (
        <div>
          <div className="font-medium">{formatCurrency(payment.total_amount, payment.currency)}</div>
          {payment.amount_paid > 0 && payment.amount_paid < payment.total_amount && (
            <p className="text-xs text-gray-500">
              Paid: {formatCurrency(payment.amount_paid, payment.currency)}
            </p>
          )}
        </div>
      )
    },
    {
      key: 'status',
      title: 'Status',
      render: (payment) => {
        const config = statusConfig[payment.status] || statusConfig.pending
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
        title="Payments"
        description="Track and manage rent payments"
        action={{
          label: 'Record Payment',
          onClick: () => handleOpenDialog()
        }}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Collected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(stats.totalCollected)}
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
            <CardTitle className="text-sm font-medium text-gray-500">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(stats.totalOverdue)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Overdue Count</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {stats.overdueCount}
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
            <SelectItem value="partial">Partial</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable
        columns={columns}
        data={payments}
        searchKey="payment_number"
        searchPlaceholder="Search payments..."
        isLoading={isLoading}
        emptyMessage="No payments found."
        onEdit={(payment) => handleOpenDialog(payment)}
        onDelete={(payment) => setDeletePayment(payment)}
      />

      {/* Add/Edit Payment Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPayment ? 'Edit Payment' : 'Record Payment'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Contract Selection */}
            <div className="space-y-2">
              <Label htmlFor="contract_id">Contract *</Label>
              <Select
                value={formData.contract_id}
                onValueChange={(value) => setFormData(prev => ({ ...prev, contract_id: value }))}
                disabled={!!editingPayment}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select contract" />
                </SelectTrigger>
                <SelectContent>
                  {contracts.map((contract) => (
                    <SelectItem key={contract.id} value={contract.id}>
                      {contract.contract_number} - {contract.tenant_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Period & Due Date */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="period_start">Period Start *</Label>
                <Input
                  id="period_start"
                  type="date"
                  value={formData.period_start}
                  onChange={(e) => setFormData(prev => ({ ...prev, period_start: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="period_end">Period End *</Label>
                <Input
                  id="period_end"
                  type="date"
                  value={formData.period_end}
                  onChange={(e) => setFormData(prev => ({ ...prev, period_end: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="due_date">Due Date *</Label>
                <Input
                  id="due_date"
                  type="date"
                  value={formData.due_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, due_date: e.target.value }))}
                />
              </div>
            </div>

            {/* Amounts */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-700">Amounts</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="base_amount">Base Rent *</Label>
                  <Input
                    id="base_amount"
                    type="number"
                    value={formData.base_amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, base_amount: e.target.value }))}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="utilities_amount">Utilities</Label>
                  <Input
                    id="utilities_amount"
                    type="number"
                    value={formData.utilities_amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, utilities_amount: e.target.value }))}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="late_fee">Late Fee</Label>
                  <Input
                    id="late_fee"
                    type="number"
                    value={formData.late_fee}
                    onChange={(e) => setFormData(prev => ({ ...prev, late_fee: e.target.value }))}
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Amount:</span>
                  <span className="text-lg font-bold">{formatCurrency(calculateTotal())}</span>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="space-y-4">
              <h3 className="font-medium text-sm text-gray-700">Payment Details</h3>
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
                      <SelectItem value="partial">Partial</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="overdue">Overdue</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount_paid">Amount Paid</Label>
                  <Input
                    id="amount_paid"
                    type="number"
                    value={formData.amount_paid}
                    onChange={(e) => setFormData(prev => ({ ...prev, amount_paid: e.target.value }))}
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="payment_date">Payment Date</Label>
                  <Input
                    id="payment_date"
                    type="date"
                    value={formData.payment_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, payment_date: e.target.value }))}
                  />
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
              <div className="space-y-2">
                <Label htmlFor="transaction_reference">Transaction Reference</Label>
                <Input
                  id="transaction_reference"
                  value={formData.transaction_reference}
                  onChange={(e) => setFormData(prev => ({ ...prev, transaction_reference: e.target.value }))}
                  placeholder="Reference number..."
                />
              </div>
            </div>

            {/* Notes */}
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
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {editingPayment ? 'Save Changes' : 'Record Payment'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletePayment} onOpenChange={() => setDeletePayment(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Payment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete payment "{deletePayment?.payment_number}"?
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
