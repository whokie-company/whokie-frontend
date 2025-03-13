import { useLocation } from 'react-router-dom'

import { LoginRedirect } from './components'

export default function LoginRedirectPage() {
  const location = useLocation()
  const code = new URLSearchParams(location.search).get('code')

  if (!code) {
    return <div>잘못된 접근입니다.</div>
  }

  return <LoginRedirect code={code} />
}
