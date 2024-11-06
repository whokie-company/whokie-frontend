// components/WriteReply.tsx
import { Button, Flex, Textarea } from '@chakra-ui/react'

export default function WriteReply() {
  return (
    <Flex
      bg="white"
      padding="0 5px"
      flexDirection="column"
      justifyContent="space-evenly"
      borderLeft="0.5px solid"
      borderLeftColor="brown.400"
      marginTop="auto"
    >
      <Textarea
        width="100%"
        height="auto"
        variant="unstyled"
        padding="0"
        margin="5px"
        placeholder="메시지 입력"
      />
      <Flex justifyContent="end" height="29px" margin="14px 0">
        <Button
          marginRight="15px"
          borderRadius={20}
          width="90px"
          height="30px"
          bg="brown.400"
          fontSize="small"
          _hover={{ boxShadow: 'md' }}
          _active={{ bg: 'brown.500' }}
        >
          전송
        </Button>
      </Flex>
    </Flex>
  )
}
