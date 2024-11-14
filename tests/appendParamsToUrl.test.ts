import { describe, expect, it } from 'vitest'

import { appendParamsToUrl } from '@/api/utils/common/appendParamsToUrl'

describe('appendParamsToUrl', () => {
  it('단일 키-값 쌍을 URL에 추가해야 한다', () => {
    const url = 'https://example.com'
    const params = { name: 'kim', age: 20 }
    const result = appendParamsToUrl(url, params)
    expect(result).toBe('https://example.com?name=kim&age=20')
  })

  it('같은 키에 배열 값을 추가해야 한다', () => {
    const url = 'https://example.com'
    const params = { tags: ['javascript', 'typescript'] }
    const result = appendParamsToUrl(url, params)
    expect(result).toBe('https://example.com?tags=javascript&tags=typescript')
  })

  it('불리언 값을 문자열로 URL에 추가해야 한다', () => {
    const url = 'https://example.com'
    const params = { isAdmin: true, isActive: false }
    const result = appendParamsToUrl(url, params)
    expect(result).toBe('https://example.com?isAdmin=true&isActive=false')
  })

  it('undefined 값은 URL 파라미터에서 무시해야 한다', () => {
    const url = 'https://example.com'
    const params = { name: 'Lee', age: undefined }
    const result = appendParamsToUrl(url, params)
    expect(result).toBe('https://example.com?name=Lee')
  })

  it('빈 파라미터 객체는 원본 URL을 반환해야 한다', () => {
    const url = 'https://example.com'
    const params = {}
    const result = appendParamsToUrl(url, params)
    expect(result).toBe('https://example.com?')
  })

  it('숫자 값을 문자열로 URL에 추가해야 한다', () => {
    const url = 'https://example.com'
    const params = { count: 5, price: 10.99 }
    const result = appendParamsToUrl(url, params)
    expect(result).toBe('https://example.com?count=5&price=10.99')
  })
})
