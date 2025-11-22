'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookOpen, TrendingUp, Monitor, Video, Play, Star, Users, Clock, Award, ChevronRight, CheckCircle, ArrowRight } from 'lucide-react'
import Navbar from '@/components/navbar'

const courses = [
  {
    id: 1,
    title: "Excel Mastery",
    category: "Excel",
    description: "From basics to advanced formulas and data analysis",
    level: "Beginner to Advanced",
    duration: "8 weeks",
    lessons: 42,
    rating: 4.8,
    students: 12500,
    image: "📊",
    features: ["Pivot Tables", "Advanced Formulas", "Data Visualization", "Macros & VBA"]
  },
  {
    id: 2,
    title: "Financial Modeling",
    category: "Finance",
    description: "Build professional financial models from scratch",
    level: "Intermediate",
    duration: "6 weeks",
    lessons: 36,
    rating: 4.9,
    students: 8300,
    image: "💰",
    features: ["DCF Analysis", "Financial Statements", "Valuation Methods", "Risk Assessment"]
  },
  {
    id: 3,
    title: "PowerPoint Pro",
    category: "PowerPoint",
    description: "Create stunning presentations that captivate audiences",
    level: "Beginner to Intermediate",
    duration: "4 weeks",
    lessons: 28,
    rating: 4.7,
    students: 15600,
    image: "📽️",
    features: ["Design Principles", "Animation & Transitions", "Template Creation", "Public Speaking"]
  },
  {
    id: 4,
    title: "Video Editing Essentials",
    category: "Video Editing",
    description: "Edit professional videos using industry-standard tools",
    level: "Beginner to Advanced",
    duration: "10 weeks",
    lessons: 48,
    rating: 4.8,
    students: 9200,
    image: "🎬",
    features: ["Timeline Editing", "Color Grading", "Audio Mixing", "Visual Effects"]
  }
]

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Financial Analyst",
    content: "Edvancea transformed my career. The Excel and Finance courses helped me land my dream job!",
    rating: 5,
    avatar: "👩‍💼"
  },
  {
    name: "Michael Rodriguez",
    role: "Marketing Manager",
    content: "The PowerPoint course is incredible. My presentations have never been more impactful.",
    rating: 5,
    avatar: "👨‍💼"
  },
  {
    name: "Emily Johnson",
    role: "Content Creator",
    content: "Finally learned video editing the right way. The step-by-step approach is perfect for beginners.",
    rating: 5,
    avatar: "👩‍🎨"
  }
]

const features = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Comprehensive Curriculum",
    description: "Expertly designed courses with real-world projects and hands-on practice"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Expert Instructors",
    description: "Learn from industry professionals with years of practical experience"
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Learn at Your Pace",
    description: "Flexible scheduling with lifetime access to course materials"
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Free Learning",
    description: "Access all courses completely free - no hidden costs or subscriptions"
  }
]

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredCourses = selectedCategory === "all" 
    ? courses 
    : courses.filter(course => course.category.toLowerCase() === selectedCategory.toLowerCase())

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800">
              🚀 Master Professional Skills
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              Excel, Finance, PowerPoint &
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {" "}Video Editing
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
              Transform your career with comprehensive, step-by-step courses designed by industry experts. 
              Learn at your own pace with completely free access to all content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-3" asChild>
                <Link href="/courses">
                  Browse Courses
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3" asChild>
                <Link href="/signup">
                  Get Started Free
                  <Play className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 dark:text-white">45,600+</div>
              <div className="text-slate-600 dark:text-slate-400">Students Enrolled</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 dark:text-white">154</div>
              <div className="text-slate-600 dark:text-slate-400">Expert Lessons</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 dark:text-white">4.8</div>
              <div className="text-slate-600 dark:text-slate-400">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-900 dark:text-white">100%</div>
              <div className="text-slate-600 dark:text-slate-400">Free Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Popular Courses
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Choose from our carefully curated courses and start your learning journey today
            </p>
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
            <TabsList className="grid w-full grid-cols-5 max-w-md mx-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="excel">Excel</TabsTrigger>
              <TabsTrigger value="finance">Finance</TabsTrigger>
              <TabsTrigger value="powerpoint">PowerPoint</TabsTrigger>
              <TabsTrigger value="video editing">Video</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl">{course.image}</div>
                      <div>
                        <Badge variant="secondary" className="mb-2">{course.category}</Badge>
                        <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                          {course.title}
                        </CardTitle>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-slate-600 dark:text-slate-400">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {course.duration}
                      </span>
                      <span className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-1" />
                        {course.lessons} lessons
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-medium">{course.rating}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {course.features.slice(0, 2).map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {course.students.toLocaleString()} students
                    </span>
                    <Button className="group-hover:bg-blue-600 transition-colors" asChild>
                      <Link href={`/courses/${course.id}`}>
                        Start Learning
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Why Choose Edvancea?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              We provide everything you need to succeed in your professional development journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 border-0 shadow-sm">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Student Success Stories
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Join thousands of satisfied learners who transformed their careers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 border-0 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{testimonial.avatar}</div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">{testimonial.name}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 italic">"{testimonial.content}"</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Advance Your Skills?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of learners and start your journey to professional excellence today - completely free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3" asChild>
              <Link href="/signup">
                Start Learning Free
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-slate-900" asChild>
              <Link href="/courses">
                View Course Catalog
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Edvancea</span>
              </div>
              <p className="text-slate-400 text-sm sm:text-base">
                Empowering professionals with skills that matter. Completely free learning for everyone.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Courses</h4>
              <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
                <li><Link href="/courses" className="hover:text-white transition-colors">Excel Mastery</Link></li>
                <li><Link href="/courses" className="hover:text-white transition-colors">Financial Modeling</Link></li>
                <li><Link href="/courses" className="hover:text-white transition-colors">PowerPoint Pro</Link></li>
                <li><Link href="/courses" className="hover:text-white transition-colors">Video Editing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h4>
              <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Support</h4>
              <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
            <p className="text-sm sm:text-base text-slate-400">© 2024 Edvancea. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}