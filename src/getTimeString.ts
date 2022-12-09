import { DateTime } from 'luxon'

interface GetTimeStringRequest {
  /** The time in milliseconds */
  time?: number

  /** The time format to be created */
  format: string
}

/**
 * converts the tinme given in milliseconds into a time string.
 * If no time was given the current time is taken
 * @param request - The parameters as defined in @see GetTimeStringRequest
 * @returns time - The formated time string
 */
export function getTimeString(request: GetTimeStringRequest): string {
  const { time, format } = request
  if (time !== undefined) {
    return DateTime.fromMillis(time).toFormat(format)
  }
  return DateTime.now().toFormat(format)
}
