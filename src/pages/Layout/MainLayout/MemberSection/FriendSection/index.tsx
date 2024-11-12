import { useNavigate } from 'react-router-dom'

import { Box, Center, Flex, Text } from '@chakra-ui/react'
import { useSuspenseQuery } from '@tanstack/react-query'

import { friendsQueries } from '@/api/services/friend/queries'
import { AvatarLabel } from '@/components/AvatarLabel'
import { PageLayout } from '@/components/PageLayout'

import { FriendHeader, FriendHeaderSkeleton } from './FriendHeader'

export const FriendSection = () => {
  const navigate = useNavigate()

  const { data: friends } = useSuspenseQuery(friendsQueries.myFriends())

  return (
    <PageLayout.SideSection SectionHeader={<FriendHeader />}>
      <Text fontSize="small" color="text_description" paddingY={1} paddingX={2}>
        친한 친구 - {friends.length}
      </Text>
      <Flex flexDirection="column" width="full" maxHeight="30rem">
        {friends.map((friend) => (
          <Box
            key={friend.friendId}
            paddingY={1.5}
            paddingX={2}
            width="full"
            _hover={{ cursor: 'pointer', background: 'brown.50' }}
            onClick={() => navigate(`/mypage/${friend.friendId}`)}
          >
            <AvatarLabel avatarSrc={friend.imageUrl} label={friend.name} />
          </Box>
        ))}
      </Flex>
    </PageLayout.SideSection>
  )
}

export const FriendSectionSkeleton = () => {
  return (
    <PageLayout.SideSection SectionHeader={<FriendHeaderSkeleton />}>
      <Center>loading...</Center>
    </PageLayout.SideSection>
  )
}
