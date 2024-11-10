import { BiCheckCircle } from 'react-icons/bi'

import { Button, useDisclosure } from '@chakra-ui/react'

import { usePurchasePoint } from '@/api/services/point/purchase.api'
import {
  ConfirmModal,
  ConfirmModalButton,
} from '@/components/Modal/ConfirmModal'

export const PointModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data: redirectUrl, refetch: purchasePoint } = usePurchasePoint({
    point: 100,
  })

  const handleRedirectPurchase = () => {
    window.location.href = `${redirectUrl}`
  }

  return (
    <div>
      <Button
        colorScheme="primary"
        borderRadius={10}
        onClick={() => {
          onOpen()
          purchasePoint()
        }}
      >
        + 100P
      </Button>
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        icon={<BiCheckCircle />}
        title="포인트 충전하기"
        description="100P를 1000원에 구매합니다."
        confirmButton={
          <ConfirmModalButton
            onClick={() => {
              onClose()
              handleRedirectPurchase()
            }}
            isDisabled={!redirectUrl}
          >
            확인
          </ConfirmModalButton>
        }
      />
    </div>
  )
}
