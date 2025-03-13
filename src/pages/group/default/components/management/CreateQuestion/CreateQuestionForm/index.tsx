import { UseFormReturn } from 'react-hook-form'

import { Flex, Text, Textarea } from '@chakra-ui/react'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/Form'
import { CreateQuestionFields } from '@/schema/group'

interface CreateQuestionFormProps {
  form: UseFormReturn<CreateQuestionFields>
}

export const CreateQuestionForm = ({ form }: CreateQuestionFormProps) => {
  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Flex flexDirection="column" gap={3}>
                  <Text fontSize={14}>질문</Text>
                  <Textarea
                    rows={1}
                    resize="none"
                    whiteSpace="nowrap"
                    placeholder="25자 이내 입력"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </Flex>
              </FormControl>
              <Flex
                flexDirection="column"
                height="45px"
                justifyContent="end"
                gap={1}
              >
                <FormMessage />
                <FormDescription textAlign="center">
                  요청한 질문은 수정하거나 취소할 수 없습니다
                </FormDescription>
              </Flex>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
