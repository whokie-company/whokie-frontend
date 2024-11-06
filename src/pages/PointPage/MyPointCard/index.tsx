import { Card, Flex, Heading, Text } from '@chakra-ui/react'

export const MyPointCard = () => {
  return (
    <Card padding={4} fontSize="small" gap={4}>
      <Flex justifyContent="space-between">
        <Heading size="small">나의 포인트</Heading>
        <Heading size="md">200 P</Heading>
      </Flex>
      <Flex justifyContent="space-between">
        <Text>이벤트 포인트</Text>
        <Text>200 P</Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text>현금성 포인트</Text>
        <Text>0 P</Text>
      </Flex>
    </Card>
  )
}
