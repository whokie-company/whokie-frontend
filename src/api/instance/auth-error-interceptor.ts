import { AxiosError } from 'axios'

import { useAuthTokenStore } from '@/stores/auth-token'
import { useUserInfoStore } from '@/stores/user-info'

export function authErrorInterceptor(error: AxiosError) {
  const { clearAuthToken } = useAuthTokenStore.getState()
  const { clearUserInfo } = useUserInfoStore.getState()

  if (error.response) {
    const { status } = error.response

    if (status === 401) {
      clearAuthToken()
      clearUserInfo()
    }
  }

  return Promise.reject(error)
}
