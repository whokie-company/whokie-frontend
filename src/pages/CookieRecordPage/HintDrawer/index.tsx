import { Flex } from '@chakra-ui/react'

import { useSelectedAnswerStore } from '@/stores/selected-answer'

import { AnswerDetail } from './AnswerDetail'
import { HintList } from './HintList'
import { MyPoint } from './MyPoint'

interface HintDrawerProps {
  isOpen: boolean
}

export const HintDrawer = ({ isOpen }: HintDrawerProps) => {
  const selectedAnswer = useSelectedAnswerStore((state) => state.selectedAnswer)

  return (
    <div id="hint-drawer">
      {isOpen && (
        <Flex
          height="full"
          width={80}
          position="absolute"
          top={0}
          right={0}
          zIndex={10}
          boxShadow="4px 0px 12px rgba(0, 0, 0, 0.5)"
          borderLeftRadius="24px"
          background="white"
          flexDirection="column"
          paddingY={8}
          paddingX={4}
        >
          <MyPoint />
          {selectedAnswer && (
            <Flex flexDirection="column" alignItems="center">
              <AnswerDetail answer={selectedAnswer} />
              <HintList answerId={selectedAnswer.answerId} />
            </Flex>
          )}
        </Flex>
      )}
    </div>
  )
}
