import { Avatar, Button, SimpleGrid, Text, VStack } from '@chakra-ui/react'

import { Friend } from '@/types'

type ProfileGridProps = {
  profiles: Friend[]
  onClickProfile: (profileId: number) => void
}

export const ProfileGrid = ({ profiles, onClickProfile }: ProfileGridProps) => {
  const columns = profiles.length === 3 ? 3 : 2

  return (
    <SimpleGrid columns={columns} spacing={16} mb={columns === 2 ? 16 : 20}>
      {profiles.map((profile) => (
        <div key={profile.friendId}>
          <Button
            variant="ghost"
            textAlign="center"
            _hover={{ bg: 'brown.50' }}
            onClick={() => onClickProfile(profile.friendId)}
          >
            <VStack spacing={4}>
              <Avatar
                src={profile.imageUrl}
                size="lg"
                _hover={{
                  boxShadow: '0 0 0 4px rgba(210, 180, 140, 0.5)',
                }}
              />
              <Text fontSize="sm" color="text_secondary" fontWeight="300">
                {profile.name}
              </Text>
            </VStack>
          </Button>
        </div>
      ))}
    </SimpleGrid>
  )
}
