import { FallbackProps } from 'react-error-boundary'

import { InviteCardSkeleton } from '../InviteCard'
import {
  InviteErrorMoal,
  InviteErrorMoalForbidden,
  InviteErrorMoalLogin,
} from './ErrorModal'

export const InviteErrorFallback = ({ error }: FallbackProps) => {
  const { status } = error

  if (status === 401) {
    return (
      <>
        <InviteCardSkeleton />
        <InviteErrorMoalLogin errorMessage="로그인 후 초대를 수락해주세요." />
      </>
    )
  }

  if (status === 403) {
    return (
      <>
        <InviteCardSkeleton />
        <InviteErrorMoalForbidden errorMessage="이미 가입된 그룹입니다." />
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
