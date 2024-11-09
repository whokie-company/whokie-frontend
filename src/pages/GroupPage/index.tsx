import { Suspense } from 'react'
import { useParams } from 'react-router-dom'

import { Box, Flex, Image, Text } from '@chakra-ui/react'

import { useGroupInfo, useGroupRanking } from '@/api/services/group/group.api'
import { useGroupRole } from '@/api/services/group/member.api'
import sadCookie from '@/assets/sadCookie.svg'
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

  const rankLength = rankingData.length === 0

  return (
    <Flex flexDirection="column">
      <Profile role={role} gprofile={groupData} />
      {rankLength ? (
        <Flex justifyContent="center" textAlign="center" margin="50px auto">
          <Image src={sadCookie} />
          <Box alignContent="center" marginLeft={10}>
            <Text color="text" fontWeight="500">
              아직
              <Text as="span" color="orange.600">
                &nbsp;랭킹
              </Text>
              이 없어요!
            </Text>
            <Text color="text_secondary" fontSize="small">
              친구와 함께 쿠키 주기에 참여해보세요
            </Text>
          </Box>
        </Flex>
      ) : (
        <Box p="0 30px">
          <RankingGraph rank={rankingData} />
        </Box>
      )}
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
