import { z } from 'zod'

export const PurchasePointSchema = z.object({
  point: z
    .union([
      z.number().min(1, { message: '포인트를 입력해주세요.' }),
      z.undefined(),
    ])
    .refine((val) => val === undefined || val % 10 === 0, {
      message: '10P 단위로 입력해주세요.',
    }),
})
export type PurchasePointField = z.infer<typeof PurchasePointSchema>
