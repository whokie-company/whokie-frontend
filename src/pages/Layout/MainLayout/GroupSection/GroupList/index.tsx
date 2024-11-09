import { useNavigate } from 'react-router-dom'

import { Flex } from '@chakra-ui/react'

import { useGroupPaging } from '@/api/services/group/group.api'
import { ActiveBrownBox } from '@/components/ActiveBrownBox'
import { AvatarLabelWithNavigate } from '@/components/AvatarLabel'
import { IntersectionObserverLoader } from '@/components/IntersectionObserverLoader'
import { DATA_ERROR_MESSAGES } from '@/constants/error-message'
import { useMemberTypeStore } from '@/stores/member-type'
import { useSelectedGroupStore } from '@/stores/selected-group'

export const GroupList = () => {
  const navigate = useNavigate()
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGroupPaging({ size: 8 })

  const selectedGroup = useSelectedGroupStore((state) => state.selectedGroup)
  const setSeletedGroup = useSelectedGroupStore(
    (state) => state.setSelectedGroup
  )
  const setMemberType = useMemberTypeStore((state) => state.setMemberType)

  const groups = data?.pages.flatMap((page) => page.groups)

  if (!groups?.length) throw new Error(DATA_ERROR_MESSAGES.GROUP_NOT_FOUND)

  return (
    <Flex flexDirection="column" width="full" overflow="scroll">
      {groups.map((group) => (
        <ActiveBrownBox
          key={group.groupId}
          isActive={
            !!selectedGroup?.groupId && selectedGroup?.groupId === group.groupId
          }
          onClick={() => {
            setSeletedGroup(group)
            setMemberType('GROUP')
          }}
        >
          <AvatarLabelWithNavigate
            isNavigate
            avatarSrc={group.groupdImageUrl}
            label={group.groupName}
            tooltipLabel={`${group.groupName} 페이지`}
            linkTo={`/group/${group.groupId}`}
            onClick={() => navigate('/')}
          />
        </ActiveBrownBox>
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
  )
}
