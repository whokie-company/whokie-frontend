import { useParams } from 'react-router-dom'

import { useGroupInfo } from '@/api/services/group/group.api'
import { useGroupRole } from '@/api/services/group/member.api'
import { Loading } from '@/components/Loading'
import { useUserInfoStore } from '@/stores/user-info'

import ErrorPage from '../ErrorPage'
import MembersTable from './MembersTable'
import Navigate from './Navigate'

export default function GroupMembersPage() {
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
      <Navigate groupId={groupId} />
      <MembersTable
        groupId={Number(groupId)}
        myUserId={userId}
        groupName={groupData.groupName}
      />
    </>
  )
}
