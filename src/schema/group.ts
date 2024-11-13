import { z } from 'zod'

export const CreateGroupSchema = z.object({
  groupName: z
    .string()
    .min(1, { message: '그룹명을 입력해주세요' })
    .max(10, { message: '그룹명은 10자 이내로 작성해주세요' }),
  groupDescription: z
    .string()
    .min(1, { message: '그룹 설명을 입력해주세요' })
    .max(20, { message: '그룹 설명은 20자 이내로 작성해주세요' }),
})

export type CreateGroupFields = z.infer<typeof CreateGroupSchema>

export const ModifyGroupSchema = z.object({
  groupId: z.number(),
  groupName: z
    .string()
    .min(1, { message: '그룹명을 입력해주세요' })
    .max(10, { message: '그룹명은 10자 이내로 작성해주세요' }),
  description: z
    .string()
    .min(1, { message: '그룹 설명을 입력해주세요' })
    .max(20, { message: '그룹 설명은 20자 이내로 작성해주세요' }),
})

export type ModifyGroupFields = z.infer<typeof ModifyGroupSchema>

export const CreateQuestionSchema = z.object({
  groupId: z.number(),
  content: z
    .string()
    .min(1, { message: '질문 내용을 입력해주세요' })
    .max(25, { message: '질문을 25자 이내로 작성해주세요' }),
})

export type CreateQuestionFields = z.infer<typeof CreateQuestionSchema>

export const ModifyGroupImageSchema = z.object({
  groupId: z.number(),
  image: z.instanceof(File).refine((f) => f.size < 5000000, {
    message: '이미지 파일 크기는 5MB 이하만 가능합니다.',
  }),
})

export type ModifyGroupImageFields = z.infer<typeof ModifyGroupImageSchema>
