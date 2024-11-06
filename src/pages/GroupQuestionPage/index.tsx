import { Suspense, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Box, Flex } from '@chakra-ui/react'

import { useAnswerGroupQuestion } from '@/api/services/answer/groupQuestion.api'
import { Loading } from '@/components/Loading'

import ProfileGrid from '../MainPage/ProfileGrid'
import Buttons from '../MainPage/SkipReloadButton'
import useProfile from '../MainPage/UseProfilehook'
import Question from './Question'

const GroupQuestionPage = () => {
  const { groupId } = useParams<{ groupId: string }>()
  const parsedGroupId = groupId ? parseInt(groupId, 10) : undefined
  const [questionIndex, setquestionIndex] = useState(0)
  const [questionId, setquestionId] = useState<number | null>(null)

  if (parsedGroupId === undefined) {
    return <Loading />
  }

  return (
    <Suspense fallback={<Loading />}>
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        padding="70px 0"
      >
        <Content
          groupId={parsedGroupId}
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
  groupId,
  questionIndex,
  setquestionIndex,
  questionId,
  setquestionId,
}: {
  groupId: number
  questionIndex: number
  setquestionIndex: React.Dispatch<React.SetStateAction<number>>
  questionId: number | null
  setquestionId: React.Dispatch<React.SetStateAction<number | null>>
}) => {
  const { all, picked, handleReload } = useProfile()
  const { mutate: answerQuestion } = useAnswerGroupQuestion()

  const handleProfileSelect = (profileId: number) => {
    if (questionId !== null) {
      answerQuestion({ questionId, groupId, pickedId: profileId })
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
      <Question
        groupId={groupId}
        questionIndex={questionIndex}
        questionload={setquestionId}
      />
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

export default GroupQuestionPage
