import { Text } from '@chakra-ui/react'

interface VisitedTagProps {
  today: number
  total: number
}

export const VisitedTag = ({ today, total }: VisitedTagProps) => {
  return (
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
      <Text>{today}</Text>
      <Text fontWeight="bold">TOTAL</Text>
      <Text>{total}</Text>
    </Text>
  )
}
