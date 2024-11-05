import { BiEditAlt } from 'react-icons/bi'

import {
  Avatar,
  Box,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react'

import { Group } from '@/types'

type GroupProps = {
  gprofile: Group
  role: 'leader' | 'member'
}

export default function Profile({ role, gprofile }: GroupProps) {
  return (
    <header>
      <Box position="relative" marginBottom="60px">
        <HStack
          alignItems="center"
          spacing="15px"
          paddingLeft="25px"
          marginTop="30px"
        >
          <Box position="relative">
            <Avatar
              src={gprofile?.groupdImageUrl}
              width="70px"
              height="70px"
              sx={{
                border: '0.8px solid',
                borderColor: 'black.300',
              }}
            />
          </Box>

          <VStack align="flex-start" spacing={0}>
            <HStack spacing={2} alignItems="center">
              <Text fontSize="xl">{gprofile?.groupName}</Text>
              <Text
                fontSize="xs"
                padding="3px 6px"
                borderRadius="8px"
                border="1px solid"
                borderColor="primary"
                fontWeight="bold"
                color="primary"
              >
                {role === 'leader' ? '그룹장' : '그룹원'}
              </Text>
            </HStack>

            <HStack spacing={2} alignItems="center">
              <Text color="text_secondary" fontSize="md">
                {gprofile?.groupDescription}
              </Text>
              {role === 'leader' && (
                <IconButton
                  aria-label="Edit"
                  icon={<Icon as={BiEditAlt} boxSize="10px" />}
                  borderRadius="20px"
                  minWidth="20px"
                  width="20px"
                  height="20px"
                  padding="0"
                  border="1px solid"
                  borderColor="black.400"
                />
              )}
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </header>
  )
}
