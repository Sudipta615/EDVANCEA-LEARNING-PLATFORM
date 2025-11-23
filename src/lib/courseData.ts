// src/lib/courseData.ts

export interface Lesson {
  id: string;
  title: string;
  duration?: string;
}

export interface Module {
  id: number;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: number;
  title: string;
  category: string;
  description: string;
  fullDescription?: string;
  level: string;
  lessons: number;
  image: string;
  lastUpdated?: string;
  language?: string;
  modules: Module[];
  features?: string[]; 
}

export const courseData: Record<string, Course> = {
  '1': {
    id: 1,
    title: "Excel Mastery: From Zero to Hero",
    category: "Excel",
    description: "Complete Excel training from basic formulas to advanced data analysis and automation.",
    fullDescription: "Master Microsoft Excel from the ground up...",
    level: "Beginner",
    lessons: 42,
    image: "📊",
    lastUpdated: "2024-01-15",
    language: "English",
    features: ["Pivot Tables", "Advanced Formulas", "Data Visualization", "Macros & VBA"],
    modules: [
      {
        id: 1,
        title: "Excel Fundamentals",
        lessons: [
          { id: '1', title: "Getting Started with Excel", duration: "5 min" },
          { id: '2', title: "Understanding the Ribbon", duration: "7 min" },
          { id: '3', title: "Basic Navigation", duration: "10 min" },
          { id: '4', title: "Saving and Managing Files", duration: "5 min" }
        ]
      }
    ]
  },
  '2': {
    id: 2,
    title: "Advanced Excel for Business",
    category: "Excel",
    description: "Master advanced Excel techniques for business analysis and decision making.",
    level: "Advanced",
    lessons: 36,
    image: "📈",
    features: ["Power Query", "Power Pivot", "Advanced Modeling", "Business Intelligence"],
    modules: [] 
  },
  '3': {
    id: 3,
    title: "Financial Modeling Fundamentals",
    category: "Finance",
    description: "Build professional financial models from scratch with industry best practices.",
    level: "Intermediate",
    lessons: 36,
    image: "💰",
    features: ["DCF Analysis", "Financial Statements", "Valuation Methods", "Risk Assessment"],
    modules: []
  },
  '4': {
    id: 4,
    title: "Investment Banking Essentials",
    category: "Finance",
    description: "Complete training for investment banking careers and financial analysis.",
    level: "Advanced",
    lessons: 54,
    image: "🏦",
    features: ["M&A Modeling", "LBO Analysis", "Comps Analysis", "Pitch Books"],
    modules: []
  },
  '5': {
    id: 5,
    title: "PowerPoint Pro: Design & Delivery",
    category: "PowerPoint",
    description: "Create stunning presentations that captivate and persuade any audience.",
    level: "Beginner",
    lessons: 28,
    image: "📽️",
    features: ["Design Principles", "Animation & Transitions", "Template Creation", "Public Speaking"],
    modules: []
  },
  '6': {
    id: 6,
    title: "Advanced PowerPoint & Storytelling",
    category: "PowerPoint",
    description: "Master advanced PowerPoint techniques and storytelling for executive presentations.",
    level: "Intermediate",
    lessons: 32,
    image: "🎯",
    features: ["Storytelling", "Executive Presentations", "Advanced Animation", "Data Visualization"],
    modules: []
  },
  '7': {
    id: 7,
    title: "Video Editing for Beginners",
    category: "Video Editing",
    description: "Learn video editing from scratch using industry-standard tools.",
    level: "Beginner",
    lessons: 48,
    image: "🎬",
    features: ["Timeline Editing", "Color Grading", "Audio Mixing", "Visual Effects"],
    modules: []
  },
  '8': {
    id: 8,
    title: "Professional Video Production",
    category: "Video Editing",
    description: "Complete video production course from planning to final editing.",
    level: "Intermediate",
    lessons: 64,
    image: "🎥",
    features: ["Pre-Production", "Cinematography", "Post-Production", "Motion Graphics"],
    modules: []
  }
}