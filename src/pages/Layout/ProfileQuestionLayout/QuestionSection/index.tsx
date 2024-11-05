import { BiCookie } from 'react-icons/bi'

import { Box } from '@chakra-ui/react'

import { PageLayout } from '@/components/PageLayout'

import { QuestionList } from '../QuestionList'

export const QuestionSection = () => {
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
    </PageLayout.SideSection>
  )
}
