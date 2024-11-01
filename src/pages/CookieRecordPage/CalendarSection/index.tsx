import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { BiSolidCircle } from 'react-icons/bi'

import { Flex } from '@chakra-ui/react'
import { format, formatDate } from 'date-fns'

import { calendarStyles } from './styles'

export const CalendarSection = () => {
  return (
    <Flex flexDirection="column" alignItems="center" css={calendarStyles}>
      <Calendar
        formatDay={(_, date) => formatDate(date, 'dd')}
        next2Label={null}
        prev2Label={null}
        showNeighboringMonth={false}
        tileContent={({ date }) => MarkedCircle(date)}
      />
    </Flex>
  )
}

const MarkedCircle = (date: Date) => {
  if (testDateData.has(format(date, 'yyyy-MM-dd'))) {
    return (
      <Flex height="fit-content" justifyContent="center" color="primary">
        <BiSolidCircle size={10} />
      </Flex>
    )
  }

  return <p />
}

const testDateData = new Set([
  '2024-11-03',
  '2024-11-04',
  '2024-11-05',
  '2024-11-10',
])
