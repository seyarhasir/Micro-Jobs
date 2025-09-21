# Micro Jobs - Local Job Matching Platform

A modern MVP for connecting local workers with odd jobs and side hustles. Built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, and Firebase.

## Features

### ✅ Implemented

- **Modern Landing Page** - Beautiful, responsive homepage with clear value proposition
- **Authentication System** - Login/Register with Firebase Auth and role-based access
- **Job Listings** - Search, filter, and browse available jobs with real-time updates
- **Job Details** - Comprehensive job view with application functionality
- **Job Posting** - Easy-to-use form for employers to post new jobs
- **User Dashboard** - Personalized dashboard for both workers and employers
- **Responsive Design** - Mobile-first design that works on all devices
- **TypeScript** - Full type safety throughout the application

### 🔄 Planned Features

- **Firebase Integration** - Real database and authentication
- **Payment System** - Secure payment processing for job fees
- **Messaging System** - In-app communication between users
- **Reviews & Ratings** - User feedback system
- **Advanced Search** - Location-based and skill-based job matching
- **Mobile App** - React Native companion app

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui with Radix UI primitives
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with custom design system

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase project (for production)

### Installation

1. **Clone and install dependencies:**

   ```bash
   cd micro-jobs
   npm install
   ```

2. **Set up Firebase (Optional for development):**

   **Demo Mode (No Setup Required):**

   - The app works out of the box with mock data and demo functionality
   - All features are visible and functional for demonstration purposes
   - Authentication shows helpful messages about demo mode

   **Production Setup:**

   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
   - Enable Authentication and Firestore Database
   - Copy your Firebase config and create `.env.local`:
     ```env
     NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
     NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
     ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── dashboard/         # User dashboard
│   ├── jobs/             # Job listings and details
│   ├── login/            # Authentication pages
│   ├── register/
│   └── post-job/         # Job posting form
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   └── Navigation.tsx   # Main navigation
├── contexts/            # React contexts
│   └── AuthContext.tsx  # Authentication state
├── lib/                 # Utilities and configurations
│   ├── firebase.ts      # Firebase configuration
│   └── utils.ts         # Helper functions
└── types/               # TypeScript type definitions
    └── index.ts         # Application types
```

## Key Pages

- **`/`** - Landing page with features and CTA
- **`/jobs`** - Browse and search job listings
- **`/jobs/[id]`** - Individual job details with application form
- **`/post-job`** - Form for employers to post new jobs
- **`/login`** - User authentication
- **`/register`** - User registration with role selection
- **`/dashboard`** - Personalized user dashboard

## User Roles

### Workers

- Browse and apply for jobs
- Track applications and earnings
- Manage profile and skills

### Employers

- Post job listings
- Review applications
- Manage job postings

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Components

This project uses shadcn/ui for components. To add new components:

```bash
npx shadcn@latest add [component-name]
```

### Styling Guidelines

- Use Tailwind CSS classes for styling
- Follow the established design system
- Maintain consistent spacing and colors
- Ensure mobile responsiveness

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- AWS Amplify
- Firebase Hosting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or support, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ using modern web technologies**
