import { Suspense } from 'react'
import { useParams } from 'react-router-dom'

import { Flex } from '@chakra-ui/react'

import { useMyPageSuspense } from '@/api/services/profile/my-page.api'
import { Loading } from '@/components/Loading'
import { useMyUserIdStore } from '@/stores/my-user-id'

import { MyProfile } from './MyProfile'
import Navigate from './Navigate'
import OvenMenu from './OvenMenu'
import Ranking from './Ranking'
import { UserProfile } from './UserProfile'

export default function MyPage() {
  const { userId } = useParams<{ userId: string }>()
  const myUserId = useMyUserIdStore((state) => state.myUserId)

  return (
    <Flex flexDirection="column">
      <Navigate />
      <Suspense fallback={<Loading />}>
        <MyPageSection
          userId={Number(userId)}
          isMyPage={Number(userId) === myUserId}
        />
      </Suspense>
    </Flex>
  )
}

interface MyPageSectionProps {
  userId: number
  isMyPage: boolean
}

const MyPageSection = ({ userId, isMyPage }: MyPageSectionProps) => {
  const { data: profile } = useMyPageSuspense(userId)

  return (
    <Flex flexDirection="column">
      {isMyPage ? (
        <MyProfile profile={profile} />
      ) : (
        <UserProfile profile={profile} />
      )}
      <Ranking userId={userId} />
      <OvenMenu userId={userId} isMyPage={isMyPage} />
    </Flex>
  )
}
