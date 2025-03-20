import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'

import { authorizationInstance } from '@/api/instance'
import { appendParamsToUrl } from '@/api/utils/common/appendParamsToUrl'
import { GroupRole, Member, PagingRequestParams } from '@/types'

export const groupMemberQueries = {
  all: () => ['group', 'member'],
  lists: (groupId: number) =>
    queryOptions({
      queryKey: ['list', groupId],
      queryFn: () => getGroupMemberList({ groupId }),
    }),
}

type GroupMembersRequestParams = {
  groupId: number
} & PagingRequestParams

type GroupMembersManageResponse = {
  content: Member[]
  totalPages?: number
  totalElements?: number
}

const getGroupMembers = async (params: GroupMembersRequestParams) => {
  const response = await authorizationInstance.get<GroupMembersManageResponse>(
    appendParamsToUrl(`/api/group/${params.groupId}/member`, params)
  )

  return {
    members: response.data.content,
    totalPages: response.data.totalPages,
    totalElements: response.data.totalElements,
  }
}

export const membersManageQuries = {
  all: () => ['membersManage'],
  groupMembers: (groupId: number, page?: number) =>
    queryOptions({
      queryKey: [...membersManageQuries.all(), groupId, page],
      queryFn: () => getGroupMembers({ groupId, page: String(page), size: 5 }),
    }),
}

type GroupMemberListRequestParams = {
  groupId: number
}

type GroupMemberListResponse = {
  members: Member[]
}

export const getGroupMemberList = async ({
  groupId,
}: GroupMemberListRequestParams) => {
  const response = await authorizationInstance.get<GroupMemberListResponse>(
    `/api/group/${groupId}/member/list`
  )

  return response.data.members
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
  return useSuspenseQuery({
    queryKey: ['group', 'role', groupId],
    queryFn: () => getGroupRole(groupId),
  })
}

export type ExpelMemberRequest = {
  groupId: number
  userId: number
}

export const expelMember = async ({ groupId, userId }: ExpelMemberRequest) => {
  await authorizationInstance.post('/api/group/expel', {
    groupId,
    userId,
  })
}

export type ChangeLeaderRequest = {
  groupId: number
  pastLeaderId: number
  newLeaderId: number
}

export const changeLeader = async ({
  groupId,
  pastLeaderId,
  newLeaderId,
}: ChangeLeaderRequest) => {
  await authorizationInstance.patch('/api/group/leader', {
    groupId,
    pastLeaderId,
    newLeaderId,
  })
}
