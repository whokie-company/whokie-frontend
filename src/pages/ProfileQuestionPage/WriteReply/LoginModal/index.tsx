import { BiError } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import {
  ConfirmModal,
  ConfirmModalButton,
} from '@/components/Modal/ConfirmModal'
import { Modal } from '@/types'

interface LoginModalProps {
  modal: Modal
}

export const LoginModal = ({ modal }: LoginModalProps) => {
  const navigate = useNavigate()

  return (
    <ConfirmModal
      isOpen={modal.isOpen}
      onClose={modal.onClose}
      icon={<BiError />}
      title="로그인 후 이용해주세요"
      description=""
      confirmButton={
        <ConfirmModalButton
          onClick={() => {
            navigate('/login')
            modal.onClose()
          }}
        >
          확인
        </ConfirmModalButton>
      }
    />
  )
}
