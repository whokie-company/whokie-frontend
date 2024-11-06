import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'

import { Point } from '@/types'

import { PointLogList } from './PointLogList'

export const PointLogTabs = () => {
  return (
    <Flex flex={1} height="full" background="brown.50">
      <Tabs
        variant="soft-rounded"
        width="full"
        colorScheme="secondary"
        paddingTop="1rem"
      >
        <TabList justifyContent="center" height="2rem" gap={4}>
          <Tab>전체</Tab>
          <Tab>적립</Tab>
          <Tab>사용</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <PointLogList option="ALL" points={pointData} />
          </TabPanel>
          <TabPanel>
            <PointLogList points={pointData} />
          </TabPanel>
          <TabPanel>
            <PointLogList points={pointData} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  )
}

const pointData: Point[] = [
  {
    id: 2,
    point: 5,
    option: 'CHARGED',
    createdAt: '2024-11-01',
  },
  {
    id: 3,
    point: 5,
    option: 'CHARGED',
    createdAt: '2024-11-01',
  },

  {
    id: 8,
    point: 5,
    option: 'USED',
    createdAt: '2024-11-04',
  },
]
