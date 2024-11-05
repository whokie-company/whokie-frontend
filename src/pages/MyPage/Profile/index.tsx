import { useState } from 'react'

import { Avatar, Box, Button, Text } from '@chakra-ui/react'

import { MyPageItem } from '@/types'

type ProfileProps = {
  profile: MyPageItem
  pointAmount: number
  isMyPage: boolean
}

export default function Profile({
  profile,
  pointAmount,
  isMyPage,
}: ProfileProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <header>
      <Box
        height="144px"
        backgroundImage={`url('${profile.backgroundImageUrl}')`}
        backgroundSize="cover"
        backgroundPosition="center"
        position="relative"
        marginBottom="40px"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isMyPage && isHovered && (
          <Button
            aria-label="Edit"
            borderRadius={3}
            minWidth="20px"
            maxHeight="25px"
            padding="5px 8px"
            position="absolute"
            right="23px"
            fontSize="small"
            fontWeight="400"
            color="GrayText"
            border="0.4px solid"
            borderColor="black.700"
            bg="white"
          >
            Change Cover
          </Button>
        )}
        <Avatar
          src={profile.imageUrl}
          size="lg"
          position="absolute"
          bottom="-30px"
          left="30px"
        />
      </Box>
      <Box padding="0 30px">
        <Box display="flex" flexDirection="row" alignItems="center" gap="8px">
          <Text fontSize="xl" fontWeight="400">
            {profile.name}
          </Text>
          <Button
            color="primary_background"
            bg="#ea780c"
            display="flex"
            flexDirection="row"
            fontSize="xs"
            alignItems="center"
            padding="4px 7px"
            borderRadius="20px"
            minHeight="5px"
            height="auto"
            _hover={{ bg: 'orange.600', boxShadow: 'md' }}
          >
            <Text
              width="13px"
              height="13px"
              textAlign="center"
              lineHeight="1.05"
              borderRadius="20px"
              border="1px solid white"
              marginRight="3px"
            >
              P
            </Text>
            <Text fontWeight="bold" marginRight="6px">
              포인트
            </Text>
            <Text>{pointAmount}</Text>
          </Button>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          width="100%"
          justifyContent="space-between"
          alignItems="end"
        >
          <Text color="text_secondary" fontSize="md">
            {profile.description}
          </Text>
          <Text
            as="span"
            fontSize="xs"
            display="flex"
            flexDirection="row"
            gap="4.8px"
            padding="5px 9px"
            borderRadius="10px"
            border="1px solid"
            borderColor="brown.500"
          >
            <Text fontWeight="bold">TODAY</Text>
            <Text>{profile.todayVisited}</Text>
            <Text fontWeight="bold">TOTAL</Text>
            <Text>{profile.totalVisited}</Text>
          </Text>
        </Box>
      </Box>
    </header>
  )
}
