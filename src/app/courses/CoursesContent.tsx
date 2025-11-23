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
import { courseData } from '@/lib/courseData'

export default function CoursesContent() {
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("newest")
  const [showFilters, setShowFilters] = useState(false)

  // Create array from the shared data object
  const allCourses = useMemo(() => Object.values(courseData), [])

  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '')
  }, [searchParams])

  const allFeatures = Array.from(new Set(allCourses.flatMap(course => course.features || [])))

  const filteredCourses = useMemo(() => {
    let filtered = allCourses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory === "all" || course.category.toLowerCase() === selectedCategory.toLowerCase()
      const matchesLevel = selectedLevel === "all" || course.level.toLowerCase() === selectedLevel.toLowerCase()
      const matchesFeatures = selectedFeatures.length === 0 || 
                             selectedFeatures.some(feature => (course.features || []).includes(feature))

      return matchesSearch && matchesCategory && matchesLevel && matchesFeatures
    })

    switch (sortBy) {
      case "lessons":
        filtered.sort((a, b) => b.lessons - a.lessons)
        break
      case "az":
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "newest":
      default:
        filtered.sort((a, b) => b.id - a.id)
        break
    }

    return filtered
  }, [allCourses, searchTerm, selectedCategory, selectedLevel, selectedFeatures, sortBy])

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
                  // Added py-4 and gap-4 to reduce default vertical padding/gap
                  className="h-full flex flex-col bg-card border-border/60 overflow-hidden relative hover-lift transition-all duration-300 py-4 gap-4"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Reduced pb-4 to pb-2 */}
                  <CardHeader className="pb-2 border-b border-border/50 bg-secondary/30 relative z-10">
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
                  
                  {/* Reduced pt-5 to pt-4 */}
                  <CardContent className="pt-4 flex-1 flex flex-col relative z-10">
                    {/* Reduced line-clamp-3 to line-clamp-2 and mb-6 to mb-4 */}
                    <CardDescription className="line-clamp-2 mb-4 flex-1 text-sm leading-relaxed">
                      {course.description}
                    </CardDescription>
                    
                    {/* Reduced space-y-4 to space-y-3 */}
                    <div className="space-y-3 mt-auto">
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