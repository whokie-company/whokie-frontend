import { queryOptions } from '@tanstack/react-query'

import { authorizationInstance } from '@/api/instance'
import { appendParamsToUrl } from '@/api/utils/common/appendParamsToUrl'
import { Member, PaginationRequestParams } from '@/types'

type GroupMembersRequestParams = {
  groupId: number
} & PaginationRequestParams

type GroupMembersResponse = {
  content: Member[]
  totalPages?: number
  totalElements?: number
}

const getGroupMembers = async (params: GroupMembersRequestParams) => {
  const response = await authorizationInstance.get<GroupMembersResponse>(
    appendParamsToUrl(`/api/group/${params.groupId}/member`, params)
  )

  return {
    members: response.data.content,
    totalPages: response.data.totalPages,
    totalElements: response.data.totalElements,
  }
}

export const membersQuries = {
  all: () => ['members'],
  groupMembers: (groupId: number, page?: number) =>
    queryOptions({
      queryKey: [...membersQuries.all(), groupId, page],
      queryFn: () => getGroupMembers({ groupId, page: 0, size: 5 }),
    }),
}
