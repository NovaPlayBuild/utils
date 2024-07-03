import BigNumber from 'bignumber.js'

// bigint does not support decimals/fractional numbers so we use BigNumber.js

export function getAmount(amount: number, decimals: number) {
  // ethers cannot interpret scientific notation strings so return the full string
  BigNumber.config({ EXPONENTIAL_AT: 78 })
  const ten = new BigNumber(10)
  const exponent = BigNumber(decimals)
  const pow = ten.pow(exponent)
  const amt = new BigNumber(amount)
  const amountInDecimals = amt.multipliedBy(pow)
  return amountInDecimals
}

export function getDecimalNumberFromAmount(amount: string, decimals: number) {
  // ethers cannot interpret scientific notation strings so return the full string
  BigNumber.config({ EXPONENTIAL_AT: 78 })
  const value = new BigNumber(amount)
  const exponent = BigNumber(decimals)
  const ten = new BigNumber(10)
  const denominator = ten.pow(exponent)
  return value.div(denominator)
}
