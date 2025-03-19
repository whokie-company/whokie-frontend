import { useNavigate } from 'react-router-dom'

import { Button, Card, Flex, Heading } from '@chakra-ui/react'
import { useSuspenseQuery } from '@tanstack/react-query'

import { pointQuries } from '@/api/services/user/point.api'

export const MyPoint = () => {
  const { data: point } = useSuspenseQuery(pointQuries.point())
  const navigate = useNavigate()

  return (
    <Card padding={4} gap={4}>
      <Flex justifyContent="space-between">
        <Heading size="small">나의 포인트</Heading>
        <Heading size="md">{point} P</Heading>
      </Flex>
      <Flex justifyContent="end">
        <Button
          colorScheme="primary"
          onClick={() => navigate('/point/purchase')}
        >
          충전하기
        </Button>
      </Flex>
    </Card>
  )
}
