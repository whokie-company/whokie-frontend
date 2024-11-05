import { useQuery } from '@tanstack/react-query'

import { fetchInstance } from '@/api/instance'
import { QuestionItem } from '@/types'

type ProfileQuestionResponse = {
  content: QuestionItem[]
}

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
