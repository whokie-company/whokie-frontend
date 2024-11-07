import { useSuspenseInfiniteQuery } from '@tanstack/react-query'

import { authorizationInstance } from '@/api/instance'
import { appendParamsToUrl } from '@/api/utils/common/appendParamsToUrl'
import { AnswerRecord, PagingRequestParams, PagingResponse } from '@/types'

type AnswerRecordPagingResponse = PagingResponse<AnswerRecord[]>

type AnswerRecordRequsetParams = {
  date?: string
} & PagingRequestParams

const getAnswerRecordPaging = async (params: AnswerRecordRequsetParams) => {
  const response = await authorizationInstance.get<AnswerRecordPagingResponse>(
    appendParamsToUrl('/api/answer/record', params)
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

interface AnswerRecordPagingProps extends PagingRequestParams {
  initPageToken?: string
  date?: string
}

export const useAnswerRecordPaging = ({
  size = 10,
  sort,
  initPageToken,
  date,
}: AnswerRecordPagingProps) => {
  return useSuspenseInfiniteQuery({
    queryKey: ['answer', 'record', initPageToken, date],
    queryFn: ({ pageParam = initPageToken }) =>
      getAnswerRecordPaging({ page: pageParam, size, sort, date }),
    initialPageParam: initPageToken,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  })
}
