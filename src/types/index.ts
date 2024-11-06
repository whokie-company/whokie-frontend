export type Friend = {
  friendId: number
  name: string
  imageUrl: string
  isFriend: boolean
}

export type Group = {
  groupdId: number
  groupName: string
  groupdImageUrl: string
  groupDescription: string
  groupMemberCount: number
}

export type ChatItem = {
  chatId: number
  direction: 'left' | 'right'
  content: string
  createdAt: string
}

export type ChatBoxProps = {
  chatItem: ChatItem
}

export type QuestionItem = {
  profileQuestionId: number
  profileQuestionContent: string
  createdAt: string
}

export type Question = {
  questionId: number
  content: string
  users: Friend[]
}

export type ProfileAnswerItem = {
  profileAnswerId: string
  content: string
  profileQuestionContent: string
  createdAt: string
}

export type AnswerRecord = {
  answerId: number
  questionId: number
  questionContent: string
  hintCount: 0 | 1 | 2 | 3
  createdAt: Date
}

export type PagingRequestParams = {
  size?: number
  page?: string
  sort?: string[]
}

export type PagingResponse<T> = {
  content: T
  totalElements: number
  totalPages: number
  size: number
  page: number
}

export type DailyCookie = {
  createdAt: Date
  cookies: CookieLog[]
}

export type CookieLog = Omit<AnswerRecord, 'createdAt'>

export type MyPageItem = {
  todayVisited: number
  totalVisited: number
  description: string
  backgroundImageUrl: string
  imageUrl: string
  name: string
}
