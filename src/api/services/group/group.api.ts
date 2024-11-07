import { useQuery, useSuspenseInfiniteQuery } from '@tanstack/react-query'

import { authorizationInstance, fetchInstance } from '@/api/instance'
import { appendParamsToUrl } from '@/api/utils/common/appendParamsToUrl'
import { Group, PagingRequestParams, PagingResponse } from '@/types'

const getGroupInfo = async (groupId: string) => {
  const response = await fetchInstance.get<Group>(`/api/group/info/${groupId}`)

  return response.data
}

export const useGroupInfo = (groupId: string) => {
  return useQuery({
    queryKey: ['group', groupId],
    queryFn: () => getGroupInfo(groupId),
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

type GroupInviteCodeRequestParams = {
  groupId: number
}

type GroupInviteCodeResponse = {
  inviteCode: string
}

const getGroupInviteCode = async ({
  groupId,
}: GroupInviteCodeRequestParams) => {
  const response = await authorizationInstance.get<GroupInviteCodeResponse>(
    `/api/group/${groupId}/invite`
  )

  return response.data.inviteCode
}

export const useGroupInviteCode = ({
  groupId,
}: GroupInviteCodeRequestParams) => {
  return useQuery({
    queryKey: ['group', 'invite', groupId],
    queryFn: () => getGroupInviteCode({ groupId }),
    refetchOnWindowFocus: false,
    enabled: false,
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
