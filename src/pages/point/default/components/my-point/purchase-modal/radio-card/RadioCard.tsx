import { Box, Flex, Text, UseRadioProps, useRadio } from '@chakra-ui/react'

interface PointRadioCardProps {
  radio: UseRadioProps
  value: string
}

export const PointRadioCard = ({ radio, value }: PointRadioCardProps) => {
  const { getInputProps, getRadioProps } = useRadio(radio)

  const input = getInputProps()
  const checkbox = getRadioProps()

  return (
    <Box as="label">
      <input {...input} />
      <Flex
        {...checkbox}
        justifyContent="space-between"
        cursor="pointer"
        borderWidth="1px"
        _checked={{
          borderColor: 'primary',
          background: 'primary_background',
        }}
        px={5}
        py={3}
      >
        <div>{value}P</div>
        <Text color="text_description">결제 금액 {Number(value) * 10}원</Text>
      </Flex>
    </Box>
  )
}
