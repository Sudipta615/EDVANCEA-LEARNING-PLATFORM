🚀 Edvancea Learning Platform
A modern, responsive learning platform built with Next.js 15, TypeScript, and Tailwind CSS. Features text-based learning courses for Excel, Finance, PowerPoint, and Video Editing.

✨ Features
🔐 Authentication System - Complete signup, login, and user profile management
📚 Course Catalog - Browse and search courses with filtering options
📖 Text-Based Learning - Interactive lessons with tabbed content
📊 Progress Tracking - Monitor course completion and learning progress
🎨 Modern UI - Beautiful, responsive design with dark mode support
📱 Mobile Responsive - Works perfectly on all device sizes
🌓 Dark Mode - Toggle between light and dark themes
🎯 No Paywalls - Completely free learning platform
🛠️ Tech Stack
Framework: Next.js 15 with App Router
Language: TypeScript
Styling: Tailwind CSS
UI Components: shadcn/ui
Icons: Lucide React
State Management: React Context & Local Storage
Authentication: Custom implementation with localStorage
🚀 Quick Start
Prerequisites
Node.js 18+
npm or yarn
Installation
Clone the repository
bash

Line Wrapping

Collapse
Copy
1
2
git clone https://github.com/Sudipta615/edvancea-learning-platform.git
cd edvancea-learning-platform
Install dependencies
bash

Line Wrapping

Collapse
Copy
1
npm install
Start development server
bash

Line Wrapping

Collapse
Copy
1
npm run dev
Open your browser

Line Wrapping

Collapse
Copy
1
http://localhost:3000
📁 Project Structure

src/
├── app/                    # Next.js app directory
│   ├── courses/            # Course pages
│   │   ├── [id]/          # Dynamic course pages
│   │   └── page.tsx       # Course catalog
│   ├── dashboard/          # User dashboard
│   ├── login/              # Login page
│   ├── signup/             # Signup page
│   ├── profile/            # User profile
│   ├── layout.tsx          # Root layout
│   └── page.tsx           # Homepage
├── components/             # React components
│   ├── ui/                # shadcn/ui components
│   └── navbar.tsx         # Navigation component
└── lib/                  # Utility libraries
    ├── auth.tsx           # Authentication context
    ├── progress.ts         # Progress tracking
    └── utils.ts           # Helper functions
🎓 Available Courses
Excel Mastery - From basics to advanced formulas and data analysis
Finance Fundamentals - Budgeting, investing, and financial planning
PowerPoint Pro - Create stunning presentations
Video Editing Basics - Learn video editing fundamentals
👤 User Features
Signup/Login - Create account or login with existing credentials
Profile Management - View and edit user profile
Progress Tracking - Track completed lessons and courses
Dashboard - Overview of learning progress and achievements
Avatar Generation - Automatic avatar from user initials
🎨 UI/UX Features
Responsive Design - Mobile-first approach with desktop enhancement
Dark Mode - System theme detection with manual toggle
Search Functionality - Search courses across all content
Filtering & Sorting - Filter by category, level, duration
Loading States - Smooth loading and error handling
Interactive Elements - Hover effects, transitions, animations
🚀 Deployment
This project is ready for deployment on:

Vercel (Recommended)
Netlify
AWS Amplify
DigitalOcean
Any platform supporting Next.js
Vercel Deployment
bash

Line Wrapping

Collapse
Copy
1
2
npm install -g vercel
vercel
🤝 Contributing
Fork the repository
Create a feature branch
Make your changes
Commit your changes
Push to the branch
Create a Pull Request
📄 License
This project is open source and available under the MIT License .

🙏 Acknowledgments
Next.js - React framework
Tailwind CSS - CSS framework
shadcn/ui - UI components
Lucide - Icon library
Built with ❤️ for accessible education