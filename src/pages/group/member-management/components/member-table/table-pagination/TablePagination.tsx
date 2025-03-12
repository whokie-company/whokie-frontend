import { Button, Flex, useTheme } from '@chakra-ui/react'

type TablePaginationProps = {
  page: number
  totalPages: number
  setPage: (page: number) => void
}

export const TablePagination = ({
  page,
  totalPages,
  setPage,
}: TablePaginationProps) => {
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
  )
}
