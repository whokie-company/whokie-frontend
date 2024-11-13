import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { useToast } from '@chakra-ui/react'

import { CookieAlaram } from '@/components/CookieAlaram'
import { useSEEMessage } from '@/hooks/useSEEMessage'
import { useAuthTokenStore } from '@/stores/auth-token'

export const ProtectedRoute = () => {
  const isLoggedIn = useAuthTokenStore((state) => state.isLoggedIn())

  const { message } = useSEEMessage()
  const toast = useToast()

  useEffect(() => {
    if (isLoggedIn && message) {
      toast.closeAll()
      toast({
        position: 'top',
        duration: 3000,
        render: () => (
          <CookieAlaram message={message} onClickCloseButton={toast.closeAll} />
        ),
      })
    }

    if (!isLoggedIn) {
      window.location.href = `/login`
    }
  }, [toast, message, isLoggedIn])

  return <Outlet />
}
