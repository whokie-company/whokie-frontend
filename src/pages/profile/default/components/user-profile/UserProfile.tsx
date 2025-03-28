import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

import { MyPageItem } from '@/types'

import { UserProfileNavigation } from './navigation'

interface UserProfileProps {
  profile: MyPageItem
}

export const UserProfile = ({ profile }: UserProfileProps) => {
  return (
    <Flex flexDirection="column">
      <UserProfileNavigation userName={profile.name} />
      <Box
        height="144px"
        backgroundImage={`url('${profile.backgroundImageUrl}')`}
        backgroundSize="cover"
        backgroundPosition="center"
        position="relative"
        marginBottom="40px"
      >
        <Avatar
          src={profile.imageUrl}
          size="lg"
          position="absolute"
          bottom="-30px"
          left="30px"
        />
      </Box>
      <Text fontSize="xl" fontWeight="400" padding="0 30px">
        {profile.name}
      </Text>
      <Flex
        justifyContent="space-between"
        alignItems="end"
        gap={4}
        padding="0 30px"
      >
        <Text color="text_secondary" fontSize="md">
          {profile.description}
        </Text>
        <Text
          as="span"
          fontSize="xs"
          display="flex"
          flexDirection="row"
          gap="4.8px"
          padding="5px 9px"
          borderRadius="10px"
          border="1px solid"
          borderColor="brown.500"
        >
          <Text fontWeight="bold">TODAY</Text>
          <Text>{profile.todayVisited}</Text>
          <Text fontWeight="bold">TOTAL</Text>
          <Text>{profile.totalVisited}</Text>
        </Text>
      </Flex>
    </Flex>
  )
}
