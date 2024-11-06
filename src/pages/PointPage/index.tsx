import { Flex } from '@chakra-ui/react'

import { PageHeader } from '@/components/PageHeader'

import { ChargePointCard } from './ChargePointCard'
import { MyPointCard } from './MyPointCard'
import { PointLogTabs } from './PointLogTabs'

export default function PointPage() {
  return (
    <Flex flexDirection="column" height="full">
      <PageHeader page="포인트 관리" />
      <Flex
        flexDirection="column"
        flex={1}
        height="full"
        background="brown.200"
      >
        <Flex flexDirection="column" margin={4} gap={4}>
          <MyPointCard />
          <ChargePointCard />
        </Flex>
        <PointLogTabs />
      </Flex>
    </Flex>
  )
}
