'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth'

export interface TopicProgress {
  solvedCount: number;
  totalAttempts: number;
  correctAttempts: number;
  completedQuestions: string[]; // Array of Question IDs
}

export interface PracticeState {
  [topicId: string]: TopicProgress;
}

export function usePracticeProgress() {
  const { user } = useAuth()
  const [practiceState,vpPracticeState] = useState<PracticeState>({})

  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`edvancea_practice_${user.id}`)
      if (saved) {
        vpPracticeState(JSON.parse(saved))
      }
    }
  }, [user])

  const saveState = (newState: PracticeState) => {
    if (user) {
      vpPracticeState(newState)
      localStorage.setItem(`edvancea_practice_${user.id}`, JSON.stringify(newState))
    }
  }

  const submitAnswer = (topicId: string, questionId: string, isCorrect: boolean) => {
    const currentTopicState = practiceState[topicId] || {
      solvedCount: 0,
      totalAttempts: 0,
      correctAttempts: 0,
      completedQuestions: []
    }

    const isNewSolve = isCorrect && !currentTopicState.completedQuestions.includes(questionId);

    const newState = {
      ...practiceState,
      [topicId]: {
        ...currentTopicState,
        totalAttempts: currentTopicState.totalAttempts + 1,
        correctAttempts: currentTopicState.correctAttempts + (isCorrect ? 1 : 0),
        solvedCount: currentTopicState.solvedCount + (isNewSolve ? 1 : 0),
        completedQuestions: isNewSolve 
          ? [...currentTopicState.completedQuestions, questionId]
          : currentTopicState.completedQuestions
      }
    }

    saveState(newState)
  }

  const getOverallStats = () => {
    let totalSolved = 0
    let totalAttempts = 0
    let totalCorrect = 0

    Object.values(practiceState).forEach(topic => {
      totalSolved += topic.solvedCount
      totalAttempts += topic.totalAttempts
      totalCorrect += topic.correctAttempts
    })

    const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0

    return {
      totalSolved,
      totalAttempts,
      accuracy
    }
  }

  const getTopicProgress = (topicId: string) => {
    return practiceState[topicId] || {
      solvedCount: 0,
      totalAttempts: 0,
      correctAttempts: 0,
      completedQuestions: []
    }
  }

  return {
    submitAnswer,
    getOverallStats,
    getTopicProgress,
    practiceState // Exposed for debugging or advanced use
  }
}