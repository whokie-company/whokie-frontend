import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { Flex, Heading, useDisclosure } from '@chakra-ui/react'
import { format } from 'date-fns'

import { useAnswerRecordPaging } from '@/api/services/answer/record-paging/useAnswerRecordPaging'
import { convertToDailyCookies } from '@/api/utils/answer/convertToDailyCookies'
import { CookieLogText } from '@/components/CookieLogText'
import { IntersectionObserverLoader } from '@/components/IntersectionObserverLoader'
import { useClickOutSideElement } from '@/hooks/useClickOutsideElement'
import { useSelectedAnswerStore } from '@/stores/selected-answer'

import { HintDrawer } from '../HintDrawer'

export const LogSection = () => {
  const { answerRecords, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useAnswerRecordPaging({})
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
