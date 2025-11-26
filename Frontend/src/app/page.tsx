'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookOpen, Layout, Terminal, Layers, ArrowRight, CheckCircle, Sparkles, BookMarked, Zap, ShieldCheck, Globe } from 'lucide-react'
import Navbar from '@/components/navbar'
import { cn } from '@/lib/utils'

const courses = [
  {
    id: 1,
    title: "Excel Mastery",
    category: "Excel",
    description: "From basics to advanced formulas and data analysis.",
    level: "Beginner to Advanced",
    lessons: 42,
    image: "📊",
    features: ["Pivot Tables", "Advanced Formulas", "Data Visualization"]
  },
  {
    id: 2,
    title: "Financial Modeling",
    category: "Finance",
    description: "Build professional financial models from scratch.",
    level: "Intermediate",
    lessons: 36,
    image: "💰",
    features: ["DCF Analysis", "Financial Statements", "Valuation Methods"]
  },
  {
    id: 3,
    title: "PowerPoint Pro",
    category: "PowerPoint",
    description: "Create stunning presentations that captivate audiences.",
    level: "Beginner",
    lessons: 28,
    image: "📽️",
    features: ["Design Principles", "Animation", "Template Creation"]
  },
  {
    id: 4,
    title: "Video Editing Essentials",
    category: "Video Editing",
    description: "Edit professional videos using industry-standard tools.",
    level: "Beginner to Advanced",
    lessons: 48,
    image: "🎬",
    features: ["Timeline Editing", "Color Grading", "Audio Mixing"]
  }
]

const features = [
  {
    icon: <BookMarked className="w-6 h-6" />,
    title: "Structured Reading",
    description: "Curated text-based lessons that you can read at your own pace without pausing videos.",
    borderColor: "hover:border-blue-500"
  },
  {
    icon: <Layout className="w-6 h-6" />,
    title: "Project Based",
    description: "Learn by doing with real-world examples and practical exercises included in every module.",
    borderColor: "hover:border-green-500"
  },
  {
    icon: <Terminal className="w-6 h-6" />,
    title: "Skill Focused",
    description: "Direct-to-the-point content designed to help you master specific tools and concepts efficiently.",
    borderColor: "hover:border-purple-500"
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Open Access",
    description: "Knowledge shouldn't be gated. Access our entire library of documentation completely free.",
    borderColor: "hover:border-orange-500"
  }
]

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredCourses = selectedCategory === "all" 
    ? courses 
    : courses.filter(course => course.category.toLowerCase() === selectedCategory.toLowerCase())

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <Navbar />
      
      {/* Hero Section - Redesigned */}
      <section className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 border-b border-border/40 hero-gradient-bg">
        {/* Ambient Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-primary/20 rounded-full blur-[128px] animate-pulse opacity-40 mix-blend-multiply dark:mix-blend-screen"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-accent/20 rounded-full blur-[128px] animate-pulse opacity-40 mix-blend-multiply dark:mix-blend-screen" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10 animate-fade-in-up">
          {/* Modern Badge */}
          <div className="inline-flex items-center gap-2 mb-10 px-4 py-1.5 rounded-full bg-secondary/50 backdrop-blur-md border border-border/60 shadow-sm hover:bg-secondary/80 transition-all duration-300 cursor-default animate-scale-in group">
            <Sparkles className="w-4 h-4 text-accent group-hover:animate-spin-slow" />
            <span className="text-sm font-semibold text-foreground/80 tracking-wide uppercase text-[11px]">The Modern Knowledge Platform</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter text-foreground mb-8 leading-[1.1] drop-shadow-sm">
            Master Skills<br className="hidden sm:block" />
            <span className="gradient-text inline-block relative">
              Through Reading
              {/* Decorative underline */}
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed font-light tracking-wide">
            No lengthy videos. No fluff. Just <span className="text-foreground font-medium">high-quality</span>, text-based courses designed for <span className="text-foreground font-medium">efficiency</span> and <span className="text-foreground font-medium">speed</span>.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* Primary Button with Glow */}
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-20 group-hover:opacity-50 transition duration-500 group-hover:duration-200"></div>
                <Button size="lg" className="relative text-lg px-10 h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl transition-all duration-300 hover:scale-105 active:scale-95" asChild>
                <Link href="/courses">
                    Start Reading Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                </Button>
            </div>

            {/* Secondary Button - Glassmorphic */}
            <Button size="lg" variant="outline" className="text-lg px-10 h-14 rounded-full bg-background/30 backdrop-blur-sm border-foreground/10 hover:bg-foreground/5 hover:border-foreground/20 text-foreground transition-all duration-300" asChild>
              <Link href="/signup">
                Create Free Account
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={cn(
                  "flex flex-col items-start p-6 rounded-3xl bg-card border border-border/60 hover:border-opacity-100 hover-lift transition-all duration-300 group",
                  feature.borderColor
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center mb-5 text-primary group-hover:scale-110 transition-transform duration-500 ease-out">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground tracking-tight">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section id="courses" className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30 relative overflow-hidden">
         {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-extrabold mb-4 flex items-center gap-3 tracking-tight">
                <Layers className="w-8 h-8 text-primary" />
                Featured Guides
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl">Select a topic to begin your mastery. All courses are free and self-paced.</p>
            </div>
            
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full md:w-auto">
              <TabsList className="bg-background border border-border p-1.5 h-auto rounded-full shadow-sm">
                {['all', 'excel', 'finance', 'powerpoint'].map(cat => (
                  <TabsTrigger 
                    key={cat} 
                    value={cat} 
                    className="px-6 py-2.5 rounded-full capitalize data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all font-medium"
                  >
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {filteredCourses.map((course) => (
              <Link key={course.id} href={`/courses/${course.id}`} className="group">
                <Card className="h-full hover-lift border-border/60 bg-card overflow-hidden relative rounded-3xl">
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <CardHeader>
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-4xl p-4 bg-secondary rounded-2xl inline-block shadow-sm ring-1 ring-black/5 dark:ring-white/10 group-hover:scale-105 transition-transform duration-300">
                        {course.image}
                      </div>
                      <Badge variant="outline" className="font-mono text-xs border-primary/20 bg-primary/5 text-primary px-3 py-1 rounded-full">
                        {course.lessons} MODULES
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="text-base mt-3 line-clamp-2">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-y-2 gap-x-4 mb-8">
                      {course.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-muted-foreground font-medium">
                          <CheckCircle className="w-4 h-4 mr-2 text-success" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center text-primary font-semibold text-base group-hover:translate-x-2 transition-transform">
                      Read Documentation <ArrowRight className="ml-2 w-5 h-5" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/60 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-foreground tracking-tight">Edvancea</span>
            </div>
            <div className="flex gap-8 text-sm font-medium text-muted-foreground">
              <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
              <Link href="#" className="hover:text-primary transition-colors">About</Link>
            </div>
            <div className="text-sm text-muted-foreground">
              &copy; 2024 Edvancea Platform. <span className="text-primary font-medium">Free education for everyone.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}