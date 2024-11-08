import { FallbackProps } from 'react-error-boundary'

import { InviteCardSkeleton } from '../InviteCard'
import { InviteErrorMoal } from './ErrorModal'

export const InviteErrorFallback = ({ error }: FallbackProps) => {
  const { status } = error

  if (status === 403) {
    return (
      <>
        <InviteCardSkeleton />
        <InviteErrorMoal errorMessage="이미 가입된 그룹입니다." />
      </>
    )
  }

  return (
    <>
      <InviteCardSkeleton />
      <InviteErrorMoal
        errorMessage={error.message}
        detailMessage="잠시후 다시 시도해주세요."
      />
    </>
  )
}
