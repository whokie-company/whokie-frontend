import { z } from 'zod'

export const RegisterUserSchema = z.object({
  name: z
    .string()
    .min(1, { message: '이름을 입력해주세요' })
    .regex(/^[가-힣]+$/, { message: '공백없이 한글만 입력해주세요' }),
  gender: z.enum(['male', 'female'], {
    errorMap: () => ({ message: '성별을 선택해주세요' }),
  }),
  year: z
    .string()
    .regex(/^[0-9]{4}$/, { message: '연도는 4자리 숫자로 입력해 주세요' }),
  month: z.string().regex(/^[0-9]{1,2}$/, { message: '숫자만 입력해주세요' }),
  day: z.string().regex(/^[0-9]{1,2}$/, { message: '숫자만 입력해주세요' }),
})

export type RegisterUserFields = z.infer<typeof RegisterUserSchema>
