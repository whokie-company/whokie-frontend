import { BiCheckCircle } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import { Button, useDisclosure } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'

import { purchasePoint } from '@/api/services/point/purchase.api'
import {
  ConfirmModal,
  ConfirmModalButton,
} from '@/components/Modal/ConfirmModal'

export const PointModal = () => {
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { mutate } = useMutation({
    mutationFn: () => purchasePoint({ point: 100 }),
    onError: () => {
      navigate('/point/failure')
    },
  })

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
              mutate()
              onClose()
            }}
          >
            확인
          </ConfirmModalButton>
        }
      />
    </div>
  )
}
