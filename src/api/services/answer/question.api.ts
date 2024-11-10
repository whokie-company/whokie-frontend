import { authorizationInstance } from '@/api/instance'

export type AnswerQuestionParam = {
  questionId: number
  pickedId: number
}
export const answerRandomQuestion = async ({
  questionId,
  pickedId,
}: AnswerQuestionParam) => {
  await authorizationInstance.post('/api/answer/common', {
    questionId,
    pickedId,
  })
}
