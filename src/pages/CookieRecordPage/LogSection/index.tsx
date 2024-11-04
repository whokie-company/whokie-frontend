import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { Flex, Heading, useDisclosure } from '@chakra-ui/react'
import { format } from 'date-fns'

import { useAnswerRecordPaging } from '@/api/services/answer/record.api'
import { convertToDailyCookies } from '@/api/utils/answer/convertToDailyCookies'
import { CookieLogText } from '@/components/CookieLogText'
import { IntersectionObserverLoader } from '@/components/IntersectionObserverLoader'
import { DATA_ERROR_MESSAGES } from '@/constants/error-message'
import { useClickOutSideElement } from '@/hooks/useClickOutsideElement'
import { useSelectedAnswerStore } from '@/stores/selected-answer'

import { HintDrawer } from '../HintDrawer'

export const LogSection = () => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useAnswerRecordPaging({ date: '2024-11-01' })

  const answerRecords = data?.pages.flatMap((page) => page.records)

  if (!answerRecords.length)
    throw new Error(DATA_ERROR_MESSAGES.ANSWER_RECORD_NOT_FOUND)

  const cookieLogs = convertToDailyCookies(answerRecords)

  const setSelectedAnswer = useSelectedAnswerStore(
    (state) => state.setSelectedAnswer
  )

  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null)
  const { isOpen, onClose, onOpen } = useDisclosure()

  useEffect(() => {
    setPortalNode(document.getElementById('page-layout'))
  }, [])

  useClickOutSideElement(document.getElementById('hint-drawer'), onClose)

  return (
    <Flex flexDirection="column" alignItems="center">
      {portalNode && createPortal(<HintDrawer isOpen={isOpen} />, portalNode)}
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
                onClick={() => {
                  onOpen()
                  setSelectedAnswer({
                    questionContent: cookie.questionContent,
                    createdAt: curDay.createdAt,
                    answerId: cookie.answerId,
                  })
                }}
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
