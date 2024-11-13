import { expect, test } from 'vitest'

import { sum } from '@/app'

test('덧셈 1 + 1 = 2', () => {
  expect(sum(1, 1)).toBe(2)
})
