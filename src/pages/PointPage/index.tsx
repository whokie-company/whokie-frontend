import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { Flex } from '@chakra-ui/react'

import { Loading } from '@/components/Loading'
import { PageHeader } from '@/components/PageHeader'

import { MyPointCard } from './MyPointCard'
import { PointLogTabs } from './PointLogTabs'
import { PurchasePointCard } from './PurchasePointCard'

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
        <Suspense fallback={<Loading />}>
          <Flex flexDirection="column" margin={4} gap={4}>
            <MyPointCard />
            <PurchasePointCard />
          </Flex>
          <PointLogTabs />
        </Suspense>
      </Flex>
      <Outlet />
    </Flex>
  )
}
