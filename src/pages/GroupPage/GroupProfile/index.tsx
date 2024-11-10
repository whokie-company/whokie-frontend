import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BiCheck, BiEditAlt } from 'react-icons/bi'

import { Avatar, Center, Flex, Text } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@/api/instance'
import {
  ModifyGroupRequestBody,
  modifyGroup,
} from '@/api/services/group/group.api'
import { Form } from '@/components/Form'
import { ModifyGroupFields, ModifyGroupSchema } from '@/schema/group'
import { colors } from '@/styles/colors'
import { Group, GroupRole } from '@/types'

import { GroupFormField } from './ProfileFormField'

interface GroupProfileProps {
  group: Group
  role: GroupRole
}

export const GroupProfile = ({ group, role }: GroupProfileProps) => {
  const form = useForm<ModifyGroupFields>({
    resolver: zodResolver(ModifyGroupSchema),
    mode: 'onChange',
    defaultValues: {
      groupId: group.groupId,
      groupName: group.groupName,
      description: group.groupDescription,
    },
  })

  const [isEdit, setIsEdit] = useState(false)

  const { mutate } = useMutation({
    mutationFn: (groupFields: ModifyGroupRequestBody) =>
      modifyGroup(groupFields),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['group', group.groupId] })
      queryClient.invalidateQueries({ queryKey: ['groups'] })
    },
  })

  const handleModifyProfile = form.handleSubmit(() => {
    mutate(form.getValues())
    setIsEdit(!isEdit)
  })

  const onClickEditButton = () => {
    if (!isEdit) {
      setIsEdit(!isEdit)
      return
    }

    handleModifyProfile()
  }

  return (
    <Flex
      alignItems="center"
      gap="15px"
      paddingX="25px"
      paddingTop="30px"
      height="96px"
    >
      <Avatar
        src={group.groupdImageUrl}
        width="70px"
        height="70px"
        border={`0.8px solid ${colors.black[300]}`}
      />
      <Form {...form}>
        <form>
          <Flex flexDirection="column">
            <Flex alignItems="start" gap={2}>
              {isEdit ? (
                <GroupFormField
                  form={form}
                  name="groupName"
                  size="xl"
                  width="180px"
                />
              ) : (
                <Text fontSize="xl">{group.groupName}</Text>
              )}
              <Text
                fontSize="xs"
                borderRadius="8px"
                fontWeight="bold"
                background="none"
                color="primary"
                border={`1px solid ${colors.orange[300]}`}
                padding="3px 6px"
                marginTop="2px"
              >
                {role === 'LEADER' ? '그룹장' : '그룹원'}
              </Text>
            </Flex>
            <Flex alignItems="start" gap={2}>
              {isEdit ? (
                <GroupFormField
                  form={form}
                  name="description"
                  size="md"
                  width="320px"
                />
              ) : (
                <Text color="text_secondary" fontSize="md">
                  {group.groupDescription}
                </Text>
              )}
              {role === 'LEADER' && (
                <Center
                  borderRadius="full"
                  width="20px"
                  height="20px"
                  background="brown.200"
                  color="brown.600"
                  border={`1.5px solid ${colors.brown[400]}`}
                  _hover={{ cursor: 'pointer', background: 'brown.300' }}
                  marginTop="2px"
                  onClick={onClickEditButton}
                >
                  {isEdit ? <BiCheck size="18px" /> : <BiEditAlt size="13px" />}
                </Center>
              )}
            </Flex>
          </Flex>
        </form>
      </Form>
    </Flex>
  )
}
