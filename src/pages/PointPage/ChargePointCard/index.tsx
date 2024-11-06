import { Button, Card, Flex, Heading } from '@chakra-ui/react'

export const ChargePointCard = () => {
  return (
    <Card padding={4}>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading size="sm">포인트 충전하기</Heading>
        <Button colorScheme="primary" borderRadius={10}>
          + 1000P
        </Button>
      </Flex>
    </Card>
  )
}
