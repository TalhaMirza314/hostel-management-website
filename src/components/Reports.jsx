import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Download, 
  Calendar, 
  Filter, 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Building2,
  FileText,
  BarChart3,
  PieChart,
  Eye,
  Printer
} from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Label } from './ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import Layout from './Layout'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area
} from 'recharts'

const Reports = ({ user, onLogout }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [selectedHostel, setSelectedHostel] = useState('all')

  // Mock data
  const hostels = [
    { id: 'all', name: 'All Hostels' },
    { id: 1, name: 'Downtown Hostel' },
    { id: 2, name: 'University Campus' },
    { id: 3, name: 'City Center' },
    { id: 4, name: 'Riverside' },
    { id: 5, name: 'Metro Station' }
  ]

  const monthlyFinancialData = [
    { month: 'Jan', income: 35000, expenses: 28000, profit: 7000, occupancy: 85 },
    { month: 'Feb', income: 38000, expenses: 30000, profit: 8000, occupancy: 88 },
    { month: 'Mar', income: 42000, expenses: 32000, profit: 10000, occupancy: 92 },
    { month: 'Apr', income: 45000, expenses: 35000, profit: 10000, occupancy: 89 },
    { month: 'May', income: 48000, expenses: 36000, profit: 12000, occupancy: 94 },
    { month: 'Jun', income: 45230, expenses: 34000, profit: 11230, occupancy: 87 }
  ]

  const expenseBreakdown = [
    { name: 'Maintenance', value: 35, amount: 11900, color: '#3b82f6' },
    { name: 'Utilities', value: 25, amount: 8500, color: '#10b981' },
    { name: 'Salaries', value: 30, amount: 10200, color: '#f59e0b' },
    { name: 'Supplies', value: 10, amount: 3400, color: '#ef4444' }
  ]

  const occupancyByHostel = [
    { name: 'Downtown', occupancy: 95, capacity: 50, occupied: 47 },
    { name: 'University', occupancy: 88, capacity: 80, occupied: 70 },
    { name: 'City Center', occupancy: 92, capacity: 60, occupied: 55 },
    { name: 'Riverside', occupancy: 75, capacity: 40, occupied: 30 },
    { name: 'Metro', occupancy: 83, capacity: 70, occupied: 58 }
  ]

  const revenueByHostel = [
    { name: 'Downtown', revenue: 15750, percentage: 25 },
    { name: 'University', revenue: 21000, percentage: 33 },
    { name: 'City Center', revenue: 19800, percentage: 31 },
    { name: 'Riverside', revenue: 9000, percentage: 14 },
    { name: 'Metro', revenue: 17400, percentage: 27 }
  ]

  const kpiData = {
    totalRevenue: 82950,
    totalExpenses: 34000,
    netProfit: 48950,
    profitMargin: 59,
    averageOccupancy: 87,
    totalTenants: 260,
    newTenants: 15,
    churnRate: 5.2
  }

  const reportTemplates = [
    {
      id: 1,
      name: 'Monthly Financial Report',
      description: 'Comprehensive income, expense, and profit analysis',
      icon: DollarSign,
      lastGenerated: '2024-06-30',
      format: 'PDF'
    },
    {
      id: 2,
      name: 'Occupancy Analysis',
      description: 'Room utilization and vacancy trends',
      icon: Building2,
      lastGenerated: '2024-06-28',
      format: 'PDF'
    },
    {
      id: 3,
      name: 'Tenant Report',
      description: 'Tenant demographics and payment status',
      icon: Users,
      lastGenerated: '2024-06-25',
      format: 'CSV'
    },
    {
      id: 4,
      name: 'Expense Breakdown',
      description: 'Detailed expense categorization and trends',
      icon: BarChart3,
      lastGenerated: '2024-06-30',
      format: 'PDF'
    }
  ]

  const handleGenerateReport = (reportId) => {
    // Simulate report generation
    console.log(`Generating report ${reportId}`)
  }

  const handleExportData = (format) => {
    // Simulate data export
    console.log(`Exporting data as ${format}`)
  }

  return (
    <Layout user={user} onLogout={onLogout} currentPage="reports">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
            <p className="text-muted-foreground">Comprehensive insights into your hostel operations</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export All
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="space-y-2">
            <Label>Time Period</Label>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Hostel</Label>
            <Select value={selectedHostel} onValueChange={setSelectedHostel}>
              <SelectTrigger className="w-48">
                <SelectValue />
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

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-600">PKR {(kpiData.totalRevenue * 280).toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600 ml-1">+12.5%</span>
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
                  <p className="text-sm font-medium text-muted-foreground">Net Profit</p>
                  <p className="text-2xl font-bold text-blue-600">PKR {(kpiData.netProfit * 280).toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-blue-600 ml-1">+18.3%</span>
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
                  <p className="text-sm font-medium text-muted-foreground">Avg. Occupancy</p>
                  <p className="text-2xl font-bold text-purple-600">{kpiData.averageOccupancy}%</p>
                  <div className="flex items-center mt-1">
                    <TrendingDown className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-red-600 ml-1">-2.1%</span>
                  </div>
                </div>
                <Building2 className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Tenants</p>
                  <p className="text-2xl font-bold text-orange-600">{kpiData.totalTenants}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600 ml-1">+{kpiData.newTenants} new</span>
                  </div>
                </div>
                <Users className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Analytics */}
        <Tabs defaultValue="financial" className="space-y-6">
          <TabsList>
            <TabsTrigger value="financial">Financial Analysis</TabsTrigger>
            <TabsTrigger value="occupancy">Occupancy Analysis</TabsTrigger>
            <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
            <TabsTrigger value="templates">Report Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="financial" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue vs Expenses */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue vs Expenses</CardTitle>
                  <CardDescription>Monthly financial performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyFinancialData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="income" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="expenses" stackId="2" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                    </AreaChart>
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
                    <RechartsPieChart>
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
                    </RechartsPieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {expenseBreakdown.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm">{item.name}</span>
                        </div>
                        <span className="text-sm font-medium">${item.amount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profit Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Profit Trend</CardTitle>
                <CardDescription>Monthly profit analysis over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyFinancialData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="profit" stroke="#3b82f6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="occupancy" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Occupancy by Hostel */}
              <Card>
                <CardHeader>
                  <CardTitle>Occupancy by Hostel</CardTitle>
                  <CardDescription>Current occupancy rates across properties</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={occupancyByHostel}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="occupancy" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Revenue by Hostel */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Hostel</CardTitle>
                  <CardDescription>Monthly revenue contribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueByHostel}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="revenue" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Occupancy Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Occupancy Trend</CardTitle>
                <CardDescription>Monthly occupancy rate changes</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyFinancialData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="occupancy" stroke="#f59e0b" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{kpiData.profitMargin}%</div>
                    <div className="text-sm text-muted-foreground">Profit Margin</div>
                    <div className="flex items-center justify-center mt-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600 ml-1">+5.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">{kpiData.churnRate}%</div>
                    <div className="text-sm text-muted-foreground">Churn Rate</div>
                    <div className="flex items-center justify-center mt-2">
                      <TrendingDown className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600 ml-1">-1.3%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">$319</div>
                    <div className="text-sm text-muted-foreground">Avg. Revenue per Room</div>
                    <div className="flex items-center justify-center mt-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600 ml-1">+8.7%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Performance Table */}
            <Card>
              <CardHeader>
                <CardTitle>Hostel Performance Comparison</CardTitle>
                <CardDescription>Detailed metrics for each property</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Hostel</th>
                        <th className="text-right p-2">Occupancy</th>
                        <th className="text-right p-2">Revenue</th>
                        <th className="text-right p-2">Avg. Rent</th>
                        <th className="text-right p-2">Performance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {occupancyByHostel.map((hostel, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2 font-medium">{hostel.name} Hostel</td>
                          <td className="p-2 text-right">{hostel.occupancy}%</td>
                          <td className="p-2 text-right">${revenueByHostel[index]?.revenue.toLocaleString()}</td>
                          <td className="p-2 text-right">${Math.round(revenueByHostel[index]?.revenue / hostel.occupied)}</td>
                          <td className="p-2 text-right">
                            <Badge className={hostel.occupancy > 90 ? 'bg-green-100 text-green-800' : 
                                           hostel.occupancy > 80 ? 'bg-yellow-100 text-yellow-800' : 
                                           'bg-red-100 text-red-800'}>
                              {hostel.occupancy > 90 ? 'Excellent' : 
                               hostel.occupancy > 80 ? 'Good' : 'Needs Attention'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            {/* Report Templates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reportTemplates.map((template) => (
                <Card key={template.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <template.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{template.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                          <div className="flex items-center space-x-4 mt-3 text-xs text-muted-foreground">
                            <span>Last generated: {template.lastGenerated}</span>
                            <Badge variant="secondary">{template.format}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button 
                        size="sm" 
                        onClick={() => handleGenerateReport(template.id)}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Generate
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Export Options */}
            <Card>
              <CardHeader>
                <CardTitle>Export Options</CardTitle>
                <CardDescription>Export data in various formats for external analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col"
                    onClick={() => handleExportData('pdf')}
                  >
                    <FileText className="h-6 w-6 mb-2" />
                    Export as PDF
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col"
                    onClick={() => handleExportData('csv')}
                  >
                    <Download className="h-6 w-6 mb-2" />
                    Export as CSV
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col"
                    onClick={() => handleExportData('print')}
                  >
                    <Printer className="h-6 w-6 mb-2" />
                    Print Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}

export default Reports

