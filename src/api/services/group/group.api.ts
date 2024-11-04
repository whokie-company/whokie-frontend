import { useQuery, useSuspenseInfiniteQuery } from '@tanstack/react-query'

import { authorizationInstance, fetchInstance } from '@/api/instance'
import { getPagingPath } from '@/api/utils/common/getPagingPath'
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
    getPagingPath('/api/group/my', params)
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
