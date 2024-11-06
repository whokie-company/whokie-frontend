import { useQuery } from '@tanstack/react-query'

import { authorizationInstance, fetchInstance } from '@/api/instance'
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

// 프로필 질문 추가하기
export type PostProfileQuestionRequest = {
  content: string
}

export const postProfileQuestion = async ({
  content,
}: PostProfileQuestionRequest) => {
  const response = await authorizationInstance.post('/api/profile/question', {
    content,
  })

  return response.data.message
}

// 프로필 질문 삭제하기
export type DeleteProfileQuestionRequest = {
  deleteQuestionId: number
}

export const deleteProfileQuestion = async ({
  deleteQuestionId,
}: DeleteProfileQuestionRequest) => {
  await authorizationInstance.delete(
    `/api/profile/question/${deleteQuestionId}`
  )
}

// 프로필 질문 대답 리스트 불러오기
type ProfileAnswerResponse = {
  content: ProfileAnswerItem[]
}
const getProfileAnswer = async (userId: number, questionId: number) => {
  const response = await fetchInstance.get<ProfileAnswerResponse>(
    `/api/profile/answer`,
    {
      params: { 'user-id': userId, 'question-id': questionId },
    }
  )

  return response?.data.content
}

export const useGetProfileAnswer = (
  userId: number,
  questionId: number | undefined
) => {
  return useQuery({
    queryKey: ['profileAnswer', userId, questionId],
    queryFn: () => {
      if (questionId === undefined) {
        return []
      }
      return getProfileAnswer(userId, questionId)
    },
    enabled: questionId !== undefined,
    staleTime: 0,
  })
}

// 대답 보내기
export type PostProfileAnswerRequest = {
  content: string
  profileQuestionId: number
}
type PostProfileAnswerResponse = {
  message: string
}

export const postProfileAnswer = async ({
  content,
  profileQuestionId,
}: PostProfileAnswerRequest) => {
  const response = await authorizationInstance.post<PostProfileAnswerResponse>(
    '/api/profile/answer',
    {
      content,
      profileQuestionId,
    }
  )

  return response.data.message
}
