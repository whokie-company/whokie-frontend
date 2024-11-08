import { BiCheck, BiEditAlt } from 'react-icons/bi'

import { Icon, IconButton } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'

import { modifyGroup } from '@/api/services/group/group.api'
import { Group } from '@/types'

interface EditProfileProps {
  isEditing: boolean
  setIsEditing: (isEditing: boolean) => void
  groupInfo: Pick<Group, 'groupId' | 'groupName' | 'groupDescription'>
}

export const EditProfile = ({
  isEditing,
  setIsEditing,
  groupInfo,
}: EditProfileProps) => {
  const { mutate } = useMutation({
    mutationFn: () =>
      modifyGroup({
        groupId: groupInfo.groupId,
        groupName: groupInfo.groupName,
        description: groupInfo.groupDescription,
      }),
  })

  if (isEditing)
    return (
      <IconButton
        aria-label="Editting"
        icon={<Icon as={BiCheck} boxSize="12px" />}
        borderRadius="20px"
        minWidth="20px"
        width="20px"
        height="20px"
        padding="0"
        border="1px solid"
        borderColor="black.400"
        onClick={() => {
          setIsEditing(!isEditing)
          mutate()
        }}
      />
    )

  return (
    <IconButton
      aria-label="Edit"
      icon={<Icon as={BiEditAlt} boxSize="10px" />}
      borderRadius="20px"
      minWidth="20px"
      width="20px"
      height="20px"
      padding="0"
      border="1px solid"
      borderColor="black.400"
      onClick={() => setIsEditing(!isEditing)}
    />
  )
}
