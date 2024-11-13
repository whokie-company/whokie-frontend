import { useEffect, useState } from 'react'

import { Box } from '@chakra-ui/react'

import { ChatBox } from '@/components/ChatBox'
import { useSelectedQuestionStore } from '@/stores/selected-question'
import { ChatItem } from '@/types'

import formatDate from '../Answer/formatDate'

export default function Question() {
  const { selectedQuestion } = useSelectedQuestionStore()

  const [question, setQuestion] = useState<ChatItem | null>(null)

  useEffect(() => {
    if (selectedQuestion.questionId && selectedQuestion.questionContent) {
      setQuestion({
        chatId: selectedQuestion.questionId,
        direction: 'left',
        createdAt: formatDate(selectedQuestion.questionCreatedAt as string),
        content: selectedQuestion.questionContent,
        deleteBtn: false,
      })
    } else {
      setQuestion(null)
    }
  }, [selectedQuestion])

  return (
    <Box padding="3px 0">{question && <ChatBox chatItem={question} />}</Box>
  )
}
