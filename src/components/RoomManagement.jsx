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
  Bed,
  Snowflake,
  Wifi,
  Car
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
import { Checkbox } from './ui/checkbox'
import Layout from './Layout'

const RoomManagement = ({ user, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [formData, setFormData] = useState({
    roomNumber: '',
    hostelId: '',
    capacity: '',
    type: '',
    rent: '',
    amenities: {
      ac: false,
      wifi: false,
      parking: false,
      laundry: false
    }
  })

  // Mock data
  const hostels = [
    { id: 1, name: 'Downtown Hostel' },
    { id: 2, name: 'University Campus' },
    { id: 3, name: 'City Center' },
    { id: 4, name: 'Riverside' },
    { id: 5, name: 'Metro Station' }
  ]

  const [rooms, setRooms] = useState([
    {
      id: 1,
      roomNumber: '101',
      hostelId: 1,
      hostelName: 'Downtown Hostel',
      capacity: 2,
      occupied: 2,
      type: 'AC',
      rent: 750,
      status: 'occupied',
      amenities: ['AC', 'WiFi', 'Parking'],
      tenant: 'John Smith'
    },
    {
      id: 2,
      roomNumber: '102',
      hostelId: 1,
      hostelName: 'Downtown Hostel',
      capacity: 1,
      occupied: 0,
      type: 'Non-AC',
      rent: 600,
      status: 'available',
      amenities: ['WiFi'],
      tenant: null
    },
    {
      id: 3,
      roomNumber: '201',
      hostelId: 2,
      hostelName: 'University Campus',
      capacity: 4,
      occupied: 3,
      type: 'AC',
      rent: 900,
      status: 'occupied',
      amenities: ['AC', 'WiFi', 'Laundry'],
      tenant: 'Alice Johnson'
    },
    {
      id: 4,
      roomNumber: '202',
      hostelId: 2,
      hostelName: 'University Campus',
      capacity: 2,
      occupied: 0,
      type: 'AC',
      rent: 800,
      status: 'maintenance',
      amenities: ['AC', 'WiFi'],
      tenant: null
    },
    {
      id: 5,
      roomNumber: '301',
      hostelId: 3,
      hostelName: 'City Center',
      capacity: 1,
      occupied: 1,
      type: 'AC',
      rent: 950,
      status: 'occupied',
      amenities: ['AC', 'WiFi', 'Parking', 'Laundry'],
      tenant: 'Bob Wilson'
    }
  ])

  const filteredRooms = rooms.filter(room =>
    room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.hostelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.tenant?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    const amenitiesList = Object.entries(formData.amenities)
      .filter(([key, value]) => value)
      .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))

    if (selectedRoom) {
      // Update existing room
      setRooms(rooms.map(r => 
        r.id === selectedRoom.id 
          ? { 
              ...r, 
              ...formData,
              hostelName: hostels.find(h => h.id === parseInt(formData.hostelId))?.name,
              capacity: parseInt(formData.capacity),
              rent: parseInt(formData.rent),
              amenities: amenitiesList
            }
          : r
      ))
    } else {
      // Add new room
      const newRoom = {
        id: Date.now(),
        ...formData,
        hostelName: hostels.find(h => h.id === parseInt(formData.hostelId))?.name,
        capacity: parseInt(formData.capacity),
        rent: parseInt(formData.rent),
        occupied: 0,
        status: 'available',
        amenities: amenitiesList,
        tenant: null
      }
      setRooms([...rooms, newRoom])
    }
    setIsAddDialogOpen(false)
    setSelectedRoom(null)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      roomNumber: '',
      hostelId: '',
      capacity: '',
      type: '',
      rent: '',
      amenities: {
        ac: false,
        wifi: false,
        parking: false,
        laundry: false
      }
    })
  }

  const handleEdit = (room) => {
    setSelectedRoom(room)
    setFormData({
      roomNumber: room.roomNumber,
      hostelId: room.hostelId.toString(),
      capacity: room.capacity.toString(),
      type: room.type,
      rent: room.rent.toString(),
      amenities: {
        ac: room.amenities.includes('AC'),
        wifi: room.amenities.includes('WiFi'),
        parking: room.amenities.includes('Parking'),
        laundry: room.amenities.includes('Laundry')
      }
    })
    setIsAddDialogOpen(true)
  }

  const handleDelete = (id) => {
    setRooms(rooms.filter(r => r.id !== id))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800'
      case 'occupied': return 'bg-blue-100 text-blue-800'
      case 'maintenance': return 'bg-yellow-100 text-yellow-800'
      case 'reserved': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getAmenityIcon = (amenity) => {
    switch (amenity.toLowerCase()) {
      case 'ac': return <Snowflake className="h-3 w-3" />
      case 'wifi': return <Wifi className="h-3 w-3" />
      case 'parking': return <Car className="h-3 w-3" />
      default: return <Bed className="h-3 w-3" />
    }
  }

  return (
    <Layout user={user} onLogout={onLogout} currentPage="rooms">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Room Management</h1>
            <p className="text-muted-foreground">Manage rooms across all your hostel properties</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Room
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>
                  {selectedRoom ? 'Edit Room' : 'Add New Room'}
                </DialogTitle>
                <DialogDescription>
                  {selectedRoom 
                    ? 'Update the room information below.'
                    : 'Enter the details for the new room.'
                  }
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="roomNumber">Room Number</Label>
                      <Input
                        id="roomNumber"
                        value={formData.roomNumber}
                        onChange={(e) => setFormData({...formData, roomNumber: e.target.value})}
                        placeholder="e.g., 101"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hostelId">Hostel</Label>
                      <Select 
                        value={formData.hostelId} 
                        onValueChange={(value) => setFormData({...formData, hostelId: value})}
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
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="capacity">Capacity</Label>
                      <Input
                        id="capacity"
                        type="number"
                        value={formData.capacity}
                        onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                        placeholder="Max occupants"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Type</Label>
                      <Select 
                        value={formData.type} 
                        onValueChange={(value) => setFormData({...formData, type: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Room type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AC">AC</SelectItem>
                          <SelectItem value="Non-AC">Non-AC</SelectItem>
                        </SelectContent>
                      </Select>
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
                  </div>
                  <div className="space-y-3">
                    <Label>Amenities</Label>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(formData.amenities).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-2">
                          <Checkbox
                            id={key}
                            checked={value}
                            onCheckedChange={(checked) => 
                              setFormData({
                                ...formData, 
                                amenities: { ...formData.amenities, [key]: checked }
                              })
                            }
                          />
                          <Label htmlFor={key} className="capitalize">
                            {key === 'ac' ? 'Air Conditioning' : key}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {selectedRoom ? 'Update Room' : 'Add Room'}
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
                  <p className="text-sm font-medium text-muted-foreground">Total Rooms</p>
                  <p className="text-2xl font-bold">{rooms.length}</p>
                </div>
                <Bed className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Available</p>
                  <p className="text-2xl font-bold">
                    {rooms.filter(r => r.status === 'available').length}
                  </p>
                </div>
                <Bed className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Occupied</p>
                  <p className="text-2xl font-bold">
                    {rooms.filter(r => r.status === 'occupied').length}
                  </p>
                </div>
                <Bed className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Maintenance</p>
                  <p className="text-2xl font-bold">
                    {rooms.filter(r => r.status === 'maintenance').length}
                  </p>
                </div>
                <Bed className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search rooms..."
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

        {/* Rooms Table */}
        <Card>
          <CardHeader>
            <CardTitle>Rooms</CardTitle>
            <CardDescription>
              Manage room details, occupancy, and amenities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Room</TableHead>
                  <TableHead>Hostel</TableHead>
                  <TableHead>Occupancy</TableHead>
                  <TableHead>Type & Rent</TableHead>
                  <TableHead>Amenities</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRooms.map((room) => (
                  <TableRow key={room.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">Room {room.roomNumber}</div>
                        {room.tenant && (
                          <div className="text-sm text-muted-foreground">
                            Tenant: {room.tenant}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{room.hostelName}</div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {room.occupied}/{room.capacity}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {Math.round((room.occupied / room.capacity) * 100)}% occupied
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">${room.rent}/month</div>
                        <div className="text-sm text-muted-foreground">{room.type}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {room.amenities.map((amenity, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            <span className="mr-1">{getAmenityIcon(amenity)}</span>
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(room.status)}>
                        {room.status}
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
                          <DropdownMenuItem onClick={() => handleEdit(room)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(room.id)}
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

export default RoomManagement

