import { queryOptions } from '@tanstack/react-query'

import { authorizationInstance } from '@/api/instance'
import { appendParamsToUrl } from '@/api/utils/common/appendParamsToUrl'
import { AdminQuestion, PagingRequestParams } from '@/types'

type GetAdminQuestionsResponse = {
  content: AdminQuestion[]
  totalPages?: number
  totalElements?: number
}

const getAdminQuestions = async (params: PagingRequestParams) => {
  const response = await authorizationInstance.get<GetAdminQuestionsResponse>(
    appendParamsToUrl('api/admin/question', params)
  )

  return {
    questions: response.data.content,
    totalPages: response.data.totalPages,
    totalElements: response.data.totalElements,
  }
}

export const getAdminQuestionsQuries = {
  all: () => ['getAdminQuestions'],
  adminQuestions: (page?: number, size?: number) =>
    queryOptions({
      queryKey: [...getAdminQuestionsQuries.all(), page, size],
      queryFn: () => getAdminQuestions({ page: String(page), size: 8 }),
    }),
}
