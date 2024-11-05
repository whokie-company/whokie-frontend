import { BiSolidCamera } from 'react-icons/bi'

import { Flex, Text } from '@chakra-ui/react'

export const ImageInput = () => {
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      background="black.300"
      width="5rem"
      height="5rem"
      alignItems="center"
      borderRadius="full"
      color="black.500"
      _hover={{ cursor: 'pointer' }}
    >
      <BiSolidCamera size={30} />
      <Text fontSize="small">이미지 추가</Text>
    </Flex>
  )
}
