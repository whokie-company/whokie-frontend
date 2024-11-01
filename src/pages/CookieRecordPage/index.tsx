import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'

import { Loading } from '@/components/Loading'

import { CalendarSection } from './CalendarSection'
import { CookieRecordErrorFallback } from './CookieRecordErrorFallback'
import { CookieRecordHeader } from './CookieRecordHeader'
import { LogSection } from './LogSection'

export default function CookieRecordPage() {
  return (
    <Flex flexDirection="column">
      <CookieRecordHeader />
      <Tabs
        variant="soft-rounded"
        colorScheme="secondary"
        size="sm"
        paddingTop={4}
      >
        <Flex justifyContent="center">
          <TabList
            background="white"
            width="fit-content"
            padding={1}
            rounded="full"
          >
            <Tab>로그</Tab>
            <Tab>캘린더</Tab>
          </TabList>
        </Flex>
        <TabPanels>
          <TabPanel>
            <ErrorBoundary FallbackComponent={CookieRecordErrorFallback}>
              <Suspense fallback={<Loading />}>
                <LogSection />
              </Suspense>
            </ErrorBoundary>
          </TabPanel>
          <TabPanel>
            <CalendarSection />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  )
}
