import { z } from 'zod'

export const ModifyProfileSchema = z.object({
  description: z
    .string()
    .min(1, { message: '한 줄 소개를 입력해주세요' })
    .max(20, { message: '한 줄 소개는 20자 이내로 작성해주세요' }),
})

export type ModifyProfileFields = z.infer<typeof ModifyProfileSchema>

export const ModifyBackgroundImageSchema = z.object({
  image: z.instanceof(File).refine((f) => f.size < 5000000, {
    message: '이미지 파일 크기는 5MB 이하만 가능합니다.',
  }),
})

export type ModifyBackgroundImageField = z.infer<
  typeof ModifyBackgroundImageSchema
>
