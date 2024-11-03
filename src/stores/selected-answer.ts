import { create } from 'zustand'

import { AnswerRecord } from '@/types'

type SelectedAnswer = Pick<AnswerRecord, 'questionContent' | 'createdAt'>

interface SelectedAnswerProps {
  selectedAnswer?: SelectedAnswer
  setSelectedAnswer: (selectedAnswer?: SelectedAnswer) => void
}

export const useSelectedAnswerStore = create<SelectedAnswerProps>((set) => ({
  selectedAnswer: undefined,
  setSelectedAnswer: (selectedAnswer) => {
    set({ selectedAnswer })
  },
}))
