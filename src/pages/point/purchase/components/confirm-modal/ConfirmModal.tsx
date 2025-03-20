import { BiCheckCircle } from 'react-icons/bi'

import {
  ConfirmModal,
  ConfirmModalButton,
} from '@/components/Modal/ConfirmModal'
import { Modal } from '@/types'

interface ConfirmPointPurchaseModalProps {
  point: number
  modal: Modal
  purchasePoint: () => void
}

export const ConfirmPointPurchaseModal = ({
  point,
  modal,
  purchasePoint,
}: ConfirmPointPurchaseModalProps) => {
  return (
    <ConfirmModal
      isOpen={modal.isOpen}
      onClose={modal.onClose}
      icon={<BiCheckCircle />}
      title="포인트 충전하기"
      description={`${point}P를 ${point * 10}원에 구매합니다.`}
      confirmButton={
        <ConfirmModalButton
          onClick={() => {
            modal.onClose()
            purchasePoint()
          }}
        >
          확인
        </ConfirmModalButton>
      }
    />
  )
}
