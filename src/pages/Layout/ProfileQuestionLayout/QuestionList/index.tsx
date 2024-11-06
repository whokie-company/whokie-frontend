import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { Box, Flex, Text } from '@chakra-ui/react'

import { useGetProfileQuestion } from '@/api/services/profile/profileQuestion.api'
import { ActiveBrownBox } from '@/components/ActiveBrownBox'
import { Loading } from '@/components/Loading'
import ErrorPage from '@/pages/ErrorPage'
import { useSelectedQuestionStore } from '@/stores/selected-question'

export const QuestionList = () => {
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(
    null
  )
  const [contextMenuPosition, setContextMenuPosition] = useState<{
    x: number
    y: number
  } | null>(null)
  const contextMenuRef = useRef<HTMLDivElement | null>(null)

  const questionId = useSelectedQuestionStore((state) => state.questionId)
  const setSelectedQuestion = useSelectedQuestionStore(
    (state) => state.setQuestionId
  )
  const setQuestionContent = useSelectedQuestionStore(
    (state) => state.setQuestionContent
  )
  const setQuestionCreatedAt = useSelectedQuestionStore(
    (state) => state.setQuestionCreatedAt
  )

  const location = useLocation()
  const userId: string = location.state?.userId.toString()

  const {
    data: questions,
    isLoading,
    error,
  } = useGetProfileQuestion(userId || '')

  const isFirstRender = useRef(true)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(e.target as Node)
      ) {
        setContextMenuPosition(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    // 첫 렌더링 시 초기 store 지정
    if (isFirstRender.current && questions && questions.length > 0) {
      setSelectedQuestion(questions[0].profileQuestionId)
      setQuestionContent(questions[0].profileQuestionContent)
      setQuestionCreatedAt(questions[0].createdAt)

      isFirstRender.current = false
    } else if (isFirstRender.current && questions?.length === 0) {
      setSelectedQuestion(undefined)
      setQuestionContent(undefined)
      setQuestionCreatedAt(undefined)
    }
  }, [
    questions,
    questionId,
    setSelectedQuestion,
    setQuestionContent,
    setQuestionCreatedAt,
  ])

  if (isLoading) return <Loading />
  if (error) return <ErrorPage />
  if (!Array.isArray(questions) || questions.length === 0)
    return (
      <Box textAlign="center" paddingTop={3}>
        생성된 질문이 없습니다!
      </Box>
    )

  const handleContextMenu = (
    e: React.MouseEvent,
    question: { profileQuestionId: number }
  ) => {
    e.preventDefault() // 우클릭 메뉴 기본 동작 막기
    setSelectedQuestionId(question.profileQuestionId)
    setContextMenuPosition({ x: e.clientX, y: e.clientY })
    // onOpen()
  }

  const handleDeleteClick = () => {
    // deleteModal.onOpen() // 삭제 확인 모달 열기
    setContextMenuPosition(null) // 컨텍스트 메뉴 닫기
  }

  return (
    <Flex
      flexDirection="column"
      alignItems="start"
      overflowY="scroll"
      maxHeight="32rem"
      gap={2}
    >
      <Flex flexDirection="column" width="full">
        {questions?.map((question) => (
          <Box
            key={question.profileQuestionId}
            onContextMenu={(e) => handleContextMenu(e, question)}
          >
            <ActiveBrownBox
              key={question.profileQuestionId}
              isActive={questionId === question.profileQuestionId}
              onClick={() => {
                setSelectedQuestion(question.profileQuestionId)
                setQuestionContent(question.profileQuestionContent)
              }}
            >
              {question.profileQuestionContent}
            </ActiveBrownBox>
          </Box>
        ))}
      </Flex>
      {/* 우클릭 컨텍스트 메뉴 */}
      {contextMenuPosition && (
        <Box
          ref={contextMenuRef}
          position="absolute"
          zIndex="10000"
          top={`${contextMenuPosition.y - 100}px`}
          left={`${contextMenuPosition.x - 30}px`}
          bg="white"
          boxShadow="md"
          padding="0.5rem"
          borderRadius="md"
          width="90px"
          textAlign="center"
          _hover={{ bg: 'secondary_background' }}
        >
          <Text
            cursor="pointer"
            onClick={handleDeleteClick}
            color="text_secondary"
          >
            삭제하기
          </Text>
        </Box>
      )}
    </Flex>
  )
}
