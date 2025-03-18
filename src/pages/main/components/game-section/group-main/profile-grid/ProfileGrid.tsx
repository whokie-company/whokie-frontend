import { Avatar, Button, SimpleGrid, Text, VStack } from '@chakra-ui/react'

import { Member } from '@/types'

type ProfileGridProps = {
  profiles: Member[]
  onClickProfile: (profileId: number) => void
}

export const ProfileGrid = ({ profiles, onClickProfile }: ProfileGridProps) => {
  const columns = profiles.length === 3 ? 3 : 2

  return (
    <SimpleGrid columns={columns} spacing={16} mb={columns === 2 ? 16 : 20}>
      {profiles.map((profile) => (
        <div key={profile.userId}>
          <Button
            variant="ghost"
            textAlign="center"
            _hover={{ bg: 'brown.50' }}
            onClick={() => onClickProfile(profile.userId)}
          >
            <VStack spacing={4}>
              <Avatar
                src={profile.memberImageUrl}
                size="lg"
                _hover={{
                  boxShadow: '0 0 0 4px rgba(210, 180, 140, 0.5)',
                }}
              />
              <Text fontSize="sm" color="text_secondary" fontWeight="300">
                {profile.userName}
              </Text>
            </VStack>
          </Button>
        </div>
      ))}
    </SimpleGrid>
  )
}
