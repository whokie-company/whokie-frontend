import { Suspense } from 'react'

import { Text } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'

import { friendsQueries } from '@/api/services/friend/queries'
import { Loading } from '@/components/Loading'

import { MainSection } from './MainSection'

export default function MainPage() {
  const { data: friends, status } = useQuery(friendsQueries.myFriends())

  if (status === 'pending') return <Loading />
  if (!friends) return <Text>친구를 초대해보세요!</Text>

  return (
    <Suspense fallback={<Loading />}>
      <MainSection friends={friends} />
    </Suspense>
  )
}
