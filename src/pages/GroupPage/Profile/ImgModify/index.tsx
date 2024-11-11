import { useEffect, useState } from 'react'

import { Box, Input, useToast } from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@/api/instance'
import { modifyGroupImg } from '@/api/services/group/group.api'
import { Group, GroupRole } from '@/types'

type ImgModifyProps = {
  gprofile: Group
  role: GroupRole
}

export default function ImgModify({ role, gprofile }: ImgModifyProps) {
  const [file, setFile] = useState<File | null>(null)
  const toast = useToast()

  const { mutate: uploadImage } = useMutation({
    mutationFn: (data: { image: File }) =>
      modifyGroupImg(gprofile.groupId, data),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['groupPage', gprofile.groupId],
      })
      queryClient.invalidateQueries({ queryKey: ['group', gprofile.groupId] })
    },
    onError: () => {},
  })

  useEffect(() => {
    if (file && role === 'LEADER') {
      uploadImage({ image: file })
    }
  }, [file, uploadImage, role])

  const openFilePicker = () => {
    if (role === 'LEADER') {
      document.getElementById('fileInput')?.click()
    }
  }

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png']
      const maxFileSize = 10 * 1024 * 1024
      if (!validTypes.includes(selectedFile.type)) {
        toast({
          title: 'Only JPEG, JPG, or PNG files are allowed.',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        })
        return
      }
      if (selectedFile.size > maxFileSize) {
        toast({
          title: '이미지 파일은 10MB를 초과할 수 없습니다',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        })
        return
      }
      setFile(selectedFile)
    }
  }

  return (
    <Box
      width="70px"
      height="70px"
      sx={{ border: '0.8px solid', borderColor: 'black.300' }}
      _hover={role === 'LEADER' ? { opacity: 0.5 } : { opacity: 1 }}
      cursor={role === 'LEADER' ? 'pointer' : 'default'}
      onClick={openFilePicker}
      backgroundImage={`url('${gprofile.groupImageUrl}')`}
      backgroundSize="cover"
      backgroundPosition="center"
      borderRadius="100%"
    >
      <Input
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        accept="image/*"
        onChange={onChangeFile}
      />
    </Box>
  )
}
