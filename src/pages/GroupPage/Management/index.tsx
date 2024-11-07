import { BiCog, BiGroup, BiPlus } from 'react-icons/bi'

import { Box, Flex, Text } from '@chakra-ui/react'

import { CardButton } from '@/components/CardButton'

import { InviteMemberModal } from './InviteMemberModal'

interface ManagementProps {
  role: 'leader' | 'member'
}

export default function Management({ role }: ManagementProps) {
  return (
    <Box p="30px">
      <Flex gap={4} marginTop="10px" marginBottom="16px">
        <InviteMemberModal />
        <CardButton
          variant="white"
          orientation="horizontal"
          label="질문 추가"
          description="그룹 질문을 건의해보세요"
          Icon={BiPlus}
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
              variant="orange"
              orientation="vertical"
              label="질문 관리"
              description="그룹 질문을 관리해보세요"
              Icon={BiCog}
            />
            <CardButton
              variant="white"
              orientation="vertical"
              label="멤버 관리"
              description="그룹 멤버를 관리해보세요"
              Icon={BiGroup}
            />
          </Flex>
        </Box>
      )}
    </Box>
  )
}
