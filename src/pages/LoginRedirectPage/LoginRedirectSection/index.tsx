import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useKakaoLogin } from '@/api/services/user/login.api'
import { Loading } from '@/components/Loading'
import { useAuthTokenStore } from '@/stores/auth-token'
import { useUserInfoStore } from '@/stores/user-info'

interface LoginRedirectSectionProps {
  code: string
}

export const LoginRedirectSection = ({ code }: LoginRedirectSectionProps) => {
  const navigate = useNavigate()

  const { data, status, error } = useKakaoLogin({ code })
  const setAuthToken = useAuthTokenStore((state) => state.setAuthToken)
  const setUserInfo = useUserInfoStore((state) => state.setUserInfo)

  useEffect(() => {
    if (data) {
      if (data.userInfo.role === 'TEMP') {
        setAuthToken(data.accessToken)
        setUserInfo(data.userInfo)
        window.location.href = '/register'
        return
      }
      setAuthToken(data.accessToken)
      setUserInfo(data.userInfo)
      navigate('/')
    }
  }, [data, setAuthToken, setUserInfo, navigate])

  if (status === 'pending') return <Loading />

  if (error) return <div>{error.message}</div>

  return <Loading />
}
