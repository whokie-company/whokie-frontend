import { ErrorBoundary } from 'react-error-boundary'

import { useQueryErrorResetBoundary } from '@tanstack/react-query'

import { PageLayout } from '@/components/PageLayout/index'

import { GlobalErrorFallback } from './error-fallback'
import { GroupSection } from './group-section'
import { MemberSection } from './member-section'

export const MainLayout = () => {
  const { reset } = useQueryErrorResetBoundary()

  return (
    <ErrorBoundary FallbackComponent={GlobalErrorFallback} onReset={reset}>
      <PageLayout
        LeftSection={<GroupSection />}
        RightSection={<MemberSection />}
      />
    </ErrorBoundary>
  )
}
