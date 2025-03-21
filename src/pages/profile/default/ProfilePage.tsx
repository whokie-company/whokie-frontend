import { Suspense } from 'react'
import { useParams } from 'react-router-dom'

import { Box, Flex } from '@chakra-ui/react'

import { useMyPageSuspense } from '@/api/services/profile/my-page.api'
import { Loading } from '@/components/Loading'
import { useUserInfoStore } from '@/stores/user-info'

import { MyProfile, OvenMenu, ProfileRanking, UserProfile } from './components'

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <Flex flexDirection="column">
          <Box height="32px" />
          <Loading />
        </Flex>
      }
    >
      <ProfilePageSection />
    </Suspense>
  )
}

const ProfilePageSection = () => {
  const { userId } = useParams()
  const { data: profile } = useMyPageSuspense(Number(userId))

  const myUserId = useUserInfoStore((state) => state.userInfo?.userId)
  const isMyPage = Number(userId) === myUserId

  return (
    <Flex flexDirection="column">
      {isMyPage ? (
        <MyProfile profile={profile} />
      ) : (
        <UserProfile profile={profile} />
      )}
      <ProfileRanking userId={Number(userId)} />
      <OvenMenu
        userId={Number(userId)}
        isMyPage={isMyPage}
        userName={profile.name}
      />
    </Flex>
  )
}
