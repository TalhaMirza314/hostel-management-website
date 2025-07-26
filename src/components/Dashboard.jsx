import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Building2, 
  Users, 
  DollarSign, 
  TrendingUp,
  Home,
  UserCheck,
  AlertCircle,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { Badge } from './ui/badge'
import Layout from './Layout'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

const Dashboard = ({ user, onLogout }) => {
  const [timeRange, setTimeRange] = useState('month')

  // Mock data
  const stats = [
    {
      title: "Total Revenue",
      value: "PKR 12,664,400",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Active Tenants",
      value: "234",
      change: "+5.2%",
      trend: "up",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Occupancy Rate",
      value: "87%",
      change: "-2.1%",
      trend: "down",
      icon: Home,
      color: "text-orange-600"
    },
    {
      title: "Total Hostels",
      value: "12",
      change: "+1",
      trend: "up",
      icon: Building2,
      color: "text-purple-600"
    }
  ]

  const revenueData = [
    { month: 'Jan', revenue: 35000, expenses: 28000 },
    { month: 'Feb', revenue: 38000, expenses: 30000 },
    { month: 'Mar', revenue: 42000, expenses: 32000 },
    { month: 'Apr', revenue: 45000, expenses: 35000 },
    { month: 'May', revenue: 48000, expenses: 36000 },
    { month: 'Jun', revenue: 45230, expenses: 34000 }
  ]

  const occupancyData = [
    { name: 'Downtown Hostel', occupancy: 95, total: 50 },
    { name: 'University Campus', occupancy: 88, total: 80 },
    { name: 'City Center', occupancy: 92, total: 60 },
    { name: 'Riverside', occupancy: 75, total: 40 },
    { name: 'Metro Station', occupancy: 83, total: 70 }
  ]

  const expenseBreakdown = [
    { name: 'Maintenance', value: 35, color: '#3b82f6' },
    { name: 'Utilities', value: 25, color: '#10b981' },
    { name: 'Salaries', value: 30, color: '#f59e0b' },
    { name: 'Supplies', value: 10, color: '#ef4444' }
  ]

  const recentActivities = [
    {
      id: 1,
      type: 'tenant_checkin',
      message: 'New tenant checked in to Room 205, Downtown Hostel',
      time: '2 hours ago',
      icon: UserCheck,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'payment',
      message: 'Rent payment received from John Smith - PKR 238,000',
      time: '4 hours ago',
      icon: DollarSign,
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'maintenance',
      message: 'Maintenance request submitted for Room 301',
      time: '6 hours ago',
      icon: AlertCircle,
      color: 'text-orange-600'
    },
    {
      id: 4,
      type: 'checkout',
      message: 'Tenant checked out from Room 150, University Campus',
      time: '1 day ago',
      icon: Calendar,
      color: 'text-purple-600'
    }
  ]

  const upcomingPayments = [
    { tenant: 'Alice Johnson', amount: 'PKR 210,000', due: 'Today', status: 'due' },
    { tenant: 'Bob Wilson', amount: 'PKR 238,000', due: 'Tomorrow', status: 'upcoming' },
    { tenant: 'Carol Davis', amount: 'PKR 252,000', due: 'In 2 days', status: 'upcoming' },
    { tenant: 'David Brown', amount: 'PKR 224,000', due: 'In 3 days', status: 'upcoming' }
  ]

  return (
    <Layout user={user} onLogout={onLogout} currentPage="dashboard">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name}! Here's your hostel overview.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Export Report</Button>
            <Button size="sm">Add New Tenant</Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <div className="flex items-center mt-1">
                        {stat.trend === 'up' ? (
                          <ArrowUpRight className="h-4 w-4 text-green-600" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-red-600" />
                        )}
                        <span className={`text-sm ml-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue vs Expenses</CardTitle>
              <CardDescription>Monthly comparison for the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
                  <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Expense Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
              <CardDescription>Current month expense distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={expenseBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {expenseBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {expenseBreakdown.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                    <span className="text-sm font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Occupancy Status */}
          <Card>
            <CardHeader>
              <CardTitle>Occupancy Status</CardTitle>
              <CardDescription>Current occupancy by hostel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {occupancyData.map((hostel, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{hostel.name}</span>
                    <span className="text-muted-foreground">
                      {Math.round((hostel.occupancy / 100) * hostel.total)}/{hostel.total}
                    </span>
                  </div>
                  <Progress value={hostel.occupancy} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest updates from your hostels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full bg-muted ${activity.color}`}>
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Payments */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Payments</CardTitle>
              <CardDescription>Rent payments due soon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingPayments.map((payment, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{payment.tenant}</p>
                      <p className="text-xs text-muted-foreground">{payment.due}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{payment.amount}</p>
                      <Badge 
                        variant={payment.status === 'due' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {payment.status === 'due' ? 'Due' : 'Upcoming'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard

