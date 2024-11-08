import { Suspense, useState } from 'react'

import { Text } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'

import { friendsQueries } from '@/api/services/friend/queries'
import { Loading } from '@/components/Loading'

import { MainSection } from './MainSection'
import { ReadySection } from './ReadySection'
import { ReplaySection } from './Replaysection'

type PlayType = 'READY' | 'REPLAY' | 'PLAY'

export default function MainPage() {
  const [play, setPlay] = useState<PlayType>('READY')
  const { data: friends, status } = useQuery(friendsQueries.myFriends())

  if (status === 'pending') return <Loading />
  if (!friends) return <Text>친구를 초대해보세요!</Text>

  if (play === 'READY') {
    return <ReadySection onClickPlay={() => setPlay('PLAY')} />
  }

  if (play === 'REPLAY') {
    return (
      <ReplaySection
        onClickEndButton={() => setPlay('READY')}
        onClickReplayButton={() => setPlay('PLAY')}
      />
    )
  }

  return (
    <Suspense fallback={<Loading />}>
      <MainSection friends={friends} onFinsihGame={() => setPlay('REPLAY')} />
    </Suspense>
  )
}
