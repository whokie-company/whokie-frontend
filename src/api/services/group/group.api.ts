import { useQuery, useSuspenseInfiniteQuery } from '@tanstack/react-query'

import { authorizationInstance, fetchInstance } from '@/api/instance'
import { appendParamsToUrl } from '@/api/utils/common/appendParamsToUrl'
import { Group, PagingRequestParams, PagingResponse } from '@/types'

const getGroupPage = async (groupId: string) => {
  const response = await fetchInstance.get<Group>(`/api/group/info/${groupId}`)

  return response.data
}

export const useGroupPage = (groupId: string) => {
  return useQuery({
    queryKey: ['groupPage', groupId],
    queryFn: () => getGroupPage(groupId),
  })
}

type GroupResponse = PagingResponse<Omit<Group, 'groupDescription'>[]>

const getGroupPaging = async (params: PagingRequestParams) => {
  const { data } = await authorizationInstance.get<GroupResponse>(
    appendParamsToUrl('/api/group/my', params)
  )

  return {
    groups: data.content,
    nextPageToken:
      data.page !== data.totalPages ? (data.page + 1).toString() : undefined,
  }
}

interface GroupPagingProps extends PagingRequestParams {
  initPageToken?: string
}

export const useGroupPaging = ({
  size = 10,
  sort,
  initPageToken,
}: GroupPagingProps) => {
  return useSuspenseInfiniteQuery({
    queryKey: ['groups'],
    queryFn: ({ pageParam = initPageToken }) =>
      getGroupPaging({ page: pageParam, size, sort }),
    initialPageParam: initPageToken,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  })
}

export type CreateGroupRequestBody = {
  groupName: string
  groupDescription: string
}

export const createGroup = async ({
  groupName,
  groupDescription,
}: CreateGroupRequestBody) => {
  await authorizationInstance.post('/api/group', {
    groupName,
    groupDescription,
  })
}

export const modifyGroup = async (
  groupId: number,
  groupName: string,
  description: string
) => {
  const requestData = {
    groupId,
    groupName,
    description,
  }

  const response = await authorizationInstance.patch(
    '/api/group/modify',
    requestData
  )

  return response.data
}

export const getGroupQuestions = async (
  groupId: string,
  status: 'READY' | 'APPROVED' | 'REJECTED',
  page: number,
  size: number
) => {
  const response = await authorizationInstance.get(
    `/api/group/${groupId}/question`,
    {
      params: { status, page, size },
    }
  )
  return response.data
}

export const approveGroupQuestion = async (
  groupId: string,
  questionId: number,
  approve: boolean
) => {
  const response = await authorizationInstance.patch(
    `/api/group/question/status`,
    {
      groupId,
      questionId,
      status: approve ? 'true' : 'false',
    }
  )
  return response.data
}
