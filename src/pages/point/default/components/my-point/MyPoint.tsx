import { Button, Card, Flex, Heading, useDisclosure } from '@chakra-ui/react'
import { useSuspenseQuery } from '@tanstack/react-query'

import { pointQuries } from '@/api/services/user/point.api'

import { PurchasePointModal } from './purchase-modal'

export const MyPoint = () => {
  const { data: point } = useSuspenseQuery(pointQuries.point())
  const purchaseModal = useDisclosure()

  return (
    <Card padding={4} gap={4}>
      <Flex justifyContent="space-between">
        <Heading size="small">나의 포인트</Heading>
        <Heading size="md">{point} P</Heading>
      </Flex>
      <Flex justifyContent="end">
        <Button colorScheme="primary" onClick={() => purchaseModal.onOpen()}>
          충전하기
        </Button>
        <PurchasePointModal modal={purchaseModal} />
      </Flex>
    </Card>
  )
}
