import { BiX } from 'react-icons/bi'
import { useLocation, useNavigate } from 'react-router-dom'

import { Box, Button, Flex } from '@chakra-ui/react'

import { useMyUserIdStore } from '@/stores/my-user-id'
import { useSelectedQuestionStore } from '@/stores/selected-question'

import Answer from './Answer'
import Question from './Question'
import WriteReply from './WriteReply'

export default function ProfileQuestionPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const userId = location.state?.userId
  const myUserId = useMyUserIdStore((state) => state.myUserId)
  const questionId = useSelectedQuestionStore((state) => state.questionId)

  const isMyPage = Number(userId) === myUserId

  return (
    <Flex
      overflowY="hidden"
      position="relative"
      height="100%"
      flexDirection="column"
      justifyContent="start"
    >
      <Box
        bg="brown.200"
        zIndex="1000"
        width="784px"
        borderTopRightRadius="20px"
      >
        <Flex justifyContent="end" padding="10px">
          <Button
            bg="none"
            _hover={{ background: 'none' }}
            fontSize="large"
            padding="0"
            onClick={() => navigate(-1)}
          >
            <BiX />
          </Button>
        </Flex>
        <Question />
      </Box>

      {/* 이 영역만 스크롤 */}
      {questionId && (
        <Answer userId={userId} questionId={questionId.toString()} />
      )}

      {!isMyPage && <WriteReply />}
    </Flex>
  )
}

// const dummyDataList: ChatItem[] = [
//   {
//     chatId: 1,
//     direction: 'right' as const,
//     createdAt: '2024-10-20',
//     content: '채팅 컴포넌트 시험 중입니다.',
//   },
//   {
//     chatId: 2,
//     direction: 'right' as const,
//     createdAt: '2024-10-21',
//     content:
//       '채팅창의 height가 자유롭게 조절 가능한지 시험 중입니다. 말을 길게 썼을 때는 채팅창이 세로로 길어집니다.',
//   },
//   {
//     chatId: 3,
//     direction: 'right' as const,
//     createdAt: '2024-10-20',
//     content: '채팅 컴포넌트 시험 중입니다.',
//   },
//   {
//     chatId: 4,
//     direction: 'right' as const,
//     createdAt: '2024-10-21',
//     content:
//       '채팅창의 height가 자유롭게 조절 가능한지 시험 중입니다. 말을 길게 썼을 때는 채팅창이 세로로 길어집니다.',
//   },
//   {
//     chatId: 5,
//     direction: 'right' as const,
//     createdAt: '2024-10-20',
//     content: '채팅 컴포넌트 시험 중입니다.',
//   },
//   {
//     chatId: 6,
//     direction: 'right' as const,
//     createdAt: '2024-10-21',
//     content:
//       '채팅창의 height가 자유롭게 조절 가능한지 시험 중입니다. 말을 길게 썼을 때는 채팅창이 세로로 길어집니다.',
//   },
//   {
//     chatId: 7,
//     direction: 'right' as const,
//     createdAt: '2024-10-21',
//     content:
//       '채팅창의 height가 자유롭게 조절 가능한지 시험 중입니다. 말을 길게 썼을 때는 채팅창이 세로로 길어집니다.',
//   },
// ]
