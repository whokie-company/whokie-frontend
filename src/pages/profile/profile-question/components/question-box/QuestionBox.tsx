import { Box } from '@chakra-ui/react'

import { ChatBox } from '@/components/ChatBox'
import { SelectedQuestion } from '@/stores/selected-question'

import { formatDate } from '../../utils'

interface QuestionBoxProps {
  question: SelectedQuestion
}

export const QuestionBox = ({ question }: QuestionBoxProps) => {
  return (
    <Box padding="3px 0">
      <ChatBox
        direction="left"
        content={question.questionContent}
        createdAt={formatDate(question.questionCreatedAt)}
        deleteBtn={false}
      />
    </Box>
  )
}
