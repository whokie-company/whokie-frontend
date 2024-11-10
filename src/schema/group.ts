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
