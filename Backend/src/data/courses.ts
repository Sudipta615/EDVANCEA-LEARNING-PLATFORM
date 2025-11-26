// Backend/src/data/courses.ts

export interface Lesson {
    id: string;
    title: string;
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

export const courses: Course[] = [
    {
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
                    { id: '1', title: "Getting Started with Excel" },
                    { id: '2', title: "Understanding the Ribbon" },
                    { id: '3', title: "Basic Navigation" },
                    { id: '4', title: "Saving and Managing Files" }
                ]
            },
            {
                id: 2,
                title: "Essential Formulas & Functions",
                lessons: [
                    { id: '5', title: "Basic Math Operations" },
                    { id: '6', title: "SUM and AUTOSUM" },
                    { id: '7', title: "AVERAGE, MIN, and MAX" },
                    { id: '8', title: "COUNT and COUNTA" },
                    { id: '9', title: "Order of Operations (PEMDAS)" },
                    { id: '10', title: "Relative vs. Absolute References" }
                ]
            },
            {
                id: 3,
                title: "Data Management Mastery",
                lessons: [
                    { id: '11', title: "Sorting Data Effectively" },
                    { id: '12', title: "Using Filters and Advanced Filters" },
                    { id: '13', title: "Find and Replace Tricks" },
                    { id: '14', title: "Data Validation Rules" },
                    { id: '15', title: "Removing Duplicates" },
                    { id: '16', title: "Text to Columns" }
                ]
            },
            {
                id: 4,
                title: "Formatting & Visualization",
                lessons: [
                    { id: '17', title: "Cell Styles and Formatting" },
                    { id: '18', title: "Number Formats Explained" },
                    { id: '19', title: "Conditional Formatting Basics" },
                    { id: '20', title: "Creating Basic Charts" },
                    { id: '21', title: "Customizing Chart Elements" },
                    { id: '22', title: "Using Sparklines" }
                ]
            },
            {
                id: 5,
                title: "Advanced Functions Logic",
                lessons: [
                    { id: '23', title: "Understanding IF Statements" },
                    { id: '24', title: "Nested IFs and AND/OR" },
                    { id: '25', title: "SUMIF and COUNTIF" },
                    { id: '26', title: "Introduction to VLOOKUP" },
                    { id: '27', title: "HLOOKUP and INDEX-MATCH" },
                    { id: '28', title: "The Power of XLOOKUP" }
                ]
            },
            {
                id: 6,
                title: "Data Analysis & Pivot Tables",
                lessons: [
                    { id: '29', title: "Creating Your First Pivot Table" },
                    { id: '30', title: "Formatting Pivot Tables" },
                    { id: '31', title: "Using Slicers and Timelines" },
                    { id: '32', title: "Pivot Charts" },
                    { id: '33', title: "Calculated Fields in Pivot Tables" },
                    { id: '34', title: "Goal Seek Analysis" },
                    { id: '35', title: "Scenario Manager" }
                ]
            },
            {
                id: 7,
                title: "Power Tools & Automation",
                lessons: [
                    { id: '36', title: "Introduction to Power Query" },
                    { id: '37', title: "Cleaning Data with Power Query" },
                    { id: '38', title: "Intro to Macros" },
                    { id: '39', title: "Recording Your First Macro" },
                    { id: '40', title: "Assigning Macros to Buttons" },
                    { id: '41', title: "VBA Editor Basics" },
                    { id: '42', title: "Course Final Project" }
                ]
            }
        ]
    },
    {
        id: 2,
        title: "Advanced Excel for Business",
        category: "Excel",
        description: "Master advanced Excel techniques for business analysis and decision making.",
        level: "Advanced",
        lessons: 3,
        image: "📈",
        features: ["Power Query", "Power Pivot", "Advanced Modeling", "Business Intelligence"],
        modules: [
            {
                id: 1,
                title: "Advanced Data Modeling",
                lessons: [
                    { id: '43', title: "Introduction to Data Modeling" },
                    { id: '44', title: "Relationships in Data Models" },
                    { id: '45', title: "DAX Basics" }
                ]
            }
        ]
    },
    {
        id: 3,
        title: "Financial Modeling Fundamentals",
        category: "Finance",
        description: "Build professional financial models from scratch with industry best practices.",
        level: "Intermediate",
        lessons: 3,
        image: "💰",
        features: ["DCF Analysis", "Financial Statements", "Valuation Methods", "Risk Assessment"],
        modules: [
            {
                id: 1,
                title: "Financial Statement Analysis",
                lessons: [
                    { id: '46', title: "Income Statement Overview" },
                    { id: '47', title: "Balance Sheet Basics" },
                    { id: '48', title: "Cash Flow Statement" }
                ]
            }
        ]
    },
    {
        id: 4,
        title: "Investment Banking Essentials",
        category: "Finance",
        description: "Complete training for investment banking careers and financial analysis.",
        level: "Advanced",
        lessons: 3,
        image: "🏦",
        features: ["M&A Modeling", "LBO Analysis", "Comps Analysis", "Pitch Books"],
        modules: [
            {
                id: 1,
                title: "Investment Banking Overview",
                lessons: [
                    { id: '49', title: "Role of an Investment Banker" },
                    { id: '50', title: "The Deal Lifecycle" },
                    { id: '51', title: "Valuation Methodologies" }
                ]
            }
        ]
    },
    {
        id: 5,
        title: "PowerPoint Pro: Design & Delivery",
        category: "PowerPoint",
        description: "Create stunning presentations that captivate and persuade any audience.",
        level: "Beginner",
        lessons: 3,
        image: "📽️",
        features: ["Design Principles", "Animation & Transitions", "Template Creation", "Public Speaking"],
        modules: [
            {
                id: 1,
                title: "PowerPoint Basics",
                lessons: [
                    { id: '52', title: "Getting Started with PowerPoint" },
                    { id: '53', title: "Working with Slides" },
                    { id: '54', title: "Adding Text and Images" }
                ]
            }
        ]
    },
    {
        id: 6,
        title: "Advanced PowerPoint & Storytelling",
        category: "PowerPoint",
        description: "Master advanced PowerPoint techniques and storytelling for executive presentations.",
        level: "Intermediate",
        lessons: 3,
        image: "🎯",
        features: ["Storytelling", "Executive Presentations", "Advanced Animation", "Data Visualization"],
        modules: [
            {
                id: 1,
                title: "Storytelling with Data",
                lessons: [
                    { id: '55', title: "The Art of Storytelling" },
                    { id: '56', title: "Visualizing Data Effectively" },
                    { id: '57', title: "Creating Compelling Charts" }
                ]
            }
        ]
    },
    {
        id: 7,
        title: "Video Editing for Beginners",
        category: "Video Editing",
        description: "Learn video editing from scratch using industry-standard tools.",
        level: "Beginner",
        lessons: 3,
        image: "🎬",
        features: ["Timeline Editing", "Color Grading", "Audio Mixing", "Visual Effects"],
        modules: [
            {
                id: 1,
                title: "Introduction to Video Editing",
                lessons: [
                    { id: '58', title: "Understanding Video Formats" },
                    { id: '59', title: "The Editing Interface" },
                    { id: '60', title: "Basic Cuts and Transitions" }
                ]
            }
        ]
    },
    {
        id: 8,
        title: "Professional Video Production",
        category: "Video Editing",
        description: "Complete video production course from planning to final editing.",
        level: "Intermediate",
        lessons: 3,
        image: "🎥",
        features: ["Pre-Production", "Cinematography", "Post-Production", "Motion Graphics"],
        modules: [
            {
                id: 1,
                title: "Pre-Production Phase",
                lessons: [
                    { id: '61', title: "Scriptwriting and Storyboarding" },
                    { id: '62', title: "Location Scouting" },
                    { id: '63', title: "Equipment Selection" }
                ]
            }
        ]
    }
];
