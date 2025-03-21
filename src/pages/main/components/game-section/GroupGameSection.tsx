import { Link } from 'react-router-dom'

import { Button, Flex, Heading } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'

import { groupMemberQueries } from '@/api/services/group/member.api'
import { Loading } from '@/components/Loading'

import { GroupMain } from './group-main'

interface GroupGameSectionProps {
  groupId: number
  handleFinishGame: () => void
  handleClickProfile: () => void
}

export const GroupGameSection = ({
  groupId,
  handleFinishGame,
  handleClickProfile,
}: GroupGameSectionProps) => {
  const {
    data: members,
    status,
    error,
  } = useQuery(groupMemberQueries.list(groupId))

  if (status === 'pending') return <Loading />

  if (error) throw error

  if (!members.length)
    return (
      <Flex
        flexDirection="column"
        justifyContent="center"
        textAlign="center"
        gap={5}
      >
        <Heading size="lg">그룹 멤버가 없습니다😢</Heading>
        <Heading size="md">그룹 페이지에서 멤버를 초대해보세요!</Heading>
        <Link to={`/group/${groupId}`}>
          <Button colorScheme="primary" width="full" height="2.5rem">
            그룹 페이지로 이동하기
          </Button>
        </Link>
      </Flex>
    )

  return (
    <GroupMain
      groupId={groupId}
      members={members}
      onFinsihGame={handleFinishGame}
      onClickProfile={handleClickProfile}
    />
  )
}
