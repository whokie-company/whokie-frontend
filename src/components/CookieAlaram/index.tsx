import { BiX } from 'react-icons/bi'

import { Box, Flex, Text } from '@chakra-ui/react'

interface CookieAlaramProps {
  message: string
  onClickCloseButton: () => void
}

export const CookieAlaram = ({
  message,
  onClickCloseButton,
}: CookieAlaramProps) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      background="orange.400"
      color="white"
      borderRadius={5}
      paddingY={3}
      paddingX={4}
      fontWeight={400}
      marginTop={20}
    >
      <Text>🎉 {message} 로 쿠키를 받았습니다! 🎉</Text>
      <Box
        _hover={{ cursor: 'pointer', color: 'orange.100' }}
        onClick={onClickCloseButton}
      >
        <BiX />
      </Box>
    </Flex>
  )
}
