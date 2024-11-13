import { useQuery } from '@tanstack/react-query'

import { authorizationInstance, fetchInstance } from '@/api/instance'

type KakaoLoginParam = {
  code: string
}

type KakaoLoginResponse = {
  userId: number
  role: 'USER' | 'TEMP'
}

const kakaoLogin = async ({ code }: KakaoLoginParam) => {
  const response = await fetchInstance.get<KakaoLoginResponse>(
    `/api/user/callback?code=${code}`
  )
  const accessToken = response.headers.authorization

  return { accessToken, userId: response.data.userId, role: response.data.role }
}

export const useKakaoLogin = ({ code }: KakaoLoginParam) => {
  return useQuery({
    queryKey: ['login', code],
    queryFn: () => kakaoLogin({ code }),
  })
}

export type RegisterUserRequestBody = {
  name: string
  gender: string
  year: number
  month: number
  day: number
}

type RegisterUeserResponse = {
  userId: number
  jwt: string
  role: 'USER'
}

export const registerUser = async (data: RegisterUserRequestBody) => {
  const response = await authorizationInstance.post<RegisterUeserResponse>(
    '/api/user/information',
    data
  )
  const accessToken = response.headers.authorization

  return { accessToken, userId: response.data.userId }
}
