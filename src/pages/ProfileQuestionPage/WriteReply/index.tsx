import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BiCheckCircle, BiError } from 'react-icons/bi'

import { Button, Flex, Textarea, useDisclosure } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@/api/instance'
import {
  PostProfileAnswerRequest,
  postProfileAnswer,
} from '@/api/services/profile/profile-question.api'
import { Form, FormControl, FormField, FormItem } from '@/components/Form'
import { AlertModal } from '@/components/Modal/AlertModal'
import {
  AnswerProfileQuestionField,
  AnswerProfileQuestionSchema,
} from '@/schema/profile'

interface WriteReplyProps {
  userId: number
  questionId: number
}

export default function WriteReply({ userId, questionId }: WriteReplyProps) {
  const [errorMessage, setErrorMessage] = useState('')

  const errorAlert = useDisclosure()
  const successAlert = useDisclosure()

  const form = useForm<AnswerProfileQuestionField>({
    resolver: zodResolver(AnswerProfileQuestionSchema),
    mode: 'onSubmit',
    defaultValues: {
      content: '',
      profileQuestionId: questionId,
    },
  })

  const { mutate: submitReply } = useMutation({
    mutationFn: ({ content, profileQuestionId }: PostProfileAnswerRequest) =>
      postProfileAnswer({ content, profileQuestionId }),
    onSuccess: () => {
      successAlert.onOpen()
      queryClient.refetchQueries({
        queryKey: ['profileAnswer', userId, questionId],
      })
      form.reset()
    },
    onError: () => {
      setErrorMessage('답변 전송에 실패하였습니다')
      errorAlert.onOpen()
    },
  })

  const handleSend = form.handleSubmit(
    () => submitReply(form.getValues()),
    (errors) => {
      const errorMessages =
        Object.values(errors).flatMap((error) => error.message)[0] || ''

      setErrorMessage(errorMessages)
      errorAlert.onOpen()
    }
  )

  return (
    <Flex
      bg="white"
      padding="0 5px"
      flexDirection="column"
      justifyContent="space-evenly"
      borderLeft="0.5px solid"
      borderLeftColor="brown.400"
      marginTop="auto"
    >
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    value={field.value}
                    onChange={field.onChange}
                    width="100%"
                    height="auto"
                    variant="unstyled"
                    padding="0"
                    margin="5px"
                    placeholder="메시지 입력"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Flex justifyContent="end" height="29px" margin="14px 0">
            <Button
              onClick={handleSend}
              marginRight="15px"
              borderRadius={20}
              width="90px"
              height="30px"
              bg="brown.400"
              fontSize="small"
              _hover={{ boxShadow: 'md' }}
              _active={{ bg: 'brown.500' }}
            >
              전송
            </Button>
          </Flex>
        </form>
      </Form>
      <AlertModal
        isOpen={errorAlert.isOpen}
        onClose={errorAlert.onClose}
        icon={<BiError />}
        title={errorMessage}
        description=""
      />
      <AlertModal
        isOpen={successAlert.isOpen}
        onClose={() => {
          successAlert.onClose()
          queryClient.refetchQueries({
            queryKey: ['profileAnswer', questionId],
          })
        }}
        icon={<BiCheckCircle />}
        title="답변을 성공적으로 보냈습니다!"
        description="친구들의 다른 프로필 질문에 답변을 보내보세요"
      />
    </Flex>
  )
}
