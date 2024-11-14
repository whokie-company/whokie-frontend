import { format } from 'date-fns'

export default function formatDate(dateString: string): string {
  const createdAt = new Date(dateString)
  const today = new Date()

  const isToday =
    createdAt.getDate() === today.getDate() &&
    createdAt.getMonth() === today.getMonth() &&
    createdAt.getFullYear() === today.getFullYear()

  if (isToday) {
    return format(createdAt, 'HH:MM')
  }

  return format(createdAt, 'yyyy-MM-dd')
}
