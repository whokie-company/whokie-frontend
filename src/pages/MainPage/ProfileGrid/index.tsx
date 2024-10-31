import { SimpleGrid } from '@chakra-ui/react'

import { Friend } from '@/types'

import ProfileButton from '../ProfileButton'

type ProfileGridProps = {
  profiles: Friend[]
  onProfileSelect: (profileId: number) => void
}

const ProfileGrid = ({ profiles, onProfileSelect }: ProfileGridProps) => {
  const columns = profiles.length === 3 ? 3 : 2
  const marginBottom = columns === 2 ? 16 : 20

  return (
    <SimpleGrid columns={columns} spacing={16} mb={marginBottom}>
      {profiles.map((profile) => (
        <ProfileButton
          profile={profile}
          key={profile.friendId}
          onClick={() => onProfileSelect(profile.friendId)}
        />
      ))}
    </SimpleGrid>
  )
}

export default ProfileGrid
