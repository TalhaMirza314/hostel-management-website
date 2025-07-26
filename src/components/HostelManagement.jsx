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
  MapPin,
  Phone,
  Mail,
  Building2
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
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import Layout from './Layout'

const HostelManagement = ({ user, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedHostel, setSelectedHostel] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    description: '',
    capacity: ''
  })

  // Mock data
  const [hostels, setHostels] = useState([
    {
      id: 1,
      name: 'Downtown Hostel',
      address: '123 Main St, Downtown',
      phone: '+1 (555) 123-4567',
      email: 'downtown@hostelhub.com',
      description: 'Modern hostel in the heart of downtown',
      capacity: 50,
      occupied: 47,
      status: 'active',
      revenue: 15750
    },
    {
      id: 2,
      name: 'University Campus',
      address: '456 College Ave, University District',
      phone: '+1 (555) 234-5678',
      email: 'campus@hostelhub.com',
      description: 'Student-focused accommodation near campus',
      capacity: 80,
      occupied: 70,
      status: 'active',
      revenue: 21000
    },
    {
      id: 3,
      name: 'City Center',
      address: '789 Business Blvd, City Center',
      phone: '+1 (555) 345-6789',
      email: 'center@hostelhub.com',
      description: 'Premium hostel for business travelers',
      capacity: 60,
      occupied: 55,
      status: 'active',
      revenue: 19800
    },
    {
      id: 4,
      name: 'Riverside',
      address: '321 River Rd, Riverside',
      phone: '+1 (555) 456-7890',
      email: 'riverside@hostelhub.com',
      description: 'Scenic hostel with river views',
      capacity: 40,
      occupied: 30,
      status: 'maintenance',
      revenue: 9000
    },
    {
      id: 5,
      name: 'Metro Station',
      address: '654 Transit Way, Metro District',
      phone: '+1 (555) 567-8901',
      email: 'metro@hostelhub.com',
      description: 'Convenient location near public transport',
      capacity: 70,
      occupied: 58,
      status: 'active',
      revenue: 17400
    }
  ])

  const filteredHostels = hostels.filter(hostel =>
    hostel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hostel.address.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedHostel) {
      // Update existing hostel
      setHostels(hostels.map(h => 
        h.id === selectedHostel.id 
          ? { ...h, ...formData, capacity: parseInt(formData.capacity) }
          : h
      ))
    } else {
      // Add new hostel
      const newHostel = {
        id: Date.now(),
        ...formData,
        capacity: parseInt(formData.capacity),
        occupied: 0,
        status: 'active',
        revenue: 0
      }
      setHostels([...hostels, newHostel])
    }
    setIsAddDialogOpen(false)
    setSelectedHostel(null)
    setFormData({
      name: '',
      address: '',
      phone: '',
      email: '',
      description: '',
      capacity: ''
    })
  }

  const handleEdit = (hostel) => {
    setSelectedHostel(hostel)
    setFormData({
      name: hostel.name,
      address: hostel.address,
      phone: hostel.phone,
      email: hostel.email,
      description: hostel.description,
      capacity: hostel.capacity.toString()
    })
    setIsAddDialogOpen(true)
  }

  const handleDelete = (id) => {
    setHostels(hostels.filter(h => h.id !== id))
  }

  const getOccupancyRate = (occupied, capacity) => {
    return Math.round((occupied / capacity) * 100)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'maintenance': return 'bg-yellow-100 text-yellow-800'
      case 'inactive': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Layout user={user} onLogout={onLogout} currentPage="hostels">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Hostel Management</h1>
            <p className="text-muted-foreground">Manage your hostel properties and their details</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Hostel
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>
                  {selectedHostel ? 'Edit Hostel' : 'Add New Hostel'}
                </DialogTitle>
                <DialogDescription>
                  {selectedHostel 
                    ? 'Update the hostel information below.'
                    : 'Enter the details for the new hostel property.'
                  }
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Hostel Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Enter hostel name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="capacity">Capacity</Label>
                      <Input
                        id="capacity"
                        type="number"
                        value={formData.capacity}
                        onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                        placeholder="Total rooms"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      placeholder="Enter full address"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
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
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="Contact email"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Brief description of the hostel"
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {selectedHostel ? 'Update Hostel' : 'Add Hostel'}
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
                  <p className="text-sm font-medium text-muted-foreground">Total Hostels</p>
                  <p className="text-2xl font-bold">{hostels.length}</p>
                </div>
                <Building2 className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Capacity</p>
                  <p className="text-2xl font-bold">{hostels.reduce((sum, h) => sum + h.capacity, 0)}</p>
                </div>
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Occupied Rooms</p>
                  <p className="text-2xl font-bold">{hostels.reduce((sum, h) => sum + h.occupied, 0)}</p>
                </div>
                <Building2 className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Occupancy</p>
                  <p className="text-2xl font-bold">
                    {Math.round(
                      (hostels.reduce((sum, h) => sum + h.occupied, 0) / 
                       hostels.reduce((sum, h) => sum + h.capacity, 0)) * 100
                    )}%
                  </p>
                </div>
                <Building2 className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search hostels..."
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

        {/* Hostels Table */}
        <Card>
          <CardHeader>
            <CardTitle>Hostels</CardTitle>
            <CardDescription>
              Manage your hostel properties and view their current status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hostel</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Occupancy</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHostels.map((hostel) => (
                  <TableRow key={hostel.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{hostel.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <MapPin className="mr-1 h-3 w-3" />
                          {hostel.address}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm flex items-center">
                          <Phone className="mr-1 h-3 w-3" />
                          {hostel.phone}
                        </div>
                        <div className="text-sm flex items-center">
                          <Mail className="mr-1 h-3 w-3" />
                          {hostel.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {hostel.occupied}/{hostel.capacity}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {getOccupancyRate(hostel.occupied, hostel.capacity)}% occupied
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        ${hostel.revenue.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(hostel.status)}>
                        {hostel.status}
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
                          <DropdownMenuItem onClick={() => handleEdit(hostel)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(hostel.id)}
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

export default HostelManagement

