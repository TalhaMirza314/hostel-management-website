import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Receipt,
  CreditCard,
  Building2,
  Upload
} from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from './ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import Layout from './Layout'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

const FinancialManagement = ({ user, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false)
  const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false)
  const [selectedExpense, setSelectedExpense] = useState(null)
  const [expenseFormData, setExpenseFormData] = useState({
    hostelId: '',
    category: '',
    amount: '',
    date: '',
    description: '',
    receipt: null
  })

  // Mock data
  const hostels = [
    { id: 1, name: 'Downtown Hostel' },
    { id: 2, name: 'University Campus' },
    { id: 3, name: 'City Center' },
    { id: 4, name: 'Riverside' },
    { id: 5, name: 'Metro Station' }
  ]

  const expenseCategories = [
    'Maintenance',
    'Utilities',
    'Salaries',
    'Supplies',
    'Marketing',
    'Insurance',
    'Other'
  ]

  const [expenses, setExpenses] = useState([
    {
      id: 1,
      hostelId: 1,
      hostelName: 'Downtown Hostel',
      category: 'Maintenance',
      amount: 336000,
      date: '2024-06-15',
      description: 'Plumbing repairs in Room 205',
      receipt: 'receipt_001.pdf',
      status: 'approved'
    },
    {
      id: 2,
      hostelId: 2,
      hostelName: 'University Campus',
      category: 'Utilities',
      amount: 238000,
      date: '2024-06-10',
      description: 'Monthly electricity bill',
      receipt: 'receipt_002.pdf',
      status: 'approved'
    },
    {
      id: 3,
      hostelId: 1,
      hostelName: 'Downtown Hostel',
      category: 'Supplies',
      amount: 126000,
      date: '2024-06-08',
      description: 'Cleaning supplies and toiletries',
      receipt: null,
      status: 'pending'
    },
    {
      id: 4,
      hostelId: 3,
      hostelName: 'City Center',
      category: 'Salaries',
      amount: 700000,
      date: '2024-06-01',
      description: 'Monthly staff salaries',
      receipt: 'receipt_004.pdf',
      status: 'approved'
    }
  ])

  const [invoices, setInvoices] = useState([
    {
      id: 1,
      tenantName: 'John Smith',
      hostelName: 'Downtown Hostel',
      roomNumber: '101',
      amount: 210000,
      dueDate: '2024-07-01',
      issueDate: '2024-06-01',
      status: 'paid',
      paidDate: '2024-06-28'
    },
    {
      id: 2,
      tenantName: 'Alice Johnson',
      hostelName: 'University Campus',
      roomNumber: '201',
      amount: 252000,
      dueDate: '2024-07-01',
      issueDate: '2024-06-01',
      status: 'pending',
      paidDate: null
    },
    {
      id: 3,
      tenantName: 'Bob Wilson',
      hostelName: 'City Center',
      roomNumber: '301',
      amount: 266000,
      dueDate: '2024-07-01',
      issueDate: '2024-06-01',
      status: 'overdue',
      paidDate: null
    }
  ])

  // Financial summary data
  const monthlyData = [
    { month: 'Jan', income: 9800000, expenses: 7840000 },
    { month: 'Feb', income: 10640000, expenses: 8400000 },
    { month: 'Mar', income: 11760000, expenses: 8960000 },
    { month: 'Apr', income: 12600000, expenses: 9800000 },
    { month: 'May', income: 13440000, expenses: 10080000 },
    { month: 'Jun', income: 12664400, expenses: 9520000 }
  ]

  const currentMonth = {
    totalIncome: 12664400,
    totalExpenses: 9520000,
    netProfit: 3144400,
    pendingPayments: 518000,
    overduePayments: 266000
  }

  const filteredExpenses = expenses.filter(expense =>
    expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.hostelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleExpenseSubmit = (e) => {
    e.preventDefault()
    const hostelName = hostels.find(h => h.id === parseInt(expenseFormData.hostelId))?.name

    if (selectedExpense) {
      // Update existing expense
      setExpenses(expenses.map(exp => 
        exp.id === selectedExpense.id 
          ? { 
              ...exp, 
              ...expenseFormData,
              hostelName,
              amount: parseFloat(expenseFormData.amount)
            }
          : exp
      ))
    } else {
      // Add new expense
      const newExpense = {
        id: Date.now(),
        ...expenseFormData,
        hostelName,
        amount: parseFloat(expenseFormData.amount),
        status: 'pending'
      }
      setExpenses([...expenses, newExpense])
    }
    setIsExpenseDialogOpen(false)
    setSelectedExpense(null)
    resetExpenseForm()
  }

  const resetExpenseForm = () => {
    setExpenseFormData({
      hostelId: '',
      category: '',
      amount: '',
      date: '',
      description: '',
      receipt: null
    })
  }

  const handleEditExpense = (expense) => {
    setSelectedExpense(expense)
    setExpenseFormData({
      hostelId: expense.hostelId.toString(),
      category: expense.category,
      amount: expense.amount.toString(),
      date: expense.date,
      description: expense.description,
      receipt: expense.receipt
    })
    setIsExpenseDialogOpen(true)
  }

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      case 'paid': return 'bg-green-100 text-green-800'
      case 'overdue': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'maintenance': return <Receipt className="h-4 w-4" />
      case 'utilities': return <DollarSign className="h-4 w-4" />
      case 'salaries': return <CreditCard className="h-4 w-4" />
      default: return <Receipt className="h-4 w-4" />
    }
  }

  return (
    <Layout user={user} onLogout={onLogout} currentPage="finances">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Financial Management</h1>
            <p className="text-muted-foreground">Track expenses, manage invoices, and monitor financial performance</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isExpenseDialogOpen} onOpenChange={setIsExpenseDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Expense
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>
                    {selectedExpense ? 'Edit Expense' : 'Add New Expense'}
                  </DialogTitle>
                  <DialogDescription>
                    {selectedExpense 
                      ? 'Update the expense information below.'
                      : 'Enter the details for the new expense.'
                    }
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleExpenseSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="hostelId">Hostel</Label>
                        <Select 
                          value={expenseFormData.hostelId} 
                          onValueChange={(value) => setExpenseFormData({...expenseFormData, hostelId: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select hostel" />
                          </SelectTrigger>
                          <SelectContent>
                            {hostels.map((hostel) => (
                              <SelectItem key={hostel.id} value={hostel.id.toString()}>
                                {hostel.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select 
                          value={expenseFormData.category} 
                          onValueChange={(value) => setExpenseFormData({...expenseFormData, category: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {expenseCategories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount (PKR)</Label>
                        <Input
                          id="amount"
                          type="number"
                          step="0.01"
                          value={expenseFormData.amount}
                          onChange={(e) => setExpenseFormData({...expenseFormData, amount: e.target.value})}
                          placeholder="Expense amount"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={expenseFormData.date}
                          onChange={(e) => setExpenseFormData({...expenseFormData, date: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={expenseFormData.description}
                        onChange={(e) => setExpenseFormData({...expenseFormData, description: e.target.value})}
                        placeholder="Expense description"
                        rows={3}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="receipt">Receipt (Optional)</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="receipt"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => setExpenseFormData({...expenseFormData, receipt: e.target.files[0]})}
                        />
                        <Button type="button" variant="outline" size="sm">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsExpenseDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {selectedExpense ? 'Update Expense' : 'Add Expense'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Generate Invoice
            </Button>
          </div>
        </div>

        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Income</p>
                  <p className="text-2xl font-bold text-green-600">PKR {currentMonth.totalIncome.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600 ml-1">+8.2%</span>
                  </div>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                  <p className="text-2xl font-bold text-red-600">PKR {currentMonth.totalExpenses.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    <TrendingDown className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-red-600 ml-1">-2.1%</span>
                  </div>
                </div>
                <Receipt className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Net Profit</p>
                  <p className="text-2xl font-bold text-blue-600">PKR {currentMonth.netProfit.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-blue-600 ml-1">+15.3%</span>
                  </div>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Payments</p>
                  <p className="text-2xl font-bold text-yellow-600">PKR {currentMonth.pendingPayments.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">2 invoices</p>
                </div>
                <Calendar className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Overdue Payments</p>
                  <p className="text-2xl font-bold text-red-600">PKR {currentMonth.overduePayments.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">1 invoice</p>
                </div>
                <CreditCard className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Financial Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
            <CardDescription>Monthly income vs expenses comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="income" fill="#10b981" name="Income" />
                <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tabs for Expenses and Invoices */}
        <Tabs defaultValue="expenses" className="space-y-6">
          <TabsList>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
          </TabsList>

          <TabsContent value="expenses" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search expenses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>

            {/* Expenses Table */}
            <Card>
              <CardHeader>
                <CardTitle>Expenses</CardTitle>
                <CardDescription>
                  Track and manage all hostel-related expenses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Expense Details</TableHead>
                      <TableHead>Hostel</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredExpenses.map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{expense.description}</div>
                            {expense.receipt && (
                              <div className="text-sm text-muted-foreground flex items-center">
                                <Receipt className="mr-1 h-3 w-3" />
                                {expense.receipt}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Building2 className="mr-2 h-4 w-4" />
                            {expense.hostelName}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {getCategoryIcon(expense.category)}
                            <span className="ml-2">{expense.category}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">PKR {expense.amount.toLocaleString()}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3" />
                            {new Date(expense.date).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(expense.status)}>
                            {expense.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditExpense(expense)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDeleteExpense(expense.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invoices" className="space-y-6">
            {/* Invoices Table */}
            <Card>
              <CardHeader>
                <CardTitle>Invoices</CardTitle>
                <CardDescription>
                  Manage rent invoices and payment tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tenant</TableHead>
                      <TableHead>Accommodation</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell>
                          <div className="font-medium">{invoice.tenantName}</div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{invoice.hostelName}</div>
                            <div className="text-sm text-muted-foreground">
                              Room {invoice.roomNumber}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">PKR {invoice.amount.toLocaleString()}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3" />
                            {new Date(invoice.dueDate).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(invoice.status)}>
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Invoice
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CreditCard className="mr-2 h-4 w-4" />
                                Mark as Paid
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Receipt className="mr-2 h-4 w-4" />
                                Send Reminder
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}

export default FinancialManagement

