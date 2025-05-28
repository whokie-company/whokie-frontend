import { queryOptions } from '@tanstack/react-query'

import { getFriends, getGroupFriends } from './friend.api'

export const friendsQueries = {
  all: () => ['friends'],
  groupFriendsKey: ({ groupId }: { groupId: number }) => [
    ...friendsQueries.all(),
    'group',
    groupId,
  ],
  groupFriends: ({ groupId }: { groupId: number }) =>
    queryOptions({
      queryKey: friendsQueries.groupFriendsKey({ groupId }),
      queryFn: () => getGroupFriends({ groupId }),
    }),
  friends: () =>
    queryOptions({
      queryKey: [...friendsQueries.all()],
      queryFn: () => getFriends(),
    }),
  myFriends: () =>
    queryOptions({
      queryKey: [...friendsQueries.all(), 'my'],
      queryFn: () => getFriends(),
      select: (data) => {
        return data.friends.filter((friend) => friend.isFriend)
      },
    }),
}
