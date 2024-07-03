import BigNumber from 'bignumber.js'

// bigint does not support decimals/fractional numbers so we use BigNumber.js

/**
 * @dev note that we pass a float string to avoid loss of precision when using JS Number
 * @param amount float string (e.g. 1.001 WETH)
 * @param decimals 10's exponent for smallest unit (i.e. 18 for WETH)
 * @returns amount * 10 ^ decimals as a BigNumber
 */
export function getAmount(amount: string, decimals: number) {
  // ethers cannot interpret scientific notation strings so return the full string
  BigNumber.config({ EXPONENTIAL_AT: 78 })
  const ten = new BigNumber(10)
  const exponent = BigNumber(decimals)
  const pow = ten.pow(exponent)
  const amt = new BigNumber(amount)
  const amountInDecimals = amt.multipliedBy(pow)
  return amountInDecimals
}

/**
 * @dev note that we pass an integer string to avoid loss of precision when using JS Number
 * @param amount int string (e.g. 1001000000000000000 WETH)
 * @param decimals 10's exponent for smallest unit (i.e. 18 for WETH)
 * @returns amount / 10 ^ decimals as a BigNumber
 */
export function getDecimalNumberFromAmount(amount: string, decimals: number) {
  // ethers cannot interpret scientific notation strings so return the full string
  BigNumber.config({ EXPONENTIAL_AT: 78 })
  const value = new BigNumber(amount)
  const exponent = BigNumber(decimals)
  const ten = new BigNumber(10)
  const denominator = ten.pow(exponent)
  return value.div(denominator)
}
