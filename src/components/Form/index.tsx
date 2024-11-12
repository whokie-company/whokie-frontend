import { forwardRef } from 'react'
import { FormProvider } from 'react-hook-form'

import { Box, BoxProps, Text, TextProps } from '@chakra-ui/react'

import { useFormField } from './FormContext'
import { FormFieldProvider, FormItemProvider } from './FormProvider'

const Form = FormProvider
const FormField = FormFieldProvider

const FormItem = FormItemProvider

const FormControl = forwardRef<HTMLDivElement, BoxProps>(
  ({ ...props }, ref) => {
    const { error, formItemId, formMessageId } = useFormField()

    return (
      <Box
        ref={ref}
        id={formItemId}
        aria-describedby={`${formMessageId}`}
        aria-invalid={!!error}
        {...props}
      />
    )
  }
)
FormControl.displayName = 'FormControl'

const FormDescription = forwardRef<HTMLParagraphElement, TextProps>(
  ({ ...props }, ref) => {
    const { formDescriptionId } = useFormField()

    return (
      <Text
        ref={ref}
        id={formDescriptionId}
        fontSize="small"
        color="text_description"
        {...props}
      />
    )
  }
)
FormDescription.displayName = 'FormDescription'

const FormMessage = forwardRef<HTMLParagraphElement, TextProps>(
  ({ children, ...props }, ref) => {
    const { error, formMessageId } = useFormField()
    const body = error ? String(error?.message) : children

    if (!body) {
      return null
    }

    return (
      <Text
        ref={ref}
        id={formMessageId}
        color="red"
        fontSize="small"
        {...props}
      >
        {body}
      </Text>
    )
  }
)
FormMessage.displayName = 'FormMessage'

export { Form, FormField, FormItem, FormControl, FormDescription, FormMessage }
