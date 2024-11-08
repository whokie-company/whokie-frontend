import { Flex, Tag, Text } from '@chakra-ui/react'

interface MyPointProps {
  point: number
}

export const MyPoint = ({ point }: MyPointProps) => {
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
