import { Flex, Image, Text } from '@chakra-ui/react'

import Cookie1 from '@/assets/cookie1.svg'

import { HintIcon } from './hint-icon'

interface CookieLogTextProps {
  logContent: string
  hintCount: 0 | 1 | 2 | 3
  onClick: () => void
  imageSrc?: string
}

export const CookieLogText = ({
  logContent,
  hintCount,
  onClick,
  imageSrc = Cookie1,
}: CookieLogTextProps) => {
  return (
    <Flex
      gap="0.5rem"
      alignItems="center"
      onClick={onClick}
      _hover={{ cursor: 'pointer' }}
    >
      <Image src={imageSrc} width="20px" />
      <Flex gap={1} fontSize="15px">
        <Text
          as="b"
          maxWidth="300px"
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
        >
          {logContent}
        </Text>
        <Text whiteSpace="nowrap">으로 쿠키를 받았습니다.</Text>
      </Flex>
      <HintIcon hintCount={hintCount} />
    </Flex>
  )
}
