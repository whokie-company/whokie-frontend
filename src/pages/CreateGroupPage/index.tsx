import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BiError } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import {
  Button,
  Flex,
  Input,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { z } from 'zod'

import { queryClient } from '@/api/instance'
import {
  CreateGroupRequestBody,
  createGroup,
} from '@/api/services/group/group.api'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from '@/components/Form'
import { AlertModal } from '@/components/Modal/AlertModal'

import { ImageInput } from './ImageInput'

const CreateGroupSchema = z.object({
  groupName: z
    .string()
    .min(1, { message: '그룹명을 입력해주세요' })
    .max(10, { message: '그룹명은 10자 이내로 작성해주세요' }),
  groupDescription: z
    .string()
    .min(1, { message: '그룹 설명을 입력해주세요' })
    .max(30, { message: '그룹 설명은 30자 이내로 작성해주세요' }),
})

type CreateGroupFields = z.infer<typeof CreateGroupSchema>

export default function CreateGroupPage() {
  const form = useForm<CreateGroupFields>({
    resolver: zodResolver(CreateGroupSchema),
    mode: 'onSubmit',
    defaultValues: {
      groupName: '',
      groupDescription: '',
    },
  })

  const [errorMessage, setErrorMessage] = useState('')
  const errorAlert = useDisclosure()
  const successAlert = useDisclosure()

  const navigate = useNavigate()

  const { mutate } = useMutation({
    mutationFn: ({ groupName, groupDescription }: CreateGroupRequestBody) =>
      createGroup({ groupName, groupDescription }),
    onSuccess: () => {
      successAlert.onOpen()
      queryClient.invalidateQueries({ queryKey: ['groups'] })
    },
  })

  const onClickSumbitButton = form.handleSubmit(
    () => mutate(form.getValues()),
    (errors) => {
      const errorMessages =
        Object.values(errors).flatMap((error) => error.message)[0] || ''

      setErrorMessage(errorMessages)
      errorAlert.onOpen()
    }
  )

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="full"
    >
      <Form {...form}>
        <form>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap={6}
          >
            <FormField
              control={form.control}
              name="groupName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="그룹명을 입력해주세요"
                      size="lg"
                      width="12rem"
                      variant="unstyled"
                      focusBorderColor="brown.300"
                      borderColor="brown.200"
                      textAlign="center"
                      fontWeight="bold"
                      _placeholder={{ color: 'black.500' }}
                    />
                    <FormDescription textAlign="center">
                      (10자 이내)
                    </FormDescription>
                  </FormControl>
                </FormItem>
              )}
            />
            <ImageInput />
            <FormField
              control={form.control}
              name="groupDescription"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="그룹 설명을 입력해주세요"
                      width="16rem"
                      size="sm"
                      textAlign="center"
                      border="none"
                      minHeight="3.5rem"
                    />
                    <FormDescription textAlign="center">
                      (30자 이내)
                    </FormDescription>
                  </FormControl>
                </FormItem>
              )}
            />
            <Flex flexDirection="column" gap={1}>
              <Text fontSize="small" color="text_description">
                그룹 정보는 그룹 개설 후에도 변경할 수 있어요
              </Text>
              <Button
                colorScheme="brown"
                width="full"
                type="submit"
                onClick={onClickSumbitButton}
              >
                그룹 만들기
              </Button>
            </Flex>
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
          navigate('/')
        }}
        icon={<BiError />}
        title={`${form.getValues('groupName')} 그룹을 생성했습니다!`}
        description="멤버를 초대해 다양한 그룹 활동을 즐겨보세요"
      />
    </Flex>
  )
}
