import { BiLockAlt, BiLockOpenAlt } from 'react-icons/bi'

import { Box, Flex, Text } from '@chakra-ui/react'

import { useHints } from '@/api/services/answer/hint.api'

interface HintListProps {
  answerId: number
}

export const HintList = ({ answerId }: HintListProps) => {
  const { data, status, error } = useHints({ answerId })

  if (status === 'pending') {
    return <HintListSkeleton />
  }

  if (error) throw error

  return (
    <Flex flexDirection="column" gap={1.5}>
      {data.hints.map((hint) => {
        return (
          <Flex
            key={hint.hintNum}
            alignItems="center"
            gap={2}
            transition="all 0.3s ease-in-out"
            _hover={{ cursor: 'pointer', color: 'text_secondary' }}
            _active={{ color: 'text_description' }}
          >
            {hint.valid ? (
              <Box color="primary">
                <BiLockOpenAlt size={20} />
              </Box>
            ) : (
              <Box color="text_description">
                <BiLockAlt size={20} />
              </Box>
            )}
            <Text>
              {hintDescriptionText[hint.hintNum]}
              {hint.valid ? <b>{hint.content}</b> : '...'}
            </Text>
          </Flex>
        )
      })}
    </Flex>
  )
}

const HintListSkeleton = () => {
  return (
    <Flex flexDirection="column" gap={1.5}>
      {Array.from({ length: 3 }, (_, index) => {
        return (
          <Flex
            key={index}
            alignItems="center"
            gap={2}
            color="text_description"
          >
            <BiLockAlt size={20} />
            <Text>{hintDescriptionText[index + 1]}</Text>
          </Flex>
        )
      })}
    </Flex>
  )
}

const hintDescriptionText = [
  '',
  '쿠키를 준 사람의 성별은 ',
  '쿠키를 준 사람의 나이는 ',
  '쿠키를 준 사람의 초성은 ',
]
