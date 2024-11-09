import { Outlet } from 'react-router-dom'

import { Flex } from '@chakra-ui/react'

import { Footer } from '@/components/PageLayout/Footer'

export const CardLayout = () => {
  return (
    <Flex background="brown.600" height="100vh" flexDirection="column">
      <Flex flex="1" justifyContent="center" alignItems="center">
        <Flex
          background="brown.100"
          width="1024px"
          height="560px"
          rounded="24px"
          overflow="hidden"
          marginTop={6}
          gap={0}
          boxShadow="6px 6px 20px rgba(0, 0, 0, 0.25)"
          id="page-layout"
          position="relative"
        >
          <Outlet />
        </Flex>
      </Flex>
      <Footer />
    </Flex>
  )
}
