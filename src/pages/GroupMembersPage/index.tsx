import { useLocation, useParams } from 'react-router-dom'

import { useMyUserIdStore } from '@/stores/my-user-id'

import ErrorPage from '../ErrorPage'
import MembersTable from './MembersTable'
import Navigate from './Navigate'

export default function GroupMembersPage() {
  const location = useLocation()
  const groupName = location.state?.groupName
  const role = location.state?.role
  const { groupId } = useParams<{ groupId: string }>()
  const myUserId = useMyUserIdStore((state) => state.myUserId)

  if (!role || role === 'MEMBER') return <ErrorPage />
  if (groupId === undefined || myUserId === null) return <ErrorPage />

  return (
    <>
      <Navigate groupId={groupId} />
      <MembersTable
        groupId={Number(groupId)}
        groupName={groupName}
        myUserId={myUserId}
      />
    </>
  )
}
