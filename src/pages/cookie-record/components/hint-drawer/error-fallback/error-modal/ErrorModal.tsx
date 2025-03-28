import { BiError } from 'react-icons/bi'

import { useDisclosure } from '@chakra-ui/react'

import { AlertModal } from '@/components/Modal/AlertModal'

interface BuyHintErrorModalProps {
  errorMessage: string
  setErrorMessage: (msg: string) => void
  resetError: () => void
}

export const BuyHintErrorModal = ({
  errorMessage,
  setErrorMessage,
  resetError,
}: BuyHintErrorModalProps) => {
  const { onClose } = useDisclosure()

  return (
    <AlertModal
      isOpen
      onClose={() => {
        onClose()
        setErrorMessage('')
        resetError()
      }}
      icon={<BiError />}
      title={errorMessage}
      description=""
    />
  )
}
