import { useEffect, useState } from 'react'

import { EventSourcePolyfill } from 'event-source-polyfill'

import { authorizationInstance } from '@/api/instance'
import { useAuthTokenStore } from '@/stores/auth-token'

export function useSEEMessage() {
  const [message, setMessage] = useState('')
  const { authToken } = useAuthTokenStore.getState()

  useEffect(() => {
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
  }, [authToken])

  return { message }
}
