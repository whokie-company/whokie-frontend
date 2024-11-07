import { useParams } from 'react-router-dom'

import { Box } from '@chakra-ui/react'

import ErrorPage from '../ErrorPage'
import MembersTable from './MembersTable'
import Navigate from './Navigate'

export default function GroupMembersPage() {
  const { groupId } = useParams<{ groupId: string }>()

  if (groupId === undefined) return <ErrorPage />
  return (
    <>
      <Navigate groupId={groupId} />
      <Box padding="40px 50px 25px">
        <Box fontWeight="bold" fontSize="larger" paddingBottom="10px">
          2기 카테캠 쿠키즈
        </Box>
        <Box textAlign="end">총 9명</Box>
      </Box>
      <MembersTable />
    </>
  )
}
