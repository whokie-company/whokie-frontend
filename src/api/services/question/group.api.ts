import { useSuspenseQuery } from '@tanstack/react-query'

import { authorizationInstance } from '@/api/instance'

export type GroupQuestionResponse = {
  questions: {
    questionId: number
    content: string
    users: {
      groupMemberId: number
      userId: number
      userName: string
      imageUrl: string
    }[]
  }[]
}

const getGroupQuestion = async (groupId: number) => {
  const response = await authorizationInstance.get<GroupQuestionResponse>(
    `/api/group/${groupId}/question/random`
  )

  return response.data
}

export const useGroupQuestion = (groupId: number) => {
  return useSuspenseQuery<GroupQuestionResponse>({
    queryKey: ['group', groupId, 'question', 'random'],
    queryFn: () => getGroupQuestion(groupId),
  })
}
