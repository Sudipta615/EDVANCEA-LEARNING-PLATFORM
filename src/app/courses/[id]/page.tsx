'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { BookOpen, CheckCircle, Play, ChevronRight, List, FileText, ArrowLeft, CheckCircle2 } from 'lucide-react'
import Navbar from '@/components/navbar'
import { useAuth } from '@/lib/auth'
import { useProgress } from '@/lib/progress'

// Extended course data matching the lesson content we will create
const courseData = {
  1: {
    id: 1,
    title: "Excel Mastery: From Zero to Hero",
    category: "Excel",
    description: "Complete Excel training from basic formulas to advanced data analysis and automation",
    fullDescription: "Master Microsoft Excel from the ground up with this comprehensive course. Starting with basic navigation and formulas, you'll progress through advanced topics like PivotTables, Power Query, and VBA programming.",
    level: "Beginner",
    lessons: 42,
    image: "📊",
    lastUpdated: "2024-01-15",
    language: "English",
    modules: [
      {
        id: 1,
        title: "Excel Fundamentals",
        lessons: [
          { id: '1', title: "Getting Started with Excel" },
          { id: '2', title: "Understanding the Ribbon" },
          { id: '3', title: "Basic Navigation" },
          { id: '4', title: "Saving and Managing Files" },
          { id: '5', title: "Basic Formulas" }
        ]
      },
      {
        id: 2,
        title: "Essential Functions",
        lessons: [
          { id: '6', title: "Mathematical Functions" },
          { id: '7', title: "Text Functions" }
        ]
      }
      // Additional modules would go here...
    ]
  },
  // We keep other courses minimal for now to prevent file size bloat, 
  // but the logic applies to all if data is added.
  2: { id: 2, title: "Financial Modeling Fundamentals", category: "Finance", level: "Intermediate", lessons: 36, image: "💰", modules: [] },
  3: { id: 3, title: "PowerPoint Pro", category: "PowerPoint", level: "Beginner", lessons: 28, image: "📽️", modules: [] },
  4: { id: 4, title: "Video Editing Essentials", category: "Video Editing", level: "Beginner", lessons: 48, image: "🎬", modules: [] }
}

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { isLessonComplete, getCourseProgress } = useProgress()
  const [mounted, setMounted] = useState(false)
  
  const courseId = parseInt(params.id as string)
  const course = courseData[courseId as keyof typeof courseData]

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <div className="text-center animate-scale-in">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <Button onClick={() => router.push('/courses')}>Back to Courses</Button>
        </div>
      </div>
    )
  }

  // Only calculate progress if we have module data, otherwise fallback
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0) || course.lessons
  const courseProgress = mounted && user ? getCourseProgress(course.id.toString(), totalLessons) : { completed: 0, total: totalLessons, percentage: 0 }

  // Find first incomplete lesson to "Continue"
  let nextLessonId = null;
  if (course.modules.length > 0) {
    for (const module of course.modules) {
      for (const lesson of module.lessons) {
        if (mounted && !isLessonComplete(course.id.toString(), lesson.id)) {
          nextLessonId = lesson.id;
          break;
        }
      }
      if (nextLessonId) break;
    }
    // If all complete, default to first
    if (!nextLessonId && course.modules[0]?.lessons[0]) {
      nextLessonId = course.modules[0].lessons[0].id;
    }
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <Navbar />
      
      {/* Course Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
            <Link href="/courses" className="hover:text-foreground transition-colors">Courses</Link>
            <ChevronRight className="w-4 h-4" />
            <span>{course.category}</span>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 animate-fade-in-up">
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-6xl shadow-sm p-2 rounded-xl bg-background border border-border/50">{course.image}</span>
                <div className="space-y-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">{course.title}</h1>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="rounded-md">{course.category}</Badge>
                    <Badge variant="outline" className="rounded-md">{course.level}</Badge>
                  </div>
                </div>
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                {course.description}
              </p>

              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-2 text-primary" />
                  {course.lessons} Lessons
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2 text-success" />
                  Text-Based Learning
                </div>
              </div>
            </div>
            
            <div className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <Card className="bg-background/50 backdrop-blur border-border/60 shadow-lg hover-lift sticky top-24">
                <CardHeader className="pb-4">
                  {mounted && user && (
                    <div className="mb-6">
                      <div className="flex justify-between text-sm font-medium mb-2 text-foreground">
                        <span>Your Progress</span>
                        <span>{courseProgress.percentage}%</span>
                      </div>
                      <Progress value={courseProgress.percentage} className="h-2" />
                    </div>
                  )}
                  
                  {nextLessonId ? (
                    <Button size="lg" className="w-full text-lg h-12 shadow-md" asChild>
                      <Link href={`/courses/${course.id}/${nextLessonId}`}>
                        {user && courseProgress.percentage > 0 ? 'Continue Learning' : 'Start Learning'}
                        <Play className="ml-2 w-5 h-5 fill-current" />
                      </Link>
                    </Button>
                  ) : (
                     <Button size="lg" className="w-full text-lg h-12" disabled>
                        Coming Soon
                     </Button>
                  )}
                </CardHeader>
                
                <CardContent className="space-y-4 text-sm">
                  <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg border border-border/50">
                    <span className="text-muted-foreground">Language</span>
                    <span className="font-medium">{course.language || 'English'}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg border border-border/50">
                    <span className="text-muted-foreground">Updated</span>
                    <span className="font-medium">{course.lastUpdated || 'Recently'}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content / Curriculum */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-8 flex items-center">
              <List className="w-6 h-6 mr-2 text-primary" />
              Course Content
            </h2>

            {course.modules.length > 0 ? (
              <div className="space-y-6">
                {course.modules.map((module, moduleIndex) => (
                  <div key={module.id} className="border border-border rounded-xl overflow-hidden bg-card shadow-sm">
                    <div className="bg-secondary/30 p-4 border-b border-border flex justify-between items-center">
                      <h3 className="font-semibold text-lg">
                        Module {moduleIndex + 1}: {module.title}
                      </h3>
                      <span className="text-xs text-muted-foreground font-mono bg-background px-2 py-1 rounded">
                        {module.lessons.length} Lessons
                      </span>
                    </div>
                    <div className="divide-y divide-border/50">
                      {module.lessons.map((lesson, lessonIndex) => {
                        // Only access hooks if mounted to prevent hydration mismatch
                        const isCompleted = mounted && user ? isLessonComplete(course.id.toString(), lesson.id) : false
                        
                        return (
                          <Link 
                            href={`/courses/${course.id}/${lesson.id}`} 
                            key={lesson.id}
                            className="flex items-center p-4 hover:bg-secondary/10 transition-colors group"
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 border transition-colors ${
                              isCompleted 
                                ? 'bg-success/10 border-success text-success' 
                                : 'bg-background border-border text-muted-foreground group-hover:border-primary group-hover:text-primary'
                            }`}>
                              {isCompleted ? <CheckCircle className="w-5 h-5" /> : <span className="text-xs font-medium">{lessonIndex + 1}</span>}
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className={`text-sm font-medium block truncate ${isCompleted ? 'text-muted-foreground decoration-border' : 'text-foreground'}`}>
                                {lesson.title}
                              </span>
                              {lesson.duration && (
                                <span className="text-xs text-muted-foreground mt-0.5 block">
                                  {lesson.duration}
                                </span>
                              )}
                            </div>
                            
                            <div className="ml-4">
                               {isCompleted ? (
                                 <Badge variant="secondary" className="bg-success/10 text-success hover:bg-success/20 border-none">Completed</Badge>
                               ) : (
                                 <Button size="icon" variant="ghost" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                   <Play className="w-4 h-4" />
                                 </Button>
                               )}
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center border border-dashed rounded-xl bg-secondary/10">
                <p className="text-muted-foreground">Content for this course is being updated. Check back soon!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}