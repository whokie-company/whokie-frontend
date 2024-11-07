import { useEffect } from 'react'

import { Flex } from '@chakra-ui/react'

import { useAnswerRecordPaging } from '@/api/services/answer/record.api'
import { convertToDailyCookies } from '@/api/utils/answer/convertToDailyCookies'
import { IntersectionObserverLoader } from '@/components/IntersectionObserverLoader'
import { DATA_ERROR_MESSAGES } from '@/constants/error-message'
import {
  SelectedAnswer,
  useSelectedAnswerStore,
} from '@/stores/selected-answer'
import { Modal } from '@/types'

import { CookieLogList } from '../../LogSection/CookieLogList'

interface MonthlyCookieLogListProps {
  hintDrawer: Modal
  curMonth: string
  setCookieDays: (days: Date[]) => void
}

export const MonthlyCookieLogList = ({
  hintDrawer,
  curMonth,
  setCookieDays,
}: MonthlyCookieLogListProps) => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useAnswerRecordPaging({ date: curMonth })

  const answerRecords = data?.pages.flatMap((page) => page.records)

  if (!answerRecords.length) {
    throw new Error(DATA_ERROR_MESSAGES.ANSWER_RECORD_NOT_FOUND)
  }

  const cookieLogs = convertToDailyCookies(answerRecords)
  const cookieDays = cookieLogs.map((cur) => cur.createdAt)

  useEffect(() => {
    setCookieDays(cookieDays)
  }, [cookieDays, setCookieDays])

  const setSelectedAnswer = useSelectedAnswerStore(
    (state) => state.setSelectedAnswer
  )

  const onClickCookieLog = (selectedAnswer: SelectedAnswer) => {
    hintDrawer.onOpen()
    setSelectedAnswer(selectedAnswer)
  }
  return (
    <Flex paddingTop={10} flexDirection="column" alignItems="center">
      <CookieLogList
        cookieLogs={cookieLogs}
        onClickCookieLog={onClickCookieLog}
      />
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
