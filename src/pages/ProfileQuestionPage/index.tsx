import { BiX } from 'react-icons/bi'
import { useLocation, useNavigate } from 'react-router-dom'

import { Box, Button, Flex } from '@chakra-ui/react'

import { useSelectedQuestionStore } from '@/stores/selected-question'
import { useUserInfoStore } from '@/stores/user-info'

import Answer from './Answer'
import Question from './Question'
import WriteReply from './WriteReply'

export default function ProfileQuestionPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const userId: number = location.state?.userId
  const myUserId = useMyUserIdStore((state) => state.myUserId)
  const { selectedQuestion } = useSelectedQuestionStore()

  const isMyPage = Number(userId) === myUserId

  return (
    <Flex
      overflowY="hidden"
      position="relative"
      height="100%"
      flexDirection="column"
      justifyContent="flex-start"
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
      {userId && <Answer userId={userId} isMyPage={isMyPage} />}

      {!isMyPage && selectedQuestion.questionId && (
        <WriteReply userId={userId} questionId={selectedQuestion.questionId} />
      )}
    </Flex>
  )
}
