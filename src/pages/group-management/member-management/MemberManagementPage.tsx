import { useParams } from 'react-router-dom'

import { Flex } from '@chakra-ui/react'
import { useSuspenseQuery } from '@tanstack/react-query'

import { groupQueries } from '@/api/services/group/group.api'
import { groupMemberQueries } from '@/api/services/group/member.api'
import { GroupManagementNavigation } from '@/components'
import { ErrorPage } from '@/pages'
import { useUserInfoStore } from '@/stores/user-info'

import { GroupMemberTable } from './components'

export default function MemberManagementPage() {
  const userId = useUserInfoStore((state) => state.userInfo?.userId)
  const { groupId } = useParams<{ groupId: string }>()

  const { data: role } = useSuspenseQuery(
    groupMemberQueries.myRole(Number(groupId))
  )
  const { data: group } = useSuspenseQuery(groupQueries.info(Number(groupId)))

  if (userId === undefined || groupId === undefined) return <ErrorPage />
  if (role === 'MEMBER') return <ErrorPage />

  return (
    <Flex height="100%" flexDirection="column">
      <GroupManagementNavigation groupId={groupId} pageName="그룹 멤버 관리" />
      <GroupMemberTable
        groupId={Number(groupId)}
        myUserId={userId}
        groupName={group.groupName}
      />
    </Flex>
  )
}
