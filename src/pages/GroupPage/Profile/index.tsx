import { useState } from 'react'
import { BiCheck, BiEditAlt } from 'react-icons/bi'

import {
  Avatar,
  Box,
  HStack,
  Icon,
  IconButton,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react'

import { modifyGroup } from '@/api/services/group/group.api'
import { Group } from '@/types'

type GroupProps = {
  gprofile: Group
  role: 'leader' | 'member'
}

export default function Profile({ role, gprofile }: GroupProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [groupName, setGroupName] = useState(gprofile.groupName)
  const [groupDescription, setGroupDescription] = useState(
    gprofile.groupDescription
  )

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveClick = async () => {
    await modifyGroup(gprofile.groupId, groupName, groupDescription)
    setIsEditing(false)
  }

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
              {isEditing ? (
                <Input
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  fontSize="xl"
                  width="180px"
                  textColor="black.500"
                  border="none"
                  _focus={{ color: 'black.800' }}
                  padding="0"
                  height="auto"
                  lineHeight="normal"
                  verticalAlign="middle"
                />
              ) : (
                <Text fontSize="xl">{groupName}</Text>
              )}
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
              {isEditing ? (
                <Input
                  value={groupDescription}
                  onChange={(e) => setGroupDescription(e.target.value)}
                  color="text_secondary"
                  fontSize="md"
                  width="320px"
                  textColor="black.500"
                  border="none"
                  _focus={{ color: 'black.800' }}
                  padding="0"
                  height="auto"
                  lineHeight="normal"
                  verticalAlign="middle"
                />
              ) : (
                <Text color="text_secondary" fontSize="md">
                  {groupDescription}
                </Text>
              )}
              {role === 'leader' && (
                <IconButton
                  aria-label="Edit"
                  icon={
                    isEditing ? (
                      <Icon as={BiCheck} boxSize="12px" />
                    ) : (
                      <Icon as={BiEditAlt} boxSize="10px" />
                    )
                  }
                  borderRadius="20px"
                  minWidth="20px"
                  width="20px"
                  height="20px"
                  padding="0"
                  border="1px solid"
                  borderColor="black.400"
                  onClick={isEditing ? handleSaveClick : handleEditClick}
                />
              )}
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </header>
  )
}
