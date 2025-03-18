import { BiGhost } from 'react-icons/bi'

import { Box, Img, Text, VStack } from '@chakra-ui/react'

import cookie1 from '@/assets/cookie1.svg'
import cookie3 from '@/assets/cookie3.svg'

export default function ComingSoonPage() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100vw"
      height="100vh"
      bg="primary_background"
      color="white"
      textAlign="center"
      p={4}
    >
      <VStack spacing={4}>
        <Text
          fontSize="6xl"
          fontWeight="bold"
          color="primary"
          display="flex"
          alignItems="center"
        >
          Co
          <BiGhost style={{ margin: '0 -3px', fontSize: '50px' }} /> ing S
          <Img src={cookie1} w="40px" h="40px" mx="0.5px" />
          <Img src={cookie3} w="40px" h="40px" mx="0.5px" />
          n!
        </Text>
        <Text fontSize="md" color="brown.500">
          후키 모바일 버전은 준비중입니다
        </Text>
        <Text fontSize="2xl" fontWeight="bold" color="brown.600">
          화면의 크기를 키워 주세요
        </Text>
      </VStack>
    </Box>
  )
}
