import { Card, Flex, Text } from '@chakra-ui/react'
import { format } from 'date-fns'

import { IntersectionObserverLoader } from '@/components/IntersectionObserverLoader'
import { Point, PointOptions } from '@/types'

enum PointOption {
  ALL = 'ALL',
  CHARGED = '구매',
  USED = '사용',
  EARN = '적립',
}

interface PointLogTabCardProps {
  option: PointOptions
  points: Point[]
  hasNextPage: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => void
}

export const PointLogTabCard = ({
  option,
  points,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: PointLogTabCardProps) => {
  if (!points.length) {
    return (
      <Card padding={4}>
        <Text fontSize="small">포인트 기록이 없습니다.</Text>
      </Card>
    )
  }

  return (
    <Card padding={4} height="16rem" overflow="scroll">
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
                  <Text fontWeight="bold">{PointOption[point.option]}</Text>
                  <Text minWidth="1.5rem" textAlign="end">
                    {point.point}
                  </Text>
                </Flex>
              ) : (
                <Text>{point.point}</Text>
              )}
            </Flex>
          )
        })}
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
    </Card>
  )
}
