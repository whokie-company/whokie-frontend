import { BiSolidGroup } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import { Box, Flex } from '@chakra-ui/react'
import { useSuspenseQuery } from '@tanstack/react-query'

import { groupMemberQueries } from '@/api/services/group/member.api'
import { useMyPageSuspense } from '@/api/services/profile/my-page.api'
import { AvatarLabel } from '@/components/AvatarLabel'
import { PageLayout } from '@/components/PageLayout'
import { useMembersLengthStore } from '@/stores/members-length'

interface GroupMemberSectionProps {
  groupId: number
  myUserId: number
}

export const GroupMemberSection = ({
  groupId,
  myUserId,
}: GroupMemberSectionProps) => {
  const navigate = useNavigate()

  const { data: myInfo } = useMyPageSuspense(myUserId)
  const { data: members } = useSuspenseQuery(groupMemberQueries.list(groupId))

  const setMembersLength = useMembersLengthStore(
    (state) => state.setMembersLength
  )

  setMembersLength(members.length)

  return (
    <PageLayout.SideSection SectionHeader={<GroupMemberHeader />}>
      <Flex
        flexDirection="column"
        width="full"
        maxHeight="32rem"
        overflow="scroll"
      >
        <Box
          paddingY={1.5}
          paddingX={2}
          width="full"
          _hover={{ cursor: 'pointer', background: 'brown.50' }}
          onClick={() => navigate(`/mypage/${myUserId}`)}
        >
          <AvatarLabel avatarSrc={myInfo.imageUrl} label={myInfo.name} />
        </Box>
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
