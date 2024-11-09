import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react'
import { keyframes } from '@emotion/react'

import Cookie1 from '@/assets/cookie1.svg'
import Cookie2 from '@/assets/cookie2.svg'
import Cookie3 from '@/assets/cookie3.svg'
import Cookie4 from '@/assets/cookie4.svg'

const Cookies = [Cookie4, Cookie2, Cookie3, Cookie1]

interface ReadySectionProps {
  groupName?: string
  onClickPlay: () => void
}

export const ReadySection = ({ groupName, onClickPlay }: ReadySectionProps) => {
  return (
    <Center height="full">
      <Flex flexDirection="column">
        <Heading
          textAlign="center"
          size="2xl"
          color="orange.500"
          fontWeight="800"
        >
          Whokie
        </Heading>
        <Text textAlign="center" fontSize="1.2rem" fontWeight="bold">
          {groupName ? `${groupName} 멤버에게` : '모든 친구에게'} 칭찬 쿠키 주기
        </Text>
        <Flex paddingY={10} gap={1}>
          {Array.from({ length: 4 }, (_, index) => (
            <Box
              key={index}
              width={20}
              height={20}
              animation={`${pulseAnimation} 2s infinite ease-in-out ${index * -0.8}s`}
            >
              <Image src={Cookies[index]} />
            </Box>
          ))}
        </Flex>
        <Flex justifyContent="center">
          <Button
            colorScheme="primary"
            height="3rem"
            size="lg"
            width="full"
            marginX={10}
            fontSize="1.5rem"
            onClick={onClickPlay}
          >
            시작하기
          </Button>
        </Flex>
      </Flex>
    </Center>
  )
}

const pulseAnimation = keyframes`
  0%, 100% {
    transform: scale(0.98);
  }
  50% {
    transform: scale(1);
  }
`
