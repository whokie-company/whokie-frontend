import { BiCookie } from 'react-icons/bi'
import { useLocation } from 'react-router-dom'

import { Box } from '@chakra-ui/react'

import { PageLayout } from '@/components/PageLayout'
import { useMyUserIdStore } from '@/stores/my-user-id'

import { CreateQuestionButton } from '../CreateQuestionButton'
import { QuestionList } from '../QuestionList'

export const QuestionSection = () => {
  const location = useLocation()
  const userId: number = location.state?.userId
  const myUserId = useMyUserIdStore((state) => state.myUserId)
  const isMyPage = Number(userId) === myUserId

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
        <QuestionList />
      </Box>
      {isMyPage && <CreateQuestionButton userId={userId} />}
    </PageLayout.SideSection>
  )
}
