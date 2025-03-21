import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BiError, BiPlus } from 'react-icons/bi'

import { Box, Flex, useDisclosure } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@/api/instance'
import {
  CreateGroupQuestionPayload,
  createGroupQuestion,
} from '@/api/services/question/group.api'
import { AlertModal } from '@/components/Modal/AlertModal'
import { FormConfirmModalButton, FormModal } from '@/components/Modal/FormModal'
import { CreateQuestionFields, CreateQuestionSchema } from '@/schema/group'

import { CreateGroupQuestionForm } from './create-question-form'

interface CreateGroupQuestionModalProps {
  isOpen: boolean
  onClose: () => void
  groupId: number
}

export const CreateGroupQuestionModal = ({
  isOpen,
  onClose,
  groupId,
}: CreateGroupQuestionModalProps) => {
  const errorAlert = useDisclosure()

  const [errorMessage, setErrorMessage] = useState('')

  const form = useForm<CreateQuestionFields>({
    resolver: zodResolver(CreateQuestionSchema),
    mode: 'onChange',
    defaultValues: {
      groupId,
      content: '',
    },
  })

  const { mutate: createQuestion } = useMutation({
    mutationFn: (payload: CreateGroupQuestionPayload) =>
      createGroupQuestion(payload),
    onSuccess: () => {
      onClose()
      form.reset({ groupId, content: '' })
      queryClient.invalidateQueries({
        queryKey: ['groups', 'question'],
      })
    },
    onError: () => {
      setErrorMessage('질문 생성에 실패하였습니다')
      onClose()
      errorAlert.onOpen()
    },
  })

  return (
    <Box>
      <FormModal
        isOpen={isOpen}
        onClose={() => {
          onClose()
          form.reset({ groupId, content: '' })
        }}
        icon={<BiPlus />}
        title="그룹 질문 추가 요청"
        description="그룹에 새로운 질문을 요청해보세요"
        confirmButton={
          <FormConfirmModalButton
            onClick={form.handleSubmit(() => {
              createQuestion(form.getValues())
            })}
          >
            요청하기
          </FormConfirmModalButton>
        }
      >
        <Flex padding="0 10px" flexDirection="column" gap={3}>
          <CreateGroupQuestionForm form={form} />
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
