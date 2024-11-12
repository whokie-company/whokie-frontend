import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react'

export default function RegisterPage() {
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="full"
      gap={6}
      p={4}
    >
      <Heading color="brown.600" size="xl" fontWeight="800">
        회원가입
      </Heading>
      <Text color="gray.600" fontSize="md" textAlign="center">
        가입을 통해 더 다양한 서비스를 만나보세요!
      </Text>

      <Box width="100%" maxWidth="400px">
        <Text fontWeight="bold" mb={2}>
          이름
        </Text>
        <Input placeholder="이름 입력" />
      </Box>

      <Box width="100%" maxWidth="400px">
        <Text fontWeight="bold" mb={2}>
          성별
        </Text>
        <RadioGroup>
          <Stack direction="row" spacing={5}>
            <Radio value="남" colorScheme="brown">
              남
            </Radio>
            <Radio value="여" colorScheme="brown">
              여
            </Radio>
          </Stack>
        </RadioGroup>
      </Box>

      <Box width="100%" maxWidth="400px">
        <Text fontWeight="bold" mb={2}>
          나이
        </Text>
        <Input type="number" placeholder="나이 입력" />
      </Box>

      <Button
        bg="brown.500"
        color="secondary_background"
        _hover={{ bg: 'brown.600' }}
        size="lg"
        width="100%"
        maxWidth="400px"
        mt={6}
      >
        가입하기
      </Button>
    </Flex>
  )
}
