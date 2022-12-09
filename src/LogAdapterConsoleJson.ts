import { getTimeString } from './getTimeString'
import { LogMessageInterface } from './interfaceLogMessage'
import { LogAdapterConsole } from './LogAdapterConsole'
import clone from 'clone'

/**
 * Implements a Logadaper whoch writes the log as JSON
 */
export class LogAdapterConsoleJson extends LogAdapterConsole {
  /**
   *
   * This method will do the work. It is called by the log method
   * if the logLevel of the message shows that the message is relavant for logging
   * @param logMessage - The message to be logged
   * @returns Promise<void>
   */
  async _writeLog(logMessage: LogMessageInterface): Promise<void> {
    const meta = logMessage.meta
    const data = logMessage.data
    const logLevel = logMessage.logLevel

    const metaLogTimeString: string = getTimeString({
      time: meta.logTime,
      format: this.timeFormat
    })
    const metaRunStartTimeString: string = getTimeString({
      time: meta.run.start,
      format: this.timeFormat
    })

    if (meta.step?.id) {
      const printObject: any = clone({ meta, data, logLevel })
      printObject.meta.logTime = metaLogTimeString
      printObject.meta.run.start = metaRunStartTimeString

      // eslint-disable-next-line no-console
      console.log(JSON.stringify(printObject))
    }
  }
}
