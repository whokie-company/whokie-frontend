import { Link } from 'react-router-dom'

import { Box, Button, Text, useTheme } from '@chakra-ui/react'

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
        <Button height="100%" bg="none" _hover={{ bg: 'none' }}>
          {'<'}
        </Button>
      </Link>
      <Text height="100%" lineHeight="2" fontWeight="bold">
        그룹 멤버 관리
      </Text>
    </Box>
  )
}
