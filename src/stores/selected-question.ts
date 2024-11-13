import { create } from 'zustand'

interface SelectedQuestion {
  questionId: number | undefined
  questionContent: string | undefined
  questionCreatedAt: string | undefined
}

interface SelectedQuestionProps {
  selectedQuestion: SelectedQuestion
  setSelectedQuestion: (selectQuestion: {
    selectQuestion: SelectedQuestion
  }) => void
}

export const useSelectedQuestionStore = create<SelectedQuestionProps>(
  (set) => ({
    selectedQuestion: {
      questionId: undefined,
      questionContent: undefined,
      questionCreatedAt: undefined,
    },
    setSelectedQuestion: ({ selectQuestion }) => {
      set({ selectedQuestion: selectQuestion })
    },
  })
)
