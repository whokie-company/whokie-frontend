import { HTMLAttributes, forwardRef } from 'react'
import { FormProvider } from 'react-hook-form'

import { useFormField } from './FormContext'
import { FormFieldProvider, FormItemProvider } from './FormProvider'

const Form = FormProvider
const FormField = FormFieldProvider

const FormItem = FormItemProvider

const FormControl = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ ...props }, ref) => {
    const { error, formItemId, formMessageId } = useFormField()

    return (
      <div
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

export { Form, FormField, FormItem, FormControl }
