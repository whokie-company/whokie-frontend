import { BiLockAlt, BiLockOpenAlt } from 'react-icons/bi'

import { Box, Flex, Text } from '@chakra-ui/react'

export const HintList = () => {
  return (
    <Flex flexDirection="column" gap={1.5}>
      <Flex alignItems="center" gap={2}>
        <Box color="primary">
          <BiLockOpenAlt size={20} />
        </Box>
        <Text>
          쿠키를 준 사람은 <b>여자</b> 입니다.
        </Text>
      </Flex>
      <Flex alignItems="center" gap={2}>
        <Box color="primary">
          <BiLockOpenAlt size={20} />
        </Box>
        <Text>
          그의 나이는 <b>23세</b> 입니다.
        </Text>
      </Flex>
      <Flex alignItems="center" gap={2}>
        <Box color="text_description">
          <BiLockAlt size={20} />
        </Box>
        <Text>그의 이름은 ...</Text>
      </Flex>
    </Flex>
  )
}
