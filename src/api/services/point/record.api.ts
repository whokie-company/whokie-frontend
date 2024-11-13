import { useSuspenseInfiniteQuery } from '@tanstack/react-query'

import { authorizationInstance } from '@/api/instance'
import { appendParamsToUrl } from '@/api/utils/common/appendParamsToUrl'
import {
  PagingRequestParams,
  PagingResponse,
  Point,
  PointOptions,
} from '@/types'

type PointRecordRequestParams = {
  option: PointOptions
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
      data.page !== data.totalPages - 1
        ? (data.page + 1).toString()
        : undefined,
  }
}

interface PointRecordParams extends PagingRequestParams {
  initPageToken?: string
  option?: PointOptions
}

export const usePointRecordPaging = ({
  size = 5,
  sort,
  initPageToken,
  option = 'ALL',
}: PointRecordParams) => {
  return useSuspenseInfiniteQuery({
    queryKey: ['point', 'record', initPageToken, option],
    queryFn: ({ pageParam = initPageToken }) =>
      getPointRecordPaging({ page: pageParam, size, sort, option }),
    initialPageParam: initPageToken,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  })
}
