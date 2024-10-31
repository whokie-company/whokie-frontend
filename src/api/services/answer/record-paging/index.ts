import { authorizationInstance } from '@/api/instance'
import { AnswerRecord, Paging, PagingRequestParams } from '@/types'

type AnswerRecordPagingResponse = {
  content: AnswerRecord[]
} & Paging

export const getAnswerRecordPaging = async (params: PagingRequestParams) => {
  const response = await authorizationInstance.get<AnswerRecordPagingResponse>(
    getAnswerRecordPagingPath(params)
  )

  const { data } = response

  return {
    records: data.content,
    nextPageToken:
      data.page !== data.totalPages ? (data.page + 1).toString() : undefined,
  }
}

const getAnswerRecordPagingPath = ({
  page,
  size,
  sort,
}: PagingRequestParams) => {
  const params = new URLSearchParams()

  if (size) {
    params.append('size', size.toString())
  }

  if (page) {
    params.append('page', page.toString())
  }

  if (sort) {
    sort.forEach((sortField) => params.append('sort', sortField))
  }

  return `/api/answer/record?${params}`
}
