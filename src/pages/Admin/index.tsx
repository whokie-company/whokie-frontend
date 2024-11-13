import { useNavigate } from 'react-router-dom'

import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'

import { getAdminQuestionsQuries } from '@/api/services/admin/admin'
import cookies from '@/assets/cookies.svg'
import { Loading } from '@/components/Loading'

import ErrorPage from '../ErrorPage'

export default function Admin() {
  const { data, status, isLoading, isError } = useQuery(
    getAdminQuestionsQuries.adminQuestions(0, 10)
  )

  const navigate = useNavigate()

  if (status === 'pending' || isLoading) return <Loading />
  if (isError) return <ErrorPage />

  console.log(data)

  return (
    <Flex
      width="full"
      margin="auto 30%"
      flexDirection="column"
      justifyContent="center"
      alignContent="center"
    >
      <Image margin="20px 60px" src={cookies} />
      <Box textAlign="center">
        <Text fontWeight={700} fontSize="xx-large" marginBottom={18}>
          Whokie 관리자 페이지
        </Text>
      </Box>
      <Flex margin="0 20px" flexDirection="column" gap={3}>
        <Button
          bg="primary"
          color="white"
          _hover={{ bg: 'orange.500' }}
          onClick={() => navigate('/admin/get/questions')}
        >
          질문 보기
        </Button>
        <Button bg="brown.500" color="white" _hover={{ bg: 'brown.600' }}>
          질문 만들기
        </Button>
        <Button bg="primary" color="white" _hover={{ bg: 'orange.500' }}>
          관리자 리스트
        </Button>
        <Button bg="brown.500" color="white" _hover={{ bg: 'brown.600' }}>
          그룹 리스트
        </Button>
      </Flex>
    </Flex>
  )
}
