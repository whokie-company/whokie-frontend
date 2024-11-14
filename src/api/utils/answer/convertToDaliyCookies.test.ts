import { describe, expect, it } from 'vitest'

import { convertToDailyCookies } from '@/api/utils/answer/convertToDailyCookies'
import { AnswerRecord, DailyCookie } from '@/types'

describe('convertToDailyCookies', () => {
  it('답변 기록을 날짜별로 그룹화하여 일일 쿠키로 변환해야 한다', () => {
    const answerRecords: AnswerRecord[] = [
      {
        answerId: 1,
        questionId: 101,
        questionContent: '프랑스의 수도는?',
        hintCount: 1,
        createdAt: new Date('2024-11-01T12:00:00Z'),
      },
      {
        answerId: 2,
        questionId: 102,
        questionContent: '2 + 2는?',
        hintCount: 0,
        createdAt: new Date('2024-11-01T14:00:00Z'),
      },
      {
        answerId: 3,
        questionId: 103,
        questionContent: '하늘의 색은?',
        hintCount: 2,
        createdAt: new Date('2024-11-02T10:00:00Z'),
      },
    ]

    const expected: DailyCookie[] = [
      {
        createdAt: new Date('2024-11-01T12:00:00Z'),
        cookies: [
          {
            answerId: 1,
            questionId: 101,
            questionContent: '프랑스의 수도는?',
            hintCount: 1,
          },
          {
            answerId: 2,
            questionId: 102,
            questionContent: '2 + 2는?',
            hintCount: 0,
          },
        ],
      },
      {
        createdAt: new Date('2024-11-02T10:00:00Z'),
        cookies: [
          {
            answerId: 3,
            questionId: 103,
            questionContent: '하늘의 색은?',
            hintCount: 2,
          },
        ],
      },
    ]

    const result = convertToDailyCookies(answerRecords)
    expect(result).toEqual(expected)
  })

  it('빈 답변 기록이 있을 때 빈 배열을 반환해야 한다', () => {
    const answerRecords: AnswerRecord[] = []

    const result = convertToDailyCookies(answerRecords)
    expect(result).toEqual([])
  })

  it('같은 날짜지만 다른 시간의 답변 기록을 처리해야 한다', () => {
    const answerRecords: AnswerRecord[] = [
      {
        answerId: 1,
        questionId: 101,
        questionContent: '질문 1',
        hintCount: 1,
        createdAt: new Date('2024-11-01T08:00:00Z'),
      },
      {
        answerId: 2,
        questionId: 102,
        questionContent: '질문 2',
        hintCount: 2,
        createdAt: new Date('2024-11-01T12:00:00Z'),
      },
    ]

    const expected: DailyCookie[] = [
      {
        createdAt: new Date('2024-11-01T08:00:00Z'),
        cookies: [
          {
            answerId: 1,
            questionId: 101,
            questionContent: '질문 1',
            hintCount: 1,
          },
          {
            answerId: 2,
            questionId: 102,
            questionContent: '질문 2',
            hintCount: 2,
          },
        ],
      },
    ]

    const result = convertToDailyCookies(answerRecords)
    expect(result).toEqual(expected)
  })
})
