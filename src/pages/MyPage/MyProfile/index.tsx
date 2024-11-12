import { BiCheckCircle } from 'react-icons/bi'

import { Flex, Text, useDisclosure } from '@chakra-ui/react'
import { useSuspenseQuery } from '@tanstack/react-query'

import { pointQuries } from '@/api/services/user/point.api'
import { AlertModal } from '@/components/Modal/AlertModal'
import { PointButton } from '@/components/PointButton'
import { MyPageItem } from '@/types'

import { ProfileForm } from './ProfileForm'
import { ProfileImage } from './ProfileImage'
import { VisitedTag } from './VisitedTag'

interface MyProfileProps {
  profile: MyPageItem
}

export const MyProfile = ({ profile }: MyProfileProps) => {
  const successAlert = useDisclosure()

  const { data: point } = useSuspenseQuery(pointQuries.point())

  return (
    <Flex flexDirection="column">
      <ProfileImage
        profileImage={profile.imageUrl}
        backgroundImage={profile.backgroundImageUrl}
      />
      <Flex alignItems="center" gap="8px" padding="0 30px">
        <Text fontSize="xl" fontWeight="400">
          {profile.name}
        </Text>
        <PointButton point={point} />
      </Flex>
      <Flex
        justifyContent="space-between"
        alignItems="end"
        gap={4}
        padding="0 30px"
      >
        <ProfileForm description={profile.description} />
        <VisitedTag today={profile.todayVisited} total={profile.totalVisited} />
      </Flex>
      <AlertModal
        isOpen={successAlert.isOpen}
        onClose={() => {
          successAlert.onClose()
        }}
        icon={<BiCheckCircle />}
        title="한 줄 소개를 수정하였습니다"
        description=""
      />
    </Flex>
  )
}
