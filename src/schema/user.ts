import { z } from 'zod'

export const RegisterUserSchema = z.object({
  name: z
    .string()
    .min(1, { message: '이름을 입력해주세요' })
    .regex(/^[가-힣]+$/, { message: '공백없이 한글만 입력해주세요' }),
  gender: z.enum(['male', 'female'], {
    errorMap: () => ({ message: '성별을 선택해주세요' }),
  }),
  birthDate: z.string().date(),
})

export type RegisterUserFields = z.infer<typeof RegisterUserSchema>
