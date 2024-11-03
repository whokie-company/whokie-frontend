import { Flex, Tag, Text } from '@chakra-ui/react'

import { usePoint } from '@/api/services/user/point.api'

export const MyPoint = () => {
  const { data: point, status, error } = usePoint()

  if (status === 'pending') return <PointTag />

  if (error) throw error

  return <PointTag point={point.amount} />
}

const PointTag = ({ point }: { point?: number }) => {
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
        {point && <Text>{point}</Text>}
      </Tag>
    </Flex>
  )
}
