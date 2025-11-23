// src/app/practice/page.tsx
import { practiceData } from "@/lib/practiceData"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Trophy, Dumbbell } from "lucide-react"
import Navbar from "@/components/navbar"

export default function PracticeHubPage() {
  const practiceCourses = Object.values(practiceData)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 selection:bg-indigo-500/30">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4 text-indigo-600 dark:text-indigo-400">
            <Trophy className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Practice Arena
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Select a course to enter the practice gym. Test your knowledge with interactive drills and track your XP.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practiceCourses.length > 0 ? (
            practiceCourses.map((course) => (
              <Link key={course.courseId} href={`/courses/${course.courseId}/practice`} className="group">
                <Card className="h-full hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                        <Dumbbell className="w-6 h-6" />
                      </div>
                      <Badge variant="outline" className="border-slate-200 text-slate-500">
                        {course.modules.length} Modules
                      </Badge>
                    </div>
                    <CardTitle className="text-xl group-hover:text-indigo-600 transition-colors">
                      {course.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <span className="text-sm text-slate-500 font-medium">
                        {course.modules.reduce((acc, m) => acc + m.sets.length, 0)} Drills Available
                      </span>
                      <Button size="sm" variant="ghost" className="group-hover:text-indigo-600">
                        Enter Arena <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300">
              <p className="text-slate-500">No practice courses available yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}