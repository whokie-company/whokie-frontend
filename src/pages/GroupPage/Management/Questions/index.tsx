import { Suspense, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Box, Button, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import { useMutation, useQuery } from '@tanstack/react-query'

import {
  approveGroupQuestion,
  getGroupQuestions,
} from '@/api/services/group/group.api'
import { Loading } from '@/components/Loading'

import Navigate from '../../Navigate'

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
  const [status, setStatus] = useState<'READY' | 'APPROVED' | 'REJECTED'>(
    'READY'
  )

  const {
    data: groupQuestionsResponse = { content: [] },
    isLoading,
    isError,
    refetch,
  } = useQuery<GroupQuestionsResponse>({
    queryKey: ['groupQuestions', groupId, status],
    queryFn: () => getGroupQuestions(String(groupId), status, 0, 10),
    enabled: !!groupId,
  })

  const { mutate } = useMutation({
    mutationFn: (data: { questionId: number; approve: boolean }) => {
      const { questionId, approve } = data
      return approveGroupQuestion(String(groupId), questionId, approve)
    },
    onSuccess: () => {
      refetch()
    },
  })

  const handleStatusChange = (questionId: number, approve: boolean) => {
    mutate({ questionId, approve })
  }

  const statusButtons = (
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
  )

  let content
  if (isLoading) {
    content = <Loading />
  } else if (isError) {
    content = <Text>질문을 불러오는 데 실패했습니다.</Text>
  } else if (groupQuestionsResponse.content.length > 0) {
    content = (
      <Stack spacing="15px">
        {groupQuestionsResponse.content.map((question: Question) => (
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
        ))}
      </Stack>
    )
  } else {
    content = <Text>질문이 없습니다.</Text>
  }

  return (
    <Suspense fallback={<Loading />}>
      <Navigate />
      <Box
        p="30px"
        bg="white"
        borderRadius="10px"
        backgroundColor="secondary_background"
      >
        <Text fontSize="lg" fontWeight="bold" mb="20px">
          질문 관리
        </Text>
        {statusButtons}
        <Box maxHeight="400px" overflowY="scroll">
          {content}
        </Box>
      </Box>
    </Suspense>
  )
}
