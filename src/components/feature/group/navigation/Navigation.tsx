import { Link } from 'react-router-dom'

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

type NavigateProps = {
  groupId: string
  pageName: string
}

export const GroupManagementNavigation = ({
  groupId,
  pageName,
}: NavigateProps) => {
  return (
    <Box
      height="33px"
      display="flex"
      flexDirection="row"
      borderBottom="1px solid black.200"
    >
      <Link to={`/group/${groupId}`}>
        <GoBack goBack />
      </Link>
      <Text height="100%" lineHeight="2" fontWeight="bold">
        {pageName}
      </Text>
    </Box>
  )
}
