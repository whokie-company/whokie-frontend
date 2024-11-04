import { Flex, Tag, Text } from '@chakra-ui/react'
import { useSuspenseQuery } from '@tanstack/react-query'

import { pointQuries } from '@/api/services/user/point.api'

export const MyPoint = () => {
  const { data: point } = useSuspenseQuery(pointQuries.point())

  return (
    <Flex justifyContent="end">
      <Tag
        background="orange.500"
        rounded="full"
        fontSize="x-small"
        color="white"
        fontWeight="bold"
        minWidth="4rem"
      >
        <Text fontWeight="bold" marginRight="6px">
          포인트
        </Text>
        <Text>{point}</Text>
      </Tag>
    </Flex>
  )
}
