import { create } from 'zustand'

interface SelectedQuestionProps {
  questionId: number | undefined
  questionContent: string | undefined
  setQuestionId: (questionId: number | undefined) => void
  setQuestionContent: (questionContent: string | undefined) => void
}

export const useSeletedQuestionStore = create<SelectedQuestionProps>((set) => ({
  questionId: undefined,
  questionContent: undefined,
  setQuestionId: (questionId) => {
    set({ questionId })
  },
  setQuestionContent: (questionContent) => {
    set({ questionContent })
  },
}))
