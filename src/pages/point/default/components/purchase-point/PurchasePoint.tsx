import { BiCheckCircle } from 'react-icons/bi'

import { Button, Card, Flex, Heading, useDisclosure } from '@chakra-ui/react'

import { usePurchasePoint } from '@/api/services/point/purchase.api'
import {
  ConfirmModal,
  ConfirmModalButton,
} from '@/components/Modal/ConfirmModal'

export const PurchasePoint = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data: redirectUrl, refetch: purchasePoint } = usePurchasePoint({
    point: 1000,
  })

  const handleRedirectPurchase = () => {
    window.location.href = `${redirectUrl}`
  }

  return (
    <Card padding={4}>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading size="sm">포인트 충전하기</Heading>
        <div>
          <Button
            colorScheme="primary"
            borderRadius={10}
            onClick={() => {
              onOpen()
              purchasePoint()
            }}
          >
            + 1000P
          </Button>
          <ConfirmModal
            isOpen={isOpen}
            onClose={onClose}
            icon={<BiCheckCircle />}
            title="포인트 충전하기"
            description="1000P를 1000원에 구매합니다."
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
      </Flex>
    </Card>
  )
}
