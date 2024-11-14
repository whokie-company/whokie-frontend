import { BiCookie } from 'react-icons/bi'
import { useLocation } from 'react-router-dom'

import { Box } from '@chakra-ui/react'

import { useGetProfileQuestion } from '@/api/services/profile/profile-question.api'
import { Loading } from '@/components/Loading'
import { PageLayout } from '@/components/PageLayout'
import ErrorPage from '@/pages/ErrorPage'
import { useUserInfoStore } from '@/stores/user-info'

import { CreateQuestionButton } from '../CreateQuestionButton'
import { QuestionListSection } from './QuestionList'

export const QuestionSection = () => {
  const location = useLocation()
  const userId: number = location.state?.userId
  const myUserId = useUserInfoStore((state) => state.userInfo?.userId)
  const isMyPage = Number(userId) === myUserId

  const { data: questions, status, error } = useGetProfileQuestion(userId)

  if (status === 'pending') return <Loading />
  if (error) return <ErrorPage />

  return (
    <PageLayout.SideSection
      SectionHeader={
        <PageLayout.SideSection.SectionHeader
          Icon={BiCookie}
          title="프로필 질문"
        />
      }
    >
      <Box fontSize="small">
        <QuestionListSection
          isMyPage={isMyPage}
          questions={questions}
          userId={userId}
        />
      </Box>
      {isMyPage && <CreateQuestionButton userId={userId} />}
    </PageLayout.SideSection>
  )
}
