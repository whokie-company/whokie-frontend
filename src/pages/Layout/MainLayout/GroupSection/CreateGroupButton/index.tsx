import { BiSolidPlusCircle } from 'react-icons/bi'
import { Link } from 'react-router-dom'

import { Box, Button, Text } from '@chakra-ui/react'

export const CreateGroupButton = () => {
  return (
    <Link to="/group/create">
      <Button
        colorScheme="secondary"
        width="full"
        position="absolute"
        bottom={0}
        borderRadius={0}
        justifyContent="start"
        paddingLeft={0}
      >
        <Box marginX={1.5} padding={0} color="primary_background">
          <BiSolidPlusCircle size={22} />
        </Box>
        <Text fontWeight="bold" color="text">
          그룹 추가하기
        </Text>
      </Button>
    </Link>
  )
}
