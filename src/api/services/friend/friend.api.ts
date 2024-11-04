import { authorizationInstance } from '@/api/instance'
import { DATA_ERROR_MESSAGES } from '@/constants/error-message'
import { Friend } from '@/types'

type FriendsResponse = {
  friends: Friend[]
}

export const getFriends = async () => {
  const response =
    await authorizationInstance.get<FriendsResponse>('/api/friend')

  return response.data
}

type AddFriendRequestBody = {
  friends: { id: number }[]
}

export const addFriends = async ({ friends }: AddFriendRequestBody) => {
  if (!friends.length) {
    throw new Error(DATA_ERROR_MESSAGES.FRIEND_CANNOT_BE_EMPTY)
  }

  await authorizationInstance.post('/api/friend', { friends })
}
