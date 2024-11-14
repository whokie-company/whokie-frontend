import { useEffect, useRef, useState } from 'react'
import { BiError, BiTrash } from 'react-icons/bi'

import { Box, Button, useDisclosure } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@/api/instance'
import {
  DeleteProfileAnswerRequest,
  deleteProfileAnswer,
  useGetProfileAnswer,
} from '@/api/services/profile/profile-question.api'
import { ChatBox } from '@/components/ChatBox'
import { Loading } from '@/components/Loading'
import { AlertModal } from '@/components/Modal/AlertModal'
import { ConfirmModal } from '@/components/Modal/ConfirmModal'
import ErrorPage from '@/pages/ErrorPage'
import formatDate from '@/pages/ProfileQuestionPage/utils/formatDate'

interface AnswerProps {
  userId: number
  isMyPage: boolean
  questionId: number
}

const Answer: React.FC<AnswerProps> = ({
  userId,
  isMyPage,
  questionId,
}: AnswerProps) => {
  const deleteAlert = useDisclosure()
  const errorAlert = useDisclosure()

  const [answerId, setAnswerId] = useState<number>()

  const { mutate: deleteAnswer } = useMutation<
    void,
    Error,
    DeleteProfileAnswerRequest
  >({
    mutationFn: ({ deleteAnswerId }: DeleteProfileAnswerRequest) =>
      deleteProfileAnswer({ deleteAnswerId }),
    onSuccess: () => {
      deleteAlert.onClose()
      queryClient.invalidateQueries({
        queryKey: ['profileAnswer', userId, questionId],
      })
    },
    onError: () => {
      deleteAlert.onClose()
      errorAlert.onOpen()
    },
  })

  const {
    data: answers,
    status,
    isError,
  } = useGetProfileAnswer(userId, questionId)

  const boxRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight
    }
  }, [answers])

  if (!userId) return <ErrorPage />

  if (status === 'pending') return <Loading />
  if (isError) return <ErrorPage />
  if (!answers) return ''

  return (
    <Box overflowY="auto" ref={boxRef}>
      {isMyPage
        ? answers.map((answer) => (
            <ChatBox
              key={answer.profileAnswerId}
              direction="right"
              content={answer.content}
              createdAt={formatDate(answer.createdAt)}
              deleteBtn
              onDelete={() => {
                setAnswerId(Number(answer.profileAnswerId))
                deleteAlert.onOpen()
              }}
            />
          ))
        : answers.map((answer) => (
            <ChatBox
              key={answer.profileAnswerId}
              direction="right"
              content={answer.content}
              createdAt={formatDate(answer.createdAt)}
            />
          ))}
      <ConfirmModal
        isOpen={deleteAlert.isOpen}
        onClose={deleteAlert.onClose}
        icon={<BiTrash />}
        title="프로필 답변을 삭제하시겠어요?"
        description="삭제한 답변은 복구할 수 없습니다"
        confirmButton={
          <Button
            colorScheme="primary"
            fontSize="small"
            height="fit-content"
            paddingY="0.6rem"
            onClick={() => {
              if (answerId) deleteAnswer({ deleteAnswerId: answerId })
            }}
          >
            삭제하기
          </Button>
        }
      />
      <AlertModal
        isOpen={errorAlert.isOpen}
        onClose={errorAlert.onClose}
        icon={<BiError />}
        title="질문 삭제에 실패하였습니다"
        description=""
      />
    </Box>
  )
}

export default Answer
