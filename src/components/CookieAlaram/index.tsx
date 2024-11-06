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
      background="brown.300"
      borderRadius={5}
      paddingY={3}
      paddingX={4}
      alignItems="center"
      justifyContent="space-between"
      marginTop={20}
    >
      <Text>🎉 {message} 로 쿠키를 받았습니다! 🎉</Text>
      <Box
        _hover={{ cursor: 'pointer', color: 'text_secondary' }}
        onClick={onClickCloseButton}
      >
        <BiX />
      </Box>
    </Flex>
  )
}
