import { useEffect, useState } from 'react'
import { FallbackProps } from 'react-error-boundary'

import { AxiosError } from 'axios'

import { BuyHintErrorModal } from './error-modal'

export const BuyHintErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  const [errorMessage, setErrorMessage] = useState('')

  if (error instanceof AxiosError) {
    if (error.status === 400) {
      useEffect(() => {
        setErrorMessage(error.response?.data.detail)
      }, [setErrorMessage, error])

      return (
        <div>
          {errorMessage && (
            <BuyHintErrorModal
              errorMessage={errorMessage}
              setErrorMessage={(msg) => setErrorMessage(msg)}
              resetError={resetErrorBoundary}
            />
          )}
        </div>
      )
    }
  }

  throw error
}
