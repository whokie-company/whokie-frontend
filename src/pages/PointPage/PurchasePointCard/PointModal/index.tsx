import { BiCheckCircle } from 'react-icons/bi'

import { Button, useDisclosure } from '@chakra-ui/react'

import { appendParamsToUrl } from '@/api/utils/common/appendParamsToUrl'
import {
  ConfirmModal,
  ConfirmModalButton,
} from '@/components/Modal/ConfirmModal'

export const PointModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const redirectURL = import.meta.env.DEV ? import.meta.env.VITE_LOGIN_URL : ''

  const purchasePoint = () => {
    window.location.href = appendParamsToUrl(
      `${redirectURL}/api/point/purchase`,
      { point: 100 }
    )
  }

  return (
    <div>
      <Button colorScheme="primary" borderRadius={10} onClick={onOpen}>
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
              purchasePoint()
            }}
          >
            확인
          </ConfirmModalButton>
        }
      />
    </div>
  )
}
