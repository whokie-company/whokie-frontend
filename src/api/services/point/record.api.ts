import { useSuspenseInfiniteQuery } from '@tanstack/react-query'

import { authorizationInstance } from '@/api/instance'
import { appendParamsToUrl } from '@/api/utils/common/appendParamsToUrl'
import { PagingRequestParams, PagingResponse, Point } from '@/types'

type PointRecordRequestParams = {
  option: 'ALL' | 'CHARGED' | 'USED'
} & PagingRequestParams

type PointRecordResponse = PagingResponse<Point[]>

const getPointRecordPaging = async (params: PointRecordRequestParams) => {
  const response = await authorizationInstance.get<PointRecordResponse>(
    appendParamsToUrl('/api/point/record', params)
  )

  const { data } = response

  return {
    records: data.content,
    nextPageToken:
      data.page !== data.totalPages ? (data.page + 1).toString() : undefined,
  }
}

interface PointRecordParams extends PagingRequestParams {
  initPageToken?: string
  option?: 'ALL' | 'CHARGED' | 'USED'
}

export const usePointRecordPaging = ({
  size = 5,
  sort,
  initPageToken,
  option = 'ALL',
}: PointRecordParams) => {
  return useSuspenseInfiniteQuery({
    queryKey: ['point', 'record', initPageToken],
    queryFn: ({ pageParam = initPageToken }) =>
      getPointRecordPaging({ page: pageParam, size, sort, option }),
    initialPageParam: initPageToken,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  })
}
