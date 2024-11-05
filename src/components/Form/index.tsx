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
    const { error, formItemId } = useFormField()

    return <Box ref={ref} id={formItemId} aria-invalid={!!error} {...props} />
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

export { Form, FormField, FormItem, FormControl, FormDescription }
