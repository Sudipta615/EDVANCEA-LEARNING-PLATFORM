'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BookOpen, Clock, CheckCircle, ArrowLeft, ArrowRight, CheckCircle2, Circle } from 'lucide-react'
import Navbar from '@/components/navbar'
import { useAuth } from '@/lib/auth'
import { useProgress } from '@/lib/progress'

const lessonData = {
  '1': {
    id: '1',
    title: "Getting Started with Excel",
    courseTitle: "Excel Mastery: From Zero to Hero",
    courseId: '1',
    category: "Excel",
    duration: "15 minutes",
    difficulty: "Beginner",
    description: "Learn the basics of Excel interface, navigation, and fundamental concepts",
    learningObjectives: [
      "Understand the Excel interface and ribbon",
      "Navigate worksheets and workbooks",
      "Enter and edit basic data",
      "Save and manage Excel files"
    ],
    content: {
      introduction: {
        title: "Introduction to Excel",
        text: "Microsoft Excel is a powerful spreadsheet application that allows you to organize, analyze, and visualize data. It's widely used in business, finance, education, and many other fields for data management and analysis.",
        image: "/excel-interface.png"
      },
      interface: {
        title: "The Excel Interface",
        text: "When you first open Excel, you'll see several key components:\n\n1. **Ribbon**: The toolbar at the top containing various commands organized into tabs like Home, Insert, Page Layout, etc.\n2. **Quick Access Toolbar**: A customizable toolbar above the ribbon for frequently used commands.\n3. **Formula Bar**: Where you can enter and edit formulas and data.\n4. **Worksheet Grid**: The main area where you enter and manipulate data.\n5. **Status Bar**: At the bottom showing information about your current selection and Excel's status.",
        tips: [
          "Right-click any command to add it to the Quick Access Toolbar",
          "Press Ctrl+F1 to minimize or maximize the ribbon",
          "Use the keyboard shortcuts shown in screen tips for faster navigation"
        ]
      },
      navigation: {
        title: "Navigating Worksheets",
        text: "Excel workbooks can contain multiple worksheets. Here's how to navigate effectively:\n\n**Sheet Tabs**: Located at the bottom of the window, these tabs let you switch between different worksheets in your workbook.\n\n**Cell Navigation**: Use arrow keys, mouse clicks, or the Name Box to jump to specific cells.\n\n**Scrolling**: Use scroll bars or mouse wheel to move around large worksheets.",
        shortcuts: [
          "Ctrl + Home: Go to cell A1",
          "Ctrl + End: Go to the last used cell",
          "Page Up/Page Down: Move one screen up/down",
          "Ctrl + Page Up/Page Down: Switch between worksheets"
        ]
      },
      dataEntry: {
        title: "Entering and Editing Data",
        text: "Excel accepts various types of data:\n\n**Text**: Any combination of letters, numbers, and symbols.\n**Numbers**: Numerical values that can be used in calculations.\n**Dates**: Excel recognizes various date formats.\n**Formulas**: Start with = sign to perform calculations.",
        examples: [
          "Enter 'Sales Report' in cell A1 for text",
          "Enter 1500 in cell B1 for a number",
          "Enter =A1&B1 to combine text from cells",
          "Enter =SUM(B1:B10) to add a range of numbers"
        ]
      }
    },
    nextLesson: '2',
    prevLesson: null
  }
}

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { isLessonComplete, markLessonComplete } = useProgress()
  
  const courseId = params.id as string
  const lessonId = params.lessonId as string
  
  const lesson = lessonData[lessonId as keyof typeof lessonData]
  
  const [isCompleted, setIsCompleted] = useState(() => 
    user ? isLessonComplete(courseId, lessonId) : false
  )

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Lesson Not Found</h1>
          <Button onClick={() => router.push(`/courses/${courseId}`)}>Back to Course</Button>
        </div>
      </div>
    )
  }

  const handleMarkComplete = () => {
    if (user) {
      markLessonComplete(courseId, lessonId)
      setIsCompleted(true)
    } else {
      router.push('/login')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <Navbar />
      
      {/* Lesson Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
            <Link href="/courses" className="hover:text-slate-900 dark:hover:text-white">Courses</Link>
            <span>/</span>
            <Link href={`/courses/${courseId}`} className="hover:text-slate-900 dark:hover:text-white">{lesson.courseTitle}</Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white">{lesson.title}</span>
          </div>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <Badge variant="secondary">{lesson.category}</Badge>
                <Badge variant="outline">{lesson.difficulty}</Badge>
                {isCompleted && (
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">{lesson.title}</h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 mb-4">{lesson.description}</p>
              <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {lesson.duration}
                </div>
              </div>
            </div>
            
            <div className="ml-6">
              <Button
                onClick={handleMarkComplete}
                variant={isCompleted ? "outline" : "default"}
                className="flex items-center"
              >
                {isCompleted ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Completed
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4 mr-2" />
                    Mark Complete
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Objectives */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Learning Objectives</CardTitle>
            <CardDescription>What you'll learn in this lesson</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {lesson.learningObjectives.map((objective, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">{objective}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Lesson Content */}
        <Tabs defaultValue="introduction" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="introduction">Introduction</TabsTrigger>
            <TabsTrigger value="interface">Interface</TabsTrigger>
            <TabsTrigger value="navigation">Navigation</TabsTrigger>
            <TabsTrigger value="dataEntry">Data Entry</TabsTrigger>
          </TabsList>

          <TabsContent value="introduction" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{lesson.content.introduction.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {lesson.content.introduction.text}
                </p>
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6 text-center">
                  <div className="text-6xl mb-4">📊</div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Excel Interface Example</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interface" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{lesson.content.interface.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  {lesson.content.interface.text.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Pro Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {lesson.content.interface.tips.map((tip, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-slate-700 dark:text-slate-300">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="navigation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{lesson.content.navigation.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  {lesson.content.navigation.text.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Keyboard Shortcuts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {lesson.content.navigation.shortcuts.map((shortcut, index) => (
                        <div key={index} className="flex items-center space-x-3 p-2 bg-slate-50 dark:bg-slate-800 rounded">
                          <kbd className="px-2 py-1 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-200 dark:bg-slate-700 rounded">
                            {shortcut.split(':')[0]}
                          </kbd>
                          <span className="text-sm text-slate-700 dark:text-slate-300">
                            {shortcut.split(':')[1]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dataEntry" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{lesson.content.dataEntry.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  {lesson.content.dataEntry.text.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Examples</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {lesson.content.dataEntry.examples.map((example, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded flex items-center justify-center text-sm font-semibold mt-0.5 flex-shrink-0">
                            {index + 1}
                          </div>
                          <code className="text-sm bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-700 dark:text-slate-300">
                            {example}
                          </code>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
          <div>
            {lesson.prevLesson ? (
              <Button variant="outline" asChild>
                <Link href={`/courses/${courseId}/${lesson.prevLesson}`}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous Lesson
                </Link>
              </Button>
            ) : (
              <Button variant="outline" asChild>
                <Link href={`/courses/${courseId}`}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Course
                </Link>
              </Button>
            )}
          </div>
          
          <div>
            {lesson.nextLesson && (
              <Button asChild>
                <Link href={`/courses/${courseId}/${lesson.nextLesson}`}>
                  Next Lesson
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}