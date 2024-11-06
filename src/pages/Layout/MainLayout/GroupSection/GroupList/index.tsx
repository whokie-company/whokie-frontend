import { Flex } from '@chakra-ui/react'

import { useGroupPaging } from '@/api/services/group/group.api'
import { ActiveBrownBox } from '@/components/ActiveBrownBox'
import { AvatarLabelWithNavigate } from '@/components/AvatarLabel'
import { IntersectionObserverLoader } from '@/components/IntersectionObserverLoader'
import { DATA_ERROR_MESSAGES } from '@/constants/error-message'
import { useSeletedGroupStore } from '@/stores/selected-group'

export const GroupList = () => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGroupPaging({})

  const groupId = useSeletedGroupStore((state) => state.groupId)
  const setSeletedGroup = useSeletedGroupStore((state) => state.setGroupId)

  const groups = data?.pages.flatMap((page) => page.groups)

  if (!groups?.length) throw new Error(DATA_ERROR_MESSAGES.GROUP_NOT_FOUND)

  return (
    <Flex flexDirection="column" width="full">
      {groups.map((group) => (
        <ActiveBrownBox
          key={group.groupId}
          isActive={!!groupId && groupId === group.groupId}
          onClick={() => setSeletedGroup(group.groupId)}
        >
          <AvatarLabelWithNavigate
            isNavigate
            avatarSrc={group.groupdImageUrl}
            label={group.groupName}
            tooltipLabel={`${group.groupName} 페이지`}
            linkTo="/"
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
