'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { ThemeToggle } from '@/components/theme-toggle'
import { 
  BookOpen, 
  Menu, 
  Search, 
  User, 
  LogIn, 
  GraduationCap,
  LayoutDashboard,
  Trophy
} from 'lucide-react'
import { useAuth } from '@/lib/auth'

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  
  // SAFE FIX: Extract courseId from URL string instead of using useParams()
  // This prevents the "Maximum call stack size exceeded" error
  const courseIdMatch = pathname?.match(/^\/courses\/(\d+)/)
  const courseId = courseIdMatch ?[1] : null

  // Logic: If inside a course, go to THAT course's practice.
  // If anywhere else (Home, Profile, etc), go to the Global Practice Hub.
  const practiceHref = courseId ? `/courses/${courseId}/practice` : '/practice'

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/courses?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const isActive = (path: string) => pathname === path

  const navItems = [
    { href: '/courses', label: 'Courses', icon: GraduationCap },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0 mr-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white hidden sm:block">Edvancea</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="w-full relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                type="search"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full bg-slate-100 dark:bg-slate-800 border-none focus-visible:ring-1"
              />
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-1 text-sm font-medium transition-colors ${
                  isActive(item.href) 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-2 ml-4">
            {/* Practice Button - Always Visible */}
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden md:flex gap-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-950 transition-colors" 
              asChild
            >
              <Link href={practiceHref}>
                <Trophy className="w-4 h-4" />
                Practice
              </Link>
            </Button>

            <ThemeToggle />
            
            <div className="hidden md:flex items-center space-x-2">
              {user ? (
                <Link href="/profile">
                  <Avatar className="w-8 h-8 cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all">
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-sm">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/login">Log In</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm" className="px-2">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full pt-4">
                  <form onSubmit={handleSearch} className="mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        type="search"
                        placeholder="Search courses..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-full"
                      />
                    </div>
                  </form>

                  <nav className="space-y-2 flex-1">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isActive(item.href) 
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    ))}

                    {/* Mobile Practice Button */}
                    <Link
                      href={practiceHref}
                      className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900 transition-colors"
                    >
                      <Trophy className="w-4 h-4" />
                      <span>Practice Mode</span>
                    </Link>
                  </nav>

                  <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-4">
                    {user ? (
                      <>
                        <div className="flex items-center space-x-3 px-3 py-2">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-sm">
                              {getInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                              {user.name}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <Link href="/profile" className="block mt-3">
                          <Button variant="outline" className="w-full">
                            <User className="w-4 h-4 mr-2" />
                            Profile
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          className="w-full mt-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                          onClick={() => {
                            logout()
                            router.push('/')
                          }}
                        >
                          <LogIn className="w-4 h-4 mr-2" />
                          Log Out
                        </Button>
                      </>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" asChild className="w-full justify-center">
                          <Link href="/login">Log In</Link>
                        </Button>
                        <Button asChild className="w-full justify-center">
                          <Link href="/signup">Sign Up</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}