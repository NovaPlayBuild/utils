import { getAmount, getDecimalNumberFromAmount } from './getAmount'

describe('getAmount util', () => {
  test('get amount of 10 with 18 decimals', () => {
    const amt = getAmount('10', 18).toString()
    expect(amt).toBe('10000000000000000000')
  })

  test('get amount with 6 decimals', () => {
    const amt = getAmount('12312312', 6).toString()
    expect(amt).toBe('12312312000000')
  })

  test('get amount of fraction with 18 decimals', () => {
    const amt = getAmount('1.5', 18).toString()
    expect(amt).toBe('1500000000000000000')
  })

  test('get amount of fraction with 77 decimals without loss of precision', () => {
    const amt = getAmount('1.1579208923731619542357098500868', 77).toString()
    expect(amt).toBe(
      '115792089237316195423570985008680000000000000000000000000000000000000000000000'
    )
  })

  test('get amount of fraction with 0 decimals', () => {
    const amt = getAmount('1', 0).toString()
    expect(amt).toBe('1')
  })

  test('get amount of 0 with 0 decimals', () => {
    const amt = getAmount('0', 0).toString()
    expect(amt).toBe('0')
  })
})

describe('getDecimalNumberFromAmount util', () => {
  test('get amount of 0 with 18 decimals', () => {
    const amt = getDecimalNumberFromAmount('0', 18).toString()
    expect(amt).toBe('0')
  })

  test('get amount of 1000 with 18 decimals', () => {
    const amt = getDecimalNumberFromAmount(
      '1000000000000010101010',
      18
    ).toString()
    expect(amt).toBe('1000.00000000001010101')
  })
})
