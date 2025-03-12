import { Box, Text } from '@chakra-ui/react'

import GoBack from '@/components/GoBack'

export const GroupNavigation = () => {
  return (
    <Box height="32px" display="flex" flexDirection="row">
      <GoBack goBack={false} to="/" />
      <Text height="100%" lineHeight="2" fontWeight="bold">
        그룹 페이지
      </Text>
    </Box>
  )
}
