import { useMemo } from 'react'

import {
  Box,
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useTheme,
} from '@chakra-ui/react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import Pagination from '../Pagination'

export default function MembersTable() {
  const theme = useTheme()
  const borderColor = theme.colors.black[300]
  const list = useMemo(
    () => [
      {
        id: 1,
        profile: 'image',
        name: 'John Doe',
        createdAt: '2024.09.01',
        isExpel: '내보내기',
      },
      {
        id: 2,
        profile: 'image',
        name: 'Jane Smith',
        createdAt: '2024.09.01',
        isExpel: '내보내기',
      },
      {
        id: 3,
        profile: 'image',
        name: 'Jane Smith',
        createdAt: '2024.09.01',
        isExpel: '내보내기',
      },
      {
        id: 4,
        profile: 'image',
        name: 'Jane Smith',
        createdAt: '2024.09.01',
        isExpel: '내보내기',
      },
      {
        id: 5,
        profile: 'image',
        name: 'Jane Smith',
        createdAt: '2024.09.01',
        isExpel: '내보내기',
      },
    ],
    []
  )

  const clms = useMemo<
    ColumnDef<{
      id: number
      profile: string
      name: string
      createdAt: string
      isExpel: string
    }>[]
  >(
    () => [
      {
        header: '',
        accessorKey: 'id',
      },
      {
        header: '프로필',
        accessorKey: 'profile',
      },
      {
        header: '이름',
        accessorKey: 'name',
      },
      {
        header: '가입일',
        accessorKey: 'createdAt',
      },
      {
        header: '내보내기',
        accessorKey: 'isExpel',
        cell: ({ cell }) => (
          <Button
            color="white"
            bg="orange.500"
            width="100px"
            height="35px"
            margin="5px 0"
            _hover={{ bg: 'orange' }}
          >
            내보내기
          </Button>
        ),
      },
    ],
    []
  )

  const table = useReactTable({
    data: list,
    columns: clms,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Box padding="0 40px">
      <Box width="full">
        <Table
          borderRadius="20px"
          borderStyle="hidden"
          boxShadow={`0 0 0 1px ${borderColor}`}
          bg="white"
        >
          <Thead top={0}>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr borderTop="1px solid gray" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Th
                      borderBottom={`1px solid ${borderColor}`}
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
                  )
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <Td
                        textAlign="center"
                        borderBottom={`1px solid ${borderColor}`}
                        padding="0"
                        key={cell.id}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    )
                  })}
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </Box>
      <Pagination />
    </Box>
  )
}
