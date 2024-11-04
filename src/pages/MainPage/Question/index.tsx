import { useEffect, useState } from 'react'

import { Text } from '@chakra-ui/react'

import { useRandomQuestion } from '@/api/services/question/random.api'

type QuestionProps = {
  questionIndex: number
}

const Question = ({ questionIndex }: QuestionProps) => {
  const { data } = useRandomQuestion()
  const [questionText, setquestionText] = useState('')
  const [marginTop, setMarginTop] = useState<number>(0)

  useEffect(() => {
    const { questions } = data
    if (questionIndex < questions.length) {
      const { content } = questions[questionIndex]
      setquestionText(content)

      const { length } = content
      if (length <= 15) {
        setMarginTop(24)
      } else if (length <= 30) {
        setMarginTop(16)
      } else {
        setMarginTop(8)
      }
    }
  }, [data, questionIndex])

  return (
    <Text
      fontWeight="600"
      fontSize="4xl"
      color="text"
      mt={marginTop}
      paddingX={16}
    >
      {questionText}
    </Text>
  )
}

export default Question
