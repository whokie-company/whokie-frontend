import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BiError } from 'react-icons/bi'

import { Avatar, Box, Button, Input, useDisclosure } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@/api/instance'
import { uploadProfileBg } from '@/api/services/profile/my-page.api'
import { Form, FormControl, FormField, FormItem } from '@/components/Form'
import { AlertModal } from '@/components/Modal/AlertModal'
import {
  ModifyBackgroundImageField,
  ModifyBackgroundImageSchema,
} from '@/schema/profile'
import { useUserInfoStore } from '@/stores/user-info'

interface ProfileImageProps {
  backgroundImage: string
  profileImage: string
}

export const ProfileImage = ({
  backgroundImage,
  profileImage,
}: ProfileImageProps) => {
  const userId = useUserInfoStore((state) => state.userInfo?.userId)

  const form = useForm<ModifyBackgroundImageField>({
    resolver: zodResolver(ModifyBackgroundImageSchema),
    mode: 'onSubmit',
    defaultValues: {
      image: new File([], ''),
    },
  })

  const [errorMessage, setErrorMessage] = useState('')
  const [currentBackgroundImage, setCurrentBackgroundImage] =
    useState(backgroundImage)
  const errorModal = useDisclosure()
  const [timeoutId, setTimeoutId] = useState<number | null>(null)

  const { mutate: uploadImage } = useMutation({
    mutationFn: (data: { image: File }) => uploadProfileBg(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myPage', userId] })

      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      const newTimeoutId = setTimeout(() => {
        setCurrentBackgroundImage(URL.createObjectURL(form.getValues('image')))
      }, 2000)

      setTimeoutId(newTimeoutId)
    },
  })

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [timeoutId])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null

    if (file) {
      form.setValue('image', file)
      form.handleSubmit(
        () => {
          uploadImage(form.getValues())
        },
        (errors) => {
          const errorMessages =
            Object.values(errors).flatMap((error) => error.message)[0] || ''

          setErrorMessage(errorMessages)
          errorModal.onOpen()
        }
      )()
    }
  }

  return (
    <Box
      height="144px"
      backgroundImage={`url('${currentBackgroundImage}')`}
      backgroundSize="cover"
      backgroundPosition="center"
      position="relative"
      marginBottom="40px"
    >
      <Form {...form}>
        <form>
          <Button
            aria-label="Edit"
            borderRadius={3}
            minWidth="20px"
            maxHeight="25px"
            padding="5px 8px"
            position="absolute"
            right="23px"
            top="10px"
            fontSize="small"
            fontWeight="400"
            color="GrayText"
            border="0.4px solid"
            borderColor="black.700"
            bg="white"
            onClick={() => document.getElementById('fileInput')?.click()}
          >
            Change Cover
          </Button>
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormControl>
                  <Input
                    id="fileInput"
                    accept=".jpg, .jpeg, .png"
                    type="file"
                    multiple={false}
                    display="none"
                    onChange={handleFileChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
      <Avatar
        src={profileImage}
        size="lg"
        position="absolute"
        bottom="-30px"
        left="30px"
      />
      <AlertModal
        isOpen={errorModal.isOpen}
        onClose={errorModal.onClose}
        icon={<BiError />}
        title={errorMessage}
        description=""
      />
    </Box>
  )
}
