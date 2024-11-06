import { Card, Flex, Heading } from '@chakra-ui/react'

import { PointModal } from './PointModal'

export const PurchasePointCard = () => {
  return (
    <Card padding={4}>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading size="sm">포인트 충전하기</Heading>
        <PointModal />
      </Flex>
    </Card>
  )
}
