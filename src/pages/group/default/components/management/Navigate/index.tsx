import { useParams } from 'react-router-dom'

import { Box, Text } from '@chakra-ui/react'

import GoBack from '@/components/GoBack'

export default function Navigate() {
  const { groupId } = useParams()

  return (
    <Box height="32px" display="flex" flexDirection="row">
      <GoBack goBack={false} to={`/group/${groupId}`} />
      <Text height="100%" lineHeight="2" fontWeight="bold">
        그룹 페이지
      </Text>
    </Box>
  )
}
