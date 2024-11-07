import { Button, Flex, useTheme } from '@chakra-ui/react'

export default function Pagination() {
  const theme = useTheme()
  const borderColor = theme.colors.brown[400]

  return (
    <Flex justifyContent="center" gap={3} marginTop="20px">
      <Button
        minWidth="32px"
        height="30px"
        padding="0"
        border={`1px solid ${borderColor}`}
        bg="none"
        color="brown.600"
        fontWeight="small"
        _hover={{ bg: 'brown.100' }}
      >
        1
      </Button>
      <Button
        minWidth="32px"
        height="30px"
        padding="0"
        fontWeight="small"
        color="white"
        bg="brown.500"
      >
        2
      </Button>
      <Button
        minWidth="32px"
        height="30px"
        padding="0"
        border={`1px solid ${borderColor}`}
        bg="none"
        color="brown.600"
        fontWeight="small"
        _hover={{ bg: 'brown.100' }}
      >
        3
      </Button>
    </Flex>
  )
}
