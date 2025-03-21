import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { Loading } from '@/components/Loading'
import { PageLayout } from '@/components/PageLayout/index'

import { GroupSection } from '../main/group-section'

export const GroupMemberLayout = () => {
  return (
    <PageLayout LeftSection={<GroupSection />} pageColor="brown.50">
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </PageLayout>
  )
}
