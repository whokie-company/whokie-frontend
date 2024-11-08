import { Flex, Image, Text } from '@chakra-ui/react'

import KakaoSymbol from '@/assets/kakao-logo-symbol.svg'

export const KakaoLoginButton = () => {
  const redirectURL = import.meta.env.DEV ? import.meta.env.VITE_LOGIN_URL : ''

  const handleLogin = () => {
    window.location.href = `${redirectURL}/api/user/login`
  }

  return (
    <Flex
      background="kakao"
      rounded="6px"
      justifyContent="center"
      alignItems="center"
      height={10}
      gap={3}
      _hover={{ cursor: 'pointer' }}
      onClick={handleLogin}
    >
      <Image src={KakaoSymbol} width={5} />
      <Text fontSize="14px" fontWeight="bold" color="rgba(0, 0, 0, 0.85)">
        카카오 로그인
      </Text>
    </Flex>
  )
}
