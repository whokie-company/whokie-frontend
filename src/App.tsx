import { useEffect } from 'react'

import { ChakraProvider, useToast } from '@chakra-ui/react'
import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '@/api/instance'
import { Routes } from '@/routes'
import theme from '@/styles/theme'

import { CookieAlaram } from './components/CookieAlaram'
import { useSEEMessage } from './hooks/useSEEMessage'

function App() {
  const { message } = useSEEMessage()
  const toast = useToast()

  useEffect(() => {
    if (message) {
      toast.closeAll()
      toast({
        position: 'top',
        duration: 3000,
        render: () => (
          <CookieAlaram message={message} onClickCloseButton={toast.closeAll} />
        ),
      })
    }
  }, [toast, message])

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Routes />
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default App
