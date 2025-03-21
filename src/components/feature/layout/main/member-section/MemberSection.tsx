import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { useAuthTokenStore } from '@/stores/auth-token'
import { useMemberTypeStore } from '@/stores/member-type'
import { useSelectedGroupStore } from '@/stores/selected-group'
import { useUserInfoStore } from '@/stores/user-info'

import { MemberErrorFallback } from './error-fallback'
import { FriendSection, FriendSectionSkeleton } from './friend-section'
import { GroupMemberSection, GroupMemberSkeleton } from './group-member-section'
import {
  SelectFreindSectionSkeleton,
  SelectFriendSection,
} from './select-friend-section'

export const MemberSection = () => {
  const memberType = useMemberTypeStore((state) => state.memberType)
  const isLoggedIn = useAuthTokenStore((state) => state.isLoggedIn())
  const selectedGroup = useSelectedGroupStore((state) => state.selectedGroup)
  const myUserId = useUserInfoStore((state) => state.userInfo?.userId)

  if (!isLoggedIn || !myUserId)
    return <FriendSectionSkeleton message="로그인 후 이용해주세요." />

  if (memberType === 'KAKAO') {
    return (
      <ErrorBoundary FallbackComponent={MemberErrorFallback}>
        <Suspense fallback={<SelectFreindSectionSkeleton />}>
          <SelectFriendSection />
        </Suspense>
      </ErrorBoundary>
    )
  }

  if (memberType === 'GROUP' && selectedGroup?.groupId) {
    return (
      <ErrorBoundary FallbackComponent={MemberErrorFallback}>
        <Suspense fallback={<GroupMemberSkeleton />}>
          <GroupMemberSection
            groupId={selectedGroup.groupId}
            myUserId={myUserId}
          />
        </Suspense>
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary FallbackComponent={MemberErrorFallback}>
      <Suspense fallback={<FriendSectionSkeleton />}>
        <FriendSection />
      </Suspense>
    </ErrorBoundary>
  )
}
