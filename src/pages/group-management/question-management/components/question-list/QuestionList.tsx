import { Box, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@/api/instance'
import {
  ApproveGroupQuestionRequest,
  approveGroupQuestion,
} from '@/api/services/group/group.api'
import { useGroupQuestionPaging } from '@/api/services/question/group.api'
import { IntersectionObserverLoader } from '@/components/IntersectionObserverLoader'
import { Loading } from '@/components/Loading'
import { QuestionStatus } from '@/types'

interface GroupQuestionListProps {
  groupId: number
  status: QuestionStatus
}

export const GroupQuestionList = ({
  groupId,
  status,
}: GroupQuestionListProps) => {
  const { mutate } = useMutation({
    mutationFn: ({ questionId, approve }: ApproveGroupQuestionRequest) =>
      approveGroupQuestion({ groupId, questionId, approve }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['groups', 'question'],
      })
      queryClient.invalidateQueries({
        queryKey: ['question', 'common', 'random', 'group', groupId],
      })
    },
  })

  const {
    data,
    status: fetchStatus,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGroupQuestionPaging({
    groupId,
    status,
  })
  const questions = data?.pages.flatMap((page) => page.questions)

  if (fetchStatus === 'pending') return <Loading />
  if (error) return <Text>질문을 불러오는 데 실패했습니다.</Text>
  if (!questions) return <Text>질문이 없습니다.</Text>

  return (
    <Box maxHeight="336px" overflowY="scroll">
      <Stack spacing="15px">
        {questions.map((question) => (
          <Box
            key={question.questionId}
            p="10px"
            bg="white"
            borderRadius="8px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text fontSize="16px" flex="1">
              {question.questionContent}
            </Text>
            <RadioGroup value={question.status}>
              <Stack direction="row">
                <Radio
                  name="status"
                  value="APPROVED"
                  colorScheme="green"
                  onClick={() =>
                    mutate({ questionId: question.questionId, approve: true })
                  }
                />
                <Radio
                  name="status"
                  value="REJECTED"
                  colorScheme="red"
                  onClick={() =>
                    mutate({ questionId: question.questionId, approve: false })
                  }
                />
              </Stack>
            </RadioGroup>
          </Box>
        ))}
      </Stack>
      {hasNextPage && (
        <IntersectionObserverLoader
          callback={() => {
            if (!isFetchingNextPage) {
              fetchNextPage()
            }
          }}
        />
      )}
    </Box>
  )
}
