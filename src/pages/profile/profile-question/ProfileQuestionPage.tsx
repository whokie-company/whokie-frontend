import { BiX } from 'react-icons/bi'
import { useLocation, useNavigate } from 'react-router-dom'

import { Box, Button, Center, Flex, Text } from '@chakra-ui/react'

import { useSelectedQuestionStore } from '@/stores/selected-question'
import { useUserInfoStore } from '@/stores/user-info'

import { AnswerBox, QuestionBox, WriteReply } from './components'

export default function ProfileQuestionPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const userId: number = location.state?.userId
  const myUserId = useUserInfoStore((state) => state.userInfo?.userId)

  const isMyPage = Number(userId) === myUserId
  const selectedQuestion = useSelectedQuestionStore(
    (state) => state.selectedQuestion
  )

  if (!selectedQuestion)
    return (
      <Flex
        overflowY="hidden"
        position="relative"
        height="full"
        flexDirection="column"
        justifyContent="flex-start"
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
        {isMyPage ? (
          <Center paddingTop="14rem">
            <Text fontSize="large">질문이 없습니다😢 질문을 생성해주세요</Text>
          </Center>
        ) : (
          <Center paddingTop="14rem">
            <Text fontSize="large">답변할 질문이 없습니다😢</Text>
          </Center>
        )}
      </Flex>
    )

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
        <QuestionBox question={selectedQuestion} />
      </Box>

      {/* 이 영역만 스크롤 */}
      {userId && (
        <AnswerBox
          userId={userId}
          isMyPage={isMyPage}
          questionId={selectedQuestion.questionId}
        />
      )}

      {!isMyPage && (
        <WriteReply userId={userId} questionId={selectedQuestion.questionId} />
      )}
    </Flex>
  )
}
