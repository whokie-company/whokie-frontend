import { BiChevronLeft } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

import { Box, Center, Divider, Flex, Text } from '@chakra-ui/react'

interface PageHeaderProps {
  page: string
}

export const PageHeader = ({ page }: PageHeaderProps) => {
  const navigate = useNavigate()

  return (
    <Flex flexDirection="column">
      <Box height={8} display="flex" flexDirection="row" width="full">
        <Center
          paddingX={2}
          _hover={{ cursor: 'pointer', color: 'black.700' }}
          onClick={() => navigate(-1)}
        >
          <BiChevronLeft size={20} />
        </Center>
        <Text height="100%" lineHeight="2" fontWeight="bold">
          {page}
        </Text>
      </Box>
      <Divider borderColor="brown.200" />
    </Flex>
  )
}
