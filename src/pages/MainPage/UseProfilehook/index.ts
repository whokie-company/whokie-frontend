import { useCallback, useEffect, useState } from 'react'

import { useSuspenseQuery } from '@tanstack/react-query'

import { friendsQueries } from '@/api/services/friend/queries'
import { Friend } from '@/types'

const useProfile = () => {
  const { data: all } = useSuspenseQuery(friendsQueries.myFriends())
  const [remain, setRemain] = useState<Friend[]>([])
  const [picked, setPicked] = useState<Friend[]>([])

  const pickRandomProfiles = useCallback((arr: Friend[], count: number) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }, [])

  const handleReload = useCallback(() => {
    if (remain.length >= 5) {
      const randomFive = pickRandomProfiles(remain, 5)
      setPicked(randomFive)

      const updatedRemain = remain.filter(
        (profile) => !randomFive.includes(profile)
      )
      setRemain(updatedRemain)
    } else {
      const combined = [...remain, ...picked]
      const randomFive = pickRandomProfiles(combined, 5)
      setPicked(randomFive)

      const updatedRemain = combined.filter(
        (profile) => !randomFive.includes(profile)
      )
      setRemain(updatedRemain)
    }
  }, [remain, picked, pickRandomProfiles])

  useEffect(() => {
    if (all.length > 0) {
      setRemain(all)
    }
  }, [all])

  useEffect(() => {
    if (remain.length > 0 && picked.length === 0) {
      handleReload()
    }
  }, [remain, picked, handleReload])

  return { all, picked, handleReload, setPicked, setRemain }
}

export default useProfile
