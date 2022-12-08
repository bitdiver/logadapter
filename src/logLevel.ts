/** Defines the mapping between loglevel name and level number */
const LOG_LEVEL_NAME_TO_NUM = {
  debug: 0,
  info: 1,
  warning: 2,
  warn: 2,
  error: 3,
  fatal: 4
}

export const LEVEL_DEBUG = 'debug'
export const LEVEL_INFO = 'info'
export const LEVEL_WARNING = 'warning'
export const LEVEL_ERROR = 'error'
export const LEVEL_FATAL = 'fatal'

/** Defines the reverse map from levelnumber to name */
const LOG_LEVEL_NUM_TO_NAME = [
  LEVEL_DEBUG,
  LEVEL_INFO,
  LEVEL_WARNING,
  LEVEL_ERROR,
  LEVEL_FATAL
]

/** Defines the default loglevel */
export const DEFAULT_LOG_LEVEL = 3

/** Max level number */
const MAX_LOG_LEVEL = LOG_LEVEL_NUM_TO_NAME.length - 1

/**
 * takes a loglevel as number or string and returns the loglevel number
 * @param level - The level as number or string
 * @returns
 */
export function getLogLevelNumber(level?: number | string | undefined): number {
  if (level !== undefined) {
    if (typeof level === 'number') {
      if (level >= 0 && level <= MAX_LOG_LEVEL) {
        return level
      }
    } else {
      const levelNum = parseInt(level, 10)
      if (!isNaN(levelNum)) {
        if (levelNum >= 0 && levelNum <= MAX_LOG_LEVEL) {
          return levelNum
        }
        return DEFAULT_LOG_LEVEL
      } else {
        return getLevelNumberFromString(level)
      }
    }
  }
  return DEFAULT_LOG_LEVEL
}

/**
 * Convertes the LogLevel number in to the string representation
 * @param levelNumber - The level number to be converted into a string
 * @returns - The logLevel name
 */
export function getLogLevelName(
  levelNumber?: number | string | undefined
): string {
  return LOG_LEVEL_NUM_TO_NAME[getLogLevelNumber(levelNumber)]
}

/**
 * Typeguard to check if it is a valid loglevel string
 * @param value - The loglevel value to check
 * @returns True if the value is a valid logLevel name
 */
function isValidLoglevelString(
  value: string
): value is keyof typeof LOG_LEVEL_NAME_TO_NUM {
  return value in LOG_LEVEL_NAME_TO_NUM
}

/**
 * returns the logLevel as a number
 * @param level - The loglevel as a string
 *
 * @returns The loglevel as a number
 */
function getLevelNumberFromString(level: string): number {
  if (isValidLoglevelString(level)) {
    return LOG_LEVEL_NAME_TO_NUM[level]
  }
  return DEFAULT_LOG_LEVEL
}
