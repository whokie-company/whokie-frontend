import { Button, Flex, useTheme } from '@chakra-ui/react'
import { Table } from '@tanstack/react-table'

import { Member } from '@/types'

type TablePaginationProps = {
  pageNumList: number[]
  table: Table<Member>
}

export const TablePagination = ({
  pageNumList,
  table,
}: TablePaginationProps) => {
  const theme = useTheme()
  const borderColor = theme.colors.brown[400]

  return (
    <Flex justifyContent="center" gap={3} marginBottom={12}>
      {pageNumList.map((pageNum) => {
        const isActive = pageNum === table.getState().pagination.pageIndex + 1

        return (
          <Button
            key={pageNum}
            minWidth="32px"
            height="30px"
            padding="0"
            border={`1px solid ${borderColor}`}
            bg={isActive ? 'brown.500' : 'none'}
            color={isActive ? 'white' : 'brown.600'}
            fontWeight="small"
            _hover={{ bg: isActive ? 'brown.500' : 'brown.100' }}
            onClick={() => table.setPageIndex(pageNum - 1)}
          >
            {pageNum}
          </Button>
        )
      })}
    </Flex>
  )
}
