import { useQuery } from '@tanstack/react-query'

import { authorizationInstance, fetchInstance } from '@/api/instance'
import { MyPageItem } from '@/types'

// 마이페이지 정보 가져오기
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

// 내 포인트 정보 가져오기
type PointResponse = {
  amount: number
}

const getMyPoint = async () => {
  const response =
    await authorizationInstance.get<PointResponse>(`/api/user/point`)

  return response.data
}

export const useGetMyPoint = () => {
  return useQuery({
    queryKey: ['myPage'],
    queryFn: () => getMyPoint(),
  })
}
