// src/app/dashboard/DashboardPage.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookOpen, CheckCircle, PlayCircle, Award, TrendingUp, Loader2 } from 'lucide-react'
import Navbar from '@/components/navbar'
import { useAuth } from '@/lib/auth'
import { useProgress } from '@/lib/progress'
import { fetchCourses, type Course } from '@/lib/api'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const { user, isLoading } = useAuth()
  const { getCourseProgress, getOverallProgress } = useProgress()
  const [mounted, setMounted] = useState(false)
  const [courses, setCourses] = useState<Course[]>([])
  const [loadingCourses, setLoadingCourses] = useState(true)

  useEffect(() => {
    setMounted(true)
    const loadCourses = async () => {
      const data = await fetchCourses()
      setCourses(data)
      setLoadingCourses(false)
    }
    loadCourses()
  }, [])

  if (!mounted || isLoading || loadingCourses) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center animate-fade-in-up">
          <h1 className="text-2xl font-bold mb-4">Please Log In</h1>
          <p className="text-muted-foreground mb-6">You need to be logged in to view your dashboard.</p>
          <Button asChild>
            <Link href="/login">Log In</Link>
          </Button>
        </div>
      </div>
    )
  }

  const overall = getOverallProgress()

  // Use data from API
  const myCourses = courses.map(course => {
    const progress = getCourseProgress(course.id.toString(), course.lessons)
    return { ...course, ...progress }
  })

  const inProgressCourses = myCourses.filter(c => c.percentage > 0 && c.percentage < 100)
  const completedCourses = myCourses.filter(c => c.percentage === 100)

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <Navbar />

      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="animate-fade-in-up">
              <h1 className="text-3xl font-bold text-foreground">Welcome back, {user.name}!</h1>
              <p className="text-muted-foreground mt-1">Track your progress and continue learning.</p>
            </div>
            <div className="flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-right hidden sm:block">
                <div className="text-sm text-muted-foreground">Total Progress</div>
                <div className="text-2xl font-bold text-primary">{overall.percentage}%</div>
              </div>
              <Button asChild size="lg" className="hover-lift">
                <Link href="/courses">Explore Courses</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <Card className="hover-lift border-l-4 border-l-primary">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold text-foreground">{inProgressCourses.length}</p>
                </div>
                <BookOpen className="w-8 h-8 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift border-l-4 border-l-success">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-foreground">{overall.completed}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-success opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift border-l-4 border-l-accent">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Certificates</p>
                  <p className="text-2xl font-bold text-foreground">{completedCourses.length}</p>
                </div>
                <Award className="w-8 h-8 text-accent opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">All Courses</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 animate-fade-in-up">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Active Courses
                    </CardTitle>
                    <CardDescription>Pick up where you left off</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {inProgressCourses.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>You haven't started any courses yet.</p>
                        <Button variant="link" asChild className="mt-2">
                          <Link href="/courses">Browse Catalog</Link>
                        </Button>
                      </div>
                    ) : (
                      inProgressCourses.map((course) => (
                        <div key={course.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-secondary/10 transition-colors">
                          <div className="text-3xl p-2 bg-secondary/20 rounded-md">{course.image}</div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold truncate">{course.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <span>{course.completed} / {course.lessons} lessons</span>
                              <span className="hidden sm:inline">•</span>
                              <span className="hidden sm:inline">{course.category}</span>
                            </div>
                            <Progress value={course.percentage} className="mt-3 h-1.5" />
                          </div>
                          <Button asChild size="sm" variant="outline">
                            <Link href={`/courses/${course.id}`}>
                              <PlayCircle className="w-4 h-4 mr-2" />
                              Resume
                            </Link>
                          </Button>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Overall Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center mb-6 relative">
                      <div className="w-32 h-32 rounded-full border-8 border-secondary flex items-center justify-center relative">
                        <div className="text-center">
                          <div className="text-3xl font-bold">{overall.percentage}%</div>
                          <div className="text-xs text-muted-foreground">Complete</div>
                        </div>
                        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="46"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="8"
                            strokeDasharray="289"
                            strokeDashoffset={289 - (289 * overall.percentage) / 100}
                            className="text-primary transition-all duration-1000 ease-out"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Lessons Completed</span>
                        <span className="font-medium">{overall.completed}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="animate-fade-in-up">
            <div className="grid md:grid-cols-2 gap-6">
              {myCourses.map((course) => (
                <Card key={course.id} className="hover-lift">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl p-2 bg-secondary/20 rounded-lg">{course.image}</div>
                      <div>
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <Badge variant="outline" className="mt-1">{course.category}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{course.percentage}%</span>
                        </div>
                        <Progress value={course.percentage} className="h-2" />
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-sm text-muted-foreground">
                          {course.completed}/{course.lessons} lessons
                        </span>
                        <Button size="sm" asChild>
                          <Link href={`/courses/${course.id}`}>
                            {course.percentage > 0 ? 'Continue' : 'Start'}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}