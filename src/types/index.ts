export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  role: 'employer' | 'worker';
  createdAt: Date;
  updatedAt: Date;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  duration: string; // e.g., "2 hours", "1 day", "1 week"
  requirements?: string[];
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  employerId: string;
  employer: {
    name: string;
    avatar?: string;
    rating?: number;
  };
  applications?: JobApplication[];
  createdAt: Date;
  updatedAt: Date;
  deadline?: Date;
  images?: string[];
  tags?: string[];
}

export interface JobApplication {
  id: string;
  jobId: string;
  workerId: string;
  worker: {
    name: string;
    avatar?: string;
    rating?: number;
  };
  message: string;
  proposedRate?: number;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export interface JobCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Payment {
  id: string;
  jobId: string;
  employerId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: Date;
  completedAt?: Date;
}

export interface Review {
  id: string;
  jobId: string;
  fromUserId: string;
  toUserId: string;
  rating: number; // 1-5
  comment: string;
  createdAt: Date;
}
