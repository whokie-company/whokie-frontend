import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { Flex } from '@chakra-ui/react'

import { Loading } from '@/components/Loading'
import { PageHeader } from '@/components/PageHeader'

import { MyPoint, PointLog, PurchasePoint } from './components'

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
            <MyPoint />
            <PurchasePoint />
          </Flex>
          <PointLog />
        </Suspense>
      </Flex>
      <Outlet />
    </Flex>
  )
}
