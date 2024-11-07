import { useEffect } from 'react'
import { BiCopyAlt, BiLink } from 'react-icons/bi'

import { Flex, Input, useClipboard, useDisclosure } from '@chakra-ui/react'

import { CardButton } from '@/components/CardButton'
import { FormConfirmModalButton, FormModal } from '@/components/Modal/FormModal'

interface InviteMemberModalProps {
  inviteCode: string
}

export const InviteMemberModal = ({ inviteCode }: InviteMemberModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { onCopy, setValue, hasCopied } = useClipboard('')

  useEffect(() => {
    setValue(inviteCode)
  }, [setValue, inviteCode])

  return (
    <>
      <CardButton
        variant="white"
        orientation="horizontal"
        label="초대하기"
        description="새로운 멤버를 초대해보세요"
        Icon={BiLink}
        onClick={onOpen}
      />
      <FormModal
        isOpen={isOpen}
        onClose={onClose}
        icon={<BiCopyAlt />}
        title="초대 링크 공유하기"
        description="초대링크 복사 후, 원하는 곳에 링크를 공유하세요!"
        confirmButton={
          <FormConfirmModalButton
            onClick={() => {
              onCopy()
              onClose()
            }}
          >
            {hasCopied ? '복사완료' : '복사하기'}
          </FormConfirmModalButton>
        }
      >
        <Flex alignItems="center" gap={2}>
          <Input size="sm" borderRadius="6" value={inviteCode} isReadOnly />
        </Flex>
      </FormModal>
    </>
  )
}
