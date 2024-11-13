import { Card, Flex, Text } from '@chakra-ui/react'
import { format } from 'date-fns'

import { Point, PointOptions } from '@/types'

enum PointOption {
  ALL = 'ALL',
  CHARGED = '구매',
  USED = '사용',
  EARN = '적립',
}

interface PointLogListProps {
  option: PointOptions
  points: Point[]
}

export const PointLogList = ({ option, points }: PointLogListProps) => {
  if (!points.length) {
    return (
      <Card padding={4}>
        <Text fontSize="small">포인트 기록이 없습니다.</Text>
      </Card>
    )
  }

  return (
    <Card padding={4} height="16rem">
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
                  <Text>{PointOption[point.option]}</Text>
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
