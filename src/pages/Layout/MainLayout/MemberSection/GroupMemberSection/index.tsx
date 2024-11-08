import { BiSolidGroup } from 'react-icons/bi'

import { Box, Flex } from '@chakra-ui/react'

import { useGrupMemberPaging } from '@/api/services/group/member.api'
import { AvatarLabelWithNavigate } from '@/components/AvatarLabel'
import { PageLayout } from '@/components/PageLayout'
import { DATA_ERROR_MESSAGES } from '@/constants/error-message'

interface GroupMemberSectionProps {
  groupId: number
}

export const GroupMemberSection = ({ groupId }: GroupMemberSectionProps) => {
  const { data } = useGrupMemberPaging({ groupId })
  const members = data?.pages.flatMap((page) => page.records)

  if (!members) throw Error(DATA_ERROR_MESSAGES.MEMBER_NOT_FOUND)

  return (
    <PageLayout.SideSection SectionHeader={<GroupMemberHeader />}>
      <Flex flexDirection="column" width="full" maxHeight="30rem">
        {members.map((member) => (
          <Box key={member.userId} paddingY={1} paddingX={2} width="full">
            <AvatarLabelWithNavigate
              isNavigate
              avatarSrc={member.memberImageUrl}
              label={member.userName}
              linkTo={`/mypage/${member.userId}`}
              tooltipLabel={`${member.userName} 페이지`}
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
