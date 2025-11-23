'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, BrainCircuit, Clock, Trophy, Target, 
  Dumbbell, Star, Flame, Zap, Award, CheckCircle2 
} from 'lucide-react'
import Navbar from '@/components/navbar'
import { CoursePractice } from '@/lib/practiceData'

// Define types for stored progress
interface PracticeProgress {
  [setId: string]: {
    score: number;
    totalQuestions: number;
    completedAt: string;
  }
}

export default function PracticePage({ data }: { data: CoursePractice }) {
  const [progressData, setProgressData] = useState<PracticeProgress>({})
  const [mounted, setMounted] = useState(false)

  // Load progress from localStorage
  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('edvancea_practice_progress')
    if (saved) {
      try {
        setProgressData(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to load practice progress")
      }
    }
  }, [])

  // Calculate Dashboard Stats
  const totalSets = data.modules.reduce((acc, m) => acc + m.sets.length, 0)
  const completedSets = Object.keys(progressData).filter(key => 
    data.modules.some(m => m.sets.some(s => s.id === key))
  ).length
  
  const totalXP = Object.entries(progressData).reduce((acc, [key, val]) => {
    // Find the set to get its XP value
    let setXP = 0;
    for(const m of data.modules) {
      const s = m.sets.find(s => s.id === key)
      if(s) {
        // Only award XP if score is > 60%
        if ((val.score / val.totalQuestions) >= 0.6) setXP = s.xp
        break;
      }
    }
    return acc + setXP
  }, 0)

  const completionPercentage = Math.round((completedSets / totalSets) * 100) || 0

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 selection:bg-indigo-500/30">
      <Navbar />
      
      {/* Dashboard Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
          {/* Nav & Title */}
          <div className="mb-8">
            <Link 
              href={`/courses/${data.courseId}`}
              className="inline-flex items-center text-sm text-slate-500 hover:text-indigo-600 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Course Material
            </Link>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {data.title}
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2">
                  Sharpen your skills with interactive drills and quizzes.
                </p>
              </div>
              <div className="hidden md:block text-right">
                <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total XP</div>
                <div className="text-4xl font-black text-indigo-600 dark:text-indigo-400">{totalXP}</div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-scale-in">
            <Card className="bg-indigo-50 dark:bg-indigo-950/30 border-indigo-100 dark:border-indigo-900">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg text-indigo-600 dark:text-indigo-400">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {completedSets}/{totalSets}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase">Drills Completed</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-900">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg text-emerald-600 dark:text-emerald-400">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {completionPercentage}%
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase">Completion Rate</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-amber-50 dark:bg-amber-950/30 border-amber-100 dark:border-amber-900">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-2 bg-amber-100 dark:bg-amber-900 rounded-lg text-amber-600 dark:text-amber-400">
                  <Flame className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {mounted ? '3' : '-'}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase">Day Streak</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 md:hidden">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {totalXP}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase">Total XP</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content - Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-10">
          {data.modules.map((module, index) => (
            <section key={module.moduleId} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
              
              {/* Module Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold text-sm">
                  {module.moduleId}
                </div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                  {module.title}
                </h2>
              </div>

              {/* Practice Sets Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {module.sets.length > 0 ? (
                  module.sets.map((set) => {
                    const setProgress = progressData[set.id]
                    const isCompleted = !!setProgress
                    const scorePercent = isCompleted ? Math.round((setProgress.score / setProgress.totalQuestions) * 100) : 0
                    
                    return (
                      <Card key={set.id} className={`group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 relative overflow-hidden ${isCompleted ? 'border-green-200 dark:border-green-900' : ''}`}>
                        
                        {/* Progress Bar Overlay at bottom */}
                        {isCompleted && (
                          <div className="absolute bottom-0 left-0 h-1 bg-green-500" style={{ width: `${scorePercent}%` }}></div>
                        )}

                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start mb-2">
                            <div className={`p-2 rounded-lg transition-colors ${
                              isCompleted 
                                ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                            }`}>
                              {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : 
                               set.difficulty === 'Easy' ? <Dumbbell className="w-5 h-5" /> : 
                               set.difficulty === 'Medium' ? <Target className="w-5 h-5" /> : 
                               <BrainCircuit className="w-5 h-5" />}
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              <Badge variant="secondary" className={`
                                ${set.difficulty === 'Easy' ? 'bg-green-50 text-green-700 border-green-100' : 
                                  set.difficulty === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' : 
                                  'bg-red-50 text-red-700 border-red-100'}
                              `}>
                                {set.difficulty}
                              </Badge>
                              <span className="text-[10px] font-bold text-indigo-500">+{set.xp} XP</span>
                            </div>
                          </div>
                          <CardTitle className="text-lg group-hover:text-indigo-600 transition-colors">
                            {set.title}
                          </CardTitle>
                        </CardHeader>
                        
                        <CardContent>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 min-h-[2.5rem] line-clamp-2">
                            {set.description}
                          </p>
                          
                          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                            <div className="flex items-center text-xs font-medium text-slate-500">
                              <Clock className="w-3.5 h-3.5 mr-1" />
                              {set.estimatedTime}
                            </div>
                            
                            <Button 
                              size="sm" 
                              asChild
                              className={`${isCompleted ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80' : 'group-hover:bg-indigo-600 group-hover:text-white transition-colors'}`}
                            >
                              <Link href={`/courses/${data.courseId}/practice/${set.id}`}>
                                {isCompleted ? 'Retake' : 'Start'}
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })
                ) : (
                  <div className="col-span-full p-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 text-center">
                    <p className="text-slate-500 flex items-center justify-center gap-2">
                      <Star className="w-4 h-4" />
                      No practice drills available for this module yet.
                    </p>
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}