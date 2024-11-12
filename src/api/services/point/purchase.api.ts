import { useQuery } from '@tanstack/react-query'

import { authorizationInstance } from '@/api/instance'
import { appendParamsToUrl } from '@/api/utils/common/appendParamsToUrl'

type PurchasePointResponseParams = {
  point: number
}

type PurchasePointRequest = {
  nextRedirectPcUrl: string
}

const purchasePoint = async ({ point }: PurchasePointResponseParams) => {
  const response = await authorizationInstance.get<PurchasePointRequest>(
    appendParamsToUrl('/api/point/purchase', { point })
  )

  return response.data.nextRedirectPcUrl
}

export const usePurchasePoint = ({ point }: PurchasePointResponseParams) => {
  return useQuery({
    queryKey: ['point', 'purchase', 'redirect'],
    queryFn: () => purchasePoint({ point }),
    refetchOnWindowFocus: false,
    enabled: false,
  })
}

type PurchasePointApproveResponseParams = {
  pg_token: string
}

const purchasePointApprove = async ({
  pg_token,
}: PurchasePointApproveResponseParams) => {
  const response = await authorizationInstance.get(
    appendParamsToUrl('/api/point/purchase/approve', { pg_token })
  )

  return response.data
}

export const usePurchasePointApprove = ({
  pg_token,
}: PurchasePointApproveResponseParams) => {
  return useQuery({
    queryKey: ['point', 'purchase', pg_token],
    queryFn: () => purchasePointApprove({ pg_token }),
  })
}
