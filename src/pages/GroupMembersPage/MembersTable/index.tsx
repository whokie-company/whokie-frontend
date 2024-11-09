import { useState } from 'react'

import {
  Box,
  Image,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useTheme,
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { membersManageQuries } from '@/api/services/group/member.api'
import { Loading } from '@/components/Loading'
import ErrorPage from '@/pages/ErrorPage'

import ExpelBtn from '../ExpelBtn'
import Pagination from '../Pagination'
import Title from '../Title'

type MembersTableProps = {
  groupId: number
  groupName: string
}

type MemberTable = {
  id: number
  memberImageUrl: string
  userName: string
  joinedAt: string
  isExpel?: string
  userId: number
}

export default function MembersTable({
  groupId,
  groupName,
}: MembersTableProps) {
  const theme = useTheme()
  const borderColor = theme.colors.black[300]
  const [page, setPage] = useState<number>(0)

  const { data, status, isLoading, isError } = useQuery(
    membersManageQuries.groupMembers(groupId, page)
  )

  const members = data?.members
  const totalPages = data?.totalPages
  const totalElements = data?.totalElements

  const clms: ColumnDef<MemberTable>[] = [
    {
      header: '',
      accessorKey: 'id',
      cell: ({ row, table }) => (
        <Box>
          {table.getSortedRowModel().flatRows.indexOf(row) + 1 + page * 5}
        </Box>
      ),
    },
    {
      header: '프로필',
      accessorKey: 'memberImageUrl',
      cell: ({ row }) => {
        const imageUrl = row.getValue<string>('memberImageUrl')
        return (
          <Box>
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="Profile"
                margin="auto"
                width="40px"
                height="40px"
                borderRadius="50%"
              />
            ) : (
              'No Image'
            )}
          </Box>
        )
      },
    },
    {
      header: '이름',
      accessorKey: 'userName',
    },
    {
      header: '가입일',
      accessorKey: 'joinedAt',
    },
    {
      header: '내보내기',
      accessorKey: 'isExpel',
      cell: ({ row }) => (
        <ExpelBtn
          groupId={groupId}
          userId={row.original.userId}
          userName={row.original.userName}
        />
      ),
    },
  ]

  let table = useReactTable({
    data: members,
    columns: clms,
    getCoreRowModel: getCoreRowModel(),
  })

  if (status === 'pending') return <Loading />
  if (isLoading) return <Loading />
  if (isError) return <ErrorPage />
  if (!members || !totalPages) return '멤버가 없어요!'

  return (
    <Box>
      <Title groupName={groupName} totalElements={totalElements} />
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
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </Box>
    </Box>
  )
}
