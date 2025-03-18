import { PageLayout } from '@/components/PageLayout/index'

import { QuestionSection } from './question-section'

export const ProfileQuestionLayout = () => {
  return <PageLayout LeftSection={<QuestionSection />} pageColor="brown.200" />
}
