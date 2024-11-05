import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { BiDonateHeart, BiQuestionMark } from 'react-icons/bi'
import { Link } from 'react-router-dom'

import { Center, Flex, HStack, Text } from '@chakra-ui/react'

import { ActiveBrownBox } from '@/components/ActiveBrownBox'
import { PageLayout } from '@/components/PageLayout'
import { useAuthTokenStore } from '@/stores/auth-token'
import { useSeletedGroupStore } from '@/stores/selected-group'

import { CreateGroupButton } from './CreateGroupButton'
import { GroupErrorFallback } from './GroupErrorFallback'
import { GroupList } from './GroupList'

export const GroupSection = () => {
  const groupId = useSeletedGroupStore((state) => state.groupId)
  const setSeletedGroup = useSeletedGroupStore((state) => state.setGroupId)
  const isLoggedIn = useAuthTokenStore((state) => state.isLoggedIn())

  return (
    <PageLayout.SideSection
      SectionHeader={
        <PageLayout.SideSection.SectionHeader
          Icon={BiDonateHeart}
          title="쿠키 주기"
        />
      }
    >
      <Flex flexDirection="column" alignItems="start" gap={2}>
        <Flex flexDirection="column" width="full">
          <Text
            fontSize="small"
            color="text_description"
            paddingY={1}
            paddingX={2}
          >
            모든 친구에게
          </Text>
          <Link to="/">
            <ActiveBrownBox
              isActive={!groupId}
              onClick={() => setSeletedGroup(undefined)}
            >
              <HStack>
                <Center
                  background="primary"
                  width={7}
                  height={7}
                  rounded="full"
                >
                  <BiQuestionMark size={20} color="white" />
                </Center>
                <Text>ALL</Text>
              </HStack>
            </ActiveBrownBox>
          </Link>
        </Flex>
        <Flex flexDirection="column" width="full">
          <Text
            fontSize="small"
            color="text_description"
            paddingY={1}
            paddingX={2}
          >
            그룹 친구에게
          </Text>
          {isLoggedIn && (
            <ErrorBoundary FallbackComponent={GroupErrorFallback}>
              <Suspense fallback={<Text textAlign="center">loading...</Text>}>
                <GroupList />
              </Suspense>
            </ErrorBoundary>
          )}
        </Flex>
        <CreateGroupButton />
      </Flex>
    </PageLayout.SideSection>
  )
}

export const GroupSectionSkeleton = () => {
  return (
    <PageLayout.SideSection
      SectionHeader={
        <PageLayout.SideSection.SectionHeader
          Icon={BiDonateHeart}
          title="쿠키 주기"
        />
      }
    >
      <div />
    </PageLayout.SideSection>
  )
}
