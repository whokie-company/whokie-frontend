import { BiError } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import { useDisclosure } from '@chakra-ui/react'

import { AlertModal } from '@/components/Modal/AlertModal'

export default function PointCancelModal() {
  const { onClose } = useDisclosure()
  const navigate = useNavigate()

  return (
    <AlertModal
      isOpen
      onClose={() => {
        navigate('/point')
        onClose()
      }}
      icon={<BiError />}
      title="포인트를 충전을 취소했습니다."
      description="다시 시도해주세요."
    />
  )
}
