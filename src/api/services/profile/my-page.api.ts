import { useQuery } from '@tanstack/react-query'

import { fetchInstance } from '@/api/instance'
import { MyPageItem } from '@/types'

const getMyPage = async (userId: string) => {
  const response = await fetchInstance.get<MyPageItem>(`/api/profile/${userId}`)

  return response.data
}

export const useMyPage = (userId: string) => {
  return useQuery({
    queryKey: ['myPage', userId],
    queryFn: () => getMyPage(userId),
  })
}
