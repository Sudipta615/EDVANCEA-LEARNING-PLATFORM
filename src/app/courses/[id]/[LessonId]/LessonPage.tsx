// src/app/courses/[id]/[LessonId]/LessonPage.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Circle, ArrowLeft, ArrowRight, Home } from 'lucide-react'
import Navbar from '@/components/navbar'
import { useAuth } from '@/lib/auth'
import { useProgress } from '@/lib/progress'
import { LessonContent } from '@/lib/lessonData'

interface LessonPageProps {
  lesson: LessonContent;
  courseId: string;
  nextLessonId: string | null;
}

export default function LessonPage({ lesson, courseId, nextLessonId }: LessonPageProps) {
  const router = useRouter()
  const { user } = useAuth()
  const { isLessonComplete, markLessonComplete, markLessonIncomplete } = useProgress()
  const [mounted, setMounted] = useState(false)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (user && courseId && lesson.id) {
      setCompleted(isLessonComplete(courseId, lesson.id))
    }
  }, [user, courseId, lesson.id, isLessonComplete])

  const handleToggleComplete = () => {
    if (!user) {
      router.push('/login')
      return
    }

    if (completed) {
      markLessonIncomplete(courseId, lesson.id)
      setCompleted(false)
    } else {
      markLessonComplete(courseId, lesson.id)
      setCompleted(true)
    }
  }

  // Safe check for lesson content rendering
  if (!lesson) return null;

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <Navbar />
      
      {/* Header */}
      <div className="border-b border-border bg-card/50 sticky top-16 z-10 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href={`/courses/${courseId}`} className="hover:text-primary transition-colors flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Back
            </Link>
            <span className="h-4 w-[1px] bg-border hidden sm:block"></span>
            <span className="font-medium text-foreground truncate max-w-[200px] sm:max-w-md">
              {lesson.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
             <Button 
               onClick={handleToggleComplete}
               variant={completed ? "default" : "outline"}
               className={`transition-all duration-300 ${completed ? 'bg-success hover:bg-success/90 text-white border-transparent' : ''}`}
               size="sm"
             >
               {completed ? (
                 <>
                   <CheckCircle className="w-4 h-4 mr-2" />
                   <span className="hidden sm:inline">Completed</span>
                 </>
               ) : (
                 <>
                   <Circle className="w-4 h-4 mr-2" />
                   <span className="hidden sm:inline">Mark Complete</span>
                 </>
               )}
             </Button>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-12 animate-fade-in-up">
        <Card className="border-none shadow-none bg-transparent">
          <CardHeader className="px-0 pt-0">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="text-primary bg-primary/10 hover:bg-primary/20">
                Lesson {lesson.id}
              </Badge>
              <Badge variant="outline" className="text-muted-foreground">
                5 min read
              </Badge>
            </div>
            <CardTitle className="text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-4">
              {lesson.title}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="px-0">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              {lesson.content}
            </div>
          </CardContent>
        </Card>

        {/* Navigation Footer */}
        <div className="mt-16 pt-8 border-t border-border flex justify-between items-center">
          <Button variant="ghost" asChild disabled={lesson.id === '1'}>
            <Link href={lesson.id === '1' ? '#' : `/courses/${courseId}/${parseInt(lesson.id) - 1}`}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Previous
            </Link>
          </Button>

          <div className="flex gap-4">
             {nextLessonId ? (
               <Button asChild className="group">
                 <Link href={`/courses/${courseId}/${nextLessonId}`}>
                   Next Lesson
                   <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                 </Link>
               </Button>
             ) : (
               <Button asChild variant="secondary">
                 <Link href={`/courses/${courseId}`}>
                   Finish Course <Home className="w-4 h-4 ml-2"/>
                 </Link>
               </Button>
             )}
          </div>
        </div>
      </main>
    </div>
  )
}