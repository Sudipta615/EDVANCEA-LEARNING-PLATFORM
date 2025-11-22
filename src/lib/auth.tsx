'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  deleteAccount: () => Promise<boolean>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on mount
    const savedUser = localStorage.getItem('edvancea_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Mock authentication - in real app, this would be an API call
      const users = JSON.parse(localStorage.getItem('edvancea_users') || '[]')
      const foundUser = users.find((u: any) => u.email === email && u.password === password)
      
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser
        setUser(userWithoutPassword)
        localStorage.setItem('edvancea_user', JSON.stringify(userWithoutPassword))
        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Mock signup - in real app, this would be an API call
      const users = JSON.parse(localStorage.getItem('edvancea_users') || '[]')
      
      if (users.find((u: any) => u.email === email)) {
        return false // User already exists
      }

      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        createdAt: new Date().toISOString()
      }

      users.push(newUser)
      localStorage.setItem('edvancea_users', JSON.stringify(users))

      const { password: _, ...userWithoutPassword } = newUser
      setUser(userWithoutPassword)
      localStorage.setItem('edvancea_user', JSON.stringify(userWithoutPassword))
      return true
    } catch (error) {
      console.error('Signup error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('edvancea_user')
  }

  const deleteAccount = async (): Promise<boolean> => {
    if (!user) return false

    try {
      // Remove user from users array
      const users = JSON.parse(localStorage.getItem('edvancea_users') || '[]')
      const updatedUsers = users.filter((u: any) => u.id !== user.id)
      localStorage.setItem('edvancea_users', JSON.stringify(updatedUsers))

      // Remove user progress data
      localStorage.removeItem(`edvancea_progress_${user.id}`)

      // Logout
      logout()
      return true
    } catch (error) {
      console.error('Delete account error:', error)
      return false
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      deleteAccount,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}