'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Trophy,
  Target,
  Zap,
  BrainCircuit,
  Check,
  X,
  ChevronRight,
  RotateCcw,
  ArrowRight,
  Lightbulb,
  Filter
} from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Navbar from '@/components/navbar'
import { useAuth } from '@/lib/auth'
import { usePracticeProgress } from '@/lib/practiceProgress'
import { practiceTopics, PracticeTopic, Question } from '@/lib/practiceData'
import { cn } from '@/lib/utils'

export default function PracticePage() {
  const { user } = useAuth()
  const { getOverallStats, getTopicProgress, submitAnswer } = usePracticeProgress()
  const [selectedTopic, setSelectedTopic] = useState<PracticeTopic | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [filterCategory, setFilterCategory] = useState("all")

  // Stats
  const stats = getOverallStats()

  const handleTopicStart = (topic: PracticeTopic) => {
    setSelectedTopic(topic)
    setCurrentQuestionIndex(0)
    resetQuestionState()
  }

  const resetQuestionState = () => {
    setSelectedOption(null)
    setIsAnswered(false)
    setShowExplanation(false)
  }

  const handleOptionSelect = (index: number) => {
    if (isAnswered || !selectedTopic) return
    setSelectedOption(index)

    const currentQuestion = selectedTopic.questions[currentQuestionIndex]
    const isCorrect = index === currentQuestion.correctAnswer

    submitAnswer(selectedTopic.id, currentQuestion.id, isCorrect)
    setIsAnswered(true)
    setShowExplanation(true)
  }

  const handleNextQuestion = () => {
    if (!selectedTopic) return
    if (currentQuestionIndex < selectedTopic.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      resetQuestionState()
    } else {
      // Quiz finished
      setSelectedTopic(null)
    }
  }

  const filteredTopics = useMemo(() => {
    return filterCategory === "all"
      ? practiceTopics
      : practiceTopics.filter(t => t.category.toLowerCase() === filterCategory.toLowerCase())
  }, [filterCategory])

  // Render Logic for Quiz Modal
  const currentQuestion = selectedTopic?.questions[currentQuestionIndex]
  const isLastQuestion = selectedTopic && currentQuestionIndex === selectedTopic.questions.length - 1

  if (!user) {
    return (
      <div className="min-h-screen bg-background selection:bg-primary/20">
        <Navbar />
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
          <div className="text-center max-w-md space-y-6 animate-fade-in-up">
            <div className="bg-secondary/50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Practice Mode</h1>
            <p className="text-muted-foreground">
              Log in to track your progress, earn badges, and master your skills with our interactive quizzes.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/login">Log In</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <Navbar />

      {/* Dashboard Header */}
      <div className="bg-card border-b border-border sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <BrainCircuit className="w-6 h-6 text-primary" />
                Practice Dashboard
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Sharpen your skills with targeted exercises.
              </p>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              <div className="bg-secondary/30 rounded-xl p-3 px-5 border border-border/50 flex items-center gap-4 min-w-[140px]">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold leading-none">{stats.totalSolved}</div>
                  <div className="text-xs text-muted-foreground font-medium mt-1">Solved</div>
                </div>
              </div>

              <div className="bg-secondary/30 rounded-xl p-3 px-5 border border-border/50 flex items-center gap-4 min-w-[140px]">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold leading-none">{stats.accuracy}%</div>
                  <div className="text-xs text-muted-foreground font-medium mt-1">Accuracy</div>
                </div>
              </div>

              <div className="bg-secondary/30 rounded-xl p-3 px-5 border border-border/50 flex items-center gap-4 min-w-[140px]">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold leading-none">{stats.totalAttempts}</div>
                  <div className="text-xs text-muted-foreground font-medium mt-1">Attempts</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Filter Bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filter Topics:</span>
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="excel">Excel</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="powerpoint">PowerPoint</SelectItem>
              <SelectItem value="video editing">Video Editing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Topics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic) => {
            const progress = getTopicProgress(topic.id)
            const percentage = Math.round((progress.solvedCount / topic.questions.length) * 100)

            return (
              <Card key={topic.id} className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-lg font-bold text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      {topic.icon}
                    </div>
                    <Badge variant={
                      topic.difficulty === 'Beginner' ? 'default' :
                        topic.difficulty === 'Intermediate' ? 'secondary' : 'outline'
                    }>
                      {topic.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{topic.title}</CardTitle>
                  <CardDescription className="line-clamp-2 h-10">
                    {topic.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pb-3 flex-1">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium text-muted-foreground">
                      <span>Progress</span>
                      <span>{progress.solvedCount}/{topic.questions.length}</span>
                    </div>
                    <Progress value={percentage} className="h-1.5" />
                  </div>
                </CardContent>

                <CardFooter className="pt-3 border-t border-border/50">
                  <Button onClick={() => handleTopicStart(topic)} className="w-full group-hover:bg-primary group-hover:text-white" variant="ghost">
                    {percentage === 100 ? 'Review Practice' : percentage > 0 ? 'Continue Practice' : 'Start Practice'}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Quiz Dialog Overlay */}
      <Dialog open={!!selectedTopic} onOpenChange={(open) => !open && setSelectedTopic(null)}>
        <DialogContent className="sm:max-w-[600px] p-0 gap-0 overflow-hidden">
          {selectedTopic && currentQuestion && (
            <>
              <div className="p-6 border-b border-border bg-secondary/10">
                <div className="flex justify-between items-center mb-4">
                  <Badge variant="outline" className="bg-background">
                    Question {currentQuestionIndex + 1} of {selectedTopic.questions.length}
                  </Badge>
                  <div className="text-sm font-medium text-muted-foreground">
                    {selectedTopic.category}
                  </div>
                </div>
                <h2 className="text-xl font-semibold leading-relaxed">
                  {currentQuestion.text}
                </h2>
              </div>

              <div className="p-6 space-y-3">
                {currentQuestion.options.map((option, idx) => {
                  let optionClass = "w-full justify-start text-left h-auto py-4 px-4 text-base font-normal border-2 transition-all"

                  if (isAnswered) {
                    if (idx === currentQuestion.correctAnswer) {
                      optionClass += " border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 hover:bg-green-100"
                    } else if (idx === selectedOption && idx !== currentQuestion.correctAnswer) {
                      optionClass += " border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300"
                    } else {
                      optionClass += " opacity-50"
                    }
                  } else {
                    if (idx === selectedOption) {
                      optionClass += " border-primary bg-primary/5"
                    } else {
                      // Added hover:text-foreground to ensure text remains visible on hover in light mode
                      optionClass += " border-transparent bg-secondary/50 hover:bg-secondary hover:border-border hover:text-foreground"
                    }
                  }

                  return (
                    <Button
                      key={idx}
                      variant="ghost"
                      className={optionClass}
                      onClick={() => handleOptionSelect(idx)}
                      disabled={isAnswered}
                    >
                      <div className="flex items-center w-full">
                        <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center mr-3 text-xs font-bold shrink-0 opacity-70">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        {option}
                        {isAnswered && idx === currentQuestion.correctAnswer && (
                          <Check className="ml-auto w-5 h-5 text-green-600" />
                        )}
                        {isAnswered && idx === selectedOption && idx !== currentQuestion.correctAnswer && (
                          <X className="ml-auto w-5 h-5 text-red-600" />
                        )}
                      </div>
                    </Button>
                  )
                })}
              </div>

              {showExplanation && (
                <div className="px-6 pb-2 animate-fade-in-up">
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4 flex gap-3">
                    <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                    <div className="text-sm text-blue-800 dark:text-blue-200">
                      <span className="font-semibold block mb-1">Explanation:</span>
                      {currentQuestion.explanation}
                    </div>
                  </div>
                </div>
              )}

              <div className="p-6 border-t border-border bg-secondary/10 flex justify-between items-center">
                <div className="text-xs text-muted-foreground">
                  {isAnswered && (selectedOption === currentQuestion.correctAnswer ? (
                    <span className="text-green-600 font-medium flex items-center gap-1"><Check className="w-3 h-3" /> Correct!</span>
                  ) : (
                    <span className="text-red-600 font-medium flex items-center gap-1"><X className="w-3 h-3" /> Incorrect</span>
                  ))}
                </div>

                {isAnswered && (
                  <Button onClick={handleNextQuestion} className="px-8">
                    {isLastQuestion ? 'Finish Practice' : 'Next Question'}
                    {!isLastQuestion && <ChevronRight className="w-4 h-4 ml-2" />}
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}