'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { BookOpen, TrendingUp, Monitor, Video, Clock, Star, Users, CheckCircle, ArrowRight, Filter, X, Search } from 'lucide-react'
import Navbar from '@/components/navbar'

const allCourses = [
  {
    id: 1,
    title: "Excel Mastery: From Zero to Hero",
    category: "Excel",
    description: "Complete Excel training from basic formulas to advanced data analysis and automation",
    level: "Beginner",
    duration: "8 weeks",
    lessons: 42,
    rating: 4.8,
    students: 12500,
    image: "📊",
    features: ["Pivot Tables", "Advanced Formulas", "Data Visualization", "Macros & VBA"],
    lastUpdated: "2024-01-15",
    language: "English"
  },
  {
    id: 2,
    title: "Advanced Excel for Business",
    category: "Excel",
    description: "Master advanced Excel techniques for business analysis and decision making",
    level: "Advanced",
    duration: "6 weeks",
    lessons: 36,
    rating: 4.9,
    students: 8300,
    image: "📈",
    features: ["Power Query", "Power Pivot", "Advanced Modeling", "Business Intelligence"],
    lastUpdated: "2024-01-20",
    language: "English"
  },
  {
    id: 3,
    title: "Financial Modeling Fundamentals",
    category: "Finance",
    description: "Build professional financial models from scratch with industry best practices",
    level: "Intermediate",
    duration: "6 weeks",
    lessons: 36,
    rating: 4.9,
    students: 8300,
    image: "💰",
    features: ["DCF Analysis", "Financial Statements", "Valuation Methods", "Risk Assessment"],
    lastUpdated: "2024-01-18",
    language: "English"
  },
  {
    id: 4,
    title: "Investment Banking Essentials",
    category: "Finance",
    description: "Complete training for investment banking careers and financial analysis",
    level: "Advanced",
    duration: "10 weeks",
    lessons: 54,
    rating: 4.7,
    students: 5200,
    image: "🏦",
    features: ["M&A Modeling", "LBO Analysis", "Comps Analysis", "Pitch Books"],
    lastUpdated: "2024-01-22",
    language: "English"
  },
  {
    id: 5,
    title: "PowerPoint Pro: Design & Delivery",
    category: "PowerPoint",
    description: "Create stunning presentations that captivate and persuade any audience",
    level: "Beginner",
    duration: "4 weeks",
    lessons: 28,
    rating: 4.7,
    students: 15600,
    image: "📽️",
    features: ["Design Principles", "Animation & Transitions", "Template Creation", "Public Speaking"],
    lastUpdated: "2024-01-12",
    language: "English"
  },
  {
    id: 6,
    title: "Advanced PowerPoint & Storytelling",
    category: "PowerPoint",
    description: "Master advanced PowerPoint techniques and storytelling for executive presentations",
    level: "Intermediate",
    duration: "5 weeks",
    lessons: 32,
    rating: 4.8,
    students: 6800,
    image: "🎯",
    features: ["Storytelling", "Executive Presentations", "Advanced Animation", "Data Visualization"],
    lastUpdated: "2024-01-25",
    language: "English"
  },
  {
    id: 7,
    title: "Video Editing for Beginners",
    category: "Video Editing",
    description: "Learn video editing from scratch using industry-standard tools",
    level: "Beginner",
    duration: "10 weeks",
    lessons: 48,
    rating: 4.8,
    students: 9200,
    image: "🎬",
    features: ["Timeline Editing", "Color Grading", "Audio Mixing", "Visual Effects"],
    lastUpdated: "2024-01-19",
    language: "English"
  },
  {
    id: 8,
    title: "Professional Video Production",
    category: "Video Editing",
    description: "Complete video production course from planning to final editing",
    level: "Intermediate",
    duration: "12 weeks",
    lessons: 64,
    rating: 4.9,
    students: 4500,
    image: "🎥",
    features: ["Pre-Production", "Cinematography", "Post-Production", "Motion Graphics"],
    lastUpdated: "2024-01-21",
    language: "English"
  }
]

export default function CoursesPage() {
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("popular")
  const [showFilters, setShowFilters] = useState(false)

  const allFeatures = Array.from(new Set(allCourses.flatMap(course => course.features)))

  const filteredCourses = useMemo(() => {
    let filtered = allCourses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory === "all" || course.category.toLowerCase() === selectedCategory.toLowerCase()
      const matchesLevel = selectedLevel === "all" || course.level.toLowerCase() === selectedLevel.toLowerCase()
      const matchesFeatures = selectedFeatures.length === 0 || 
                             selectedFeatures.some(feature => course.features.includes(feature))

      return matchesSearch && matchesCategory && matchesLevel && matchesFeatures
    })

    // Sort courses
    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "students":
        filtered.sort((a, b) => b.students - a.students)
        break
      case "lessons":
        filtered.sort((a, b) => b.lessons - a.lessons)
        break
      case "popular":
      default:
        filtered.sort((a, b) => b.students * b.rating - a.students * a.rating)
        break
    }

    return filtered
  }, [searchTerm, selectedCategory, selectedLevel, selectedFeatures, sortBy])

  const clearFilters = () => {
    setSelectedCategory("all")
    setSelectedLevel("all")
    setSelectedFeatures([])
    setSearchTerm("")
    setSortBy("popular")
  }

  const activeFiltersCount = [
    selectedCategory !== "all",
    selectedLevel !== "all",
    selectedFeatures.length > 0,
    searchTerm !== ""
  ].filter(Boolean).length

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <Navbar />
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="w-full lg:w-96">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="students">Most Students</SelectItem>
                  <SelectItem value="lessons">Most Lessons</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>

              {activeFiltersCount > 0 && (
                <Button variant="ghost" onClick={clearFilters} className="text-slate-600 dark:text-slate-400">
                  <X className="w-4 h-4 mr-1" />
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="powerpoint">PowerPoint</SelectItem>
                      <SelectItem value="video editing">Video Editing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Level</label>
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Features</label>
                  <div className="space-y-2 max-h-24 overflow-y-auto">
                    {allFeatures.slice(0, 4).map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Checkbox
                          id={feature}
                          checked={selectedFeatures.includes(feature)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedFeatures([...selectedFeatures, feature])
                            } else {
                              setSelectedFeatures(selectedFeatures.filter(f => f !== feature))
                            }
                          }}
                        />
                        <label htmlFor={feature} className="text-sm text-slate-700 dark:text-slate-300">
                          {feature}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">All Courses</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'} found
            </p>
          </div>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">No courses found</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">Try adjusting your filters or search terms</p>
            <Button onClick={clearFilters}>Clear all filters</Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{course.image}</div>
                      <div>
                        <Badge variant="secondary" className="mb-1 text-xs">
                          {course.category}
                        </Badge>
                        <Badge variant="outline" className="ml-1 text-xs">
                          {course.level}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-blue-600 transition-colors line-clamp-2">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-sm line-clamp-2">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {course.duration}
                      </span>
                      <span className="flex items-center">
                        <BookOpen className="w-3 h-3 mr-1" />
                        {course.lessons}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                      <span className="font-medium">{course.rating}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1 mb-3">
                    {course.features.slice(0, 2).map((feature, index) => (
                      <div key={index} className="flex items-center text-xs text-slate-600 dark:text-slate-400">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {course.students.toLocaleString()} students
                    </div>
                  </div>

                  <Button className="w-full group-hover:bg-blue-600 transition-colors" asChild>
                    <Link href={`/courses/${course.id}`}>
                      Start Learning
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}