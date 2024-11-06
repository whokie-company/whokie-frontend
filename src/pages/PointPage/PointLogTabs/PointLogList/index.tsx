import { Card, Flex, Text } from '@chakra-ui/react'
import { format } from 'date-fns'

import { Point } from '@/types'

interface PointLogListProps {
  option?: 'ALL'
  points: Point[]
}

export const PointLogList = ({ option, points }: PointLogListProps) => {
  return (
    <Card padding={4}>
      <Flex flexDirection="column" gap={2}>
        {points.map((point) => {
          return (
            <Flex
              justifyContent="space-between"
              fontSize="small"
              key={point.id}
            >
              <Text>{format(point.createdAt, 'yyyy.MM.dd')}</Text>
              {option === 'ALL' ? (
                <Flex gap={2}>
                  <Text>{point.option === 'CHARGED' ? '적립' : '사용'}</Text>
                  <Text>{point.point}</Text>
                </Flex>
              ) : (
                <Text>{point.point}</Text>
              )}
            </Flex>
          )
        })}
      </Flex>
    </Card>
  )
}
