import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { BiSolidCircle } from 'react-icons/bi'

import { Flex } from '@chakra-ui/react'
import { format, formatDate } from 'date-fns'

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
  const [cookieDays, setCookieDays] = useState<Date[]>([])

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
        tileContent={({ date }) => MarkedCircle(cookieDays, date)}
        onActiveStartDateChange={({ activeStartDate }) => {
          if (activeStartDate) getActiveMonth(activeStartDate)
        }}
      />
      <MonthlyCookieLogList
        hintDrawer={hintDrawer}
        curMonth={activeMonth}
        setCookieDays={(days) => setCookieDays(days)}
      />
    </Flex>
  )
}

const MarkedCircle = (cookieDays: Date[], date: Date) => {
  const cookieDaysSet = new Set(
    cookieDays.map((cookie) => format(cookie, 'yyyy-MM-dd'))
  )
  const formattedDate = format(date, 'yyyy-MM-dd')

  if (cookieDaysSet.has(formattedDate)) {
    return (
      <Flex height="fit-content" justifyContent="center" color="primary">
        <BiSolidCircle size={10} />
      </Flex>
    )
  }

  return <p />
}
