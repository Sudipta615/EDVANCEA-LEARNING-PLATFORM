'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { BookOpen, Clock, Star, Users, CheckCircle, Play, Award, Calendar, Target, FileText, CheckCircle2 } from 'lucide-react'
import Navbar from '@/components/navbar'
import { useAuth } from '@/lib/auth'
import { useProgress } from '@/lib/progress'

const courseData = {
  1: {
    id: 1,
    title: "Excel Mastery: From Zero to Hero",
    category: "Excel",
    description: "Complete Excel training from basic formulas to advanced data analysis and automation",
    fullDescription: "Master Microsoft Excel from the ground up with this comprehensive course. Starting with basic navigation and formulas, you'll progress through advanced topics like PivotTables, Power Query, and VBA programming. Perfect for beginners and those looking to fill knowledge gaps.",
    level: "Beginner",
    duration: "8 weeks",
    lessons: 42,
    rating: 4.8,
    students: 12500,
    image: "📊",
    lastUpdated: "2024-01-15",
    language: "English",
    whatYouLearn: [
      "Navigate Excel interface with confidence",
      "Master 50+ essential Excel functions",
      "Create stunning charts and dashboards",
      "Automate tasks with macros and VBA",
      "Analyze data with PivotTables and Power Query",
      "Build professional financial models"
    ],
    requirements: [
      "Basic computer skills",
      "Microsoft Excel installed (any version)",
      "No prior Excel experience required"
    ],
    modules: [
      {
        id: 1,
        title: "Excel Fundamentals",
        duration: "2h 30m",
        lessons: [
          { id: '1', title: "Getting Started with Excel", duration: "15m" },
          { id: '2', title: "Understanding the Ribbon", duration: "20m" },
          { id: '3', title: "Basic Navigation", duration: "25m" },
          { id: '4', title: "Saving and Managing Files", duration: "30m" },
          { id: '5', title: "Basic Formulas", duration: "40m" }
        ]
      },
      {
        id: 2,
        title: "Essential Functions",
        duration: "3h 45m",
        lessons: [
          { id: '6', title: "Mathematical Functions", duration: "35m" },
          { id: '7', title: "Text Functions", duration: "30m" },
          { id: '8', title: "Date and Time Functions", duration: "40m" },
          { id: '9', title: "Lookup Functions (VLOOKUP, HLOOKUP)", duration: "45m" },
          { id: '10', title: "INDEX and MATCH", duration: "35m" },
          { id: '11', title: "IF Functions and Nested Logic", duration: "40m" }
        ]
      },
      {
        id: 3,
        title: "Data Visualization",
        duration: "2h 15m",
        lessons: [
          { id: '12', title: "Creating Basic Charts", duration: "25m" },
          { id: '13', title: "Chart Types and When to Use Them", duration: "30m" },
          { id: '14', title: "Formatting Charts", duration: "35m" },
          { id: '15', title: "Dynamic Charts", duration: "25m" },
          { id: '16', title: "Dashboard Creation", duration: "40m" }
        ]
      },
      {
        id: 4,
        title: "PivotTables and Data Analysis",
        duration: "3h 30m",
        lessons: [
          { id: '17', title: "Introduction to PivotTables", duration: "30m" },
          { id: '18', title: "PivotTable Calculations", duration: "35m" },
          { id: '19', title: "PivotCharts", duration: "25m" },
          { id: '20', title: "Slicers and Timelines", duration: "30m" },
          { id: '21', title: "Advanced PivotTable Techniques", duration: "40m" }
        ]
      },
      {
        id: 5,
        title: "Power Query and Automation",
        duration: "4h 00m",
        lessons: [
          { id: '22', title: "Introduction to Power Query", duration: "35m" },
          { id: '23', title: "Data Transformation", duration: "40m" },
          { id: '24', title: "Merging and Appending Queries", duration: "35m" },
          { id: '25', title: "Introduction to Macros", duration: "30m" },
          { id: '26', title: "Recording and Running Macros", duration: "25m" },
          { id: '27', title: "VBA Basics", duration: "45m" }
        ]
      }
    ]
  }
}

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { isLessonComplete, getCourseProgress } = useProgress()
  const [activeTab, setActiveTab] = useState("overview")
  
  const courseId = parseInt(params.id as string)
  const course = courseData[courseId as keyof typeof courseData]

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Course Not Found</h1>
          <Button onClick={() => router.push('/courses')}>Back to Courses</Button>
        </div>
      </div>
    )
  }

  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0)
  const courseProgress = user ? getCourseProgress(course.id.toString(), totalLessons) : { completed: 0, total: totalLessons, percentage: 0 }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <Navbar />
      
      {/* Course Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
            <Link href="/courses" className="hover:text-slate-900 dark:hover:text-white">Courses</Link>
            <span>/</span>
            <span>{course.category}</span>
            <span>/</span>
            <span className="text-slate-900 dark:text-white">{course.title}</span>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-5xl">{course.image}</div>
                <div>
                  <Badge variant="secondary" className="mb-2">{course.category}</Badge>
                  <Badge variant="outline" className="ml-2">{course.level}</Badge>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{course.title}</h1>
              
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">{course.description}</p>
              
              <div className="flex items-center space-x-6 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span className="font-medium">{course.rating}</span>
                  <span className="ml-1">({course.students.toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-1" />
                  <span>{totalLessons} lessons</span>
                </div>
              </div>
            </div>
            
            <div>
              <Card className="sticky top-4">
                <CardHeader>
                  {user && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">Your Progress</span>
                        <span>{courseProgress.percentage}%</span>
                      </div>
                      <Progress value={courseProgress.percentage} className="h-2" />
                    </div>
                  )}
                  
                  <Button size="lg" className="w-full" asChild>
                    <Link href={`/courses/${course.id}/${course.modules[0].lessons[0].id}`}>
                      {user && courseProgress.percentage > 0 ? 'Continue Learning' : 'Start Learning'}
                      <Play className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  
                  <div className="text-center text-sm text-slate-600 dark:text-slate-400 mt-2">
                    🎓 Completely Free Learning
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>Lifetime access</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>Self-paced learning</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>Downloadable resources</span>
                  </div>
                  <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>Mobile friendly</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="objectives">Learning Path</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About this course</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{course.fullDescription}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>What you'll learn</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-3">
                      {course.whatYouLearn.map((item, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-slate-700 dark:text-slate-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Duration</span>
                      <span className="text-sm font-medium">{course.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Lessons</span>
                      <span className="text-sm font-medium">{totalLessons}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Level</span>
                      <span className="text-sm font-medium">{course.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Language</span>
                      <span className="text-sm font-medium">{course.language}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Last Updated</span>
                      <span className="text-sm font-medium">{course.lastUpdated}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="curriculum" className="space-y-4">
            {user && (
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Your Progress</span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">{courseProgress.completed}/{totalLessons} completed</span>
                  </div>
                  <Progress value={courseProgress.percentage} className="h-2" />
                </CardContent>
              </Card>
            )}

            {course.modules.map((module, moduleIndex) => (
              <Card key={module.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      Module {moduleIndex + 1}: {module.title}
                    </CardTitle>
                    <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                      <Clock className="w-4 h-4" />
                      <span>{module.duration}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {module.lessons.map((lesson, lessonIndex) => {
                      const isCompleted = user ? isLessonComplete(course.id.toString(), lesson.id) : false
                      
                      return (
                        <div
                          key={lesson.id}
                          className={`flex items-center justify-between p-3 rounded-lg border ${
                            isCompleted ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                          } hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors`}
                        >
                          <Link href={`/courses/${course.id}/${lesson.id}`} className="flex items-center space-x-3 flex-1">
                            <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-sm font-medium text-slate-600 dark:text-slate-300">
                              {isCompleted ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              ) : (
                                lessonIndex + 1
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-slate-900 dark:text-white flex items-center">
                                {lesson.title}
                                {isCompleted && (
                                  <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs">
                                    Completed
                                  </Badge>
                                )}
                              </div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">{lesson.duration}</div>
                            </div>
                          </Link>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="ghost" asChild>
                              <Link href={`/courses/${course.id}/${lesson.id}`}>
                                <Play className="w-4 h-4" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="objectives" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Path & Objectives</CardTitle>
                <CardDescription>
                  Your journey from beginner to Excel expert
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {course.modules.map((module, index) => (
                    <div key={module.id} className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{module.title}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                          Master essential concepts through hands-on practice and real-world examples.
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                          <span>{module.lessons.length} lessons</span>
                          <span>•</span>
                          <span>{module.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requirements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Course Requirements</CardTitle>
                <CardDescription>
                  What you need to get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {course.requirements.map((req, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <Target className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}