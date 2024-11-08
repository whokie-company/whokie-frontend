import { BiError, BiPlus } from 'react-icons/bi'

import {
  Box,
  Button,
  Flex,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react'

import { AlertModal } from '@/components/Modal/AlertModal'
import { FormModal } from '@/components/Modal/FormModal'

interface GroupQuestionCreateModalProps {
  isOpen: boolean
  onClose: () => void
}

export const GroupQuestionCreateModal = ({
  isOpen,
  onClose,
}: GroupQuestionCreateModalProps) => {
  const errorAlert = useDisclosure()
  const errorMessage = '질문을 입력해주세요'

  return (
    <Box>
      <FormModal
        isOpen={isOpen}
        onClose={onClose}
        icon={<BiPlus />}
        title="그룹 질문 추가 요청"
        description="그룹에 새로운 질문을 요청해보세요"
        confirmButton={
          <Button
            colorScheme="primary"
            fontSize="small"
            height="fit-content"
            paddingY="0.6rem"
            width="full"
          >
            요청하기
          </Button>
        }
      >
        <Flex padding="0 10px" flexDirection="column" gap={3}>
          <Text fontSize={14}>질문</Text>
          <Textarea
            rows={1}
            resize="none"
            whiteSpace="nowrap"
            placeholder="100자 이내 입력"
          />
          <Box textAlign="center">
            <Text fontSize="small" textColor="text_description">
              요청한 질문은 수정하거나 취소할 수 없습니다
            </Text>
          </Box>
        </Flex>
      </FormModal>

      <AlertModal
        isOpen={errorAlert.isOpen}
        onClose={errorAlert.onClose}
        icon={<BiError />}
        title={errorMessage}
        description=""
      />
    </Box>
  )
}
