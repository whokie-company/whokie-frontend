import { Suspense, useState } from 'react'

import { Box, Flex } from '@chakra-ui/react'

import { useAnswerQuestion } from '@/api/services/answer/common/useAnswerQuestion'
import { Loading } from '@/components/Loading'

import ProfileGrid from './ProfileGrid'
import Question from './Question'
import Buttons from './SkipReloadButton'
import useProfile from './UseProfilehook'

const MainPage = () => {
  const [questionIndex, setquestionIndex] = useState(0)
  const [questionId, setquestionId] = useState<number | null>(null)

  return (
    <Suspense fallback={<Loading />}>
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        padding="50px 0"
      >
        <Content
          questionIndex={questionIndex}
          setquestionIndex={setquestionIndex}
          questionId={questionId}
          setquestionId={setquestionId}
        />
      </Box>
    </Suspense>
  )
}

const Content = ({
  questionIndex,
  setquestionIndex,
  questionId,
  setquestionId,
}: {
  questionIndex: number
  setquestionIndex: React.Dispatch<React.SetStateAction<number>>
  questionId: number | null
  setquestionId: React.Dispatch<React.SetStateAction<number | null>>
}) => {
  const { all, picked, handleReload } = useProfile()
  const { mutate: answerQuestion } = useAnswerQuestion()

  const handleProfileSelect = (profileId: number) => {
    if (questionId !== null) {
      answerQuestion({ questionId, pickedId: profileId })
      handleReload()
      setquestionIndex((prevIndex) => (prevIndex + 1) % all.length)
    }
  }

  const handleSkip = () => {
    setquestionIndex((prevIndex) => (prevIndex + 1) % all.length)
  }

  return (
    <Box
      bg="secondary_background"
      textAlign="center"
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Question questionIndex={questionIndex} questionload={setquestionId} />
      <Box>
        <Flex direction="column" align="center">
          <ProfileGrid
            profiles={picked.slice(0, 3)}
            onProfileSelect={handleProfileSelect}
          />
          <ProfileGrid
            profiles={picked.slice(3, 5)}
            onProfileSelect={handleProfileSelect}
          />
          <Buttons onReload={handleReload} onSkip={handleSkip} />
        </Flex>
      </Box>
    </Box>
  )
}

export default MainPage
