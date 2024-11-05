import { useMutation } from '@tanstack/react-query'

import { authorizationInstance } from '@/api/instance'

type AnswerQuestionParam = {
  questionId: number
  pickedId: number
}

type AnswerQuestionResponse = {
  message: string
}

const answerRandomQuestion = async ({
  questionId,
  pickedId,
}: AnswerQuestionParam): Promise<AnswerQuestionResponse> => {
  const response = await authorizationInstance.post('/api/answer/common', {
    questionId,
    pickedId,
  })

  return response.data
}

export const useAnswerRandomQuestion = () => {
  return useMutation({
    mutationFn: (params: AnswerQuestionParam) => answerRandomQuestion(params),
  })
}
