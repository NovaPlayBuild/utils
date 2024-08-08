import BigNumber from 'bignumber.js'

export function getNumClaimsLeft({
  depositedAmount,
  withdrawnAmount,
  amountPerUser
}: {
  depositedAmount: string
  withdrawnAmount: string
  amountPerUser: string
}) {
  const depositedAmt = new BigNumber(depositedAmount)
  const withdrawnAmt = new BigNumber(withdrawnAmount)
  const amtPerUser = new BigNumber(amountPerUser)
  const leftToClaim = depositedAmt.minus(withdrawnAmt)
  const numClaims = leftToClaim.div(amtPerUser)
  return numClaims.toFixed(0, 1)
}
