'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth'

interface ProgressData {
  [courseId: string]: {
    [lessonId: string]: boolean
  }
}

export function useProgress() {
  const { user } = useAuth()
  const [progress, setProgress] = useState<ProgressData>({})
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (user) {
      const savedProgress = localStorage.getItem(`edvancea_progress_${user.id}`)
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress))
      }
    }
  }, [user])

  const saveProgress = (newProgress: ProgressData) => {
    if (user) {
      setProgress(newProgress)
      localStorage.setItem(`edvancea_progress_${user.id}`, JSON.stringify(newProgress))
    }
  }

  const markLessonComplete = (courseId: string, lessonId: string) => {
    const newProgress = {
      ...progress,
      [courseId]: {
        ...progress[courseId],
        [lessonId]: true
      }
    }
    saveProgress(newProgress)
  }

  const markLessonIncomplete = (courseId: string, lessonId: string) => {
    const newProgress = {
      ...progress,
      [courseId]: {
        ...progress[courseId],
        [lessonId]: false
      }
    }
    saveProgress(newProgress)
  }

  const isLessonComplete = (courseId: string, lessonId: string) => {
    return progress[courseId]?.[lessonId] || false
  }

  const getCourseProgress = (courseId: string, totalLessons: number) => {
    const courseProgress = progress[courseId] || {}
    const completedLessons = Object.values(courseProgress).filter(Boolean).length
    return {
      completed: completedLessons,
      total: totalLessons,
      percentage: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
    }
  }

  const getOverallProgress = () => {
    let totalCompleted = 0
    let totalLessons = 0

    Object.entries(progress).forEach(([courseId, courseProgress]) => {
      const completed = Object.values(courseProgress).filter(Boolean).length
      const total = Object.keys(courseProgress).length
      totalCompleted += completed
      totalLessons += total
    })

    return {
      completed: totalCompleted,
      total: totalLessons,
      percentage: totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0
    }
  }

  return {
    progress,
    markLessonComplete,
    markLessonIncomplete,
    isLessonComplete,
    getCourseProgress,
    getOverallProgress
  }
}