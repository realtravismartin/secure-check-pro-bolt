import React, { useState, useEffect } from 'react'
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
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { 
  DollarSign, 
  Users, 
  Clock, 
  CheckCircle, 
  TrendingUp,
  FileText,
  Video,
  Mail
} from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 124750,
    activeCases: 23,
    resolvedCases: 187,
    avgResolutionTime: 4.2,
    successRate: 98.5
  })

  const [revenueData] = useState([
    { month: 'Jan', revenue: 15420, cases: 31 },
    { month: 'Feb', revenue: 18750, cases: 38 },
    { month: 'Mar', revenue: 22100, cases: 45 },
    { month: 'Apr', revenue: 19800, cases: 40 },
    { month: 'May', revenue: 25600, cases: 52 },
    { month: 'Jun', revenue: 23080, cases: 47 }
  ])

  const [caseStatusData] = useState([
    { name: 'Resolved', value: 187, color: '#10B981' },
    { name: 'In Progress', value: 23, color: '#3B82F6' },
    { name: 'Pending', value: 8, color: '#F59E0B' }
  ])

  const [recentCases] = useState([
    {
      id: 'CASE-2024-001',
      client: 'John Smith',
      company: 'TechCorp Inc.',
      amount: 1250,
      status: 'resolved',
      createdAt: '2024-01-15'
    },
    {
      id: 'CASE-2024-002',
      client: 'Sarah Johnson',
      company: 'ServicePro LLC',
      amount: 850,
      status: 'in-progress',
      createdAt: '2024-01-14'
    },
    {
      id: 'CASE-2024-003',
      client: 'Mike Davis',
      company: 'RetailMax',
      amount: 2100,
      status: 'pending',
      createdAt: '2024-01-13'
    }
  ])

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'text-green-600 bg-green-100'
      case 'in-progress': return 'text-blue-600 bg-blue-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Monitor your dispute resolution business performance
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +12.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeCases}</div>
              <p className="text-xs text-muted-foreground">
                +3 new this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolved Cases</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.resolvedCases}</div>
              <p className="text-xs text-muted-foreground">
                +8 this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Resolution</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgResolutionTime} days</div>
              <p className="text-xs text-muted-foreground">
                -0.3 days from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.successRate}%</div>
              <p className="text-xs text-muted-foreground">
                +0.5% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue and case volume</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Case Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Case Status Distribution</CardTitle>
              <CardDescription>Current case status breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={caseStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {caseStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Cases */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recent Cases</CardTitle>
            <CardDescription>Latest dispute resolution cases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCases.map((case_) => (
                <div key={case_.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-medium">{case_.id}</p>
                      <p className="text-sm text-gray-600">{case_.client}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{case_.company}</p>
                      <p className="text-sm text-gray-600">${case_.amount.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(case_.status)}`}>
                      {case_.status.replace('-', ' ')}
                    </span>
                    <p className="text-sm text-gray-600">{case_.createdAt}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="flex items-center gap-2 h-auto p-4">
                <FileText className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium">Generate Report</p>
                  <p className="text-xs opacity-70">Monthly performance report</p>
                </div>
              </Button>
              
              <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
                <Video className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium">Create Video</p>
                  <p className="text-xs opacity-70">New client proposal video</p>
                </div>
              </Button>
              
              <Button variant="outline" className="flex items-center gap-2 h-auto p-4">
                <Mail className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium">Send Update</p>
                  <p className="text-xs opacity-70">Client progress notification</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

