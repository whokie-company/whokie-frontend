import { Box } from '@chakra-ui/react'

import { ChatBox } from '@/components/ChatBox'
import formatDate from '@/pages/ProfileQuestionPage/utils/formatDate'
import { SelectedQuestion } from '@/stores/selected-question'

interface QuestionProps {
  question: SelectedQuestion
}

export default function Question({ question }: QuestionProps) {
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
