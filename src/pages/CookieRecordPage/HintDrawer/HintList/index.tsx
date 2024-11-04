import { BiLockAlt, BiLockOpenAlt } from 'react-icons/bi'

import { Box, Flex, Text } from '@chakra-ui/react'
import { useSuspenseQuery } from '@tanstack/react-query'

import { hintQuries } from '@/api/services/answer/hint.api'

interface HintListProps {
  answerId: number
  openBuyHintModal: () => void
}

export const HintList = ({ answerId, openBuyHintModal }: HintListProps) => {
  const { data: hints } = useSuspenseQuery(hintQuries.hints(answerId))

  return (
    <Flex flexDirection="column" gap={1.5}>
      {hints.map((hint) => {
        return (
          <Flex
            key={hint.hintNum}
            alignItems="center"
            gap={2}
            transition="all 0.3s ease-in-out"
            _hover={{ cursor: 'pointer', color: 'text_secondary' }}
            _active={{ color: 'text_description' }}
            onClick={openBuyHintModal}
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

const hintDescriptionText = [
  '',
  '쿠키를 준 사람의 성별은 ',
  '쿠키를 준 사람의 나이는 ',
  '쿠키를 준 사람의 초성은 ',
]
