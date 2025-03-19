import { useRef } from 'react'
import { useForm } from 'react-hook-form'

import {
  Button,
  Flex,
  FormControl,
  Input,
  Text,
  useRadioGroup,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { purchasePoint } from '@/api/services/point/purchase.api'
import { Form, FormField, FormItem, FormMessage } from '@/components/Form'
import { PageHeader } from '@/components/PageHeader'
import { PurchasePointField, PurchasePointSchema } from '@/schema/point'

import { PointRadioCard } from './components'

export default function PurchasePointPage() {
  const form = useForm<PurchasePointField>({
    resolver: zodResolver(PurchasePointSchema),
    defaultValues: {
      point: undefined,
    },
  })

  const { mutate } = useMutation({
    mutationFn: (point: number) => purchasePoint({ point }),
    onSuccess: (redirectUrl) => {
      window.location.href = `${redirectUrl}`
    },
  })

  const options = ['100', '500', '1000']
  const { getRootProps, getRadioProps, setValue } = useRadioGroup({
    name: 'pointOptions',
    onChange: (value) => {
      form.setValue('point', Number(value))
      form.clearErrors('point')
    },
  })
  const group = getRootProps()

  const onSubmit = ({ point }: PurchasePointField) => {
    if (point) mutate(point)
  }

  const inputRef = useRef<HTMLInputElement | null>(null)

  const moveCursorToEnd = () => {
    if (inputRef.current) {
      setTimeout(() => {
        const valueLength = String(form.getValues('point') || '').length
        inputRef.current?.setSelectionRange(valueLength, valueLength)
      }, 0)
    }
  }

  return (
    <Flex flexDirection="column" height="full">
      <PageHeader page="포인트 관리" />
      <Flex flexDirection="column" flex={1} height="full" margin={4}>
        <Text fontSize="large" paddingBottom={4} fontWeight="bold">
          포인트 충전
        </Text>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="point"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Flex flexDirection="column">
                      <Flex
                        justifyContent="space-between"
                        alignItems="center"
                        background="white"
                        borderWidth="1px"
                        _focusWithin={{
                          background: 'orange.50',
                          borderColor: 'orange.300',
                        }}
                      >
                        <Input
                          ref={inputRef}
                          fontWeight="bold"
                          width="full"
                          placeholder="직접 입력하기"
                          focusBorderColor="transparent"
                          _hover={{ borderColor: 'transparent' }}
                          border="0px solid transparent"
                          paddingY={6}
                          paddingRight={8}
                          borderBottomRadius={0}
                          value={field.value ? `${field.value}P` : ''}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '')
                            field.onChange(value ? Number(value) : undefined)
                          }}
                          onClick={() => {
                            setValue(0)
                            moveCursorToEnd()
                          }}
                          onFocus={moveCursorToEnd}
                          onInput={moveCursorToEnd}
                          color={
                            form.formState.errors.point ? 'red.500' : 'black'
                          }
                        />
                        <FormMessage whiteSpace="nowrap" paddingRight={4} />
                      </Flex>
                      <Flex flexDirection="column" {...group}>
                        {options.map((value) => {
                          const radio = getRadioProps({ value })
                          return (
                            <PointRadioCard
                              key={value}
                              radio={radio}
                              value={value}
                            />
                          )
                        })}
                      </Flex>
                    </Flex>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              width="full"
              colorScheme="primary"
              marginTop={10}
              type="submit"
            >
              충전하기
            </Button>
          </form>
        </Form>
      </Flex>
    </Flex>
  )
}
