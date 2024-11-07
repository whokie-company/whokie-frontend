import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Box, Button, Stack, Text } from '@chakra-ui/react'

import { getGroupQuestions } from '@/api/services/group/group.api'

interface Question {
  questionId: number
  questionContent: string
  status: 'READY' | 'APPROVED' | 'REJECTED'
}

interface GroupQuestionsResponse {
  content: Question[]
  page: number
  size: number
  totalElements: number
  totalPages: number
}

export default function QuestionManagement() {
  const { groupId } = useParams<{ groupId: string }>()
  const [questions, setQuestions] = useState<Question[]>([])
  const [status, setStatus] = useState<'READY' | 'APPROVED' | 'REJECTED'>(
    'READY'
  )

  useEffect(() => {
    const fetchQuestions = () => {
      if (groupId) {
        getGroupQuestions(String(groupId), status, 0, 10).then(
          (result: GroupQuestionsResponse) => {
            if (result && result.content && Array.isArray(result.content)) {
              setQuestions(result.content)
            } else {
              setQuestions([])
            }
          }
        )
      }
    }
    fetchQuestions()
  }, [groupId, status])

  return (
    <Box
      p="30px"
      bg="white"
      borderRadius="10px"
      backgroundColor="secondary_background"
    >
      <Text fontSize="lg" fontWeight="bold" mb="20px">
        질문 관리
      </Text>

      <Box mb="20px">
        <Stack direction="row" spacing="15px">
          <Button
            onClick={() => setStatus('READY')}
            colorScheme={status === 'READY' ? 'gray' : 'gray'}
            variant={status === 'READY' ? 'solid' : 'outline'}
            borderRadius="full"
          >
            승인 대기
          </Button>
          <Button
            onClick={() => setStatus('APPROVED')}
            colorScheme={status === 'APPROVED' ? 'green' : 'gray'}
            variant={status === 'APPROVED' ? 'solid' : 'outline'}
            borderRadius="full"
          >
            승인됨
          </Button>
          <Button
            onClick={() => setStatus('REJECTED')}
            colorScheme={status === 'REJECTED' ? 'red' : 'gray'}
            variant={status === 'REJECTED' ? 'solid' : 'outline'}
            borderRadius="full"
          >
            거절됨
          </Button>
        </Stack>
      </Box>

      <Box maxHeight="400px" overflowY="scroll">
        <Stack spacing="15px">
          {questions.length > 0 ? (
            questions.map((question) => (
              <Box
                key={question.questionId}
                p="10px"
                bg="white"
                borderRadius="8px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text fontSize="16px" flex="1">
                  {question.questionContent}
                </Text>
              </Box>
            ))
          ) : (
            <Text>질문이 없습니다.</Text>
          )}
        </Stack>
      </Box>
    </Box>
  )
}
