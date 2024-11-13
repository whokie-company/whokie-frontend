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
import { useSelectedQuestionStore } from '@/stores/selected-question'
import { ChatItem } from '@/types'

import formatDate from './formatDate'

interface AnswerProps {
  userId: number
  isMyPage: boolean
}

const Answer: React.FC<AnswerProps> = ({ userId, isMyPage }: AnswerProps) => {
  const { selectedQuestion } = useSelectedQuestionStore()
  const [selectDeleteAnswerId, setSelectDeleteAnswerId] = useState<
    number | null
  >(null)
  const deleteAlert = useDisclosure()
  const errorAlert = useDisclosure()

  const { mutate: deleteAnswer } = useMutation<
    void,
    Error,
    DeleteProfileAnswerRequest
  >({
    mutationFn: ({ deleteAnswerId }: DeleteProfileAnswerRequest) =>
      deleteProfileAnswer({ deleteAnswerId }),
    onSuccess: () => {
      deleteAlert.onClose()
      queryClient.refetchQueries({
        queryKey: ['profileAnswer', userId, selectedQuestion.questionId],
      })
      queryClient.invalidateQueries({ queryKey: ['deleteProfileAnswer'] })
    },
    onError: () => {
      deleteAlert.onClose()
      errorAlert.onOpen()
    },
  })

  const {
    data: answers,
    isLoading,
    isError,
  } = useGetProfileAnswer(userId, selectedQuestion.questionId as number)

  const boxRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight
    }
  }, [answers])

  if (!userId) return <ErrorPage />

  if (isLoading) return <Loading />
  if (isError) return <ErrorPage />
  if (!answers) return ''

  const chatItem: ChatItem[] = answers.map((answer) => ({
    chatId: Number(answer.profileAnswerId),
    direction: 'right' as const,
    content: answer.content,
    createdAt: formatDate(answer.createdAt),
    deleteBtn: isMyPage,
    onDelete: isMyPage
      ? () => handleDelete(Number(answer.profileAnswerId))
      : undefined,
  }))

  const handleDelete = (answerId: number) => {
    setSelectDeleteAnswerId(answerId)
    deleteAlert.onOpen()
  }

  return (
    <Box overflowY="auto" ref={boxRef}>
      {chatItem.map((item) => (
        <ChatBox key={item.chatId} chatItem={item} />
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
              if (selectDeleteAnswerId !== null) {
                deleteAnswer({ deleteAnswerId: selectDeleteAnswerId })
              }
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
