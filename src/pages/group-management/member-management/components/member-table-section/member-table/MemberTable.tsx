import { useState } from 'react'

import {
  Box,
  Flex,
  Radio,
  RadioGroup,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { Member } from '@/types'

import { TablePagination } from './table-pagination'

type GroupMemberTableProps = {
  data: Member[]
  columns: ColumnDef<Member>[]
  leaderChangeBtn: boolean
  selectBtn: number | null
  setSelectBtn: (index: number | null) => void
  setChangeSelectId: (id: number | null) => void
  setChangeSelectName: (name: string) => void
}

export const GroupMemberTable = ({
  data,
  columns,
  leaderChangeBtn,
  selectBtn,
  setSelectBtn,
  setChangeSelectId,
  setChangeSelectName,
}: GroupMemberTableProps) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  })

  const pageNumList = Array.from(
    { length: table.getPageCount() },
    (_, i) => i + 1
  )

  return (
    <Flex
      paddingTop={3}
      flexDirection="column"
      justifyContent="space-between"
      height="100%"
      flex={1}
    >
      <Table
        borderRadius="20px"
        borderStyle="hidden"
        boxShadow="0 0 0 1px #E2E2E2"
        bg="white"
      >
        <Thead top={0}>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr borderTop="1px solid gray" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th
                  key={header.id}
                  colSpan={header.colSpan}
                  fontSize="large"
                  textAlign="center"
                >
                  {header.isPlaceholder ? null : (
                    <Box>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </Box>
                  )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id} position="relative">
              {row.getVisibleCells().map((cell) => (
                <Td textAlign="center" padding="0" key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
              {leaderChangeBtn && (
                <Td padding="0">
                  <RadioGroup
                    margin="auto"
                    marginRight={2}
                    name="changeLeader"
                    value={selectBtn !== null ? String(selectBtn) : ''}
                    onChange={() => {
                      setSelectBtn(row.original.userId)
                      setChangeSelectId(row.original.userId)
                      setChangeSelectName(row.original.userName)
                    }}
                  >
                    <Radio
                      value={String(row.original.userId)}
                      colorScheme="brown"
                      variant="outline"
                      sx={{ borderColor: 'brown.400' }}
                      isChecked={row.original.userId === selectBtn}
                    />
                  </RadioGroup>
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
      {data.length === 0 && (
        <Text fontSize="large" textAlign="center" height="full" paddingTop={4}>
          그룹 멤버가 없습니다.
        </Text>
      )}
      <TablePagination table={table} pageNumList={pageNumList} />
    </Flex>
  )
}
