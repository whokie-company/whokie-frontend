import {
  useInfiniteQuery,
  useQuery,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query'

import { authorizationInstance } from '@/api/instance'
import { appendParamsToUrl } from '@/api/utils/common/appendParamsToUrl'
import { GroupRole, Member, PagingRequestParams, PagingResponse } from '@/types'

type GroupMembersRequestParams = {
  groupId: number
} & PagingRequestParams

type GroupMembersResponse = PagingResponse<Member[]>

const getGrupMemberPaging = async ({
  page,
  size,
  sort,
  groupId,
}: GroupMembersRequestParams) => {
  const params = { page, size, sort }
  const { data } = await authorizationInstance.get<GroupMembersResponse>(
    appendParamsToUrl(`/api/group/${groupId}/member`, params)
  )

  return {
    records: data.content,
    nextPageToken:
      data.page !== data.totalPages - 1
        ? (data.page + 1).toString()
        : undefined,
  }
}

interface GroupRecordPaigngProps extends PagingRequestParams {
  initPageToken?: string
  groupId: number
}

export const useGrupMemberPagingSuspense = ({
  size = 10,
  sort,
  initPageToken,
  groupId,
}: GroupRecordPaigngProps) => {
  return useSuspenseInfiniteQuery({
    queryKey: ['group', 'member', groupId],
    queryFn: ({ pageParam = initPageToken }) =>
      getGrupMemberPaging({ page: pageParam, size, sort, groupId }),
    initialPageParam: initPageToken,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  })
}

export const useGrupMemberPaging = ({
  size = 10,
  sort,
  initPageToken,
  groupId,
}: GroupRecordPaigngProps) => {
  return useInfiniteQuery({
    queryKey: ['group', 'member', groupId],
    queryFn: ({ pageParam = initPageToken }) =>
      getGrupMemberPaging({ page: pageParam, size, sort, groupId }),
    initialPageParam: initPageToken,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  })
}

export const membersQuries = {
  all: () => ['members'],
}

export const joinGroupMember = async (inviteCode: string) => {
  await authorizationInstance.post('/api/group/join', { inviteCode })
}

export const exitGroupMember = async (groupId: number) => {
  await authorizationInstance.post('/api/group/exit', {
    groupId,
  })
}

type GruopRoleResponse = {
  role: GroupRole
}

const getGroupRole = async (groupId: number) => {
  const response = await authorizationInstance.get<GruopRoleResponse>(
    `/api/group/${groupId}/role`
  )

  return response.data.role
}

export const useGroupRole = (groupId: number) => {
  return useQuery({
    queryKey: ['group', 'role', groupId],
    queryFn: () => getGroupRole(groupId),
  })
}
