import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { queryClient } from '@/api/instance'
import { usePurchasePointApprove } from '@/api/services/point/purchase.api'
import { pointQuries } from '@/api/services/user/point.api'
import { Loading } from '@/components/Loading'

interface PointRedirectSectionProps {
  pgToken: string
}

export const PointRedirectSection = ({
  pgToken,
}: PointRedirectSectionProps) => {
  const navigate = useNavigate()
  const { data, status } = usePurchasePointApprove({ pg_token: pgToken })

  useEffect(() => {
    if (data) {
      queryClient.invalidateQueries({ queryKey: pointQuries.all() })
      navigate('/point')
    }
  })

  if (status === 'pending') return <Loading />

  return <Loading />
}
