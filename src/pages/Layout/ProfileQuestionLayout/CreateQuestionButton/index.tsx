import { useState } from 'react'
import { BiError, BiPlus, BiSolidPlusCircle } from 'react-icons/bi'

import {
  Box,
  Button,
  Flex,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@/api/instance'
import {
  PostProfileQuestionRequest,
  postProfileQuestion,
} from '@/api/services/profile/profile-question.api'
import { AlertModal } from '@/components/Modal/AlertModal'
import { FormModal } from '@/components/Modal/FormModal'

type CreateQuestionButtonProps = {
  userId: number
}

export const CreateQuestionButton = ({ userId }: CreateQuestionButtonProps) => {
  const [newQuestionContent, setNewQuestionContent] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const formModal = useDisclosure()
  const errorAlert = useDisclosure()

  const { mutate: submitNewQuestion } = useMutation({
    mutationFn: ({ content }: PostProfileQuestionRequest) =>
      postProfileQuestion({ content }),
    onSuccess: () => {
      formModal.onClose()
      setNewQuestionContent('')
      queryClient.invalidateQueries({ queryKey: ['postNewQuestion'] })
      queryClient.refetchQueries({
        queryKey: ['profileQuestion', userId],
      })
    },
    onError: () => {
      formModal.onClose()
      setErrorMessage('답변 전송에 실패하였습니다')
      errorAlert.onOpen()
    },
  })

  const handleSend = () => {
    if (!newQuestionContent.trim()) {
      setErrorMessage('질문을 입력해주세요')
      formModal.onClose()
      errorAlert.onOpen()
      return
    }

    submitNewQuestion({
      content: newQuestionContent,
    })
  }

  return (
    <Box>
      <Button
        colorScheme="secondary"
        width="full"
        position="absolute"
        bottom={0}
        borderRadius={0}
        justifyContent="start"
        paddingLeft={0}
        onClick={formModal.onOpen}
      >
        <Box marginX={1.5} padding={0} color="primary_background">
          <BiSolidPlusCircle size={22} />
        </Box>
        <Text fontWeight="bold" color="text">
          질문 추가하기
        </Text>
      </Button>
      <FormModal
        isOpen={formModal.isOpen}
        onClose={formModal.onClose}
        icon={<BiPlus />}
        title="프로필 질문 추가하기"
        description="친구들에게 궁금한 질문을 추가해보세요"
        confirmButton={
          <Button
            colorScheme="primary"
            fontSize="small"
            height="fit-content"
            paddingY="0.6rem"
            width="full"
            onClick={handleSend}
          >
            확인
          </Button>
        }
      >
        <Flex padding="0 10px" flexDirection="column" gap={3}>
          <Text fontSize={14}>질문</Text>
          <Textarea
            rows={1}
            resize="none"
            whiteSpace="nowrap"
            placeholder="질문을 입력하세요"
            value={newQuestionContent}
            onChange={(e) => setNewQuestionContent(e.target.value)}
          />
          <Box textAlign="center">
            <Text fontSize="small" textColor="text_description">
              추가한 질문은 수정할 수 없습니다
            </Text>
          </Box>
        </Flex>
      </FormModal>
      <AlertModal
        isOpen={errorAlert.isOpen}
        onClose={errorAlert.onClose}
        icon={<BiError />}
        title={errorMessage}
        description=""
      />
    </Box>
  )
}
