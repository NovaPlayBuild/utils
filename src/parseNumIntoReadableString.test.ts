import {
  bytesUnits,
  decimalUnits,
  parseNumIntoReadableString
} from './parseNumIntoReadableString'

describe('parseNumIntoReadableString util', () => {
  test('parse number within range to the same value', () => {
    const amt = parseNumIntoReadableString({
      num: '100.01',
      units: bytesUnits,
      minValue: '0.0001',
      maxValue: '10000000'
    })
    expect(amt).toBe('100.01')
  })

  test('parse decimal number within range to the same value', () => {
    const amt = parseNumIntoReadableString({
      num: '0.0001',
      units: bytesUnits,
      minValue: '0.0001',
      maxValue: '10000000'
    })
    expect(amt).toBe('0.0001')
  })

  test('parse number below 0.0001 to scientific notation', () => {
    const amt = parseNumIntoReadableString({
      num: '0.000000100',
      units: bytesUnits,
      minValue: '0.0001',
      maxValue: '10000000'
    })
    expect(amt).toBe('1.00e-7')
  })

  test('parse number above cutoff value to scientific notation', () => {
    const amt = parseNumIntoReadableString({
      num: '100000001200000000000000000',
      units: bytesUnits,
      minValue: '0.0001',
      maxValue: '10000000'
    })
    expect(amt).toBe('1.00e+26')
  })

  test('parse large number below cutoff value to abbreviated bytes value', () => {
    const amt = parseNumIntoReadableString({
      num: '2000000',
      units: bytesUnits,
      minValue: '0.0001',
      maxValue: '1000000'
    })
    expect(amt).toBe('1.91 MB')
  })

  test('parse large number below cutoff value to abbreviated decimal value', () => {
    const amt = parseNumIntoReadableString({
      num: '2000000',
      units: decimalUnits,
      minValue: '0.0001',
      maxValue: '1000000'
    })
    expect(amt).toBe('2 M')
  })

  test('max unit256', () => {
    const amt = parseNumIntoReadableString({
      num: '115792089237316195423570985008687907853269984665640564039457.584007913129639935',
      units: decimalUnits,
      minValue: '0.0001',
      maxValue: '1000000'
    })
    expect(amt).toBe('1.16e+59')
  })

  test('min unit256', () => {
    const amt = parseNumIntoReadableString({
      num: '0.000000000000000001',
      units: decimalUnits,
      minValue: '0.0001',
      maxValue: '1000000'
    })
    expect(amt).toBe('1.00e-18')
  })
})
