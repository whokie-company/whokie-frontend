import { useMutation } from '@tanstack/react-query'

import { authorizationInstance } from '@/api/instance'

type AnswerQuestionParam = {
  friendId: number
}

const answerRandomQuestion = async ({ friendId }: AnswerQuestionParam) => {
  const response = await authorizationInstance.post('/api/answer/common', {
    friendId,
  })

  return response.data
}

export const useAnswerRandomQuestion = ({ friendId }: AnswerQuestionParam) => {
  return useMutation({
    mutationFn: () => answerRandomQuestion({ friendId }),
  })
}
