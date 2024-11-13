import { useEffect, useState } from 'react'

import { EventSourcePolyfill } from 'event-source-polyfill'

import { authorizationInstance } from '@/api/instance'
import { useAuthTokenStore } from '@/stores/auth-token'

export function useSSEMessage() {
  const [message, setMessage] = useState('')
  const { authToken } = useAuthTokenStore.getState()
  const isLoggedIn = useAuthTokenStore.getState().isLoggedIn()

  useEffect(() => {
    if (!isLoggedIn) return () => {}

    const eventSource = new EventSourcePolyfill(
      `${import.meta.env.VITE_BASE_URL}/api/alarm`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    )

    eventSource.onmessage = (event) => {
      setMessage(event.data)
    }

    return () => {
      authorizationInstance.post('/api/alarm/disconnect', {})
      eventSource.close()
    }
  }, [authToken, isLoggedIn])

  return { message }
}
