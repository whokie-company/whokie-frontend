import { UseFormReturn } from 'react-hook-form'

import { Input } from '@chakra-ui/react'

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/Form'
import { ModifyGroupFields } from '@/schema/group'

interface GroupFormFieldProps {
  form: UseFormReturn<ModifyGroupFields>
  name: keyof ModifyGroupFields
  size: 'xl' | 'md'
  width: string
}

export const GroupFormField = ({
  form,
  name,
  size,
  width,
}: GroupFormFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              value={field.value}
              onChange={field.onChange}
              border="none"
              padding="0"
              height="auto"
              textColor="black.500"
              _focus={{ color: 'black.800' }}
              fontSize={size}
              width={width}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
