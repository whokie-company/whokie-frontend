import { Suspense } from 'react'
import { useParams } from 'react-router-dom'

import { Box, Flex } from '@chakra-ui/react'

import { useGroupInfo, useGroupRanking } from '@/api/services/group/group.api'
import { useGroupRole } from '@/api/services/group/member.api'
import { Loading } from '@/components/Loading'
import { RankingGraph } from '@/components/RankingGraph'
import ErrorPage from '@/pages/ErrorPage'

import { ExitGroupButton } from './ExitGroupButton'
import Management from './Management'
import Navigate from './Navigate'
import Profile from './Profile'
import { useRankingData } from './Ranking'

export default function GroupPage() {
  const { groupId } = useParams<{ groupId: string }>()

  if (!groupId) return <ErrorPage />

  return (
    <div>
      <Navigate />
      <Suspense fallback={<Loading />}>
        <GroupSection groupId={Number(groupId)} />
      </Suspense>
    </div>
  )
}

interface GroupSectionProps {
  groupId: number
}

const GroupSection = ({ groupId }: GroupSectionProps) => {
  const { data: rankData } = useGroupRanking({
    groupId,
  })
  const { data: groupData } = useGroupInfo(groupId)
  const { data: role } = useGroupRole(groupId)

  const rankingData = useRankingData(rankData)

  if (!groupData || !role || !rankData) return <ErrorPage />

  return (
    <Flex flexDirection="column">
      <Profile role={role} gprofile={groupData} />
      <Box p="0 30px">
        <RankingGraph rank={rankingData} />
      </Box>
      {groupId && (
        <Management
          role={role}
          groupId={groupId}
          groupName={groupData.groupName}
        />
      )}
      <ExitGroupButton
        groupName={groupData.groupName}
        groupId={groupData.groupId}
        role={role}
      />
    </Flex>
  )
}
