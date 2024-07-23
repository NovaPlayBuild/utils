export const oneDayInMs = 24 * 60 * 60 * 1000

export function getMidnightUTCTimestamp(timeDiff = oneDayInMs) {
  // Get the current date and time in UTC
  const now = new Date()

  // Get the timestamp for the next 00:00:00 UTC by adding 24 hours and then flooring it to the nearest day
  const nextMidnight = new Date(now.getTime() + timeDiff)
  nextMidnight.setUTCHours(0, 0, 0, 0)

  return nextMidnight.valueOf()
}

export function questWillResetOnNextSession(
  lastPlaySessionCompletedDateTimeUTC: string
): boolean {
  if (lastPlaySessionCompletedDateTimeUTC === undefined) {
    return true
  }

  const lastSessionInMsSinceEpoch = new Date(
    lastPlaySessionCompletedDateTimeUTC
  ).valueOf()
  if (lastSessionInMsSinceEpoch < getMidnightUTCTimestamp(-1 * oneDayInMs)) {
    return true
  }
  return false
}

export interface GetPlayStreakDaysArgs {
  lastPlaySessionCompletedDateTimeUTC: string
  requiredStreakInDays: number
  currentStreakInDays: number
}

export interface GetPlayStreakDaysReturn {
  requiredStreakInDays: number
  currentStreakInDays: number
}

export function getPlayStreakDays({
  lastPlaySessionCompletedDateTimeUTC,
  requiredStreakInDays,
  currentStreakInDays
}: GetPlayStreakDaysArgs): GetPlayStreakDaysReturn {
  // if a streak is > required, it will not reset until claim
  if (currentStreakInDays > requiredStreakInDays) {
    return { requiredStreakInDays, currentStreakInDays: requiredStreakInDays }
  }
  if (questWillResetOnNextSession(lastPlaySessionCompletedDateTimeUTC)) {
    return { requiredStreakInDays, currentStreakInDays: 0 }
  }
  currentStreakInDays = Math.min(currentStreakInDays, requiredStreakInDays)
  currentStreakInDays = Math.max(currentStreakInDays, 0)
  return { requiredStreakInDays, currentStreakInDays }
}

interface GetPlaytimePercentageArgs {
  minimumSessionTimeInSeconds: number
  accumulatedPlaytimeTodayInSeconds: number
  lastPlaySessionCompletedDateTimeUTC: string
  dateTimeCurrentSessionStartedInMsSinceEpoch?: number
}

export function getPlaytimePercentage({
  minimumSessionTimeInSeconds,
  accumulatedPlaytimeTodayInSeconds,
  lastPlaySessionCompletedDateTimeUTC,
  dateTimeCurrentSessionStartedInMsSinceEpoch
}: GetPlaytimePercentageArgs) {
  if (questWillResetOnNextSession(lastPlaySessionCompletedDateTimeUTC)) {
    return 0
  }

  if (dateTimeCurrentSessionStartedInMsSinceEpoch) {
    const unrecordedPlaytimeInMs =
      Date.now() - dateTimeCurrentSessionStartedInMsSinceEpoch
    accumulatedPlaytimeTodayInSeconds += unrecordedPlaytimeInMs / 1000
  }

  let percentageCompleted = Math.round(
    (accumulatedPlaytimeTodayInSeconds / minimumSessionTimeInSeconds) * 100
  )
  percentageCompleted = Math.min(percentageCompleted, 100)
  percentageCompleted = Math.max(percentageCompleted, 0)
  return percentageCompleted
}
