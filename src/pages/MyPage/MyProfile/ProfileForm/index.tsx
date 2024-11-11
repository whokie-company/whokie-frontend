import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BiCheck, BiCheckCircle, BiEditAlt } from 'react-icons/bi'

import { Center, Flex, Input, Text, useDisclosure } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@/api/instance'
import { patchProfileDescription } from '@/api/services/profile/my-page.api'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/Form'
import { AlertModal } from '@/components/Modal/AlertModal'
import { ModifyProfileFields, ModifyProfileSchema } from '@/schema/profile'
import { useMyUserIdStore } from '@/stores/my-user-id'
import { colors } from '@/styles/colors'

interface ProfileFormProps {
  description: string
}

export const ProfileForm = ({ description }: ProfileFormProps) => {
  const userId = useMyUserIdStore((state) => state.myUserId)
  const form = useForm<ModifyProfileFields>({
    resolver: zodResolver(ModifyProfileSchema),
    mode: 'onChange',
    defaultValues: {
      description,
    },
  })
  const [isEdit, setIsEdit] = useState(false)
  const successModal = useDisclosure()

  const { mutate: modifyDescription } = useMutation({
    mutationFn: (data: { description: string }) =>
      patchProfileDescription(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myPage', userId] })
      successModal.onOpen()
    },
  })

  useEffect(() => {
    form.reset({
      description,
    })
    setIsEdit(false)
  }, [description, form])

  const handleModifyProfile = form.handleSubmit(() => {
    modifyDescription(form.getValues())
    setIsEdit(!isEdit)
  })

  const onClickEditButton = () => {
    if (!isEdit) {
      setIsEdit(!isEdit)
      return
    }

    handleModifyProfile()
  }

  return (
    <Form {...form}>
      <form>
        <Flex justifyContent="space-between" alignItems="start" gap={2}>
          {isEdit ? (
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      value={field.value}
                      onChange={field.onChange}
                      color="text_secondary"
                      fontSize="md"
                      width="320px"
                      textColor="black.500"
                      border="none"
                      _focus={{ color: 'black.800' }}
                      padding="0"
                      height="auto"
                      borderRadius="none"
                      borderBottom={`1.5px solid ${colors.brown[400]}`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <Text color="text_secondary" fontSize="md">
              {description}
            </Text>
          )}
          <Center
            borderRadius="full"
            width="20px"
            height="20px"
            background="brown.200"
            color="brown.600"
            border={`1.5px solid ${colors.brown[400]}`}
            _hover={{ cursor: 'pointer', background: 'brown.300' }}
            marginTop="2px"
            onClick={onClickEditButton}
          >
            {isEdit ? <BiCheck size="18px" /> : <BiEditAlt size="13px" />}
          </Center>
        </Flex>
      </form>
      <AlertModal
        isOpen={successModal.isOpen}
        onClose={() => {
          successModal.onClose()
          setIsEdit(false)
        }}
        icon={<BiCheckCircle />}
        title="한 줄 소개를 수정했습니다."
        description=""
      />
    </Form>
  )
}
