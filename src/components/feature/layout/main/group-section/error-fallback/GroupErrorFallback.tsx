import { FallbackProps } from 'react-error-boundary'
import { BiErrorCircle } from 'react-icons/bi'

import { Box, Button, Center, Flex } from '@chakra-ui/react'

export const GroupErrorFallback = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  return (
    <Flex flexDirection="column">
      <Center fontSize="small" paddingY={2}>
        <Box color="primary" padding={1}>
          <BiErrorCircle />
        </Box>
        {error.message}
      </Center>
      <Flex justifyContent="center">
        <Button
          onClick={() => resetErrorBoundary()}
          height="fit-content"
          padding={2}
          fontSize="small"
          colorScheme="primary"
          variant="outline"
        >
          다시 시도하기
        </Button>
      </Flex>
    </Flex>
  )
}
