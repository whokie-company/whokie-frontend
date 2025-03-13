import { Suspense, useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Box, Text } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@/api/instance'
import { approveGroupQuestion } from '@/api/services/group/group.api'
import { useGroupRole } from '@/api/services/group/member.api'
import { useGroupQuestion } from '@/api/services/question/group.api'
import { GroupManagementNavigation } from '@/components'
import { Loading } from '@/components/Loading'
import ErrorPage from '@/pages/ErrorPage'

import { GroupQuestionList, StatusButtonList } from './components'

export default function QuestionManagementPage() {
  const { groupId } = useParams<{ groupId: string }>()
  const [status, setStatus] = useState<'READY' | 'APPROVED' | 'REJECTED'>(
    'READY'
  )

  const {
    data: groupQuestions,
    isLoading,
    isError,
  } = useGroupQuestion({
    groupId: groupId || '',
    status,
  })
  const { data: role } = useGroupRole(Number(groupId))

  const { mutate } = useMutation({
    mutationFn: (data: { questionId: number; approve: boolean }) => {
      const { questionId, approve } = data
      return approveGroupQuestion(String(groupId), questionId, approve)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['groupQuestions', groupId, status],
      })
      queryClient.invalidateQueries({
        queryKey: ['question', 'common', 'random', 'group', groupId],
      })
    },
  })

  const handleStatusChange = useCallback(
    (questionId: number, approve: boolean) => {
      mutate({ questionId, approve })
    },
    [mutate]
  )

  if (!groupId || role === 'MEMBER') return <ErrorPage />

  return (
    <Suspense fallback={<Loading />}>
      <GroupManagementNavigation groupId={groupId} pageName="그룹 질문 관리" />
      <Box
        p="30px"
        bg="white"
        borderRadius="10px"
        backgroundColor="secondary_background"
      >
        <Text fontSize="lg" fontWeight="bold" mb="20px">
          질문 관리
        </Text>
        <StatusButtonList status={status} setStatus={setStatus} />
        <GroupQuestionList
          isLoading={isLoading}
          isError={isError}
          questions={groupQuestions?.content || []}
          onStatusChange={handleStatusChange}
        />
      </Box>
    </Suspense>
  )
}
