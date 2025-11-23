'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Circle, ArrowLeft, ArrowRight, BookOpen, Home, FileText } from 'lucide-react'
import Navbar from '@/components/navbar'
import { useAuth } from '@/lib/auth'
import { useProgress } from '@/lib/progress'

// Content Database
const lessonDatabase: Record<string, any> = {
  '1': {
    id: '1',
    title: "Getting Started with Excel",
    content: (
      <div className="space-y-6 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
        <p>
          Microsoft Excel is a powerful spreadsheet application used for storing, organizing, and analyzing data. Whether you're budgeting for your household or analyzing complex financial data for a corporation, Excel is the tool of choice.
        </p>
        <h3 className="text-xl font-bold text-foreground mt-6">What is a Spreadsheet?</h3>
        <p>
          A spreadsheet is a digital ledger consisting of rows and columns. The intersection of a row and a column is called a <strong>Cell</strong>. Cells can contain:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Text:</strong> Labels, names, headings.</li>
          <li><strong>Numbers:</strong> Counts, currency, percentages.</li>
          <li><strong>Formulas:</strong> Mathematical equations that calculate values based on other cells.</li>
        </ul>
        
        <div className="bg-secondary/20 p-4 rounded-lg border-l-4 border-primary my-4">
          <strong>Key Terminology:</strong>
          <ul className="mt-2 space-y-1 text-sm">
            <li><span className="font-semibold">Workbook:</span> The entire Excel file (.xlsx).</li>
            <li><span className="font-semibold">Worksheet:</span> A single page or tab within the workbook.</li>
            <li><span className="font-semibold">Cell Address:</span> The column letter followed by the row number (e.g., A1, B10).</li>
          </ul>
        </div>
      </div>
    )
  },
  '2': {
    id: '2',
    title: "Understanding the Ribbon",
    content: (
      <div className="space-y-6 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
        <p>
          The <strong>Ribbon</strong> is the command bar located at the top of the Excel window. It organizes features into a series of tabs to help you find commands quickly.
        </p>
        
        <h3 className="text-xl font-bold text-foreground mt-6">Main Tabs Explained</h3>
        <div className="grid gap-4 mt-4">
          <div className="p-4 border rounded-lg bg-card">
            <span className="font-bold text-primary block mb-1">Home</span>
            Contains the most frequently used commands like formatting (Bold, Italic), alignment, and basic math functions (AutoSum).
          </div>
          <div className="p-4 border rounded-lg bg-card">
            <span className="font-bold text-primary block mb-1">Insert</span>
            Used for adding elements like Tables, Charts, Pictures, and Shapes.
          </div>
          <div className="p-4 border rounded-lg bg-card">
            <span className="font-bold text-primary block mb-1">Data</span>
            Essential for importing, sorting, filtering, and validating data.
          </div>
          <div className="p-4 border rounded-lg bg-card">
            <span className="font-bold text-primary block mb-1">Formulas</span>
            The library of Excel's functions, named ranges, and formula auditing tools.
          </div>
        </div>

        <p className="mt-4">
          You can collapse the ribbon by double-clicking any tab name to give yourself more screen space for data. Double-click again to bring it back.
        </p>
      </div>
    )
  },
  '3': {
    id: '3',
    title: "Basic Navigation",
    content: (
      <div className="space-y-6 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
        <p>
          Efficient navigation separates beginners from pros. Stop clicking everywhere and start using your keyboard!
        </p>

        <h3 className="text-xl font-bold text-foreground mt-6">Essential Keyboard Shortcuts</h3>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm text-left">
            <thead className="bg-secondary text-foreground">
              <tr>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Shortcut (Windows)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="bg-card">
                <td className="px-4 py-3">Move one cell right</td>
                <td className="px-4 py-3 font-mono text-primary">Tab</td>
              </tr>
              <tr className="bg-card/50">
                <td className="px-4 py-3">Move one cell down</td>
                <td className="px-4 py-3 font-mono text-primary">Enter</td>
              </tr>
              <tr className="bg-card">
                <td className="px-4 py-3">Go to cell A1</td>
                <td className="px-4 py-3 font-mono text-primary">Ctrl + Home</td>
              </tr>
              <tr className="bg-card/50">
                <td className="px-4 py-3">Go to last active cell</td>
                <td className="px-4 py-3 font-mono text-primary">Ctrl + End</td>
              </tr>
              <tr className="bg-card">
                <td className="px-4 py-3">Move one screen down</td>
                <td className="px-4 py-3 font-mono text-primary">Page Down</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4">
          <strong>Pro Tip:</strong> To edit the content of a cell without overwriting it, press <span className="font-mono bg-secondary px-1 rounded text-sm">F2</span>.
        </p>
      </div>
    )
  },
  '4': {
    id: '4',
    title: "Saving and Managing Files",
    content: (
      <div className="space-y-6 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
        <p>
          Knowing how to save correctly ensures you don't lose work and that your file is compatible with others.
        </p>

        <h3 className="text-xl font-bold text-foreground mt-6">Save vs. Save As</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Save (Ctrl + S):</strong> Updates the current file with your latest changes.</li>
          <li><strong>Save As (F12):</strong> Creates a <em>copy</em> of your file with a new name, location, or file type.</li>
        </ul>

        <h3 className="text-xl font-bold text-foreground mt-6">Common File Formats</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Badge>xlsx</Badge>
            <span>The standard modern Excel workbook format.</span>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary">csv</Badge>
            <span>Comma Separated Values. Plain text data separated by commas. No formatting or formulas are saved.</span>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline">xlsm</Badge>
            <span>Excel Macro-Enabled Workbook. Use this if your file contains VBA macros.</span>
          </div>
        </div>
      </div>
    )
  }
}

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { isLessonComplete, markLessonComplete, markLessonIncomplete } = useProgress()
  const [mounted, setMounted] = useState(false)
  const [completed, setCompleted] = useState(false)

  const courseId = params.id as string
  const lessonId = params.LessonId as string
  
  const lesson = lessonDatabase[lessonId]

  useEffect(() => {
    setMounted(true)
    if (user && courseId && lessonId) {
      setCompleted(isLessonComplete(courseId, lessonId))
    }
  }, [user, courseId, lessonId, isLessonComplete])

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Lesson Content Not Found</h1>
          <Button onClick={() => router.push(`/courses/${courseId}`)}>Back to Course</Button>
        </div>
      </div>
    )
  }

  const handleToggleComplete = () => {
    if (!user) {
      router.push('/login')
      return
    }

    if (completed) {
      markLessonIncomplete(courseId, lessonId)
      setCompleted(false)
    } else {
      markLessonComplete(courseId, lessonId)
      setCompleted(true)
    }
  }

  const nextLessonId = (parseInt(lessonId) + 1).toString()
  const hasNextLesson = lessonDatabase[nextLessonId] !== undefined

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
             {/* Mobile: simple icon, Desktop: Full button */}
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
                Lesson {lessonId}
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
          <Button variant="ghost" asChild disabled={lessonId === '1'}>
            <Link href={lessonId === '1' ? '#' : `/courses/${courseId}/${parseInt(lessonId) - 1}`}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Previous
            </Link>
          </Button>

          <div className="flex gap-4">
             {hasNextLesson ? (
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