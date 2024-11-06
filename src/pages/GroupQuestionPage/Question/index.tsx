import { useEffect, useState } from 'react'

import { Text } from '@chakra-ui/react'

import { useGroupQuestion } from '@/api/services/question/group.api'

type QuestionProps = {
  groupId: number
  questionIndex: number
  questionload: (questionId: number | null) => void
}

const Question = ({ groupId, questionIndex, questionload }: QuestionProps) => {
  const { data } = useGroupQuestion(groupId)
  const [questionText, setquestionText] = useState<string>('')

  useEffect(() => {
    if (data) {
      const { questions } = data
      if (questionIndex < questions.length) {
        const { content, questionId } = questions[questionIndex]
        setquestionText(content)
        questionload(questionId)
      } else {
        questionload(null)
      }
    }
  }, [data, questionIndex, questionload])

  return (
    <Text fontWeight="600" fontSize="4xl" color="text" paddingX={16}>
      {questionText}
    </Text>
  )
}

export default Question
