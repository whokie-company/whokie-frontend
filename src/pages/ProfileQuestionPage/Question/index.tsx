import { useEffect, useState } from 'react'

import { Box } from '@chakra-ui/react'

import { ChatBox } from '@/components/ChatBox'
import { useSelectedQuestionStore } from '@/stores/selected-question'
import { ChatItem } from '@/types'

export default function Question() {
  const questionId = useSelectedQuestionStore((state) => state.questionId)
  const questionContent = useSelectedQuestionStore(
    (state) => state.questionContent
  )

  const [question, setQuestion] = useState<ChatItem | null>(null)

  useEffect(() => {
    if (questionId && questionContent) {
      setQuestion({
        chatId: questionId,
        direction: 'left',
        createdAt: '2024-10-19',
        content: questionContent,
      })
    } else {
      setQuestion(null)
    }
  }, [questionId, questionContent])

  return (
    <Box padding="3px 0">{question && <ChatBox chatItem={question} />}</Box>
  )
}
