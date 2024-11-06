import { BiCheckCircle } from 'react-icons/bi'

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from '@chakra-ui/react'

import { FormConfirmModalButton, FormModal } from '@/components/Modal/FormModal'

export const PointModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div>
      <Button onClick={onOpen}>대충 포인트</Button>
      <FormModal
        isOpen={isOpen}
        onClose={onClose}
        icon={<BiCheckCircle />}
        title="포인트 관리하기"
        description="대충 설명적으면 됩니다."
        confirmButton={
          <FormConfirmModalButton
            onClick={() => {
              console.log('여기에 액션 추가하기')
              onClose()
            }}
          >
            제출하기
          </FormConfirmModalButton>
        }
      >
        <FormControl>
          <FormLabel fontSize="small">입력 받기</FormLabel>
          <Input placeholder="안녕하세요~" size="sm" borderRadius="6" />
        </FormControl>
      </FormModal>
    </div>
  )
}
