// components/Answer.tsx
import { Box } from '@chakra-ui/react'

import { useGetProfileAnswer } from '@/api/services/profile/profileQuestion.api'
import { ChatBox } from '@/components/ChatBox'
import { Loading } from '@/components/Loading'
import ErrorPage from '@/pages/ErrorPage'
import { ChatItem } from '@/types'

interface AnswerProps {
  userId: string
  questionId: string
}

const Answer: React.FC<AnswerProps> = ({ userId, questionId }: AnswerProps) => {
  const {
    data: answers,
    isLoading,
    isError,
  } = useGetProfileAnswer(userId, questionId)

  if (isLoading) return <Loading />
  if (isError) return <ErrorPage />
  if (!answers) return ''

  const chatItem: ChatItem[] = answers.map((answer) => ({
    chatId: Number(answer.profileAnswerId),
    direction: 'right' as const,
    content: answer.content,
    createdAt: answer.createdAt,
  }))

  return (
    <Box overflowY="auto">
      {chatItem.map((item) => (
        <ChatBox key={item.chatId} chatItem={item} />
      ))}
    </Box>
  )
}

export default Answer
