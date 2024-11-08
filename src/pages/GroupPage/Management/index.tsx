import { BiCog, BiGroup, BiLink, BiPlus } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'

import { Box, Flex, Text } from '@chakra-ui/react'

import { createGroupQuestion } from '@/api/services/question/group.api'
import CardButton from '@/components/CardButton'

const Test = async () => {
  try {
    const test = {
      groupId: 13,
      content: '추가할 질문 내용',
    }

    const responseMessage = await createGroupQuestion(test)
    console.log('API 호출 성공:', responseMessage)
  } catch (error) {
    console.error('API 호출 실패:', error)
  }
}

Test()

const CardData = [
  {
    variant: 'orange' as const,
    orientation: 'vertical' as const,
    label: '질문 관리',
    description: '그룹 질문을 관리해보세요',
    Icon: BiCog,
  },
  {
    variant: 'white' as const,
    orientation: 'vertical' as const,
    label: '멤버 관리',
    description: '그룹 멤버를 관리해보세요',
    Icon: BiGroup,
  },
  {
    variant: 'white' as const,
    orientation: 'horizontal' as const,
    label: '초대하기',
    description: '새로운 멤버를 초대해보세요',
    Icon: BiLink,
  },
  {
    variant: 'white' as const,
    orientation: 'horizontal' as const,
    label: '질문 추가',
    description: '그룹 질문을 건의해보세요',
    Icon: BiPlus,
  },
]

interface ManagementProps {
  role: 'leader' | 'member'
  groupId: string
}

export default function Management({ role, groupId }: ManagementProps) {
  const navigate = useNavigate()

  const goToQuestionManagement = () => {
    navigate(`/group/${groupId}/QM`)
  }

  return (
    <Box p="30px">
      <Flex gap={4} marginTop="10px" marginBottom="16px">
        <CardButton
          buttonElement={CardData[2]}
          onClick={() => {
            /* 초대하기 클릭 시 동작 */
          }}
        />
        <CardButton
          buttonElement={CardData[3]}
          onClick={() => {
            /* 질문 추가 클릭 시 동작 */
          }}
        />
      </Flex>

      {role === 'leader' && (
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          p="10px"
          borderRadius="10px"
          bg="orange.100"
        >
          <Box>
            <Text fontWeight="bold">그룹 관리</Text>
            <Text
              fontSize="xs"
              color="text_description"
              sx={{
                maxWidth: '120px',
                overflowWrap: 'break-word',
                whiteSpace: 'normal',
                lineHeight: '1.5',
              }}
            >
              당신의 그룹을 원활하게 관리해보세요
            </Text>
          </Box>
          <Flex gap={4}>
            <CardButton
              buttonElement={CardData[0]}
              onClick={goToQuestionManagement}
            />{' '}
            <Link to={`/group/${groupId}/members`}>
              <CardButton buttonElement={CardData[1]} />
            </Link>
          </Flex>
        </Box>
      )}
    </Box>
  )
}
