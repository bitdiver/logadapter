import fs from 'fs'
import path from 'path'
import mkdirp from 'mkdirp'
import clone from 'clone'
import { sprintf } from 'sprintf-js'
import { LogAdapterConsole } from './LogAdapterConsole'
import { LogAdapterFileOptions } from './interfaceLogAdpaterOptions'
import {
  LogMessageInterface,
  LogMessageMetaInterface
} from './interfaceLogMessage'
import { getTimeString } from './getTimeString'
import { getLogLevelName } from './logLevel'
import { DEFAULT_TIME_FORMAT_FILE } from './constants'

/**
 * Implements a logAdapter. The results are written to the file system
 */
export class LogAdapterFile extends LogAdapterConsole {
  targetDir: string

  /* This format is for creating the file names  */
  timeFormatFileName = DEFAULT_TIME_FORMAT_FILE

  constructor(opts: LogAdapterFileOptions = {}) {
    super(opts)
    this.targetDir = opts.targetDir ? opts.targetDir : 'log'
    if (opts.timeFormatFileName !== undefined) {
      this.timeFormatFileName = opts.timeFormatFileName
    }
  }

  /**
   * Logs the data of a run
   * @param logMessage - The logMessage
   */
  async _logRun(logMessage: LogMessageInterface): Promise<void> {
    const targetPath = this._getRunTargetPath(logMessage.meta)
    await this._writeLogFile({ logMessage, targetPath })
  }

  /**
   * Log the data of a test case
   * @param logMessage - The logMessage
   */
  async _logTestcase(logMessage: LogMessageInterface): Promise<void> {
    const targetPath = this._getRunTargetPath(logMessage.meta)

    const tcCountAllLength = String(logMessage.meta.tc?.tcCountAll).length
    const tcNumberStr = sprintf(
      `%0${tcCountAllLength}d`,
      logMessage.meta.tc?.tcCountCurrent
    )
    targetPath.push(`TC_${tcNumberStr}_${logMessage.meta.tc?.name}`)

    await this._writeLogFile({ logMessage, targetPath })
  }

  /**
   * Log the data of a step
   * @param logMessage - The logMessage
   */
  async _logStep(logMessage: LogMessageInterface): Promise<void> {
    const targetPath = this._getRunTargetPath(logMessage.meta)

    const tcCountAllLength = String(logMessage.meta.tc?.tcCountAll).length
    const tcNumberStr = sprintf(
      `%0${tcCountAllLength}d`,
      logMessage.meta.tc?.tcCountCurrent
    )
    targetPath.push(`TC_${tcNumberStr}_${logMessage.meta.tc?.name}`)

    const stringCountLength = String(logMessage.meta.step?.stepCountAll).length
    const stepNumber = sprintf(
      `%0${stringCountLength}d`,
      logMessage.meta.step?.stepCountCurrent
    )
    targetPath.push(`Step_${stepNumber}_${logMessage.meta.step?.name}`)
    await this._writeLogFile({ logMessage, targetPath })
  }

  /**
   * Create the target Path segments from the run
   * @param meta - The meta information
   * @returns List of path segements
   */
  _getRunTargetPath(meta: LogMessageMetaInterface): string[] {
    const metaRunStartTimeString: string = getTimeString({
      time: meta.run.start,
      format: this.timeFormatFileName
    })

    if (meta.run.name !== undefined && meta.run.name !== '') {
      return [this.targetDir, `Run_${meta.run.name}_${metaRunStartTimeString}`]
    }
    return [this.targetDir, `Run_${metaRunStartTimeString}`]
  }

  /**
   * Writes the log to the target directory
   * @param request - The request as described
   */
  async _writeLogFile(request: {
    logMessage: LogMessageInterface
    targetPath: string[]
  }): Promise<void> {
    const { logMessage, targetPath } = request
    await mkdirp(path.join(...targetPath))

    const metaLogTimeString: string = getTimeString({
      time: logMessage.meta.logTime,
      format: this.timeFormat
    })

    const startTimeString: string = getTimeString({
      time: logMessage.meta.run.start,
      format: this.timeFormat
    })

    const fileTimeString: string = getTimeString({
      time: logMessage.meta.logTime,
      format: this.timeFormatFileName
    })

    const file = await this._getFileName({
      targetPath,
      timeStamp: fileTimeString,
      logLevel: getLogLevelName(logMessage.logLevel)
    })

    const logMessagePrint: any = clone(logMessage)
    logMessagePrint.meta.logTimeString = metaLogTimeString
    logMessagePrint.meta.run.startString = startTimeString

    const fileContent = JSON.stringify(logMessagePrint, null, 2)

    await fs.promises.writeFile(file, fileContent)
  }

  /**
   * Creates a new file name which does not exists. It will try to create a unique name until
   * it finds one
   * @param request - The request as defined
   * @returns fileName - The created file name
   */
  async _getFileName(request: {
    targetPath: string[]
    timeStamp: string
    logLevel: string
  }): Promise<string> {
    const { targetPath, timeStamp, logLevel } = request

    let fileName
    let fileIsOk
    let seq = 0
    do {
      if (seq === 0) {
        fileName = path.join(...targetPath, `${timeStamp}_${logLevel}.json`)
      } else {
        fileName = path.join(
          ...targetPath,
          `${timeStamp}_${seq}_${logLevel}.json`
        )
      }

      try {
        await fs.promises.access(fileName, fs.constants.F_OK)
        fileIsOk = false
      } catch (e) {
        fileIsOk = true
      }

      seq++
    } while (!fileIsOk)

    return fileName
  }
}
