import { useSuspenseQuery } from '@tanstack/react-query'

import { authorizationInstance } from '@/api/instance'
import { Question } from '@/types'

export type RandomQuestionResponse = {
  questions: Question[]
}

const getRandomQuestion = async () => {
  const response = await authorizationInstance.get<RandomQuestionResponse>(
    '/api/common/question/random'
  )

  return response.data
}

export const useRandomQuestion = () => {
  return useSuspenseQuery({
    queryKey: ['question', 'common', 'random'],
    queryFn: () => getRandomQuestion(),
  })
}
