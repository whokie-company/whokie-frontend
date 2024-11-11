import {
  useQuery,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query'

import { authorizationInstance, fetchInstance } from '@/api/instance'
import { appendParamsToUrl } from '@/api/utils/common/appendParamsToUrl'
import {
  Group,
  GroupRankingItem,
  PagingRequestParams,
  PagingResponse,
} from '@/types'

const getGroupInfo = async (groupId: number) => {
  const response = await fetchInstance.get<Group>(`/api/group/info/${groupId}`)

  return response.data
}

export const useGroupInfo = (groupId: number) => {
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

export type ModifyGroupRequestBody = {
  groupId: number
  groupName: string
  description: string
}

export const modifyGroup = async ({
  groupId,
  groupName,
  description,
}: ModifyGroupRequestBody) => {
  const response = await authorizationInstance.patch('/api/group/modify', {
    groupId,
    groupName,
    description,
  })

  return response.data
}

export type GroupRankingResponse = {
  ranks: GroupRankingItem[]
}

const getGroupRanking = async (groupId: number) => {
  const response = await authorizationInstance.get<GroupRankingResponse>(
    `/api/ranking/group/${groupId}`
  )

  return response.data.ranks
}

export const useGroupRanking = ({ groupId }: { groupId: number }) => {
  return useSuspenseQuery({
    queryKey: ['groupRanking', groupId],
    queryFn: () => getGroupRanking(groupId),
  })
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

export type ModifyGroupImgRequestBody = {
  image: File
}

export const modifyGroupImg = async (
  groupId: number,
  { image }: ModifyGroupImgRequestBody
) => {
  const formData = new FormData()
  formData.append('image', image)
  const response = await authorizationInstance.patch(
    `/api/group/modify/image/${groupId}`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  )

  return response.data
}
