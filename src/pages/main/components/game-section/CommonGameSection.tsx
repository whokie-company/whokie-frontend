import { Text } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'

import { friendsQueries } from '@/api/services/friend/queries'
import { Loading } from '@/components/Loading'

import { CommonMain } from './common-main'

interface CommonGameSectionProps {
  handleFinishGame: () => void
  handleClickProfile: () => void
}

export const CommonGameSection = ({
  handleFinishGame,
  handleClickProfile,
}: CommonGameSectionProps) => {
  const { data: friends, status } = useQuery(friendsQueries.myFriends())

  if (status === 'pending') return <Loading />
  if (!friends) return <Text>친구를 초대해보세요!</Text>

  return (
    <CommonMain
      friends={friends}
      onFinsihGame={handleFinishGame}
      onClickProfile={handleClickProfile}
    />
  )
}
