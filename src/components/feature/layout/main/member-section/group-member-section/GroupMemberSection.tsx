import { BiSolidGroup } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import { Box, Flex } from '@chakra-ui/react'

import { useGrupMemberPagingSuspense } from '@/api/services/group/member.api'
import { AvatarLabel } from '@/components/AvatarLabel'
import { IntersectionObserverLoader } from '@/components/IntersectionObserverLoader'
import { PageLayout } from '@/components/PageLayout'
import { useMembersLengthStore } from '@/stores/members-length'

interface GroupMemberSectionProps {
  groupId: number
}

export const GroupMemberSection = ({ groupId }: GroupMemberSectionProps) => {
  const navigate = useNavigate()

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGrupMemberPagingSuspense({ groupId, size: 10 })
  const members = data?.pages.flatMap((page) => page.records)
  const membersLength = (data?.pages[0]?.records?.length ?? 0) - 1

  const setMembersLength = useMembersLengthStore(
    (state) => state.setMembersLength
  )

  setMembersLength(membersLength)

  return (
    <PageLayout.SideSection SectionHeader={<GroupMemberHeader />}>
      <Flex flexDirection="column" width="full" maxHeight="30rem">
        {members.map((member) => (
          <Box
            key={member.userId}
            paddingY={1.5}
            paddingX={2}
            width="full"
            _hover={{ cursor: 'pointer', background: 'brown.50' }}
            onClick={() => navigate(`/mypage/${member.userId}`)}
          >
            <AvatarLabel
              avatarSrc={member.memberImageUrl}
              label={member.userName}
            />
          </Box>
        ))}
        {hasNextPage && (
          <IntersectionObserverLoader
            callback={() => {
              if (!isFetchingNextPage) {
                fetchNextPage()
              }
            }}
          />
        )}
      </Flex>
    </PageLayout.SideSection>
  )
}

export const GroupMemberHeader = () => {
  return (
    <PageLayout.SideSection.SectionHeader
      Icon={BiSolidGroup}
      title="그룹 멤버"
    />
  )
}

export const GroupMemberSkeleton = () => {
  return (
    <PageLayout.SideSection SectionHeader={<GroupMemberHeader />}>
      <div />
    </PageLayout.SideSection>
  )
}
