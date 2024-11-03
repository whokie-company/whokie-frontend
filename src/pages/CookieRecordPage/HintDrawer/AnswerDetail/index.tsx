import { Flex, Tag, Text } from '@chakra-ui/react'
import { format } from 'date-fns'

import { useSelectedAnswerStore } from '@/stores/selected-answer'

export const AnswerDetail = () => {
  const selectedAnswer = useSelectedAnswerStore((state) => state.selectedAnswer)

  if (!selectedAnswer) return <div />

  return (
    <Flex flexDirection="column" alignItems="center" gap={2} paddingY={6}>
      <Text color="text_description">
        {format(selectedAnswer.createdAt, 'yyyy.MM.dd')}
      </Text>
      <Flex alignItems="center" gap={2}>
        <Tag
          fontSize="small"
          fontWeight="500"
          borderRadius="full"
          background="brown.200"
        >
          ALL
        </Tag>
        <Text fontSize="medium" fontWeight="bold" maxWidth={60}>
          {selectedAnswer.questionContent}
        </Text>
      </Flex>
    </Flex>
  )
}
