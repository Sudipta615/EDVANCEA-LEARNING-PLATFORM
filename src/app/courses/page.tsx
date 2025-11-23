'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowRight, Filter, X, BookOpen, Tag, Layers } from 'lucide-react'
import Navbar from '@/components/navbar'

const allCourses = [
  {
    id: 1,
    title: "Excel Mastery: From Zero to Hero",
    category: "Excel",
    description: "Complete Excel training from basic formulas to advanced data analysis and automation.",
    level: "Beginner",
    lessons: 42,
    image: "📊",
    features: ["Pivot Tables", "Advanced Formulas", "Data Visualization", "Macros & VBA"],
    language: "English"
  },
  {
    id: 2,
    title: "Advanced Excel for Business",
    category: "Excel",
    description: "Master advanced Excel techniques for business analysis and decision making.",
    level: "Advanced",
    lessons: 36,
    image: "📈",
    features: ["Power Query", "Power Pivot", "Advanced Modeling", "Business Intelligence"],
    language: "English"
  },
  {
    id: 3,
    title: "Financial Modeling Fundamentals",
    category: "Finance",
    description: "Build professional financial models from scratch with industry best practices.",
    level: "Intermediate",
    lessons: 36,
    image: "💰",
    features: ["DCF Analysis", "Financial Statements", "Valuation Methods", "Risk Assessment"],
    language: "English"
  },
  {
    id: 4,
    title: "Investment Banking Essentials",
    category: "Finance",
    description: "Complete training for investment banking careers and financial analysis.",
    level: "Advanced",
    lessons: 54,
    image: "🏦",
    features: ["M&A Modeling", "LBO Analysis", "Comps Analysis", "Pitch Books"],
    language: "English"
  },
  {
    id: 5,
    title: "PowerPoint Pro: Design & Delivery",
    category: "PowerPoint",
    description: "Create stunning presentations that captivate and persuade any audience.",
    level: "Beginner",
    lessons: 28,
    image: "📽️",
    features: ["Design Principles", "Animation & Transitions", "Template Creation", "Public Speaking"],
    language: "English"
  },
  {
    id: 6,
    title: "Advanced PowerPoint & Storytelling",
    category: "PowerPoint",
    description: "Master advanced PowerPoint techniques and storytelling for executive presentations.",
    level: "Intermediate",
    lessons: 32,
    image: "🎯",
    features: ["Storytelling", "Executive Presentations", "Advanced Animation", "Data Visualization"],
    language: "English"
  },
  {
    id: 7,
    title: "Video Editing for Beginners",
    category: "Video Editing",
    description: "Learn video editing from scratch using industry-standard tools.",
    level: "Beginner",
    lessons: 48,
    image: "🎬",
    features: ["Timeline Editing", "Color Grading", "Audio Mixing", "Visual Effects"],
    language: "English"
  },
  {
    id: 8,
    title: "Professional Video Production",
    category: "Video Editing",
    description: "Complete video production course from planning to final editing.",
    level: "Intermediate",
    lessons: 64,
    image: "🎥",
    features: ["Pre-Production", "Cinematography", "Post-Production", "Motion Graphics"],
    language: "English"
  }
]

export default function CoursesPage() {
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("newest")
  const [showFilters, setShowFilters] = useState(false)

  // Sync search term when URL changes (e.g. from Navbar search)
  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '')
  }, [searchParams])

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
      case "lessons":
        filtered.sort((a, b) => b.lessons - a.lessons)
        break
      case "az":
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "newest":
      default:
        // Mock "newest" by ID for now
        filtered.sort((a, b) => b.id - a.id)
        break
    }

    return filtered
  }, [searchTerm, selectedCategory, selectedLevel, selectedFeatures, sortBy])

  const clearFilters = () => {
    setSelectedCategory("all")
    setSelectedLevel("all")
    setSelectedFeatures([])
    setSearchTerm("")
    setSortBy("newest")
  }

  const activeFiltersCount = [
    selectedCategory !== "all",
    selectedLevel !== "all",
    selectedFeatures.length > 0,
    searchTerm !== ""
  ].filter(Boolean).length

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <Navbar />
      
      {/* Filter Bar */}
      <div className="border-b border-border sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
               <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
                 <Layers className="w-5 h-5 text-primary" />
                 Course Catalog
               </h1>
               {searchTerm && (
                 <Badge variant="secondary" className="font-normal">
                   Results for "{searchTerm}"
                 </Badge>
               )}
            </div>
            
            <div className="flex items-center gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px] h-9">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest Added</SelectItem>
                  <SelectItem value="lessons">Number of Lessons</SelectItem>
                  <SelectItem value="az">A-Z Title</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant={showFilters ? "secondary" : "outline"}
                onClick={() => setShowFilters(!showFilters)}
                size="sm"
                className="h-9"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-2 h-5 px-1.5 rounded-full text-[10px]">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>

              {activeFiltersCount > 0 && (
                <Button variant="ghost" onClick={clearFilters} size="sm" className="h-9 hover:text-destructive hover:bg-destructive/10">
                  <X className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              )}
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-border animate-in slide-in-from-top-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {['all', 'excel', 'finance', 'powerpoint', 'video editing'].map((cat) => (
                      <Button
                        key={cat}
                        variant={selectedCategory === cat ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(cat)}
                        className="capitalize h-7 text-xs"
                      >
                        {cat}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Level</label>
                  <div className="flex flex-wrap gap-2">
                    {['all', 'beginner', 'intermediate', 'advanced'].map((lvl) => (
                      <Button
                        key={lvl}
                        variant={selectedLevel === lvl ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedLevel(lvl)}
                        className="capitalize h-7 text-xs"
                      >
                        {lvl}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Topic Tags</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                    {allFeatures.map((feature) => (
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
                        <label htmlFor={feature} className="text-sm text-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer hover:text-primary transition-colors">
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
        <div className="mb-6 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{filteredCourses.length}</span> {filteredCourses.length === 1 ? 'course' : 'courses'}
          </div>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-dashed border-border animate-in fade-in zoom-in-95 duration-300">
            <div className="text-6xl mb-4 animate-bounce">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No courses found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your filters or search terms</p>
            <Button onClick={clearFilters}>Clear all filters</Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <Link key={course.id} href={`/courses/${course.id}`} className="group block h-full">
                <Card 
                  className="h-full flex flex-col bg-card border-border/60 overflow-hidden relative hover-lift transition-all duration-300"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <CardHeader className="pb-4 border-b border-border/50 bg-secondary/30 relative z-10">
                    <div className="flex justify-between items-start mb-3">
                      <div className="text-3xl p-2.5 bg-background rounded-xl shadow-sm ring-1 ring-border/50 group-hover:scale-110 transition-transform duration-300">{course.image}</div>
                      <Badge variant="secondary" className="font-medium bg-background/80 backdrop-blur-sm">
                        {course.level}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                      {course.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs font-normal bg-transparent border-primary/20 text-primary/80">
                        {course.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-5 flex-1 flex flex-col relative z-10">
                    <CardDescription className="line-clamp-3 mb-6 flex-1 text-sm leading-relaxed">
                      {course.description}
                    </CardDescription>
                    
                    <div className="space-y-4 mt-auto">
                      <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
                        <div className="flex items-center bg-secondary/50 px-2.5 py-1 rounded-md">
                          <BookOpen className="w-3.5 h-3.5 mr-1.5 text-primary" />
                          {course.lessons} Lessons
                        </div>
                        <div className="flex items-center bg-secondary/50 px-2.5 py-1 rounded-md">
                          <Tag className="w-3.5 h-3.5 mr-1.5 text-accent" />
                          Text-Based
                        </div>
                      </div>

                      <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm group-hover:shadow-md" asChild>
                        <span>
                          Start Reading
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}