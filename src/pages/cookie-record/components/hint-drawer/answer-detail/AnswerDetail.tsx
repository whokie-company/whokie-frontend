import { Flex, Tag, Text } from '@chakra-ui/react'
import { format } from 'date-fns'

import { SelectedAnswer } from '@/stores/selected-answer'

interface AnswerDetailProps {
  answer: SelectedAnswer
}

export const AnswerDetail = ({ answer }: AnswerDetailProps) => {
  return (
    <Flex flexDirection="column" alignItems="center" gap={2} paddingY={6}>
      <Text color="text_description">
        {format(answer.createdAt, 'yyyy.MM.dd')}
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
          {answer.questionContent}
        </Text>
      </Flex>
    </Flex>
  )
}
