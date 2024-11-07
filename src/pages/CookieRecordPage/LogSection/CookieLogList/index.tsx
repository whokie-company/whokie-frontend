import { Flex, Heading } from '@chakra-ui/react'
import { format } from 'date-fns'

import { SelectedAnswer } from '@/stores/selected-answer'
import { DailyCookie } from '@/types'

import { CookieLogText } from '../../CookieLogText'

interface CookieLogListProps {
  cookieLogs: DailyCookie[]
  onClickCookieLog: ({
    questionContent,
    createdAt,
    answerId,
  }: SelectedAnswer) => void
}

export const CookieLogList = ({
  cookieLogs,
  onClickCookieLog,
}: CookieLogListProps) => {
  return (
    <div>
      {cookieLogs.map((curDay) => (
        <Flex
          key={format(curDay.createdAt, 'yyyy.MM.dd')}
          flexDirection="column"
          gap={1}
          paddingBottom={10}
        >
          <Flex justifyContent="center">
            <Heading size="sm">{format(curDay.createdAt, 'MM.dd')}</Heading>
          </Flex>
          <Flex flexDirection="column" gap={2}>
            {curDay.cookies.map((cookie) => (
              <CookieLogText
                key={cookie.answerId}
                logContent={cookie.questionContent}
                hintCount={cookie.hintCount}
                onClick={() =>
                  onClickCookieLog({
                    questionContent: cookie.questionContent,
                    createdAt: curDay.createdAt,
                    answerId: cookie.answerId,
                  })
                }
              />
            ))}
          </Flex>
        </Flex>
      ))}
    </div>
  )
}
