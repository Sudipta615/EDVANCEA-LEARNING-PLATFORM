'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, CheckCircle2, XCircle, AlertCircle, RefreshCcw, ChevronRight, Trophy } from 'lucide-react'
import Navbar from '@/components/navbar'
import { PracticeSet } from '@/lib/practiceData'

interface QuizPageProps {
  practiceSet: PracticeSet;
  courseId: string;
}

export default function QuizPage({ practiceSet, courseId }: QuizPageProps) {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  
  // Hydration safe check
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => setIsMounted(true), [])

  const currentQuestion = practiceSet.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + (showResults ? 1 : 0)) / practiceSet.questions.length) * 100

  // SAVE PROGRESS WHEN QUIZ FINISHES
  useEffect(() => {
    if (showResults) {
      const savedData = localStorage.getItem('edvancea_practice_progress')
      const progress = savedData ? JSON.parse(savedData) : {}
      
      // Only overwrite if new score is higher or if it didn't exist
      const previousBest = progress[practiceSet.id]?.score || 0
      
      if (score >= previousBest) {
        progress[practiceSet.id] = {
          score: score,
          totalQuestions: practiceSet.questions.length,
          completedAt: new Date().toISOString()
        }
        localStorage.setItem('edvancea_practice_progress', JSON.stringify(progress))
      }
    }
  }, [showResults, score, practiceSet.id, practiceSet.questions.length])

  if (!isMounted) return null

  // Empty state check
  if (!practiceSet.questions || practiceSet.questions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-md text-center p-6">
          <div className="flex justify-center mb-4">
            <AlertCircle className="w-12 h-12 text-yellow-500" />
          </div>
          <h2 className="text-xl font-bold mb-2">Under Construction</h2>
          <p className="text-muted-foreground mb-6">
            This practice set doesn't have any questions yet. Please check back later!
          </p>
          <Button onClick={() => router.back()}>Go Back</Button>
        </Card>
      </div>
    )
  }

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return
    setSelectedAnswer(index)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer
    
    if (isCorrect) {
      setScore(score + 1)
    }
    setIsAnswered(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < practiceSet.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
    } else {
      setShowResults(true)
    }
  }

  // --- RESULTS VIEW ---
  if (showResults) {
    const percentage = Math.round((score / practiceSet.questions.length) * 100)
    let message = "Keep practicing!"
    let color = "text-yellow-600"
    
    if (percentage >= 80) {
      message = "Outstanding!"
      color = "text-green-600"
    } else if (percentage >= 60) {
      message = "Good job!"
      color = "text-blue-600"
    }

    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 selection:bg-indigo-500/30">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-12 animate-scale-in">
          <Card className="border-none shadow-xl bg-white dark:bg-slate-900 overflow-hidden">
            <div className="bg-slate-900 text-white p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-indigo-500/20 to-transparent pointer-events-none" />
              
              <Trophy className={`w-16 h-16 mx-auto mb-4 ${percentage >= 80 ? 'text-yellow-400 animate-bounce' : 'text-slate-400'}`} />
              <h1 className="text-3xl font-bold mb-2">{message}</h1>
              <p className="text-slate-300">You scored {score} out of {practiceSet.questions.length}</p>
              
              {percentage >= 60 && (
                <div className="mt-4 inline-block px-4 py-1 rounded-full bg-indigo-500/30 border border-indigo-500/50 text-indigo-200 text-sm font-semibold">
                  +{practiceSet.xp} XP Earned
                </div>
              )}
            </div>

            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className={`text-6xl font-black mb-2 ${color}`}>
                  {percentage}%
                </div>
                <div className="h-3 w-full max-w-xs mx-auto bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ease-out rounded-full ${
                      percentage >= 80 ? 'bg-green-500' : percentage >= 60 ? 'bg-blue-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              <div className="grid gap-4">
                <Button size="lg" className="w-full bg-indigo-600 hover:bg-indigo-700" onClick={() => window.location.reload()}>
                  <RefreshCcw className="w-4 h-4 mr-2" />
                  Retake Drill
                </Button>
                <Button variant="outline" size="lg" className="w-full" asChild>
                  <Link href={`/courses/${courseId}/practice`}>
                    Back to Practice Menu
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // --- QUESTION VIEW ---
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 selection:bg-indigo-500/30 flex flex-col">
      <Navbar />
      
      <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-8 md:py-12">
        <div className="flex justify-between items-center mb-6">
          <Button variant="ghost" size="sm" asChild className="text-slate-500 hover:text-slate-900 dark:hover:text-slate-200">
            <Link href={`/courses/${courseId}/practice`}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Exit
            </Link>
          </Button>
          <div className="text-sm font-medium text-slate-500">
            Question {currentQuestionIndex + 1} of {practiceSet.questions.length}
          </div>
        </div>

        <Progress value={progress} className="h-2 mb-8 bg-slate-200 dark:bg-slate-800" />

        <Card className="border-none shadow-lg bg-white dark:bg-slate-900 overflow-hidden min-h-[400px] flex flex-col">
          <CardHeader className="pb-2">
            <Badge variant="outline" className="w-fit mb-4 border-indigo-200 text-indigo-600 bg-indigo-50">
              {practiceSet.title}
            </Badge>
            <CardTitle className="text-xl md:text-2xl leading-snug">
              {currentQuestion.text}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 pt-6">
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                let buttonStyle = "border-2 hover:border-indigo-200 hover:bg-slate-50 dark:hover:bg-slate-800 dark:border-slate-700"
                let icon = null

                if (isAnswered) {
                  if (index === currentQuestion.correctAnswer) {
                    buttonStyle = "border-2 border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                    icon = <CheckCircle2 className="w-5 h-5 text-green-600" />
                  } else if (index === selectedAnswer) {
                    buttonStyle = "border-2 border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"
                    icon = <XCircle className="w-5 h-5 text-red-600" />
                  } else {
                    buttonStyle = "opacity-50 border-slate-200 dark:border-slate-800"
                  }
                } else if (selectedAnswer === index) {
                  buttonStyle = "border-2 border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-600"
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    disabled={isAnswered}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-200 flex justify-between items-center ${buttonStyle}`}
                  >
                    <span className="font-medium">{option}</span>
                    {icon}
                  </button>
                )
              })}
            </div>

            {isAnswered && (
              <div className="mt-6 p-4 rounded-lg bg-slate-100 dark:bg-slate-800 animate-in fade-in slide-in-from-top-2">
                <div className="font-semibold mb-1 flex items-center gap-2">
                  {selectedAnswer === currentQuestion.correctAnswer ? (
                    <span className="text-green-600">Correct!</span>
                  ) : (
                    <span className="text-red-600">Incorrect</span>
                  )}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}
          </CardContent>

          <CardFooter className="pt-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            {!isAnswered ? (
              <Button 
                className="w-full md:w-auto md:ml-auto bg-indigo-600 hover:bg-indigo-700 text-white" 
                size="lg"
                disabled={selectedAnswer === null}
                onClick={handleSubmitAnswer}
              >
                Check Answer
              </Button>
            ) : (
              <Button 
                className="w-full md:w-auto md:ml-auto" 
                size="lg"
                onClick={handleNextQuestion}
              >
                {currentQuestionIndex < practiceSet.questions.length - 1 ? (
                  <>
                    Next Question <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    Finish Drill <Trophy className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}