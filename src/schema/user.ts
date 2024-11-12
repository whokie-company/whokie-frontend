import { z } from 'zod'

export const RegisterUserSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: '이름을 입력해주세요' })
      .regex(/^[가-힣]+$/, { message: '공백없이 한글만 입력해주세요' }),
    gender: z.enum(['male', 'female']),
    year: z.number(),
    month: z.number(),
    day: z.number(),
  })
  .refine(
    (data) => {
      const { year, month, day } = data
      const date = new Date(year, month - 1, day)

      return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
      )
    },
    {
      message: '유효한 날짜를 입력해주세요',
      path: ['year', 'month', 'day'],
    }
  )

export type RegisterUserFields = z.infer<typeof RegisterUserSchema>
