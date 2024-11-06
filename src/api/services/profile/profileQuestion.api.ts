import { useQuery } from '@tanstack/react-query'

import { fetchInstance } from '@/api/instance'
import { ProfileAnswerItem, QuestionItem } from '@/types'

type ProfileQuestionResponse = {
  content: QuestionItem[]
}

// 프로필 질문 리스트 불러오기
const getProfileQuestion = async (userId: string) => {
  const response = await fetchInstance.get<ProfileQuestionResponse>(
    `/api/profile/question/${userId}`
  )

  return response?.data.content
}

export const useGetProfileQuestion = (userId: string) => {
  return useQuery({
    queryKey: ['profileQuestion', userId],
    queryFn: () => getProfileQuestion(userId),
  })
}

// 프로필 질문 대답 리스트 불러오기
type ProfileAnswerResponse = {
  content: ProfileAnswerItem[]
}
const getProfileAnswer = async (userId: string, questionId: string | null) => {
  const response = await fetchInstance.get<ProfileAnswerResponse>(
    `/api/profile/answer`,
    {
      params: { 'user-id': userId, 'question-id': questionId },
    }
  )

  return response?.data.content
}

export const useGetProfileAnswer = (
  userId: string,
  questionId: string | null
) => {
  return useQuery({
    queryKey: ['profileAnswer', userId, questionId],
    queryFn: () => getProfileAnswer(userId, questionId),
  })
}
