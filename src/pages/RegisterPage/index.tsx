import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import {
  Button,
  Flex,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Text,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import {
  RegisterUserRequestBody,
  registerUser,
} from '@/api/services/user/login.api'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/Form'
import { RegisterUserFields, RegisterUserSchema } from '@/schema/user'
import { useAuthTokenStore } from '@/stores/auth-token'
import { useMyUserIdStore } from '@/stores/my-user-id'

export default function RegisterPage() {
  const navigate = useNavigate()

  const form = useForm<RegisterUserFields>({
    resolver: zodResolver(RegisterUserSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      gender: undefined,
      year: '',
      month: '',
      day: '',
    },
  })

  const setAuthToken = useAuthTokenStore((state) => state.setAuthToken)
  const setMyUserId = useMyUserIdStore((state) => state.setMyUserId)

  const { mutate } = useMutation({
    mutationFn: (data: RegisterUserRequestBody) => registerUser(data),
    onSuccess: (data) => {
      setAuthToken(data.accessToken)
      setMyUserId(data.userId)
      navigate('/')
    },
  })

  const onValid = () => {
    mutate({
      name: form.getValues('name'),
      gender: form.getValues('gender'),
      year: Number(form.getValues('year')),
      month: Number(form.getValues('month')),
      day: Number(form.getValues('day')),
    })
  }

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="full"
      gap={6}
      padding={4}
    >
      <Heading color="brown.600" size="xl" fontWeight="800">
        회원가입
      </Heading>
      <Text color="gray.600" fontSize="md" textAlign="center">
        가입을 통해 더 다양한 서비스를 만나보세요!
      </Text>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onValid)}>
          <Flex flexDirection="column" gap={4} maxWidth="400px">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Text fontWeight="bold" mb={2}>
                      이름
                    </Text>
                    <Input
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="쿠키즈"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Text fontWeight="bold" mb={2}>
                      성별
                    </Text>
                    <RadioGroup value={field.value} onChange={field.onChange}>
                      <Flex gap={5}>
                        <Radio value="male" colorScheme="brown">
                          남
                        </Radio>
                        <Radio value="female" colorScheme="brown">
                          여
                        </Radio>
                      </Flex>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Flex flexDirection="column">
              <Text fontWeight="bold" mb={2}>
                생년월일
              </Text>
              <Flex gap={2}>
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          value={field.value}
                          onChange={field.onChange}
                          type="number"
                          placeholder="YYYY"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="month"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          value={field.value}
                          onChange={field.onChange}
                          type="number"
                          placeholder="MM"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="day"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          value={field.value}
                          onChange={field.onChange}
                          type="number"
                          placeholder="DD"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Flex>
            </Flex>
            <Button
              bg="brown.500"
              color="secondary_background"
              _hover={{ bg: 'brown.600' }}
              size="lg"
              width="full"
              mt={6}
              type="submit"
            >
              가입하기
            </Button>
          </Flex>
        </form>
      </Form>
    </Flex>
  )
}
