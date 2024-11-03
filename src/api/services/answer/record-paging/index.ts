import { authorizationInstance } from '@/api/instance'
import { appendParamsToUrl } from '@/api/utils/common/appendParamsToUrl'
import { AnswerRecord, Paging, PagingRequestParams } from '@/types'

type AnswerRecordPagingResponse = {
  content: AnswerRecord[]
} & Paging

type AnswerRecordRequsetParams = {
  date?: string
} & PagingRequestParams

export const getAnswerRecordPaging = async (
  params: AnswerRecordRequsetParams
) => {
  const response = await authorizationInstance.get<AnswerRecordPagingResponse>(
    appendParamsToUrl('/api/answer/record', params)
  )

  const { data } = response

  return {
    records: data.content,
    nextPageToken:
      data.page !== data.totalPages - 1 ? data.page.toString() : undefined,
  }
}
