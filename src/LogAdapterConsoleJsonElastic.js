import assert from 'assert'
import moment from 'moment'

const LOG_LEVEL_NAME_TO_NUM = {
  debug: 0,
  info: 1,
  warning: 2,
  warn: 2,
  error: 3,
  fatal: 4
}

const LOG_LEVEL_NUM_TO_NAME = ['debug', 'info', 'warning', 'error', 'fatal']
const DEFAULT_LEVEL = 3
const MAX_LEVEL = 4

/**
 * Implements a default logAdapter
 * @class
 */
export default class LogAdapterConsoleJsonElastic {
  constructor(opts = {}) {
    // Set the default logLevel
    this._level = DEFAULT_LEVEL

    this.level = opts.logLevel

    this.timeZone = opts.timeZone ? opts.timeZone : moment().utcOffset()
    this.timeFormat = opts.timeFormat
      ? opts.timeFormat
      : 'YYYY-MM-DD_HH:mm:ss_ZZ'
  }

  /**
   * sets a new log level
   * @param level {number/string} The logLevel as number or String value
   */
  set level(level) {
    this._level = this._createLogLevel(level)
  }

  /**
   * creates the loglevel number from a given level.
   * If no level is given or the level is invalid, the default level will be returned
   * @param level {string/number} The Loglevel to take
   * @return levelNumber {number} A valid log level number
   */
  _createLogLevel(level) {
    if (level !== undefined) {
      if (typeof level === 'number') {
        if (level >= 0 && level <= MAX_LEVEL) {
          return level
        }
      } else if (isNaN(level)) {
        return this._getLevelNumber(level)
      } else {
        const levelNum = parseInt(level, 10)
        if (levelNum >= 0 && levelNum <= MAX_LEVEL) {
          return levelNum
        }
      }
    }
    return DEFAULT_LEVEL
  }

  /**
   * Returns the logLevel as a string
   * @return level {string} The logLevel
   */
  get level() {
    return LOG_LEVEL_NUM_TO_NAME[this._level]
  }

  /**
   * Returns the logLevel as a number
   *
   * @return level {string} The logLevel
   */
  get levelNumber() {
    return this._level
  }

  /**
   * Clears all the existing log entries
   * Placeholder for the implementing loggers
   */
  async reset() {}

  /**
   * returns the logLevel as a number
   * @param level {string} The loglevel as a string
   *
   * @return num {number} The loglevel as a number
   */
  _getLevelNumber(level = DEFAULT_LEVEL) {
    if (LOG_LEVEL_NAME_TO_NUM[level] !== undefined) {
      return LOG_LEVEL_NAME_TO_NUM[level]
    }
    return DEFAULT_LEVEL
  }

  /**
   * @param data {object} The object with the data to be logged and the needed meta data
   *     const logMessage = {
   *       meta:{
   *         run:{
   *           start: <time>,
   *           id: 'id' // RunEnvironment ID
   *           name: 'suite name'
   *         },
   *         tc:{
   *           tcCountCurrent: tcCountCurrent,
   *           tcCountAll: tcCountAll,
   *           id: 'id', // TestcaseEnvironment ID
   *           name: 'great tc name'
   *         },
   *         step:{
   *           stepCountCurrent: stepCountCurrent,
   *           stepCountAll: stepCountAll,
   *           id: 'id', // testcase instance
   *           name: 'great step name'
   *           typ: ('singel'| ''|)
   *         }
   *       }
   *       data:{},
   *       logLevel: LEVEL_INFO
   *     }
   * @return promise {promise} A promise until the log message is written
   */
  async log(logMessage) {
    assert.ok(logMessage, `The 'logMessage' parameter was not given`)
    assert.ok(
      typeof logMessage === 'object',
      `The 'logMessage' must be of type 'object'`
    )
    assert.ok(
      logMessage.meta,
      `The log message does not have a 'meta' property`
    )
    assert.ok(
      logMessage.data,
      `The log message does not have a 'data' property`
    )

    const newLevelNumber = this._createLogLevel(logMessage.logLevel)
    const newLevelString = LOG_LEVEL_NUM_TO_NAME[newLevelNumber]
    logMessage.logLevel = newLevelString

    if (newLevelNumber >= this.levelNumber) {
      await this._writeLog(logMessage)
    }
  }

  /**
   * This method will do the work. It is called by the log method
   * if the logLevel of the message shows that the message is relavant for logging
   *
   */
  async _writeLog(logMessage) {
    const meta = logMessage.meta
    const data = logMessage.data
    const logLevel = logMessage.logLevel

    // Set the time of the log
    if (meta.logTime === undefined) {
      meta.logTime = Date.now()
    }
    meta.logTimeString = moment(meta.logTime)
      .utcOffset(this.timeZone)
      .format(this.timeFormat)

    if (meta.run.start !== undefined) {
      meta.run.startString = moment(meta.run.start)
        .utcOffset(this.timeZone)
        .format(this.timeFormat)
    }

    if (meta.step !== undefined && meta.step.id !== undefined) {
      const dataString = JSON.stringify(data)
      const outputJson = JSON.stringify({ logLevel, meta, data: dataString })

      // eslint-disable-next-line no-console
      console.log(outputJson)
    }
  }
}
