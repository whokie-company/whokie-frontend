import { Suspense, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Box, Text } from '@chakra-ui/react'

import { useGroupRole } from '@/api/services/group/member.api'
import { GroupManagementNavigation } from '@/components'
import { Loading } from '@/components/Loading'
import { ErrorPage } from '@/pages'
import { QuestionStatus } from '@/types'

import { GroupQuestionList, StatusButtonList } from './components'

export default function QuestionManagementPage() {
  const { groupId } = useParams<{ groupId: string }>()
  const [status, setStatus] = useState<QuestionStatus>('READY')

  const { data: role } = useGroupRole(Number(groupId))

  if (!groupId || role === 'MEMBER') return <ErrorPage />

  return (
    <Suspense fallback={<Loading />}>
      <GroupManagementNavigation groupId={groupId} pageName="그룹 질문 관리" />
      <Box p="30px" borderRadius="10px">
        <Text fontSize="lg" fontWeight="bold" mb="20px">
          질문 관리
        </Text>
        <StatusButtonList status={status} setStatus={setStatus} />
        <GroupQuestionList groupId={Number(groupId)} status={status} />
      </Box>
    </Suspense>
  )
}
