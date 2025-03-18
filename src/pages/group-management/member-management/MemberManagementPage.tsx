import { useParams } from 'react-router-dom'

import { useGroupInfo } from '@/api/services/group/group.api'
import { useGroupRole } from '@/api/services/group/member.api'
import { GroupManagementNavigation } from '@/components'
import { Loading } from '@/components/Loading'
import { ErrorPage } from '@/pages'
import { useUserInfoStore } from '@/stores/user-info'

import { GroupMemberTable } from './components'

export default function MemberManagementPage() {
  const { groupId } = useParams<{ groupId: string }>()
  const userId = useUserInfoStore((state) => state.userInfo?.userId)

  const { data: role, isLoading: isRoleLoading } = useGroupRole(Number(groupId))
  const { data: groupData, status: groupDataStatus } = useGroupInfo(
    Number(groupId)
  )

  if (isRoleLoading || groupDataStatus === 'pending') return <Loading />
  if (
    groupId === undefined ||
    userId === undefined ||
    !groupData ||
    role === 'MEMBER'
  )
    return <ErrorPage />

  return (
    <>
      <GroupManagementNavigation groupId={groupId} pageName="그룹 멤버 관리" />
      <GroupMemberTable
        groupId={Number(groupId)}
        myUserId={userId}
        groupName={groupData.groupName}
      />
    </>
  )
}
