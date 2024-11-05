import { useForm } from 'react-hook-form'

import { Button, Flex, Input, Text, Textarea } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from '@/components/Form'

import { ImageInput } from './ImageInput'

const CreateGroupSchema = z.object({
  groupName: z.string(),
  groupDescription: z.string(),
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
              <Button colorScheme="brown" width="full">
                그룹 만들기
              </Button>
            </Flex>
          </Flex>
        </form>
      </Form>
    </Flex>
  )
}
