import { queryOptions } from '@tanstack/react-query'

import { authorizationInstance } from '@/api/instance'

type PointResponse = {
  amount: number
}

const getPoint = async () => {
  const response =
    await authorizationInstance.get<PointResponse>('/api/user/point')

  return response.data.amount
}

export const pointQuries = {
  all: () => ['point'],
  point: () =>
    queryOptions({
      queryKey: [...pointQuries.all()],
      queryFn: () => getPoint(),
    }),
}
