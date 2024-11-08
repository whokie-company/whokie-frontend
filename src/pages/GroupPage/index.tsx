import { useParams } from 'react-router-dom'

import { Box, Flex } from '@chakra-ui/react'

import { useGroupInfo } from '@/api/services/group/group.api'
import { Loading } from '@/components/Loading'
import { RankingGraph } from '@/components/RankingGraph'
import ErrorPage from '@/pages/ErrorPage'

import { ExitGroupButton } from './ExitGroupButton'
import Management from './Management'
import Navigate from './Navigate'
import Profile from './Profile'

const dummyRankData = [
  {
    imageSrc:
      'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg',
    title: '김아진',
    subtitle: '코드를 가장 많이 참고했던 사람',
    count: 100,
    rank: 1,
  },
  {
    imageSrc:
      'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg',
    title: '안희정',
    subtitle: '아이디어를 가장 많이 내는 사람',
    count: 80,
    rank: 2,
  },
  {
    imageSrc:
      'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg',
    title: '정솔빈',
    subtitle: '카테캠이 끝나고도 같이 프로젝트를 해보고싶은 사람',
    count: 60,
    rank: 3,
  },
]

const userRole = 'leader' // "leader" or "member"

export default function GroupPage() {
  const { groupId } = useParams<{ groupId: string }>()

  return (
    <div>
      <Navigate />
      <GroupSection groupId={Number(groupId)} />
    </div>
  )
}

interface GroupSectionProps {
  groupId: number
}

const GroupSection = ({ groupId }: GroupSectionProps) => {
  const { data: groupData, error, status } = useGroupInfo(groupId)

  if (status === 'pending') return <Loading />
  if (error) return <ErrorPage />
  if (!groupData) return <ErrorPage />

  return (
    <Flex flexDirection="column">
      <Profile role={userRole} gprofile={groupData} />
      <Box p="0 30px">
        <RankingGraph rank={dummyRankData} />
      </Box>
      {groupId && <Management role={userRole} groupId={Number(groupId)} />}
      <ExitGroupButton
        groupName={groupData.groupName}
        groupId={groupData.groupId}
      />
    </Flex>
  )
}
