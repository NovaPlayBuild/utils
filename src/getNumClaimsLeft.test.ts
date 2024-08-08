import { getNumClaimsLeft } from './getNumClaimsLeft'

describe('getNumClaimsLeft util', () => {
  test('get num claims left', () => {
    const amt = getNumClaimsLeft({
      depositedAmount: '100',
      withdrawnAmount: '10',
      amountPerUser: '10'
    })
    expect(amt).toBe('9')
  })
  test('get rounded down num claims left when fractional', () => {
    const amt = getNumClaimsLeft({
      depositedAmount: '99',
      withdrawnAmount: '10',
      amountPerUser: '10'
    })
    expect(amt).toBe('8')
  })
  test('larger numbers', () => {
    const amt = getNumClaimsLeft({
      depositedAmount: '999999999999',
      withdrawnAmount: '1000000000',
      amountPerUser: '1000'
    })
    expect(amt).toBe('998999999')
  })
})
