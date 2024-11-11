import { Link } from 'react-router-dom'

import { Box, Text, useTheme } from '@chakra-ui/react'

import GoBack from '@/components/GoBack'

type NavigateProps = {
  groupId: string
}

export default function Navigate({ groupId }: NavigateProps) {
  const theme = useTheme()
  const borderColor = theme.colors.black[200]

  return (
    <Box
      height="33px"
      display="flex"
      flexDirection="row"
      borderBottom={`1px solid ${borderColor}`}
    >
      <Link to={`/group/${groupId}`}>
        <GoBack goBack />
      </Link>
      <Text height="100%" lineHeight="2" fontWeight="bold">
        그룹 멤버 관리
      </Text>
    </Box>
  )
}
