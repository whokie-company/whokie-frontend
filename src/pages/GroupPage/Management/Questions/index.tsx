import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Box, Button, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'

import {
  approveGroupQuestion,
  getGroupQuestions,
} from '@/api/services/group/group.api'

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

  const { mutate } = useMutation({
    mutationFn: (data: { questionId: number; approve: boolean }) => {
      const { questionId, approve } = data
      return approveGroupQuestion(String(groupId), questionId, approve)
    },
    onSuccess: () => {
      console.log('API 호출 성공이다!!!!!!!!!')
    },
  })

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

  const handleStatusChange = (questionId: number, approve: boolean) => {
    mutate({ questionId, approve })
  }

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

                <RadioGroup
                  onChange={(value) => {
                    const approve = value === 'APPROVED'
                    handleStatusChange(question.questionId, approve)
                  }}
                  value={question.status}
                >
                  <Stack direction="row">
                    <Radio value="APPROVED" colorScheme="green">
                      {}
                    </Radio>
                    <Radio value="REJECTED" colorScheme="red">
                      {}
                    </Radio>
                  </Stack>
                </RadioGroup>
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
