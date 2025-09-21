'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Navigation from '@/components/Navigation';
import Link from 'next/link';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Star, 
  User,
  Calendar,
  ArrowLeft,
  Send,
  Shield,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner';

// Mock data - in real app, this would come from Firebase
const mockJob = {
  id: '1',
  title: 'House Cleaning - 3 Bedroom Apartment',
  description: 'Need someone to clean my 3 bedroom apartment. Includes vacuuming, mopping, bathroom cleaning, and kitchen cleaning. I have all the cleaning supplies you\'ll need. The apartment is on the 3rd floor with elevator access. Please bring your own cleaning supplies if you prefer specific brands.',
  category: 'Cleaning',
  location: 'Downtown, New York',
  budget: { min: 80, max: 120, currency: 'USD' },
  duration: '4 hours',
  status: 'open' as const,
  employer: {
    name: 'Sarah Johnson',
    avatar: '',
    rating: 4.8,
    id: 'emp1'
  },
  createdAt: new Date('2024-01-15'),
  deadline: new Date('2024-01-25'),
  applications: 3,
  tags: ['cleaning', 'housekeeping', 'residential'],
  requirements: [
    'Experience with residential cleaning',
    'Must have own transportation',
    'Available weekends preferred',
    'References preferred'
  ],
  images: []
};

export default function JobDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [job, setJob] = useState(mockJob);
  const [applicationMessage, setApplicationMessage] = useState('');
  const [proposedRate, setProposedRate] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    // In a real app, fetch job details from Firebase
    // setJob(fetchedJob);
  }, [id]);

  const handleApply = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (user.role !== 'worker') {
      toast.error('Only workers can apply for jobs');
      return;
    }

    setIsApplying(true);

    try {
      // In a real app, submit application to Firebase
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast.success('Application submitted successfully!');
      setHasApplied(true);
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsApplying(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/jobs" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to jobs
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Job Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="secondary">{job.category}</Badge>
                  <Badge variant={job.status === 'open' ? 'default' : 'secondary'}>
                    {job.status}
                  </Badge>
                </div>
                <CardTitle className="text-2xl">{job.title}</CardTitle>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  Posted on {formatDate(job.createdAt)}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Job Description</h3>
                  <p className="text-gray-700 leading-relaxed">{job.description}</p>
                </div>

                {job.requirements && job.requirements.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Requirements</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {job.requirements.map((requirement, index) => (
                        <li key={index} className="text-gray-700">{requirement}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold mb-2">Job Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 mr-3 text-gray-400" />
                      <div>
                        <div className="font-medium">Location</div>
                        <div className="text-gray-600">{job.location}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-3 text-gray-400" />
                      <div>
                        <div className="font-medium">Duration</div>
                        <div className="text-gray-600">{job.duration}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <DollarSign className="h-5 w-5 mr-3 text-gray-400" />
                      <div>
                        <div className="font-medium">Budget</div>
                        <div className="text-gray-600">
                          {formatCurrency(job.budget.min)} - {formatCurrency(job.budget.max)}
                        </div>
                      </div>
                    </div>

                    {job.deadline && (
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-3 text-gray-400" />
                        <div>
                          <div className="font-medium">Application Deadline</div>
                          <div className="text-gray-600">{formatDate(job.deadline)}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {job.tags && job.tags.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Employer Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About the Employer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={job.employer.avatar} />
                    <AvatarFallback>{job.employer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{job.employer.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-gray-600">{job.employer.rating}/5.0</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Application Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">Apply for this job</CardTitle>
                <CardDescription>
                  {job.applications} people have already applied
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!user ? (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      Sign up or log in to apply for this job
                    </p>
                    <Link href="/register">
                      <Button className="w-full">Sign Up to Apply</Button>
                    </Link>
                    <Link href="/login">
                      <Button variant="outline" className="w-full">Log In</Button>
                    </Link>
                  </div>
                ) : user.role !== 'worker' ? (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      Only workers can apply for jobs. Switch to worker account to apply.
                    </p>
                    <Link href="/post-job">
                      <Button variant="outline" className="w-full">Post a Job Instead</Button>
                    </Link>
                  </div>
                ) : hasApplied ? (
                  <div className="text-center space-y-3">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                    <p className="text-sm text-gray-600">Application submitted!</p>
                    <p className="text-xs text-gray-500">
                      The employer will review your application and get back to you.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="proposed-rate">Proposed Rate (optional)</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="proposed-rate"
                          type="number"
                          placeholder="80"
                          value={proposedRate}
                          onChange={(e) => setProposedRate(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Budget: {formatCurrency(job.budget.min)} - {formatCurrency(job.budget.max)}
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="message">Message to Employer</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell the employer why you're perfect for this job..."
                        value={applicationMessage}
                        onChange={(e) => setApplicationMessage(e.target.value)}
                        rows={4}
                      />
                    </div>

                    <Button 
                      onClick={handleApply} 
                      disabled={isApplying || !applicationMessage.trim()}
                      className="w-full"
                    >
                      {isApplying ? 'Submitting...' : 'Submit Application'}
                    </Button>

                    <div className="flex items-center text-xs text-gray-500">
                      <Shield className="h-3 w-3 mr-1" />
                      Your application is secure and protected
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
