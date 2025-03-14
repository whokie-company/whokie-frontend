import { useNavigate } from 'react-router-dom'

import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@/api/instance'
import { useGroupInfo } from '@/api/services/group/group.api'
import { joinGroupMember } from '@/api/services/group/member.api'
import Cookies from '@/assets/cookies.svg'
import ErrorPage from '@/pages/ErrorPage'
import { useMemberTypeStore } from '@/stores/member-type'

interface InviteCardProps {
  groupId: number
  inviteCode: string
}

export const InviteCard = ({ groupId, inviteCode }: InviteCardProps) => {
  const navigate = useNavigate()
  const setMemberType = useMemberTypeStore((state) => state.setMemberType)

  const { data: group, status, error } = useGroupInfo(groupId)
  const { mutate } = useMutation({
    mutationFn: () => joinGroupMember(inviteCode),
    onSuccess: () => {
      navigate(`/group/${groupId}`)
      setMemberType('GROUP')
      queryClient.invalidateQueries({ queryKey: ['group', 'member', groupId] })
    },
    onError: (inviteError) => {
      throw inviteError
    },
  })

  if (status === 'pending') return <InviteCardSkeleton />

  if (error) return <ErrorPage />

  return (
    <Card paddingY={10} paddingX={32} rounded={20}>
      <Flex flexDirection="column" alignItems="center">
        <Heading color="primary" size="lg">
          {group.groupName} 그룹과 함께 해주세요
        </Heading>
        <Image src={Cookies} paddingTop={8} />
        <Flex alignItems="center" gap={2} paddingY={4}>
          <Avatar size="sm" />
          <Text>{group.groupName}</Text>
        </Flex>
        <Flex justifyContent="center" gap={3}>
          <Button
            colorScheme="primary"
            variant="outline"
            width="8rem"
            height="2.5rem"
            onClick={() => navigate('/')}
          >
            거절
          </Button>
          <Button
            colorScheme="primary"
            width="8rem"
            height="2.5rem"
            onClick={() => mutate()}
          >
            수락
          </Button>
        </Flex>
      </Flex>
    </Card>
  )
}

export const InviteCardSkeleton = () => {
  return (
    <Card paddingY={10} paddingX={32} rounded={20}>
      <Flex flexDirection="column" alignItems="center">
        <Heading color="primary" size="lg">
          로딩중...
        </Heading>
        <Image src={Cookies} paddingTop={8} />
        <Flex alignItems="center" gap={2} paddingY={4}>
          <Box width="32px" height="32px" />
        </Flex>
        <Flex justifyContent="center" gap={3}>
          <Button
            colorScheme="primary"
            variant="outline"
            width="8rem"
            height="2.5rem"
            disabled
          >
            거절
          </Button>
          <Button colorScheme="primary" width="8rem" height="2.5rem" disabled>
            수락
          </Button>
        </Flex>
      </Flex>
    </Card>
  )
}
