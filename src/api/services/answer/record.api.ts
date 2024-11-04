import { useSuspenseInfiniteQuery } from '@tanstack/react-query'

import { authorizationInstance } from '@/api/instance'
import { getPagingPath } from '@/api/utils/common/getPagingPath'
import { AnswerRecord, PagingRequestParams, PagingResponse } from '@/types'

type AnswerRecordPagingResponse = PagingResponse<AnswerRecord[]>

const getAnswerRecordPaging = async (params: PagingRequestParams) => {
  const response = await authorizationInstance.get<AnswerRecordPagingResponse>(
    getPagingPath('/api/answer/record', params)
  )

  const { data } = response

  return {
    records: data.content,
    nextPageToken:
      data.page !== data.totalPages ? (data.page + 1).toString() : undefined,
  }
}

interface AnswerRecordPagingProps extends PagingRequestParams {
  initPageToken?: string
}

export const useAnswerRecordPaging = ({
  size = 10,
  sort,
  initPageToken,
}: AnswerRecordPagingProps) => {
  return useSuspenseInfiniteQuery({
    queryKey: ['answer', 'record', initPageToken],
    queryFn: ({ pageParam = initPageToken }) =>
      getAnswerRecordPaging({ page: pageParam, size, sort }),
    initialPageParam: initPageToken,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  })
}
