import { create } from 'zustand'

export type SelectedQuestion = {
  questionId: number
  questionContent: string
  questionCreatedAt: string
}

interface SelectedQuestionProps {
  selectedQuestion?: SelectedQuestion
  setSelectedQuestion: (selectedQuestion: SelectedQuestion | undefined) => void
}

export const useSelectedQuestionStore = create<SelectedQuestionProps>(
  (set) => ({
    selectedQuestion: undefined,
    setSelectedQuestion: (selectedQuestion) => {
      set({ selectedQuestion })
    },
  })
)
