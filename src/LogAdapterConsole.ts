import {
  DEFAULT_LOG_LEVEL,
  getLogLevelName,
  getLogLevelNumber
} from './logLevel'
import { LogMessageInterface } from './interfaceLogMessage'
import { LogAdapterInterface } from './interfaceLogAdapter'
import { LogAdapterOptions } from './interfaceLogAdpaterOptions'
import { DEFAULT_TIME_FORMAT } from './constants'

/**
 * Implements a console logAdapter
 */
export class LogAdapterConsole implements LogAdapterInterface {
  level: number
  timeFormat: string

  constructor(opts: LogAdapterOptions = {}) {
    if (opts.logLevel !== undefined) {
      this.level = getLogLevelNumber(opts.logLevel)
    } else {
      this.level = DEFAULT_LOG_LEVEL
    }

    if (opts.timeFormat !== undefined) {
      this.timeFormat = opts.timeFormat
    } else {
      this.timeFormat = DEFAULT_TIME_FORMAT
    }
  }

  /**
   * Returns the logLevel name as a string
   *
   * @returns The logLevel
   */
  get levelName(): string {
    return getLogLevelName(this.level)
  }

  /**
   * Returns the logLevel as a number
   *
   * @returns  The logLevel
   */
  get levelNumber(): number {
    return this.level
  }

  /**
   * Clears all the existing log entries
   * Placeholder for the implementing loggers
   */
  async reset(): Promise<void> {}

  /**
   * Logs a message.
   * @param logMessage - The message to be logged. @see LogMessageInterface
   */
  async log(logMessage: LogMessageInterface): Promise<void> {
    const newLevelNumber = getLogLevelNumber(logMessage.logLevel)
    const newLevelString = getLogLevelName(newLevelNumber)
    logMessage.logLevel = newLevelString

    if (newLevelNumber >= this.levelNumber) {
      await this._writeLog(logMessage)
    }
  }

  /**
   * This method will do the work. It is called by the log method
   * if the logLevel of the message shows that the message is relavant for logging
   *
   * @param logMessage - The message to be logged. @see LogMessageInterface
   * @returns Promise<void>
   */
  async _writeLog(logMessage: LogMessageInterface): Promise<void> {
    const meta = logMessage.meta

    if (meta.step !== undefined) {
      // this is a step log
      return await this._logStep(logMessage)
    } else if (meta.tc !== undefined) {
      // This is a testcase log
      return await this._logTestcase(logMessage)
    }
    // This is a run log
    return await this._logRun(logMessage)
  }

  /**
   * Logs the data of a run
   *
   * @param logMessage - The message to be logged. @see LogMessageInterface
   * @returns Promise<void>
   */
  async _logRun(logMessage: LogMessageInterface): Promise<void> {
    const message = extractMessageString(logMessage)

    // eslint-disable-next-line no-console
    console.log(
      'Run: ',
      `\n${{ data: message, logLevel: logMessage.logLevel }}`
    )
  }

  /**
   * Logs the data of a test case
   *
   * @param logMessage - The message to be logged. @see LogMessageInterface
   * @returns Promise<void>
   */
  async _logTestcase(logMessage: LogMessageInterface): Promise<void> {
    if (logMessage.meta.tc === undefined) {
      throw new Error('_logTestcase must be provided with meta.tc')
    }
    const testcaseName = logMessage.meta.tc.name
    const message = extractMessageString(logMessage)

    // eslint-disable-next-line no-console
    console.log(
      'Test case: ',
      `${testcaseName}:\n${{ data: message, logLevel: logMessage.logLevel }}`
    )
  }

  /**
   * Log the data of a step
   * @param logMessage - The message to be logged. @see LogMessageInterface
   * @returns Promise<void>
   */
  async _logStep(logMessage: LogMessageInterface): Promise<void> {
    if (
      logMessage.meta.tc === undefined ||
      logMessage.meta.step === undefined
    ) {
      throw new Error(
        '_logTestcase must be provided with meta.tc and meta.step'
      )
    }
    const testcaseName = logMessage.meta.tc.name
    const stepName = logMessage.meta.step.name
    const message = extractMessageString(logMessage)

    // eslint-disable-next-line no-console
    console.log(
      'Step: ',
      `${logMessage.logLevel} ${testcaseName}->${stepName} ${message}`
    )
  }
}

/**
 * Extracts the printable message from the LogMessage object
 * @param logMessage - The message to be logged. @see LogMessageInterface
 * @returns - The printable message string
 */
function extractMessageString(logMessage: LogMessageInterface): string {
  let message = logMessage.data
  if (typeof logMessage.data === 'object') {
    message = JSON.stringify(logMessage.data, null, 2)
  }
  return message
}
