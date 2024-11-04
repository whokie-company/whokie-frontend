import { queryOptions } from '@tanstack/react-query'

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

  return response.data.hints
}

type BuyHintRequestBody = {
  answerId: number
}

export const buyHint = async ({ answerId }: BuyHintRequestBody) => {
  await authorizationInstance.post('/api/answer/hint', {
    answerId,
  })
}

export const hintQuries = {
  all: () => ['hints'],
  hints: (answerId: number) =>
    queryOptions({
      queryKey: [...hintQuries.all(), answerId],
      queryFn: () => getHint({ answerId }),
    }),
}
