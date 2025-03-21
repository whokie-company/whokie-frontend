import { queryOptions } from '@tanstack/react-query'

import { authorizationInstance } from '@/api/instance'
import { GroupRole, Member } from '@/types'

export const groupMemberQueries = {
  all: () => ['member'],
  lists: (groupId: number) =>
    queryOptions({
      queryKey: ['list', groupId],
      queryFn: () => getGroupMemberList({ groupId }),
    }),
  myRole: (groupId: number) =>
    queryOptions({
      queryKey: [...groupMemberQueries.all(), 'role', groupId],
      queryFn: () => getGroupRole(groupId),
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
