import { useInfiniteQuery } from '@tanstack/react-query'

import { authorizationInstance } from '@/api/instance'
import { appendParamsToUrl } from '@/api/utils/common/appendParamsToUrl'
import {
  AdminQuestion,
  PagingRequestParams,
  PagingResponse,
  QuestionStatus,
} from '@/types'

export type CreateGroupQuestionPayload = {
  groupId: number
  content: string
}

export const createGroupQuestion = async (
  data: CreateGroupQuestionPayload
): Promise<string> => {
  const response = await authorizationInstance.post('/api/group/question', data)
  return response.data.message
}

type GroupQuestionParams = {
  groupId: number
  status: QuestionStatus
  params: PagingRequestParams
}

type GroupQuestionResponse = PagingResponse<AdminQuestion>

const getGroupQuestionPaging = async ({
  groupId,
  status,
  params,
}: GroupQuestionParams) => {
  const url = appendParamsToUrl(`/api/group/${groupId}/question`, {
    ...params,
    status,
  })

  const { data } = await authorizationInstance.get<GroupQuestionResponse>(url)

  return {
    questions: data.content,
    nextPageToken:
      data.page !== data.totalPages - 1
        ? (data.page + 1).toString()
        : undefined,
  }
}

interface GroupQuestionProps extends PagingRequestParams {
  groupId: number
  status: QuestionStatus
  initPageToken?: string
}

export const useGroupQuestionPaging = ({
  groupId,
  status,
  size = 10,
  sort,
  initPageToken,
}: GroupQuestionProps) => {
  return useInfiniteQuery({
    queryKey: ['groups', 'question', groupId, status],
    queryFn: ({ pageParam = initPageToken }) =>
      getGroupQuestionPaging({
        groupId,
        status,
        params: {
          page: pageParam,
          size,
          sort,
        },
      }),
    initialPageParam: initPageToken,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  })
}
