import { useParams, useSearchParams } from 'react-router-dom'

import { Flex, Heading } from '@chakra-ui/react'

import ErrorPage from '../ErrorPage'
import { InviteCard } from './InviteCard'

export default function InvitePage() {
  const groupId = useParams<{ groupId: string }>()
  const [searchParams] = useSearchParams()

  const inviteCode = searchParams.get('invite-code')
  if (!inviteCode) return <ErrorPage />

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="full"
      gap={4}
    >
      <Heading color="brown.600" size="2xl" fontWeight="800">
        Whokie 초대장
      </Heading>
      <InviteCard groupId={Number(groupId)} inviteCode={inviteCode} />
    </Flex>
  )
}
