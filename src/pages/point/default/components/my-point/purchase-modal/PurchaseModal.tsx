import { useForm } from 'react-hook-form'
import { BiCheckCircle } from 'react-icons/bi'

import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  useRadioGroup,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { purchasePoint } from '@/api/services/point/purchase.api'
import { Form, FormField, FormItem, FormMessage } from '@/components/Form'
import { FormConfirmModalButton, FormModal } from '@/components/Modal/FormModal'
import { PurchasePointField, PurchasePointSchema } from '@/schema/point'
import { Modal } from '@/types'

import { PointRadioCard } from './radio-card'

interface PurchasePointModalProps {
  modal: Modal
}

export const PurchasePointModal = ({ modal }: PurchasePointModalProps) => {
  const form = useForm<PurchasePointField>({
    resolver: zodResolver(PurchasePointSchema),
    defaultValues: {
      point: undefined,
    },
  })
  const { mutate } = useMutation({
    mutationFn: (point: number) => purchasePoint({ point }),
    onSuccess: (redirectUrl) => {
      modal.onClose()
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

  return (
    <FormModal
      isOpen={modal.isOpen}
      onClose={() => {
        modal.onClose()
        form.reset()
        setValue(0)
      }}
      icon={<BiCheckCircle />}
      title="포인트 충전하기"
      confirmButton={
        <FormConfirmModalButton onClick={form.handleSubmit(onSubmit)}>
          충전하기
        </FormConfirmModalButton>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="point"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Flex justifyContent="space-between" alignItems="center">
                    <FormLabel>충전할 포인트</FormLabel>
                    <FormMessage />
                  </Flex>
                  <Flex flexDirection="column">
                    <Input
                      placeholder="직접 입력하기"
                      borderRadius="6"
                      paddingY={6}
                      borderBottomRadius={0}
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      onClick={() => setValue(0)}
                      type="number"
                    />
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
        </form>
      </Form>
    </FormModal>
  )
}
