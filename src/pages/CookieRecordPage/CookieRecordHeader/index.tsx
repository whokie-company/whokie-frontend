import { Box, Divider, Flex, Text } from '@chakra-ui/react'

import GoBack from '@/components/GoBack'

export const CookieRecordHeader = () => {
  return (
    <Flex flexDirection="column">
      <Box height={8} display="flex" flexDirection="row" width="full">
        <GoBack goBack />
        <Text height="100%" lineHeight="2" fontWeight="bold">
          쿠키 기록
        </Text>
      </Box>
      <Divider borderColor="brown.200" />
    </Flex>
  )
}
