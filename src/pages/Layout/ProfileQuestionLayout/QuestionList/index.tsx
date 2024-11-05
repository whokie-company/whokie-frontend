import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

import { Box, Flex } from '@chakra-ui/react'

import { useGetProfileQuestion } from '@/api/services/profile/profileQuestion.api'
import { ActiveBrownBox } from '@/components/ActiveBrownBox'
import { Loading } from '@/components/Loading'
import ErrorPage from '@/pages/ErrorPage'
import { useSelectedQuestionStore } from '@/stores/selected-question'

export const QuestionList = () => {
  const questionId = useSelectedQuestionStore((state) => state.questionId)
  const setSelectedQuestion = useSelectedQuestionStore(
    (state) => state.setQuestionId
  )
  const setQuestionContent = useSelectedQuestionStore(
    (state) => state.setQuestionContent
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
    // 첫 렌더링 시 초기 store 지정
    if (isFirstRender.current && questions && questions.length > 0) {
      setSelectedQuestion(questions[0].profileQuestionId)
      setQuestionContent(questions[0].profileQuestionContent)
      isFirstRender.current = false
    } else if (isFirstRender.current && questions?.length === 0) {
      setSelectedQuestion(undefined)
      setQuestionContent(undefined)
    }
  }, [questions, questionId, setSelectedQuestion, setQuestionContent])

  if (isLoading) return <Loading />
  if (error) return <ErrorPage />
  if (!Array.isArray(questions) || questions.length === 0)
    return (
      <Box textAlign="center" paddingTop={3}>
        생성된 질문이 없습니다!
      </Box>
    )

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
        ))}
      </Flex>
    </Flex>
  )
}
