'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookOpen, Clock, Star, Award, TrendingUp, Calendar, PlayCircle, CheckCircle, BarChart3, Users, Target, Flame } from 'lucide-react'
import Navbar from '@/components/navbar'
import { useAuth } from '@/lib/auth'
import { useProgress } from '@/lib/progress'
import { useRouter } from 'next/navigation'

const enrolledCourses = [
  {
    id: 1,
    title: "Excel Mastery: From Zero to Hero",
    category: "Excel",
    image: "📊",
    totalLessons: 42,
    lastAccessed: "2024-01-25",
    nextLesson: "Introduction to Power Query",
    nextLessonId: "22",
    estimatedRemaining: "4h 20m"
  },
  {
    id: 3,
    title: "Financial Modeling Fundamentals",
    category: "Finance",
    image: "💰",
    totalLessons: 36,
    lastAccessed: "2024-01-23",
    nextLesson: "Building DCF Models",
    nextLessonId: "15",
    estimatedRemaining: "8h 45m"
  }
]

const achievements = [
  {
    id: 1,
    title: "Fast Learner",
    description: "Complete 5 lessons in one day",
    icon: "🚀",
    earned: true,
    date: "2024-01-20"
  },
  {
    id: 2,
    title: "Excel Beginner",
    description: "Complete first Excel module",
    icon: "📊",
    earned: true,
    date: "2024-01-18"
  },
  {
    id: 3,
    title: "Dedicated Student",
    description: "7-day learning streak",
    icon: "🔥",
    earned: false,
    progress: 5
  },
  {
    id: 4,
    title: "Course Master",
    description: "Complete your first course",
    icon: "🎓",
    earned: false,
    progress: 65
  }
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const { user, logout } = useAuth()
  const { getCourseProgress, getOverallProgress } = useProgress()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }
  }, [user, router])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    )
  }

  const overallProgress = getOverallProgress()
  const learningStats = {
    totalCourses: enrolledCourses.length,
    completedCourses: 0,
    totalLessons: enrolledCourses.reduce((acc, course) => acc + course.totalLessons, 0),
    completedLessons: overallProgress.completed,
    totalTime: "18h 50m",
    streak: 5,
    certificates: 0
  }

  const recentActivity = [
    {
      id: 1,
      type: "lesson_completed",
      title: "Completed: Basic Formulas",
      course: "Excel Mastery",
      time: "2 hours ago",
      icon: <CheckCircle className="w-4 h-4 text-green-500" />
    },
    {
      id: 2,
      type: "lesson_started",
      title: "Started: Power Query Introduction",
      course: "Excel Mastery",
      time: "1 day ago",
      icon: <PlayCircle className="w-4 h-4 text-blue-500" />
    },
    {
      id: 3,
      type: "achievement_earned",
      title: "Earned: Fast Learner",
      course: null,
      time: "3 days ago",
      icon: <Award className="w-4 h-4 text-yellow-500" />
    },
    {
      id: 4,
      type: "course_enrolled",
      title: "Enrolled: Financial Modeling",
      course: "Financial Modeling Fundamentals",
      time: "1 week ago",
      icon: <BookOpen className="w-4 h-4 text-purple-500" />
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <Navbar />
      
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome back, {user.name}!</h1>
              <p className="text-slate-600 dark:text-slate-300 mt-1">Continue your learning journey</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-slate-600 dark:text-slate-400">Current Streak</div>
                <div className="text-2xl font-bold text-orange-500">🔥 {learningStats.streak} days</div>
              </div>
              <Button asChild>
                <Link href="/courses">Browse Courses</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Courses</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{learningStats.totalCourses}</p>
                </div>
                <BookOpen className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Completed</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{learningStats.completedLessons}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Learning Time</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{learningStats.totalTime}</p>
                </div>
                <Clock className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Certificates</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{learningStats.certificates}</p>
                </div>
                <Award className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Continue Learning
                      <Badge variant="outline">{overallProgress.percentage}% Complete</Badge>
                    </CardTitle>
                    <CardDescription>Pick up where you left off</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {enrolledCourses.map((course) => {
                      const progress = getCourseProgress(course.id.toString(), course.totalLessons)
                      
                      return (
                        <div key={course.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                          <div className="text-3xl">{course.image}</div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-900 dark:text-white">{course.title}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Next: {course.nextLesson}</p>
                            <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                              <span>{progress.completed}/{course.totalLessons} lessons</span>
                              <span>•</span>
                              <span>{course.estimatedRemaining} remaining</span>
                            </div>
                            <Progress value={progress.percentage} className="mt-2 h-2" />
                          </div>
                          <Button asChild>
                            <Link href={`/courses/${course.id}/${course.nextLessonId}`}>
                              <PlayCircle className="w-4 h-4 mr-2" />
                              Resume
                            </Link>
                          </Button>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Learning Progress</CardTitle>
                    <CardDescription>Your overall learning journey</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Overall Progress</span>
                          <span>{overallProgress.percentage}%</span>
                        </div>
                        <Progress value={overallProgress.percentage} className="h-3" />
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-slate-600 dark:text-slate-400">Total Time This Week</div>
                          <div className="font-semibold text-slate-900 dark:text-white">4h 25m</div>
                        </div>
                        <div>
                          <div className="text-slate-600 dark:text-slate-400">Lessons Completed</div>
                          <div className="font-semibold text-slate-900 dark:text-white">12</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Achievements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {achievements.filter(a => a.earned).slice(0, 3).map((achievement) => (
                      <div key={achievement.id} className="flex items-center space-x-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <div className="font-medium text-slate-900 dark:text-white">{achievement.title}</div>
                          <div className="text-xs text-slate-600 dark:text-slate-400">{achievement.date}</div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Learning Goals</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Weekly Target</span>
                      <span className="text-sm font-medium">5h / 7h</span>
                    </div>
                    <Progress value={71} className="h-2" />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Monthly Target</span>
                      <span className="text-sm font-medium">18h / 20h</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {enrolledCourses.map((course) => {
                const progress = getCourseProgress(course.id.toString(), course.totalLessons)
                
                return (
                  <Card key={course.id}>
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{course.image}</div>
                        <div>
                          <CardTitle className="text-lg">{course.title}</CardTitle>
                          <Badge variant="secondary">{course.category}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>{progress.percentage}%</span>
                        </div>
                        <Progress value={progress.percentage} className="h-2" />
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-slate-600 dark:text-slate-400">Lessons</div>
                          <div className="font-medium">{progress.completed}/{course.totalLessons}</div>
                        </div>
                        <div>
                          <div className="text-slate-600 dark:text-slate-400">Last Accessed</div>
                          <div className="font-medium">{course.lastAccessed}</div>
                        </div>
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        <div>Next: {course.nextLesson}</div>
                        <div>Est. remaining: {course.estimatedRemaining}</div>
                      </div>
                      <Button className="w-full" asChild>
                        <Link href={`/courses/${course.id}/${course.nextLessonId}`}>
                          Continue Learning
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className={`${achievement.earned ? 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800' : 'opacity-75'}`}>
                  <CardHeader className="text-center">
                    <div className="text-5xl mb-2">{achievement.icon}</div>
                    <CardTitle className="text-lg">{achievement.title}</CardTitle>
                    <CardDescription>{achievement.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    {achievement.earned ? (
                      <div className="space-y-2">
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Earned</Badge>
                        <div className="text-sm text-slate-600 dark:text-slate-400">{achievement.date}</div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="text-sm text-slate-600 dark:text-slate-400">In Progress</div>
                        <Progress value={achievement.progress || 0} className="h-2" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest learning activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <div className="mt-1">{activity.icon}</div>
                      <div className="flex-1">
                        <div className="font-medium text-slate-900 dark:text-white">{activity.title}</div>
                        {activity.course && (
                          <div className="text-sm text-slate-600 dark:text-slate-400">{activity.course}</div>
                        )}
                        <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}