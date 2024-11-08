export default function formatDate(dateString: string): string {
  const createdAt = new Date(dateString)
  const today = new Date()

  // 오늘 날짜와 비교
  const isToday =
    createdAt.getDate() === today.getDate() &&
    createdAt.getMonth() === today.getMonth() &&
    createdAt.getFullYear() === today.getFullYear()

  if (isToday) {
    // 오늘이라면 HH:MM 포맷으로 변환
    return createdAt.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
  }
  // 오늘이 아니라면 YYYY-MM-DD 포맷으로 변환
  return createdAt.toLocaleDateString()
}
