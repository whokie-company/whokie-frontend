import { useQuery } from '@tanstack/react-query'

import { authorizationInstance } from '@/api/instance'
import { Hint } from '@/types'

type HintRequestParams = {
  answerId: number
}

type HintResponse = {
  hints: Hint[]
}

const getHint = async ({ answerId }: HintRequestParams) => {
  const response = await authorizationInstance.get<HintResponse>(
    `/api/answer/hint/${answerId}`
  )

  return response.data
}

export const useHints = (answerId: HintRequestParams) => {
  return useQuery({
    queryKey: ['hints', answerId],
    queryFn: () => getHint(answerId),
    enabled: !!answerId,
  })
}
