import { Box } from '@chakra-ui/react'

import { useMyRanking } from '@/api/services/profile/my-page.api'
import cookie1 from '@/assets/cookie1.svg'
import cookie2 from '@/assets/cookie2.svg'
import cookie3 from '@/assets/cookie3.svg'
import { Loading } from '@/components/Loading'
import { RankingGraph } from '@/components/RankingGraph'
import ErrorPage from '@/pages/ErrorPage'

type RankingProps = {
  userId: string
}

export default function Ranking({ userId }: RankingProps) {
  const {
    data: ranks,
    isLoading: isLoadingRanks,
    isError: ranksError,
  } = useMyRanking(userId)

  if (ranksError) return <Loading />
  if (isLoadingRanks) return <ErrorPage />
  if (!ranks) return <Box textAlign="center">아직 선택되지 않았어요</Box>
  if (!userId) return <ErrorPage />

  const ranksWithImages = ranks.map((rankItem) => {
    let imageSrc = ''

    if (rankItem.rank === 1) imageSrc = cookie1
    if (rankItem.rank === 2) imageSrc = cookie2
    if (rankItem.rank === 3) imageSrc = cookie3

    return { ...rankItem, imageSrc }
  })

  return (
    <Box p="0 30px">
      <RankingGraph rank={ranksWithImages} />
    </Box>
  )
}
