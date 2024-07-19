import {
  getPlayStreakDays,
  GetPlayStreakDaysArgs,
  GetPlayStreakDaysReturn,
  oneDayInMs
} from './playstreak'
import { getPlaytimePercentage } from './playstreak'

describe('get playstreak test', () => {
  describe('getPlaytimePercentage', () => {
    test('10%', () => {
      const now = new Date().toUTCString()
      const percentage = getPlaytimePercentage({
        minimumSessionTimeInSeconds: 1000,
        accumulatedPlaytimeTodayInSeconds: 100,
        lastPlaySessionCompletedDateTimeUTC: now
      })
      expect(percentage).toEqual(10)
    })

    test('> 100%', () => {
      const now = new Date().toUTCString()
      const percentage = getPlaytimePercentage({
        minimumSessionTimeInSeconds: 1000,
        accumulatedPlaytimeTodayInSeconds: 10000,
        lastPlaySessionCompletedDateTimeUTC: now
      })
      expect(percentage).toEqual(100)
    })

    test('< 0%', () => {
      const now = new Date().toUTCString()
      const percentage = getPlaytimePercentage({
        minimumSessionTimeInSeconds: 1000,
        accumulatedPlaytimeTodayInSeconds: -100,
        lastPlaySessionCompletedDateTimeUTC: now
      })
      expect(percentage).toEqual(0)
    })

    test('= 0% when timestamp is > 1 UTC day old', () => {
      const old = new Date(Date.now() - 2 * oneDayInMs).toUTCString()
      const percentage = getPlaytimePercentage({
        minimumSessionTimeInSeconds: 1000,
        accumulatedPlaytimeTodayInSeconds: 951,
        lastPlaySessionCompletedDateTimeUTC: old
      })
      expect(percentage).toEqual(0)
    })
  })

  describe('getPlayStreak', () => {
    function testGetPlaystreakDays(
      args: GetPlayStreakDaysArgs,
      expectedResult: GetPlayStreakDaysReturn
    ) {
      expect(getPlayStreakDays(args)).toEqual(expectedResult)
    }

    test('3 out of 7 days', () => {
      const now = new Date().toUTCString()
      testGetPlaystreakDays(
        {
          lastPlaySessionCompletedDateTimeUTC: now,
          requiredStreakInDays: 7,
          currentStreakInDays: 3
        },
        {
          currentStreakInDays: 3,
          requiredStreakInDays: 7
        }
      )
    })

    test('3 out of 7 days but > 2 day UTC old timestamp', () => {
      const old = new Date(Date.now() - 2 * oneDayInMs).toUTCString()
      testGetPlaystreakDays(
        {
          lastPlaySessionCompletedDateTimeUTC: old,
          requiredStreakInDays: 7,
          currentStreakInDays: 3
        },
        {
          currentStreakInDays: 0,
          requiredStreakInDays: 7
        }
      )
    })

    test('8 out of 7 days', () => {
      const now = new Date().toUTCString()
      testGetPlaystreakDays(
        {
          lastPlaySessionCompletedDateTimeUTC: now,
          requiredStreakInDays: 7,
          currentStreakInDays: 8
        },
        {
          currentStreakInDays: 7,
          requiredStreakInDays: 7
        }
      )
    })
  })
})

export {}
