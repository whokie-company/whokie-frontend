// import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

// import { useAuthTokenStore } from '@/stores/auth-token'

export const ProtectedRoute = () => {
  // const isLoggedIn = useAuthTokenStore((state) => state.isLoggedIn())

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     window.location.href = `/login`
  //   }
  // }, [isLoggedIn])

  return <Outlet />
}
