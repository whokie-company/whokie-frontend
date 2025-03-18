import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { queryClient } from '@/api/instance'
import { usePurchasePointApprove } from '@/api/services/point/purchase.api'
import { pointQuries } from '@/api/services/user/point.api'
import { Loading } from '@/components/Loading'

interface PointRedirectProps {
  pgToken: string
}

export const PointRedirect = ({ pgToken }: PointRedirectProps) => {
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
