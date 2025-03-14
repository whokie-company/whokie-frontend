import { Box, Flex, Image, Text } from '@chakra-ui/react'

import { useMyRanking } from '@/api/services/profile/my-page.api'
import cookie1 from '@/assets/cookie1.svg'
import cookie2 from '@/assets/cookie2.svg'
import cookie3 from '@/assets/cookie3.svg'
import sadCookie from '@/assets/sadCookie.svg'
import { RankingGraph } from '@/components/RankingGraph'
import { RankItem } from '@/types'

type RankingProps = {
  userId: number
}

const images = ['', cookie1, cookie2, cookie3]

export const ProfileRanking = ({ userId }: RankingProps) => {
  const { data: ranks } = useMyRanking(userId)

  const ranking: RankItem[] = ranks.map((cur) => {
    return {
      rank: cur.rank,
      count: cur.count,
      title: cur.groupName,
      subtitle: cur.question,
      imageSrc: images[cur.rank],
    }
  })

  return (
    <Box p="0 30px">
      {ranks.length ? (
        <RankingGraph rank={ranking} />
      ) : (
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
      )}
    </Box>
  )
}
