import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { Flex, useDisclosure } from '@chakra-ui/react'

import { useAnswerRecordPaging } from '@/api/services/answer/record.api'
import { convertToDailyCookies } from '@/api/utils/answer/convertToDailyCookies'
import { IntersectionObserverLoader } from '@/components/IntersectionObserverLoader'
import { DATA_ERROR_MESSAGES } from '@/constants/error-message'
import { useClickOutSideElement } from '@/hooks/useClickOutsideElement'
import {
  SelectedAnswer,
  useSelectedAnswerStore,
} from '@/stores/selected-answer'

import { HintDrawer } from '../HintDrawer'
import { CookieLogList } from './CookieLogList'

export const LogSection = () => {
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useAnswerRecordPaging({})
  const answerRecords = data?.pages.flatMap((page) => page.records)

  if (!answerRecords.length) {
    throw new Error(DATA_ERROR_MESSAGES.ANSWER_RECORD_NOT_FOUND)
  }

  const cookieLogs = convertToDailyCookies(answerRecords)
  const setSelectedAnswer = useSelectedAnswerStore(
    (state) => state.setSelectedAnswer
  )
  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null)
  const drawer = useDisclosure()
  const modal = useDisclosure()

  useEffect(() => {
    setPortalNode(document.getElementById('page-layout'))
  }, [])

  useClickOutSideElement(
    document.getElementById('hint-drawer'),
    drawer.onClose,
    modal.isOpen
  )

  const onClickCookieLog = (selectedAnswer: SelectedAnswer) => {
    drawer.onOpen()
    setSelectedAnswer(selectedAnswer)
  }

  return (
    <Flex flexDirection="column" alignItems="center">
      {portalNode &&
        createPortal(
          <HintDrawer isOpen={drawer.isOpen} modal={modal} />,
          portalNode
        )}
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
