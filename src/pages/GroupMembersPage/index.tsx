import { useLocation, useParams } from 'react-router-dom'

import ErrorPage from '../ErrorPage'
import MembersTable from './MembersTable'
import Navigate from './Navigate'

export default function GroupMembersPage() {
  const location = useLocation()
  const groupName = location.state?.groupName
  const role = location.state?.role
  const { groupId } = useParams<{ groupId: string }>()

  if (!role || role === 'MEMBER') return <ErrorPage />
  if (groupId === undefined) return <ErrorPage />

  return (
    <>
      <Navigate groupId={groupId} />
      <MembersTable groupId={Number(groupId)} groupName={groupName} />
    </>
  )
}
