import { BiError } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import { useDisclosure } from '@chakra-ui/react'

import { AlertModal } from '@/components/Modal/AlertModal'

export default function PointFailureModal() {
  const { onClose } = useDisclosure()
  const navigate = useNavigate()

  return (
    <AlertModal
      isOpen
      onClose={() => {
        onClose()
        navigate('/point')
      }}
      icon={<BiError />}
      title="포인트를 충전하는데 실패했습니다."
      description="잠시후 다시 시도해주세요."
    />
  )
}
