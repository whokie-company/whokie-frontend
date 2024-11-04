import { Flex, Heading } from '@chakra-ui/react'
import { format } from 'date-fns'

import { useAnswerRecordPaging } from '@/api/services/answer/record.api'
import { convertToDailyCookies } from '@/api/utils/answer/convertToDailyCookies'
import { CookieLogText } from '@/components/CookieLogText'
import { IntersectionObserverLoader } from '@/components/IntersectionObserverLoader'
import { DATA_ERROR_MESSAGES } from '@/constants/error-message'

export const LogSection = () => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useAnswerRecordPaging({})

  const answerRecords = data?.pages.flatMap((page) => page.records)

  if (!answerRecords.length)
    throw new Error(DATA_ERROR_MESSAGES.ANSWER_RECORD_NOT_FOUND)

  const cookieLogs = convertToDailyCookies(answerRecords)

  return (
    <Flex flexDirection="column" alignItems="center">
      {cookieLogs.map((today) => (
        <Flex
          key={format(today.createdAt, 'yyyy.MM.dd')}
          flexDirection="column"
          gap={1}
          paddingBottom={10}
        >
          <Flex justifyContent="center">
            <Heading size="sm">{format(today.createdAt, 'MM.dd')}</Heading>
          </Flex>
          <Flex flexDirection="column" gap={2}>
            {today.cookies.map((cookie) => (
              <CookieLogText
                key={cookie.answerId}
                logContent={cookie.questionContent}
                hintCount={cookie.hintCount}
              />
            ))}
          </Flex>
        </Flex>
      ))}
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
  )
}
