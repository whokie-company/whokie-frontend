import { createContext, useContext } from 'react'
import { FieldPath, FieldValues, useFormContext } from 'react-hook-form'

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

export const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

type FormItemContextValue = {
  id: string
}

export const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

export const useFormField = () => {
  const fieldContext = useContext(FormFieldContext)
  const itemContext = useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error('useFormField은 <FormField> 내부에서 사용해야합니다.')
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    ...fieldState,
  }
}
