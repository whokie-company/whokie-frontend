import { useState } from 'react'

import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'

import { usePointRecordPaging } from '@/api/services/point/record.api'
import { PointOptions } from '@/types'

import { PointLogList } from './PointLogList'

export const PointLogTabs = () => {
  const [tabIndex, setTableIndex] = useState(0)
  const option = options[tabIndex]

  const { data } = usePointRecordPaging({ option, size: 8 })
  const points = data?.pages.flatMap((page) => page.records)

  return (
    <Flex flex={1} height="full" background="brown.50">
      <Tabs
        onChange={(index) => setTableIndex(index)}
        variant="soft-rounded"
        width="full"
        colorScheme="secondary"
        paddingTop="1rem"
      >
        <TabList justifyContent="center" height="2rem" gap={4}>
          <Tab>전체</Tab>
          <Tab>적립</Tab>
          <Tab>구매</Tab>
          <Tab>사용</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <PointLogList option={option} points={points} />
          </TabPanel>
          <TabPanel>
            <PointLogList option={option} points={points} />
          </TabPanel>
          <TabPanel>
            <PointLogList option={option} points={points} />
          </TabPanel>
          <TabPanel>
            <PointLogList option={option} points={points} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  )
}

const options: PointOptions[] = ['ALL', 'EARN', 'CHARGED', 'USED']
