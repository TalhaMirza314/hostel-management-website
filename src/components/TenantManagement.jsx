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
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Building2,
  CreditCard
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
import Layout from './Layout'

const TenantManagement = ({ user, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedTenant, setSelectedTenant] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    idCard: '',
    address: '',
    company: '',
    companyAddress: '',
    hostelId: '',
    roomId: '',
    joinDate: '',
    rent: '',
    securityDeposit: '',
    contractTerms: ''
  })

  // Mock data
  const hostels = [
    { id: 1, name: 'Downtown Hostel' },
    { id: 2, name: 'University Campus' },
    { id: 3, name: 'City Center' },
    { id: 4, name: 'Riverside' },
    { id: 5, name: 'Metro Station' }
  ]

  const rooms = [
    { id: 1, number: '101', hostelId: 1 },
    { id: 2, number: '102', hostelId: 1 },
    { id: 3, number: '201', hostelId: 2 },
    { id: 4, number: '202', hostelId: 2 },
    { id: 5, number: '301', hostelId: 3 }
  ]

  const [tenants, setTenants] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      idCard: 'ID123456789',
      address: '123 Main St, City',
      company: 'Tech Corp',
      companyAddress: '456 Business Ave',
      hostelId: 1,
      hostelName: 'Downtown Hostel',
      roomId: 1,
      roomNumber: '101',
      joinDate: '2024-01-15',
      rent: 750,
      securityDeposit: 1500,
      contractTerms: '12 months',
      status: 'active',
      paymentStatus: 'paid'
    },
    {
      id: 2,
      name: 'Alice Johnson',
      email: 'alice.johnson@email.com',
      phone: '+1 (555) 234-5678',
      idCard: 'ID987654321',
      address: '789 Oak St, City',
      company: 'Design Studio',
      companyAddress: '321 Creative Blvd',
      hostelId: 2,
      hostelName: 'University Campus',
      roomId: 3,
      roomNumber: '201',
      joinDate: '2024-02-01',
      rent: 900,
      securityDeposit: 1800,
      contractTerms: '6 months',
      status: 'active',
      paymentStatus: 'pending'
    },
    {
      id: 3,
      name: 'Bob Wilson',
      email: 'bob.wilson@email.com',
      phone: '+1 (555) 345-6789',
      idCard: 'ID456789123',
      address: '456 Pine St, City',
      company: 'Marketing Inc',
      companyAddress: '789 Commerce St',
      hostelId: 3,
      hostelName: 'City Center',
      roomId: 5,
      roomNumber: '301',
      joinDate: '2024-01-20',
      rent: 950,
      securityDeposit: 1900,
      contractTerms: '12 months',
      status: 'active',
      paymentStatus: 'paid'
    },
    {
      id: 4,
      name: 'Carol Davis',
      email: 'carol.davis@email.com',
      phone: '+1 (555) 456-7890',
      idCard: 'ID789123456',
      address: '321 Elm St, City',
      company: 'Finance Group',
      companyAddress: '654 Money Ave',
      hostelId: 1,
      hostelName: 'Downtown Hostel',
      roomId: 2,
      roomNumber: '102',
      joinDate: '2024-03-01',
      rent: 600,
      securityDeposit: 1200,
      contractTerms: '6 months',
      status: 'checkout',
      paymentStatus: 'paid'
    }
  ])

  const filteredTenants = tenants.filter(tenant =>
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.hostelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.roomNumber.includes(searchTerm)
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    const hostelName = hostels.find(h => h.id === parseInt(formData.hostelId))?.name
    const roomNumber = rooms.find(r => r.id === parseInt(formData.roomId))?.number

    if (selectedTenant) {
      // Update existing tenant
      setTenants(tenants.map(t => 
        t.id === selectedTenant.id 
          ? { 
              ...t, 
              ...formData,
              hostelName,
              roomNumber,
              rent: parseInt(formData.rent),
              securityDeposit: parseInt(formData.securityDeposit)
            }
          : t
      ))
    } else {
      // Add new tenant
      const newTenant = {
        id: Date.now(),
        ...formData,
        hostelName,
        roomNumber,
        rent: parseInt(formData.rent),
        securityDeposit: parseInt(formData.securityDeposit),
        status: 'active',
        paymentStatus: 'pending'
      }
      setTenants([...tenants, newTenant])
    }
    setIsAddDialogOpen(false)
    setSelectedTenant(null)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      idCard: '',
      address: '',
      company: '',
      companyAddress: '',
      hostelId: '',
      roomId: '',
      joinDate: '',
      rent: '',
      securityDeposit: '',
      contractTerms: ''
    })
  }

  const handleEdit = (tenant) => {
    setSelectedTenant(tenant)
    setFormData({
      name: tenant.name,
      email: tenant.email,
      phone: tenant.phone,
      idCard: tenant.idCard,
      address: tenant.address,
      company: tenant.company,
      companyAddress: tenant.companyAddress,
      hostelId: tenant.hostelId.toString(),
      roomId: tenant.roomId.toString(),
      joinDate: tenant.joinDate,
      rent: tenant.rent.toString(),
      securityDeposit: tenant.securityDeposit.toString(),
      contractTerms: tenant.contractTerms
    })
    setIsAddDialogOpen(true)
  }

  const handleDelete = (id) => {
    setTenants(tenants.filter(t => t.id !== id))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'checkout': return 'bg-gray-100 text-gray-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'overdue': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const availableRooms = rooms.filter(room => 
    formData.hostelId ? room.hostelId === parseInt(formData.hostelId) : true
  )

  return (
    <Layout user={user} onLogout={onLogout} currentPage="tenants">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Tenant Management</h1>
            <p className="text-muted-foreground">Manage tenant information and track their stay</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Tenant
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {selectedTenant ? 'Edit Tenant' : 'Add New Tenant'}
                </DialogTitle>
                <DialogDescription>
                  {selectedTenant 
                    ? 'Update the tenant information below.'
                    : 'Enter the details for the new tenant.'
                  }
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-6 py-4">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Personal Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="Enter full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="idCard">ID Card Number</Label>
                        <Input
                          id="idCard"
                          value={formData.idCard}
                          onChange={(e) => setFormData({...formData, idCard: e.target.value})}
                          placeholder="ID card number"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="Email address"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="Phone number"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        placeholder="Home address"
                        rows={2}
                      />
                    </div>
                  </div>

                  {/* Job Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Job Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                          placeholder="Company name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="companyAddress">Company Address</Label>
                        <Input
                          id="companyAddress"
                          value={formData.companyAddress}
                          onChange={(e) => setFormData({...formData, companyAddress: e.target.value})}
                          placeholder="Company address"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Accommodation Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Accommodation Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="hostelId">Hostel</Label>
                        <Select 
                          value={formData.hostelId} 
                          onValueChange={(value) => setFormData({...formData, hostelId: value, roomId: ''})}
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
                        <Label htmlFor="roomId">Room</Label>
                        <Select 
                          value={formData.roomId} 
                          onValueChange={(value) => setFormData({...formData, roomId: value})}
                          disabled={!formData.hostelId}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select room" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableRooms.map((room) => (
                              <SelectItem key={room.id} value={room.id.toString()}>
                                Room {room.number}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="joinDate">Join Date</Label>
                        <Input
                          id="joinDate"
                          type="date"
                          value={formData.joinDate}
                          onChange={(e) => setFormData({...formData, joinDate: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rent">Monthly Rent ($)</Label>
                        <Input
                          id="rent"
                          type="number"
                          value={formData.rent}
                          onChange={(e) => setFormData({...formData, rent: e.target.value})}
                          placeholder="Rent amount"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="securityDeposit">Security Deposit ($)</Label>
                        <Input
                          id="securityDeposit"
                          type="number"
                          value={formData.securityDeposit}
                          onChange={(e) => setFormData({...formData, securityDeposit: e.target.value})}
                          placeholder="Deposit amount"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contractTerms">Contract Terms</Label>
                      <Input
                        id="contractTerms"
                        value={formData.contractTerms}
                        onChange={(e) => setFormData({...formData, contractTerms: e.target.value})}
                        placeholder="e.g., 12 months"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {selectedTenant ? 'Update Tenant' : 'Add Tenant'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Tenants</p>
                  <p className="text-2xl font-bold">{tenants.length}</p>
                </div>
                <User className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Tenants</p>
                  <p className="text-2xl font-bold">
                    {tenants.filter(t => t.status === 'active').length}
                  </p>
                </div>
                <User className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Payments</p>
                  <p className="text-2xl font-bold">
                    {tenants.filter(t => t.paymentStatus === 'pending').length}
                  </p>
                </div>
                <CreditCard className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                  <p className="text-2xl font-bold">
                    ${tenants.filter(t => t.status === 'active').reduce((sum, t) => sum + t.rent, 0).toLocaleString()}
                  </p>
                </div>
                <CreditCard className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tenants..."
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

        {/* Tenants Table */}
        <Card>
          <CardHeader>
            <CardTitle>Tenants</CardTitle>
            <CardDescription>
              Manage tenant information and track their accommodation details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Accommodation</TableHead>
                  <TableHead>Financial</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTenants.map((tenant) => (
                  <TableRow key={tenant.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{tenant.name}</div>
                        <div className="text-sm text-muted-foreground">
                          ID: {tenant.idCard}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm flex items-center">
                          <Mail className="mr-1 h-3 w-3" />
                          {tenant.email}
                        </div>
                        <div className="text-sm flex items-center">
                          <Phone className="mr-1 h-3 w-3" />
                          {tenant.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium flex items-center">
                          <Building2 className="mr-1 h-3 w-3" />
                          {tenant.hostelName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Room {tenant.roomNumber}
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          Since {new Date(tenant.joinDate).toLocaleDateString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">${tenant.rent}/month</div>
                        <div className="text-sm text-muted-foreground">
                          Deposit: ${tenant.securityDeposit}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge className={getStatusColor(tenant.status)}>
                          {tenant.status}
                        </Badge>
                        <Badge className={getPaymentStatusColor(tenant.paymentStatus)}>
                          {tenant.paymentStatus}
                        </Badge>
                      </div>
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
                          <DropdownMenuItem onClick={() => handleEdit(tenant)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CreditCard className="mr-2 h-4 w-4" />
                            Payment History
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(tenant.id)}
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
      </div>
    </Layout>
  )
}

export default TenantManagement

