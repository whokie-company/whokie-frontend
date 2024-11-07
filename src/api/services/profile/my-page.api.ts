import { useQuery } from '@tanstack/react-query'

import { authorizationInstance, fetchInstance } from '@/api/instance'
import { MyPageItem, Ranks } from '@/types'

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
    queryKey: ['myPagePoint'],
    queryFn: () => getMyPoint(),
  })
}

// 프로필 배경 수정
type UploadProfileBgRequest = {
  image: File
}
export const uploadProfileBg = async ({ image }: UploadProfileBgRequest) => {
  const formData = new FormData()
  formData.append('image', image)

  await authorizationInstance.patch('/api/profile/bg/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

// 마이페이지 랭킹 정보 가져오기
const getMyRanking = async (userId: string) => {
  const response = await fetchInstance.get<Ranks>(`/api/ranking/${userId}`)

  return response.data.ranks
}

export const useMyRanking = (userId: string) => {
  return useQuery({
    queryKey: ['myRanking', userId],
    queryFn: () => getMyRanking(userId),
  })
}
