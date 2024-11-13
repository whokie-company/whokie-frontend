import { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BiError } from 'react-icons/bi'

import { Box, Input, useDisclosure } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { queryClient } from '@/api/instance'
import {
  ModifyGroupImgRequestBody,
  modifyGroupImg,
} from '@/api/services/group/group.api'
import { Form, FormControl, FormField, FormItem } from '@/components/Form'
import { AlertModal } from '@/components/Modal/AlertModal'
import { ModifyGroupImageFields, ModifyGroupImageSchema } from '@/schema/group'
import { Group, GroupRole } from '@/types'

type ImgModifyProps = {
  gprofile: Group
  role: GroupRole
}

export default function ImgModify({ role, gprofile }: ImgModifyProps) {
  const form = useForm<ModifyGroupImageFields>({
    resolver: zodResolver(ModifyGroupImageSchema),
    mode: 'onSubmit',
    defaultValues: {
      groupId: gprofile.groupId,
      image: new File([], ''),
    },
  })

  const [errorMessage, setErrorMessage] = useState('')
  const errorModal = useDisclosure()
  const [timeoutId, setTimeoutId] = useState<number | null>(null)

  const { mutate: uploadImage } = useMutation({
    mutationFn: (data: ModifyGroupImgRequestBody) => modifyGroupImg(data),
    onSuccess: () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      const newTimeoutId = setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['group', gprofile.groupId] })
        queryClient.invalidateQueries({ queryKey: ['groups'] })
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

  if (role === 'MEMBER') {
    return (
      <Box
        width="70px"
        height="70px"
        sx={{ border: '0.8px solid', borderColor: 'black.300' }}
        backgroundImage={`url('${gprofile.groupImageUrl}')`}
        backgroundSize="cover"
        backgroundPosition="center"
        borderRadius="100%"
      />
    )
  }

  return (
    <Box
      width="70px"
      height="70px"
      sx={{ border: '0.8px solid', borderColor: 'black.300' }}
      _hover={{ opacity: 0.5 }}
      cursor="pointer"
      onClick={() => document.getElementById('fileInput')?.click()}
      backgroundImage={`url('${gprofile.groupImageUrl}')`}
      backgroundSize="cover"
      backgroundPosition="center"
      borderRadius="100%"
    >
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormControl>
                  <Input
                    type="file"
                    id="fileInput"
                    accept=".jpg, .jpeg, .png"
                    display="none"
                    multiple={false}
                    onChange={handleFileChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
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
