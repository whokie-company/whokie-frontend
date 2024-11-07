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

import { useGroupInfo } from '@/api/services/group/group.api'
import Cookies from '@/assets/cookies.svg'
import ErrorPage from '@/pages/ErrorPage'

interface InviteCardProps {
  groupId: number
  inviteCode: string
}

export const InviteCard = ({ groupId, inviteCode }: InviteCardProps) => {
  const { data: group, status, error } = useGroupInfo(groupId)

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
          >
            거절
          </Button>
          <Button colorScheme="primary" width="8rem" height="2.5rem">
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
          >
            거절
          </Button>
          <Button colorScheme="primary" width="8rem" height="2.5rem">
            수락
          </Button>
        </Flex>
      </Flex>
    </Card>
  )
}
