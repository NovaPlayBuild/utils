import BigNumber from 'bignumber.js'

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
