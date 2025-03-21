import { Box, Text } from '@chakra-ui/react'

import GoBack from '@/components/GoBack'

interface UserProfileNavigationProps {
  userName: string
}

export const UserProfileNavigation = ({
  userName,
}: UserProfileNavigationProps) => {
  return (
    <Box height="32px" display="flex" flexDirection="row">
      <GoBack goBack={false} />
      <Text height="100%" lineHeight="2" fontWeight="bold">
        {userName}
      </Text>
    </Box>
  )
}
