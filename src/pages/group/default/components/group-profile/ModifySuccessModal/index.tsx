import { BiCheckCircle } from 'react-icons/bi'

import { AlertModal } from '@/components/Modal/AlertModal'
import { Modal } from '@/types'

interface ModifySuccessModalProps {
  successModal: Modal
}

export const ModifySuccessModal = ({
  successModal,
}: ModifySuccessModalProps) => {
  return (
    <AlertModal
      isOpen={successModal.isOpen}
      onClose={() => {
        successModal.onClose()
      }}
      icon={<BiCheckCircle />}
      title="그룹 이름과 소개를 수정하였습니다"
      description=""
    />
  )
}
