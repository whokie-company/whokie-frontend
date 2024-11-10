import { Box, Flex, Text } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'

import { getAdminQuestionsQuries } from '@/api/services/admin/admin'
import { Loading } from '@/components/Loading'
import ErrorPage from '@/pages/ErrorPage'

export default function GetQuestionAdminPage() {
  const {
    data: questions,
    status,
    isLoading,
    isError,
  } = useQuery(getAdminQuestionsQuries.adminQuestions(0, 10))

  if (status === 'pending' || isLoading) return <Loading />
  if (isError) return <ErrorPage />
  if (!questions) return '질문 아무것도 없음'

  const questionsList = questions.questions
  const totalElements = questions?.totalElements
  const totalPages = questions?.totalPages

  return (
    <Flex width="100%" justifyContent="center" margin="40px auto">
      <Box textAlign="center" width="100%" padding="0 50px">
        <Text fontWeight={600} fontSize="x-large" marginBottom={10}>
          질문 리스트
        </Text>
        <Flex flexDirection="column" gap={2}>
          <Flex
            borderBottom="1px solid"
            borderColor="brown.700"
            paddingBottom={2}
          >
            <Box width="80px">questionId</Box>
            <Box width="80px">groupId</Box>
            <Box width={400}>questionContent</Box>
            <Box width={200}>createdAt</Box>
            <Box width={100} color="orange.700">
              status
            </Box>
          </Flex>
          {questionsList.map((question, idx) => (
            <Flex
              key={question.questionId}
              borderBottom={idx === 7 ? '' : '1px solid'}
              borderColor="brown.500"
              paddingBottom={2}
            >
              <Box width="80px">{question.questionId}</Box>
              <Box width="80px">{question.groupId}</Box>
              <Box width={400}>{question.questionContent}</Box>
              <Box width={200}>{question.createdAt}</Box>
              <Box width={100} color="orange.700">
                {question.status}
              </Box>
            </Flex>
          ))}
        </Flex>
      </Box>
    </Flex>
  )
}
