import { Suspense, useCallback, useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useSearchParams } from 'react-router-dom'

import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'

import { Loading } from '@/components/Loading'

import { CalendarSection } from './CalendarSection'
import { CookieRecordErrorFallback } from './CookieRecordErrorFallback'
import { CookieRecordHeader } from './CookieRecordHeader'
import { LogSection } from './LogSection'

const types = ['log', 'calendar'] as const
type SeacrhParamTypes = (typeof types)[number]

export default function CookieRecordPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [tabIndex, setTabIndex] = useState(0)

  const setSearchParamType = useCallback(
    (type: SeacrhParamTypes) => {
      searchParams.set('type', type)
      setSearchParams(searchParams)
    },
    [searchParams, setSearchParams]
  )

  useEffect(() => {
    const currentType = searchParams.get('type')

    if (currentType && isParamTypes(currentType)) {
      setTabIndex(types.indexOf(currentType))
      return
    }

    setTabIndex(0)
    setSearchParamType('log')
  }, [searchParams, setSearchParamType])

  return (
    <Flex flexDirection="column">
      <CookieRecordHeader />
      <Tabs
        variant="soft-rounded"
        colorScheme="secondary"
        size="sm"
        paddingTop={4}
        index={tabIndex}
        onChange={(index) => setTabIndex(index)}
      >
        <Flex justifyContent="center">
          <TabList
            background="white"
            width="fit-content"
            padding={1}
            rounded="full"
          >
            <Tab onClick={() => setSearchParamType('log')}>로그</Tab>
            <Tab onClick={() => setSearchParamType('calendar')}>캘린더</Tab>
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

function isParamTypes(param: string): param is SeacrhParamTypes {
  return true
}
