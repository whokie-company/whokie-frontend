import { useMutation } from '@tanstack/react-query'

import { authorizationInstance } from '@/api/instance'

type AnswerQuestionParam = {
  questionId: number
  pickedId: number
}

type AnswerResponse = {
  message: string
}

const answerRandomQuestion = async ({
  questionId,
  pickedId,
}: AnswerQuestionParam): Promise<AnswerResponse> => {
  const response = await authorizationInstance.post('/api/answer/common', {
    questionId,
    pickedId,
  })
  return response.data
}

export const useAnswerQuestion = () => {
  return useMutation({
    mutationFn: (params: AnswerQuestionParam) => answerRandomQuestion(params),
  })
}
