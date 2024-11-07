import { useEffect, useState } from 'react'

import { Text } from '@chakra-ui/react'

import { useRandomQuestion } from '@/api/services/question/random.api'

type QuestionProps = {
  questionIndex: number
  questionload: (questionId: number | null) => void
}

const Question = ({ questionIndex, questionload }: QuestionProps) => {
  const { data } = useRandomQuestion()
  const [questionText, setquestionText] = useState('')

  useEffect(() => {
    const { questions } = data
    if (questionIndex < questions.length) {
      const { content, questionId } = questions[questionIndex]
      setquestionText(content)
      questionload(questionId)
    } else {
      questionload(null)
    }
  }, [data, questionIndex, questionload])

  return (
    <Text fontWeight="600" fontSize="4xl" color="text" paddingX={16}>
      {questionText}
    </Text>
  )
}

export default Question
