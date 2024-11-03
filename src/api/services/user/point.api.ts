import { useQuery } from '@tanstack/react-query'

import { authorizationInstance } from '@/api/instance'

type PointResponse = {
  amount: number
}

const getPoint = async () => {
  const response =
    await authorizationInstance.get<PointResponse>('/api/user/point')

  return response.data
}

export const usePoint = () => {
  return useQuery({
    queryKey: ['point'],
    queryFn: () => getPoint(),
  })
}
