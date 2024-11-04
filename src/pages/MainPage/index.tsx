import { Suspense, useState } from 'react'

import { Box, Flex } from '@chakra-ui/react'

import { Loading } from '@/components/Loading'

import ProfileGrid from './ProfileGrid'
import Question from './Question'
import Buttons from './SkipReloadButton'
import useProfile from './UseProfilehook'

const MainPage = () => {
  const [questionIndex, setquestionIndex] = useState(0)

  return (
    <Suspense fallback={<Loading />}>
      <Content
        questionIndex={questionIndex}
        setquestionIndex={setquestionIndex}
      />
    </Suspense>
  )
}

const Content = ({
  questionIndex,
  setquestionIndex,
}: {
  questionIndex: number
  setquestionIndex: React.Dispatch<React.SetStateAction<number>>
}) => {
  const { all, picked, handleReload } = useProfile()
  const handleProfileSelect = () => {
    setquestionIndex((prevIndex) => (prevIndex + 1) % all.length)
  }

  const handleSkip = () => {
    setquestionIndex((prevIndex) => (prevIndex + 1) % all.length)
  }

  return (
    <Box bg="secondary_background" borderRadius="20px" textAlign="center">
      <Question questionIndex={questionIndex} />
      <Box p={24}>
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
