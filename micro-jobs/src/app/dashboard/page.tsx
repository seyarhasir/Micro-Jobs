'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { 
  Briefcase, 
  DollarSign, 
  Clock, 
  MapPin, 
  Plus,
  Eye,
  MessageSquare,
  Star,
  TrendingUp,
  Users,
  Calendar
} from 'lucide-react';

// Mock data
const mockDashboardData = {
  stats: {
    totalJobs: 12,
    activeApplications: 8,
    completedJobs: 24,
    totalEarnings: 2400
  },
  recentJobs: [
    {
      id: '1',
      title: 'House Cleaning - 3 Bedroom Apartment',
      status: 'open',
      applications: 3,
      createdAt: new Date('2024-01-15'),
      budget: { min: 80, max: 120, currency: 'USD' }
    },
    {
      id: '2',
      title: 'Moving Help - Small Apartment',
      status: 'in_progress',
      applications: 7,
      createdAt: new Date('2024-01-14'),
      budget: { min: 150, max: 200, currency: 'USD' }
    }
  ],
  recentApplications: [
    {
      id: '1',
      jobTitle: 'Garden Maintenance - Weekly',
      jobId: '3',
      status: 'pending',
      appliedAt: new Date('2024-01-13'),
      proposedRate: 70
    },
    {
      id: '2',
      jobTitle: 'Math Tutoring - High School',
      jobId: '4',
      status: 'accepted',
      appliedAt: new Date('2024-01-12'),
      proposedRate: 35
    }
  ]
};

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const [dashboardData, setDashboardData] = useState(mockDashboardData);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-xl font-semibold mb-2">Please log in</h2>
              <p className="text-gray-600 mb-4">
                You need to be logged in to view your dashboard.
              </p>
              <Link href="/login">
                <Button>Log In</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600">
            {user.role === 'employer' 
              ? 'Manage your job postings and applications' 
              : 'Track your job applications and earnings'
            }
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {user.role === 'employer' ? (
            <>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Briefcase className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {dashboardData.stats.totalJobs}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <MessageSquare className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Applications</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {dashboardData.stats.activeApplications}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Hired Workers</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {dashboardData.stats.completedJobs}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Success Rate</p>
                      <p className="text-2xl font-bold text-gray-900">92%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <MessageSquare className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Applications</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {dashboardData.stats.activeApplications}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Briefcase className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Completed Jobs</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {dashboardData.stats.completedJobs}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <DollarSign className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatCurrency(dashboardData.stats.totalEarnings)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Star className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Rating</p>
                      <p className="text-2xl font-bold text-gray-900">4.8</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {user.role === 'employer' ? (
                  <>
                    <Link href="/post-job">
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Post New Job
                      </Button>
                    </Link>
                    <Link href="/jobs">
                      <Button variant="outline">
                        <Briefcase className="h-4 w-4 mr-2" />
                        Browse Jobs
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/jobs">
                      <Button>
                        <Briefcase className="h-4 w-4 mr-2" />
                        Find Jobs
                      </Button>
                    </Link>
                    <Link href="/profile">
                      <Button variant="outline">
                        <Users className="h-4 w-4 mr-2" />
                        Update Profile
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue={user.role === 'employer' ? 'jobs' : 'applications'} className="space-y-6">
          <TabsList>
            {user.role === 'employer' ? (
              <>
                <TabsTrigger value="jobs">My Jobs</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
              </>
            ) : (
              <>
                <TabsTrigger value="applications">My Applications</TabsTrigger>
                <TabsTrigger value="completed">Completed Jobs</TabsTrigger>
              </>
            )}
          </TabsList>

          {user.role === 'employer' ? (
            <>
              <TabsContent value="jobs" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Job Postings</CardTitle>
                    <CardDescription>
                      Your latest job postings and their status
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dashboardData.recentJobs.map((job) => (
                        <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h3 className="font-semibold">{job.title}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                              <span className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {formatDate(job.createdAt)}
                              </span>
                              <span className="flex items-center">
                                <MessageSquare className="h-3 w-3 mr-1" />
                                {job.applications} applications
                              </span>
                              <span className="flex items-center">
                                <DollarSign className="h-3 w-3 mr-1" />
                                {formatCurrency(job.budget.min)} - {formatCurrency(job.budget.max)}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={job.status === 'open' ? 'default' : 'secondary'}>
                              {job.status}
                            </Badge>
                            <Link href={`/jobs/${job.id}`}>
                              <Button size="sm" variant="outline">
                                <Eye className="h-3 w-3" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="applications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Job Applications</CardTitle>
                    <CardDescription>
                      Applications received for your job postings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500">
                      No applications to display yet.
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          ) : (
            <>
              <TabsContent value="applications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>My Applications</CardTitle>
                    <CardDescription>
                      Track the status of your job applications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dashboardData.recentApplications.map((app) => (
                        <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h3 className="font-semibold">{app.jobTitle}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                              <span className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                Applied {formatDate(app.appliedAt)}
                              </span>
                              <span className="flex items-center">
                                <DollarSign className="h-3 w-3 mr-1" />
                                ${app.proposedRate}/hour
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={
                              app.status === 'accepted' ? 'default' : 
                              app.status === 'rejected' ? 'destructive' : 'secondary'
                            }>
                              {app.status}
                            </Badge>
                            <Link href={`/jobs/${app.jobId}`}>
                              <Button size="sm" variant="outline">
                                <Eye className="h-3 w-3" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Completed Jobs</CardTitle>
                    <CardDescription>
                      Jobs you've successfully completed
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-500">
                      No completed jobs to display yet.
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </div>
  );
}
