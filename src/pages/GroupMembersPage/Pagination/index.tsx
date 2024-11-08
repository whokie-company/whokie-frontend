import { Button, Flex, useTheme } from '@chakra-ui/react'

type PaginationProps = {
  page: number
  totalPages: number
  setPage: (page: number) => void
}

export default function Pagination({
  page,
  totalPages,
  setPage,
}: PaginationProps) {
  const theme = useTheme()
  const borderColor = theme.colors.brown[400]

  return (
    <Flex justifyContent="center" gap={3} marginTop="20px">
      {Array.from({ length: totalPages }, (_, index) => (
        <Button
          key={index}
          minWidth="32px"
          height="30px"
          padding="0"
          border={`1px solid ${borderColor}`}
          bg={page === index ? 'brown.500' : 'none'}
          color={page === index ? 'white' : 'brown.600'}
          fontWeight="small"
          _hover={{ bg: page === index ? 'brown.500' : 'brown.100' }}
          onClick={() => setPage(index)}
        >
          {index + 1}
        </Button>
      ))}
    </Flex>
    // <Flex justifyContent="center" gap={3} marginTop="20px">
    //   <Button
    //     minWidth="32px"
    //     height="30px"
    //     padding="0"
    //     border={`1px solid ${borderColor}`}
    //     bg="none"
    //     color="brown.600"
    //     fontWeight="small"
    //     _hover={{ bg: 'brown.100' }}
    //   >
    //     1
    //   </Button>
    //   <Button
    //     minWidth="32px"
    //     height="30px"
    //     padding="0"
    //     fontWeight="small"
    //     color="white"
    //     bg="brown.500"
    //   >
    //     2
    //   </Button>
    //   <Button
    //     minWidth="32px"
    //     height="30px"
    //     padding="0"
    //     border={`1px solid ${borderColor}`}
    //     bg="none"
    //     color="brown.600"
    //     fontWeight="small"
    //     _hover={{ bg: 'brown.100' }}
    //   >
    //     3
    //   </Button>
    // </Flex>
  )
}
