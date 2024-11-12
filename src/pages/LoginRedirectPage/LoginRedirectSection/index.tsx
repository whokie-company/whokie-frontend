import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useKakaoLogin } from '@/api/services/user/login.api'
import { Loading } from '@/components/Loading'
import { useAuthTokenStore } from '@/stores/auth-token'
import { useMyUserIdStore } from '@/stores/my-user-id'

interface LoginRedirectSectionProps {
  code: string
}

export const LoginRedirectSection = ({ code }: LoginRedirectSectionProps) => {
  const navigate = useNavigate()

  const { data, status, error } = useKakaoLogin({ code })
  const setAuthToken = useAuthTokenStore((state) => state.setAuthToken)
  const setMyUserId = useMyUserIdStore((state) => state.setMyUserId)

  useEffect(() => {
    if (data) {
      if (data.role === 'TEMP') {
        setAuthToken(data.accessToken)
        setMyUserId(data.userId)
        navigate('/register')
        return
      }
      setAuthToken(data.accessToken)
      setMyUserId(data.userId)
      navigate('/')
    }
  }, [data, setAuthToken, setMyUserId, navigate])

  if (status === 'pending') return <Loading />

  if (error) return <div>{error.message}</div>

  return <Loading />
}
