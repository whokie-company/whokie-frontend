import { useEffect, useRef } from 'react'

import { Box } from '@chakra-ui/react'

import { useGetProfileAnswer } from '@/api/services/profile/profileQuestion.api'
import { ChatBox } from '@/components/ChatBox'
import { Loading } from '@/components/Loading'
import ErrorPage from '@/pages/ErrorPage'
import { useSelectedQuestionStore } from '@/stores/selected-question'
import { ChatItem } from '@/types'

import formatDate from './formatDate'

interface AnswerProps {
  userId: number
}

const Answer: React.FC<AnswerProps> = ({ userId }: AnswerProps) => {
  const questionId = useSelectedQuestionStore((state) => state.questionId)

  const {
    data: answers,
    isLoading,
    isError,
  } = useGetProfileAnswer(userId, questionId as number)

  const boxRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight
    }
  }, [answers])

  if (isLoading) return <Loading />
  if (isError) return <ErrorPage />
  if (!answers) return ''

  const chatItem: ChatItem[] = answers.map((answer) => ({
    chatId: Number(answer.profileAnswerId),
    direction: 'right' as const,
    content: answer.content,
    createdAt: formatDate(answer.createdAt),
  }))

  return (
    <Box overflowY="auto" ref={boxRef}>
      {chatItem.map((item) => (
        <ChatBox key={item.chatId} chatItem={item} />
      ))}
    </Box>
  )
}

export default Answer
