import { useState } from 'react'
import { BiError } from 'react-icons/bi'

import {
  Avatar,
  Box,
  Button,
  Input,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@/api/instance'
import { uploadProfileBg } from '@/api/services/profile/my-page.api'
import { AlertModal } from '@/components/Modal/AlertModal'
import { MyPageItem } from '@/types'

type ProfileProps = {
  profile: MyPageItem
  pointAmount?: number | null
  isMyPage: boolean
  userId: number
}

export default function Profile({
  profile,
  pointAmount = null,
  isMyPage,
  userId,
}: ProfileProps) {
  const toast = useToast()
  const [isHovered, setIsHovered] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const errorAlert = useDisclosure()

  const { mutate: uploadImage } = useMutation({
    mutationFn: (data: { image: File }) => uploadProfileBg(data),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['myPage', userId],
      })
      queryClient.invalidateQueries({ queryKey: ['uploadProfileBg'] })
    },
    onError: () => {
      errorAlert.onOpen()
    },
  })

  const openFilePicker = () => {
    document.getElementById('fileInput')?.click()
  }

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png']
      if (!validTypes.includes(selectedFile.type)) {
        toast({
          title: 'Only JPEG, JPG, or PNG files are allowed.',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        })
        return
      }
      setFile(selectedFile)
      uploadImage({ image: selectedFile })
    }
  }

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
            onClick={openFilePicker}
          >
            Change Cover
          </Button>
        )}
        <Input
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={onChangeFile}
        />
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
          {isMyPage && (
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
          )}
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
      <AlertModal
        isOpen={errorAlert.isOpen}
        onClose={errorAlert.onClose}
        icon={<BiError />}
        title="사진 등록에 실패하였습니다"
        description=""
      />
    </header>
  )
}
