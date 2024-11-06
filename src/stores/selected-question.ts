import { create } from 'zustand'

interface SelectedQuestionProps {
  questionId: number | undefined
  questionContent: string | undefined
  questionCreatedAt: string | undefined
  setQuestionId: (questionId: number | undefined) => void
  setQuestionContent: (questionContent: string | undefined) => void
  setQuestionCreatedAt: (questionCreatedAt: string | undefined) => void
}

export const useSelectedQuestionStore = create<SelectedQuestionProps>(
  (set) => ({
    questionId: undefined,
    questionContent: undefined,
    questionCreatedAt: undefined,
    setQuestionId: (questionId) => {
      set({ questionId })
    },
    setQuestionContent: (questionContent) => {
      set({ questionContent })
    },
    setQuestionCreatedAt: (questionCreatedAt) => {
      set({ questionCreatedAt })
    },
  })
)
