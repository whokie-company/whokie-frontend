import { Box } from '@chakra-ui/react'

type TitleProps = {
  totalElements?: number
  groupName: string
}

export default function Title({ groupName, totalElements = 0 }: TitleProps) {
  return (
    <Box padding="40px 50px 25px">
      <Box fontWeight="bold" fontSize="larger" paddingBottom="10px">
        {groupName}
      </Box>
      <Box textAlign="end">총 {totalElements}명</Box>
    </Box>
  )
}
