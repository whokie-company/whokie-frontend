import { useQuery } from '@tanstack/react-query'

import { loginInstance } from '@/api/instance'

type KakaoLoginParam = {
  code: string
}

type KakaoLoginResponse = {
  userId: number
}

const kakaoLogin = async ({ code }: KakaoLoginParam) => {
  const response = await loginInstance.get<KakaoLoginResponse>(
    `/api/user/callback?code=${code}`
  )
  const accessToken = response.headers.authorization

  return { accessToken, userId: response.data.userId }
}

export const useKakaoLogin = ({ code }: KakaoLoginParam) => {
  return useQuery({
    queryKey: ['login', code],
    queryFn: () => kakaoLogin({ code }),
  })
}
