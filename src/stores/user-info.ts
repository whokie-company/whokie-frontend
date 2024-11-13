import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type UserInfo = {
  userId: number
  role: 'USER' | 'TEMP'
}

interface UserInfoProps {
  userInfo: UserInfo | null
  setUserInfo: (userInfo: UserInfo) => void
  clearUserInfo: () => void
}

export const useUserInfoStore = create(
  persist<UserInfoProps>(
    (set) => ({
      userInfo: null,
      setUserInfo: (userInfo) => {
        set({ userInfo })
      },
      clearUserInfo: () => {
        set({ userInfo: null })
      },
    }),
    {
      name: 'user-info',
    }
  )
)
