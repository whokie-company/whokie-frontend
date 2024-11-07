import { queryOptions } from '@tanstack/react-query'

import { authorizationInstance } from '@/api/instance'
import { Member } from '@/types'

type GroupMembersRequestParams = {
  groupId: number
}

type GroupMembersResponse = {
  members: Member[]
}

const getGroupMembers = async ({ groupId }: GroupMembersRequestParams) => {
  const response = await authorizationInstance.get<GroupMembersResponse>(
    `/api/group/${groupId}/member`
  )

  return response.data.members
}

export const membersQuries = {
  all: () => ['members'],
  groupMembers: (groupId: number) =>
    queryOptions({
      queryKey: [...membersQuries.all(), groupId],
      queryFn: () => getGroupMembers({ groupId }),
    }),
}

export const joinGroupMember = async (inviteCode: string) => {
  await authorizationInstance.post('/api/group/join', { inviteCode })
}
