import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { BiSolidCircle } from 'react-icons/bi'

import { Flex } from '@chakra-ui/react'
import { format, formatDate } from 'date-fns'

import { useAnswerDays } from '@/api/services/answer/record.api'
import { Loading } from '@/components/Loading'
import { Modal } from '@/types'

import { MonthlyCookieLogList } from './MonthlyCookieLogList'
import { calendarStyles } from './styles'

interface CalendarSectionProps {
  hintDrawer: Modal
}

export const CalendarSection = ({ hintDrawer }: CalendarSectionProps) => {
  const [activeMonth, setActiveMonth] = useState(
    format(new Date(), 'yyyy-MM-01')
  )
  const { data: days, status } = useAnswerDays({ date: activeMonth })

  if (status === 'pending') return <Loading />

  const cookieDays =
    days?.map((day) => {
      const monthYear = activeMonth.slice(0, 7)
      return `${monthYear}-${String(day).padStart(2, '0')}`
    }) ?? []

  const getActiveMonth = (activeStartDate: Date) => {
    const newActiveMonth = format(activeStartDate, 'yyyy-MM-01')
    setActiveMonth(newActiveMonth)
  }

  return (
    <Flex flexDirection="column" alignItems="center" css={calendarStyles}>
      <Calendar
        formatDay={(_, date) => formatDate(date, 'dd')}
        next2Label={null}
        prev2Label={null}
        showNeighboringMonth={false}
        tileContent={({ date }) => MarkedCircle({ cookieDays, date })}
        onActiveStartDateChange={({ activeStartDate }) => {
          if (activeStartDate) getActiveMonth(activeStartDate)
        }}
      />
      <MonthlyCookieLogList hintDrawer={hintDrawer} curMonth={activeMonth} />
    </Flex>
  )
}

const MarkedCircle = ({
  cookieDays,
  date,
}: {
  cookieDays: string[]
  date: Date
}) => {
  if (!cookieDays.length) return <p />

  const formattedDate = format(date, 'yyyy-MM-dd')

  const cookieDaysSet = new Set(
    cookieDays.map((day) => format(day, 'yyyy-MM-dd'))
  )

  if (cookieDaysSet.has(formattedDate)) {
    return (
      <Flex height="fit-content" justifyContent="center" color="primary">
        <BiSolidCircle size={10} />
      </Flex>
    )
  }

  return <p />
}
