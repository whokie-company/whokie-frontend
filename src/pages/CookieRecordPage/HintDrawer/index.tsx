import { Flex, Tag, Text } from '@chakra-ui/react'

import { AnswerDetail } from './AnswerDetail'
import { HintList } from './HintList'

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
          <Flex justifyContent="end">
            <Tag
              background="orange.500"
              rounded="full"
              fontSize="x-small"
              color="white"
              fontWeight="bold"
            >
              <Text fontWeight="bold" marginRight="6px">
                포인트
              </Text>
              <Text>100</Text>
            </Tag>
          </Flex>
          <Flex flexDirection="column" alignItems="center">
            <AnswerDetail />
            <HintList />
          </Flex>
        </Flex>
      )}
    </div>
  )
}
