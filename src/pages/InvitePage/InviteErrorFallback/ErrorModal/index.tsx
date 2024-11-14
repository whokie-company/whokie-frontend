import { BiError } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import { useDisclosure } from '@chakra-ui/react'

import { AlertModal } from '@/components/Modal/AlertModal'

interface InviteErrorMoalProps {
  errorMessage: string
  detailMessage?: string
}

export const InviteErrorMoal = ({
  errorMessage,
  detailMessage = '',
}: InviteErrorMoalProps) => {
  const { onClose } = useDisclosure()
  const navigate = useNavigate()

  return (
    <AlertModal
      isOpen
      onClose={() => {
        navigate(0)
        onClose()
      }}
      icon={<BiError />}
      title={errorMessage}
      description={detailMessage}
    />
  )
}

export const InviteErrorMoalLogin = ({
  errorMessage,
  detailMessage = '',
}: InviteErrorMoalProps) => {
  const { onClose } = useDisclosure()
  const navigate = useNavigate()

  return (
    <AlertModal
      isOpen
      onClose={() => {
        navigate('/login')
        onClose()
      }}
      icon={<BiError />}
      title={errorMessage}
      description={detailMessage}
    />
  )
}
