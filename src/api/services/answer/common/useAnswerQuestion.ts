import { useMutation } from '@tanstack/react-query'

import { authorizationInstance } from '@/api/instance'

type AnswerQuestionParam = {
  friendId: number
}

type AnswerResponse = {
  message: string
}

const answerRandomQuestion = async ({
  friendId,
}: AnswerQuestionParam): Promise<AnswerResponse> => {
  const response = await authorizationInstance.post('/api/answer/common', {
    friendId,
  })
  return response.data
}

export const useAnswerQuestion = ({ friendId }: AnswerQuestionParam) => {
  return useMutation({
    mutationFn: () => answerRandomQuestion({ friendId }),
  })
}
