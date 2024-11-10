import { Avatar, HStack, StackProps, Text } from '@chakra-ui/react'

interface AvatarLabelProps extends StackProps {
  avatarSrc?: string
  label: string
}

export const AvatarLabel = ({ avatarSrc, label }: AvatarLabelProps) => {
  return (
    <HStack gap={1.5}>
      <Avatar width={7} height={7} src={avatarSrc} />
      <Text>{label}</Text>
    </HStack>
  )
}
