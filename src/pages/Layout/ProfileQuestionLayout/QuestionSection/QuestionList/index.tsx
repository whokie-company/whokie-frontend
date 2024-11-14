import { useEffect, useRef, useState } from 'react'
import { BiError, BiTrash } from 'react-icons/bi'

import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@/api/instance'
import {
  DeleteProfileQuestionRequest,
  deleteProfileQuestion,
} from '@/api/services/profile/profile-question.api'
import { ActiveBrownBox } from '@/components/ActiveBrownBox'
import { Loading } from '@/components/Loading'
import { AlertModal } from '@/components/Modal/AlertModal'
import { ConfirmModal } from '@/components/Modal/ConfirmModal'
import {
  SelectedQuestion,
  useSelectedQuestionStore,
} from '@/stores/selected-question'
import { QuestionItem } from '@/types'

interface QuestionListProps {
  isMyPage: boolean
  userId: number
  questions: QuestionItem[]
}

const QuestionList = ({ isMyPage, userId, questions }: QuestionListProps) => {
  const [contextMenuPosition, setContextMenuPosition] = useState<{
    x: number
    y: number
  } | null>(null)
  const contextMenuRef = useRef<HTMLDivElement | null>(null)
  const deleteAlert = useDisclosure()
  const errorAlert = useDisclosure()

  const { selectedQuestion, setSelectedQuestion } = useSelectedQuestionStore()
  const adjustedXPosition = contextMenuPosition
    ? contextMenuPosition.x - contextMenuPosition.x * 0.6
    : 0

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

  const { mutate: deleteQuestion } = useMutation({
    mutationFn: ({ deleteQuestionId }: DeleteProfileQuestionRequest) =>
      deleteProfileQuestion({ deleteQuestionId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profileQuestion', userId] })
      deleteAlert.onClose()
    },
    onError: () => {
      deleteAlert.onClose()
      errorAlert.onOpen()
    },
  })

  const handleContextMenu = (
    e: React.MouseEvent,
    selectQuestion: SelectedQuestion
  ) => {
    e.preventDefault()
    setSelectedQuestion(selectQuestion)
    setContextMenuPosition({ x: e.clientX, y: e.clientY })
  }

  const onClickDeleteBtn = () => {
    deleteAlert.onOpen()
    setContextMenuPosition(null)
  }

  useEffect(() => {
    if (questions.length > 0) {
      setSelectedQuestion({
        questionId: questions[0].profileQuestionId,
        questionContent: questions[0].profileQuestionContent,
        questionCreatedAt: questions[0].createdAt,
      })
    }
  }, [userId, questions, setSelectedQuestion])

  if (!selectedQuestion) return <Loading />

  const handleDelete = () => {
    deleteQuestion({ deleteQuestionId: selectedQuestion.questionId })
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
        {questions.map((question) => (
          <Box
            key={question.profileQuestionId}
            width="full"
            onContextMenu={
              isMyPage
                ? (e) =>
                    handleContextMenu(e, {
                      questionId: question.profileQuestionId,
                      questionContent: question.profileQuestionContent,
                      questionCreatedAt: question.createdAt,
                    })
                : undefined
            }
          >
            <ActiveBrownBox
              key={question.profileQuestionId}
              isActive={
                selectedQuestion.questionId === question.profileQuestionId
              }
              onClick={() => {
                setSelectedQuestion({
                  questionId: question.profileQuestionId,
                  questionContent: question.profileQuestionContent,
                  questionCreatedAt: question.createdAt,
                })
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
          left={`${adjustedXPosition}`}
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
            onClick={onClickDeleteBtn}
            color="text_secondary"
          >
            삭제하기
          </Text>
        </Box>
      )}
      <ConfirmModal
        isOpen={deleteAlert.isOpen}
        onClose={deleteAlert.onClose}
        icon={<BiTrash />}
        title="프로필 질문을 삭제하시겠어요?"
        description="삭제한 질문은 복구할 수 없습니다"
        confirmButton={
          <Button
            colorScheme="primary"
            fontSize="small"
            height="fit-content"
            paddingY="0.6rem"
            onClick={handleDelete}
          >
            삭제하기
          </Button>
        }
      />
      <AlertModal
        isOpen={errorAlert.isOpen}
        onClose={errorAlert.onClose}
        icon={<BiError />}
        title="삭제에 실패하였습니다"
        description=""
      />
    </Flex>
  )
}

interface QuestionListSectionProps {
  questions: QuestionItem[]
  userId: number
  isMyPage: boolean
}

export const QuestionListSection = ({
  questions,
  userId,
  isMyPage,
}: QuestionListSectionProps) => {
  const setSelectedQuestion = useSelectedQuestionStore(
    (state) => state.setSelectedQuestion
  )

  if (!questions.length) {
    setSelectedQuestion(undefined)

    return (
      <Box textAlign="center" paddingTop={3}>
        생성된 질문이 없습니다!
      </Box>
    )
  }

  return (
    <QuestionList isMyPage={isMyPage} userId={userId} questions={questions} />
  )
}
