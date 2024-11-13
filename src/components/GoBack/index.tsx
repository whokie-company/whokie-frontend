import { BiChevronLeft } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import { Button } from '@chakra-ui/react'

interface GoBackProps {
  goBack: boolean
  to?: string
}

export default function GoBack({ goBack, to }: GoBackProps) {
  const navigate = useNavigate()

  const handleGoBack = () => {
    if (goBack) {
      navigate(-1)
    } else if (to) {
      navigate(to)
    }
  }

  return (
    <Button
      height="100%"
      bg="none"
      _hover={{ bg: 'none' }}
      onClick={handleGoBack}
    >
      <BiChevronLeft size={20} />
    </Button>
  )
}
