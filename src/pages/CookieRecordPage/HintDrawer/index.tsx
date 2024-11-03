import { Flex } from '@chakra-ui/react'

import { AnswerDetail } from './AnswerDetail'
import { HintList } from './HintList'
import { MyPoint } from './MyPoint'

interface HintDrawerProps {
  isOpen: boolean
}

export const HintDrawer = ({ isOpen }: HintDrawerProps) => {
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
          <Flex flexDirection="column" alignItems="center">
            <AnswerDetail />
            <HintList />
          </Flex>
        </Flex>
      )}
    </div>
  )
}
