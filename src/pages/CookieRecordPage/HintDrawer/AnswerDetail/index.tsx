import { Flex, Tag, Text } from '@chakra-ui/react'

export const AnswerDetail = () => {
  return (
    <Flex flexDirection="column" alignItems="center" gap={2} paddingY={6}>
      <Text color="text_description">2024.09.07</Text>
      <Flex alignItems="center" gap={2}>
        <Tag
          fontSize="small"
          fontWeight="500"
          borderRadius="full"
          background="brown.200"
        >
          카테캠 2기
        </Tag>
        <Text fontSize="medium" fontWeight="bold">
          FE 숨은 고수
        </Text>
      </Flex>
    </Flex>
  )
}
