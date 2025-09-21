'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { 
  Search, 
  MapPin, 
  Clock, 
  DollarSign, 
  Filter,
  Briefcase,
  Star,
  User
} from 'lucide-react';

// Mock data for demonstration
const mockJobs = [
  {
    id: '1',
    title: 'House Cleaning - 3 Bedroom Apartment',
    description: 'Need someone to clean my 3 bedroom apartment. Includes vacuuming, mopping, bathroom cleaning, and kitchen cleaning.',
    category: 'Cleaning',
    location: 'Downtown, New York',
    budget: { min: 80, max: 120, currency: 'USD' },
    duration: '4 hours',
    status: 'open' as const,
    employer: {
      name: 'Sarah Johnson',
      avatar: '',
      rating: 4.8
    },
    createdAt: new Date('2024-01-15'),
    applications: 3,
    tags: ['cleaning', 'housekeeping', 'residential']
  },
  {
    id: '2',
    title: 'Moving Help - Small Apartment',
    description: 'Need help moving furniture and boxes from 2nd floor apartment. Two people preferred.',
    category: 'Moving',
    location: 'Brooklyn, New York',
    budget: { min: 150, max: 200, currency: 'USD' },
    duration: '6 hours',
    status: 'open' as const,
    employer: {
      name: 'Mike Chen',
      avatar: '',
      rating: 4.9
    },
    createdAt: new Date('2024-01-14'),
    applications: 7,
    tags: ['moving', 'furniture', 'heavy lifting']
  },
  {
    id: '3',
    title: 'Garden Maintenance - Weekly',
    description: 'Weekly garden maintenance including mowing, trimming, and planting. Experience preferred.',
    category: 'Gardening',
    location: 'Queens, New York',
    budget: { min: 60, max: 80, currency: 'USD' },
    duration: '3 hours',
    status: 'open' as const,
    employer: {
      name: 'Emma Davis',
      avatar: '',
      rating: 4.7
    },
    createdAt: new Date('2024-01-13'),
    applications: 4,
    tags: ['gardening', 'landscaping', 'weekly']
  },
  {
    id: '4',
    title: 'Math Tutoring - High School',
    description: 'Need a math tutor for my 16-year-old daughter. Algebra and geometry focus. Online sessions OK.',
    category: 'Tutoring',
    location: 'Manhattan, New York',
    budget: { min: 30, max: 40, currency: 'USD' },
    duration: '2 hours',
    status: 'open' as const,
    employer: {
      name: 'Robert Wilson',
      avatar: '',
      rating: 4.9
    },
    createdAt: new Date('2024-01-12'),
    applications: 12,
    tags: ['tutoring', 'math', 'online']
  },
  {
    id: '5',
    title: 'Dog Walking - Daily',
    description: 'Need someone to walk my golden retriever daily at 6 PM. Must love dogs and be reliable.',
    category: 'Pet Care',
    location: 'Bronx, New York',
    budget: { min: 20, max: 25, currency: 'USD' },
    duration: '1 hour',
    status: 'open' as const,
    employer: {
      name: 'Lisa Brown',
      avatar: '',
      rating: 4.8
    },
    createdAt: new Date('2024-01-11'),
    applications: 8,
    tags: ['pet care', 'dog walking', 'daily']
  }
];

const categories = [
  'All Categories',
  'Cleaning',
  'Moving',
  'Gardening',
  'Pet Care',
  'Tutoring',
  'Tech Help',
  'Other'
];

export default function JobsPage() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    let filtered = jobs;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(job => job.category === selectedCategory);
    }

    // Sort jobs
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        break;
      case 'highest_pay':
        filtered.sort((a, b) => b.budget.max - a.budget.max);
        break;
      case 'lowest_pay':
        filtered.sort((a, b) => a.budget.min - b.budget.min);
        break;
    }

    setFilteredJobs(filtered);
  }, [jobs, searchTerm, selectedCategory, selectedLocation, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Local Jobs</h1>
          <p className="text-gray-600">Discover opportunities in your area</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Locations">All Locations</SelectItem>
                <SelectItem value="Manhattan">Manhattan</SelectItem>
                <SelectItem value="Brooklyn">Brooklyn</SelectItem>
                <SelectItem value="Queens">Queens</SelectItem>
                <SelectItem value="Bronx">Bronx</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="highest_pay">Highest Pay</SelectItem>
                <SelectItem value="lowest_pay">Lowest Pay</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
          </p>
          {!user && (
            <Link href="/register">
              <Button variant="outline">
                <User className="h-4 w-4 mr-2" />
                Sign up to apply
              </Button>
            </Link>
          )}
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">{job.category}</Badge>
                  <Badge variant={job.status === 'open' ? 'default' : 'secondary'}>
                    {job.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg line-clamp-2">{job.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {job.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {job.location}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {job.duration}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="h-4 w-4 mr-2" />
                    ${job.budget.min} - ${job.budget.max} {job.budget.currency}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm">
                      <User className="h-4 w-4 mr-1 text-gray-400" />
                      <span className="text-gray-600">{job.employer.name}</span>
                      <div className="flex items-center ml-2">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-500 ml-1">{job.employer.rating}</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{job.applications} applications</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {job.tags?.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="pt-4">
                    <Link href={`/jobs/${job.id}`}>
                      <Button className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or check back later for new opportunities.
            </p>
            <Link href="/post-job">
              <Button variant="outline">
                Post a Job Instead
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
