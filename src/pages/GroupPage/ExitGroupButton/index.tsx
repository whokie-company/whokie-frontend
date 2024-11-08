import { BiSolidError } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import { Button, Flex, useDisclosure } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@/api/instance'
import { exitGroupMember } from '@/api/services/group/member.api'
import {
  ConfirmModal,
  ConfirmModalButton,
} from '@/components/Modal/ConfirmModal'
import { GroupRole } from '@/types'

interface ExitGroupButtonProps {
  groupId: number
  groupName: string
  role: GroupRole
}

export const ExitGroupButton = ({
  groupId,
  groupName,
  role,
}: ExitGroupButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()

  const { mutate: exitGroup } = useMutation({
    mutationFn: () => exitGroupMember(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] })
      navigate('/')
    },
  })

  return (
    <Flex justifyContent="end" paddingX={8} paddingBottom={5}>
      <Button
        variant="link"
        size="sm"
        color="brown.500"
        onClick={onOpen}
        _hover={{ color: 'brown.600' }}
      >
        그룹 탈퇴하기
      </Button>
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        icon={<BiSolidError />}
        title={`정말로 ${groupName} 그룹에서 나가시겠습니까?`}
        description={
          role === 'LEADER'
            ? '그룹장이 그룹을 나가면 그룹이 삭제됩니다.'
            : '그룹에서의 모든 활동은 삭제됩니다.'
        }
        confirmButton={
          <ConfirmModalButton
            onClick={() => {
              onClose()
              exitGroup()
            }}
          >
            확인
          </ConfirmModalButton>
        }
      />
    </Flex>
  )
}
