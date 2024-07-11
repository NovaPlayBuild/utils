import BigNumber from 'bignumber.js'

export interface Unit {
  label: string
  value: string
}

const bytesUnitLabels = [
  'bytes',
  'KB',
  'MB',
  'GB',
  'TB',
  'PB',
  'EB',
  'ZB',
  'YB'
]

export const bytesUnits: Unit[] = bytesUnitLabels.map((unit, index) => ({
  label: unit,
  value: (BigInt(1024) ** BigInt(index)).toString()
}))

const decimalUnitLabels = ['K', 'M', 'B', 'T', 'P']

export const decimalUnits = decimalUnitLabels.map((unit, index) => ({
  label: unit,
  value: (BigInt(1000) ** BigInt(index + 1)).toString()
}))

export function removeTrailingZeros(num: string) {
  return num.replace(/(\.\d*[1-9])0+$|\.0*$/, '$1')
}

export const formatLargeNumber = (
  num: string,
  units: Unit[],
  decimals: number
) => {
  const numBN = new BigNumber(num)
  const firstUnitIsTooBig = numBN.lt(new BigNumber(units[0].value))

  if (!units.length || firstUnitIsTooBig) {
    return num
  }

  for (let i = 1; i < units.length; ++i) {
    const unitIsTooBig = numBN.lt(new BigNumber(units[i].value))
    if (unitIsTooBig) {
      const prevUnit = units[i - 1]
      const prevUnitValue = new BigNumber(prevUnit.value)
      const numInPrevUnits = numBN.div(prevUnitValue)
      return `${removeTrailingZeros(numInPrevUnits.toFixed(decimals))} ${prevUnit.label}`
    }
  }

  return numBN.toExponential(decimals)
}

/**
 * @dev note that we pass an float string to avoid loss of precision
 * @param num exact float string (e.g. "11322.001000000000000000")
 * @param units how the num will be abbreviated if above maxValue
 * @param minValue the value below which we will use scientific notation
 * @param maxValue the value above which we start abbreviating
 * @returns human readable formatted number string
 */
export function parseNumIntoReadableString({
  num,
  units,
  minValue,
  maxValue
}: {
  num: string
  units: Unit[]
  minValue: string
  maxValue: string
}) {
  const numBN = new BigNumber(num)
  const cutoffValueBN = new BigNumber(maxValue)
  const minValueBN = new BigNumber(minValue)

  const numIsGteMin = numBN.gte(minValueBN)
  const numIsLteMax = numBN.lte(cutoffValueBN)
  const numIsWithinRange = numIsGteMin && numIsLteMax
  if (numIsWithinRange) {
    // Remove trailing zeros and the decimal point if there are no decimals left
    return removeTrailingZeros(numBN.toFixed(4))
  }

  // represent small decimal with scientific notation
  if (!numIsGteMin) {
    return removeTrailingZeros(numBN.toPrecision(3))
  }

  // represent large number with abbreviation
  if (!numIsLteMax) {
    return formatLargeNumber(num, units, 2)
  }

  return numBN.toExponential(2)
}
