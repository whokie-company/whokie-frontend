import { BiLockAlt } from 'react-icons/bi'

import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@/api/instance'
import { buyHint, hintQuries } from '@/api/services/answer/hint.api'
import { pointQuries } from '@/api/services/user/point.api'
import {
  ConfirmModal,
  ConfirmModalButton,
} from '@/components/Modal/ConfirmModal'
import { useSelectedAnswerStore } from '@/stores/selected-answer'
import { Modal } from '@/types'

interface BuyHintModalProps {
  modal: Modal
  answerId: number
}

export const BuyHintModal = ({ modal, answerId }: BuyHintModalProps) => {
  const selectedAnswer = useSelectedAnswerStore((state) => state.selectedAnswer)

  const { mutate } = useMutation({
    mutationFn: () => buyHint({ answerId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: hintQuries.all() })
      queryClient.invalidateQueries({ queryKey: pointQuries.all() })
      queryClient.invalidateQueries({ queryKey: ['answer', 'record'] })
      modal.onClose()
    },
    onError: (error) => {
      modal.onClose()
      throw error
    },
  })
  if (!selectedAnswer) return null

  return (
    <div>
      <ConfirmModal
        isOpen={modal.isOpen}
        onClose={modal.onClose}
        icon={<BiLockAlt />}
        title="포인트를 사용해 힌트를 구매합니다."
        description="성별 10P / 나이 20P / 초성 30P"
        confirmButton={
          <ConfirmModalButton onClick={() => mutate()}>확인</ConfirmModalButton>
        }
      />
    </div>
  )
}
