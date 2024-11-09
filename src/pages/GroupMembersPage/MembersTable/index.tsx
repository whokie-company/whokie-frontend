import { useState } from 'react'

import {
  Box,
  Image,
  Radio,
  RadioGroup,
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
import { GroupRole } from '@/types'

import ExpelBtn from '../ExpelBtn'
import LeaderChangeBtn from '../LeaderChangeBtn'
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
  role: GroupRole
}

export default function MembersTable({
  groupId,
  groupName,
}: MembersTableProps) {
  const theme = useTheme()
  const borderColor = theme.colors.black[300]
  const [page, setPage] = useState<number>(0)
  const [leaderChangeBtn, setLeaderChangeBtn] = useState(false)
  const [selectBtn, setSelectBtn] = useState<number | null>(null)
  const [changeSelectId, setChangeSelectId] = useState<number | null>(null)
  const [changeSelectName, setChangeSelectName] = useState<string>('')

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
          userRole={row.original.role}
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

  const leader = members?.find((member) => member.role === 'LEADER')

  return (
    <Box>
      <Title groupName={groupName} totalElements={totalElements} />
      <Box padding="0 40px">
        <LeaderChangeBtn
          groupId={groupId}
          leaderChangeBtn={leaderChangeBtn}
          setLeaderChangeBtn={setLeaderChangeBtn}
          leader={{ userId: leader?.userId, userName: leader?.userName }}
          changeSelectId={changeSelectId}
          changeSelectName={changeSelectName}
        />
        <Box width="full">
          <Table
            borderRadius="20px"
            borderStyle="hidden"
            boxShadow={`0 0 0 1px ${borderColor}`}
            bg="white"
          >
            <Thead top={0} borderBottom={`1px solid ${borderColor}`}>
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
              {table.getRowModel().rows.map((row, idx) => {
                return (
                  <Tr key={row.id} position="relative">
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
                    {leaderChangeBtn && (
                      <Td padding="0">
                        <RadioGroup
                          margin="auto"
                          marginRight={2}
                          name="changeLeader"
                          value={selectBtn !== null ? String(selectBtn) : ''}
                          onChange={() => {
                            setSelectBtn(idx)
                            setChangeSelectId(row.original.userId)
                            setChangeSelectName(row.original.userName)
                          }}
                        >
                          <Radio
                            value={String(idx)}
                            colorScheme="brown"
                            variant="outline"
                            sx={{
                              borderColor: 'brown.400',
                            }}
                            isChecked={idx === selectBtn}
                          />
                        </RadioGroup>
                      </Td>
                    )}
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
