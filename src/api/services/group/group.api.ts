import {
  queryOptions,
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

export const groupQueries = {
  all: () => ['group'],
  lists: () => [...groupQueries.all(), 'list'],
  infos: (groupId: number) => [...groupQueries.all(), 'info', groupId],
  info: (groupId: number) =>
    queryOptions({
      queryKey: [...groupQueries.infos(groupId)],
      queryFn: () => getGroupInfo(groupId),
    }),
}

const getGroupInfo = async (groupId: number) => {
  const response = await fetchInstance.get<Group>(`/api/group/info/${groupId}`)

  return response.data
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
    groupSize: data.size,
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
    queryKey: [...groupQueries.lists(), initPageToken],
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
  const response = await authorizationInstance.post<Group>('/api/group', {
    groupName,
    groupDescription,
  })

  return response.data
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

export type ApproveGroupQuestionRequest = {
  groupId?: number
  questionId: number
  approve: boolean
}

export const approveGroupQuestion = async ({
  groupId,
  questionId,
  approve,
}: ApproveGroupQuestionRequest) => {
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
  groupId: number
  image: File
}

export const modifyGroupImg = async ({
  groupId,
  image,
}: ModifyGroupImgRequestBody) => {
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
