import { IconType } from 'react-icons'
import { BiListUl, BiSolidMessageRounded } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import { Box, Flex, Text } from '@chakra-ui/react'

import CardButton from '@/components/CardButton'

type OvenMenuProps = {
  isMyPage: boolean
  userId: string | undefined
}

export default function OvenMenu({ userId, isMyPage }: OvenMenuProps) {
  const navigate = useNavigate()
  const goToProfileQuestion = () => {
    navigate('/profile-question', { state: { userId } })
  }

  const CardData1 = {
    variant: 'orange' as const,
    orientation: isMyPage ? ('vertical' as const) : ('horizontal' as const),
    label: '프로필 Q&A',
    description: isMyPage
      ? '프로필 답변을 확인해보세요'
      : '프로필 질문에 답변해보세요',
    Icon: BiSolidMessageRounded as IconType,
  }
  const CardData2 = {
    variant: 'white' as const,
    orientation: 'vertical' as const,
    label: '쿠키 로그',
    description: '지목된 질문을 확인해보세요',
    Icon: BiListUl as IconType,
  }

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      margin="30px"
      p="10px"
      borderRadius="10px"
      bg="orange.100"
    >
      <Box>
        <Text fontWeight="bold">나의 오븐</Text>
        <Text fontSize="xs" color="text_description">
          질문과 답변을 확인해보세요
        </Text>
      </Box>
      <Flex gap={4}>
        <CardButton buttonElement={CardData1} onClick={goToProfileQuestion} />
        {isMyPage && <CardButton buttonElement={CardData2} />}
      </Flex>
    </Box>
  )
}
