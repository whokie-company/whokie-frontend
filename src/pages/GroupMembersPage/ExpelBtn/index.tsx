import { Button } from '@chakra-ui/react'

export default function ExpelBtn() {
  return (
    <Button
      color="white"
      bg="orange.500"
      width="100px"
      height="35px"
      margin="5px 0"
      _hover={{ bg: 'orange' }}
    >
      내보내기
    </Button>
  )
}
