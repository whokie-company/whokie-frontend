import { useState } from 'react'

import { Box, Button, Stack, Text } from '@chakra-ui/react'

export default function QuestionManagement() {
  const [status, setStatus] = useState<'READY' | 'APPROVED' | 'REJECTED'>(
    'READY'
  )

  return (
    <Box
      p="30px"
      bg="white"
      borderRadius="10px"
      backgroundColor="secondary_background"
    >
      <Text fontSize="lg" fontWeight="bold" mb="20px">
        질문 관리
      </Text>

      <Box mb="20px">
        <Stack direction="row" spacing="15px">
          <Button
            onClick={() => setStatus('READY')}
            colorScheme={status === 'READY' ? 'gray' : 'gray'}
            variant={status === 'READY' ? 'solid' : 'outline'}
            borderRadius="full"
          >
            승인 대기
          </Button>
          <Button
            onClick={() => setStatus('APPROVED')}
            colorScheme={status === 'APPROVED' ? 'green' : 'gray'}
            variant={status === 'APPROVED' ? 'solid' : 'outline'}
            borderRadius="full"
          >
            승인됨
          </Button>
          <Button
            onClick={() => setStatus('REJECTED')}
            colorScheme={status === 'REJECTED' ? 'red' : 'gray'}
            variant={status === 'REJECTED' ? 'solid' : 'outline'}
            borderRadius="full"
          >
            거절됨
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}
