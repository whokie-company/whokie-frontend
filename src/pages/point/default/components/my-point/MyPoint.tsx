import { Card, Flex, Heading } from '@chakra-ui/react'
import { useSuspenseQuery } from '@tanstack/react-query'

import { pointQuries } from '@/api/services/user/point.api'

export const MyPoint = () => {
  const { data: point } = useSuspenseQuery(pointQuries.point())

  return (
    <Card padding={4} fontSize="small" gap={4}>
      <Flex justifyContent="space-between">
        <Heading size="small">나의 포인트</Heading>
        <Heading size="md">{point} P</Heading>
      </Flex>
    </Card>
  )
}
