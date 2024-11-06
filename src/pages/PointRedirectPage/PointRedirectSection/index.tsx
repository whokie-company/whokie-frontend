import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { usePurchasePointApprove } from '@/api/services/point/purchase.api'
import { Loading } from '@/components/Loading'

interface PointRedirectSectionProps {
  pgToken: string
}

export const PointRedirectSection = ({
  pgToken,
}: PointRedirectSectionProps) => {
  const navigate = useNavigate()
  const { data, status, error } = usePurchasePointApprove({ pg_token: pgToken })

  useEffect(() => {
    if (data) {
      navigate('/point')
    }
  })

  if (status === 'pending') return <Loading />

  if (error) return <div>{error.message}</div>

  return <Loading />
}
