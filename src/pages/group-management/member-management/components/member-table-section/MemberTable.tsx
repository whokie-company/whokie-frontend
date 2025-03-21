import { useState } from 'react'

import { Box, Flex, Image } from '@chakra-ui/react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'

import { groupMemberQueries } from '@/api/services/group/member.api'
import { useMyPage } from '@/api/services/profile/my-page.api'
import { Loading } from '@/components/Loading'
import { ErrorPage } from '@/pages'
import { Member } from '@/types'

import { ChangeLeaderButton } from './change-leader-button'
import { ExpelMemberButton } from './expel-member-button'
import { GroupMemberTable } from './member-table'

type GroupMemberTableSectionProps = {
  groupId: number
  myUserId: number
  groupName: string
}

export const GroupMemberTableSection = ({
  groupId,
  myUserId,
  groupName,
}: GroupMemberTableSectionProps) => {
  const [leaderChangeBtn, setLeaderChangeBtn] = useState(false)
  const [selectBtn, setSelectBtn] = useState<number | null>(null)
  const [changeSelectId, setChangeSelectId] = useState<number | null>(null)
  const [changeSelectName, setChangeSelectName] = useState<string>('')

  const {
    data: profile,
    status: profileStatus,
    isError: isProfileError,
  } = useMyPage(myUserId)

  const { data: member } = useSuspenseQuery(groupMemberQueries.list(groupId))

  if (profileStatus === 'pending') return <Loading />
  if (isProfileError) return <ErrorPage />
  if (!profile) return <ErrorPage />

  const columns: ColumnDef<Member>[] = [
    {
      header: '',
      accessorKey: 'id',
      cell: ({ row, table }) => (
        <Box>{table.getSortedRowModel().flatRows.indexOf(row) + 1}</Box>
      ),
    },
    {
      header: '프로필',
      accessorKey: 'memberImageUrl',
      cell: ({ row }) => {
        const imageUrl = row.getValue<string>('memberImageUrl')
        return (
          <Image
            src={imageUrl}
            alt="Profile"
            margin="auto"
            width="40px"
            height="40px"
            borderRadius="50%"
          />
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
        <ExpelMemberButton
          groupId={groupId}
          userId={row.original.userId}
          userName={row.original.userName}
          userRole={row.original.role}
        />
      ),
    },
  ]

  return (
    <Flex height="100%" flexDirection="column">
      <Box fontWeight="bold" fontSize="larger" padding="40px 50px 30px">
        {groupName}
      </Box>
      <Flex flex="1" padding="0 40px" flexDirection="column">
        <Box textAlign="end">총 {member.length}명</Box>
        {member.length ? (
          <ChangeLeaderButton
            groupId={groupId}
            leaderChangeBtn={leaderChangeBtn}
            setLeaderChangeBtn={setLeaderChangeBtn}
            leader={{ userId: myUserId, userName: profile.name }}
            changeSelectId={changeSelectId}
            changeSelectName={changeSelectName}
          />
        ) : null}
        <GroupMemberTable
          data={member}
          columns={columns}
          leaderChangeBtn={leaderChangeBtn}
          selectBtn={selectBtn}
          setSelectBtn={setSelectBtn}
          setChangeSelectId={setChangeSelectId}
          setChangeSelectName={setChangeSelectName}
        />
      </Flex>
    </Flex>
  )
}
