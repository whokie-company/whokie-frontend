import { authorizationInstance } from '@/api/instance'
import { appendParamsToUrl } from '@/api/utils/common/appendParamsToUrl'
import { Group, Paging, PagingRequestParams } from '@/types'

type GroupResponse = {
  content: Omit<Group, 'groupDescription'>[]
} & Paging

export const getGroupPaging = async (params: PagingRequestParams) => {
  const { data } = await authorizationInstance.get<GroupResponse>(
    appendParamsToUrl('/api/group/my', params)
  )

  return {
    groups: data.content,
    nextPageToken:
      data.page !== data.totalPages ? (data.page + 1).toString() : undefined,
  }
}
