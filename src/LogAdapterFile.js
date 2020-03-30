import fs from 'fs'
import util from 'util'
import path from 'path'
import mkdirp from 'mkdirp'
import { sprintf } from 'sprintf-js'
import LogAdapterConsole from './LogAdapterConsole'

const writeFile = util.promisify(fs.writeFile)
const fileNameFree = util.promisify(fs.access)

/**
 * Implements a default logAdapter. The results will be written to the file system
 * @class
 */
export default class LogAdapterFile extends LogAdapterConsole {
  constructor(opts = {}) {
    super(opts)

    this.targetDir = opts.targetDir ? opts.targetDir : 'log'
  }

  /**
   * Logs the data of a run
   * @param meta {object} The meta data for this log entry
   * @param dat {object} The data for this log entry
   * @param logLevel {string} The logLevel as a string
   */
  async _logRun(meta, data, logLevel) {
    await this._writeLogFile(meta, data, logLevel, this._getRunTargetPath(meta))
  }

  /**
   * Log the data of a test case
   * @param meta {object} The meta data for this log entry
   * @param dat {object} The data for this log entry
   * @param logLevel {string} The logLevel as a string
   */
  async _logTestcase(meta, data, logLevel) {
    const targetPath = this._getRunTargetPath(meta)

    const tcCountAllLength = String(meta.tc.countAll).length
    const tcNumberStr = sprintf(`%0${tcCountAllLength}d`, meta.tc.countCurrent)

    targetPath.push(`TC_${tcNumberStr}_${meta.tc.name}`)
    await this._writeLogFile(meta, data, logLevel, targetPath)
  }

  /**
   * Log the data of a step
   * @param meta {object} The meta data for this log entry
   * @param dat {object} The data for this log entry
   * @param logLevel {string} The logLevel as a string
   */
  async _logStep(meta, data, logLevel) {
    const targetPath = this._getRunTargetPath(meta)

    const tcCountAllLength = String(meta.tc.countAll).length
    const tcNumberStr = sprintf(`%0${tcCountAllLength}d`, meta.tc.countCurrent)
    targetPath.push(`TC_${tcNumberStr}_${meta.tc.name}`)

    const stringCountLength = String(meta.step.countAll).length
    const stepNumber = sprintf(
      `%0${stringCountLength}d`,
      meta.step.countCurrent
    )
    targetPath.push(`Step_${stepNumber}_${meta.step.name}`)
    await this._writeLogFile(meta, data, logLevel, targetPath)
  }

  /**
   * Creates the target path for the run
   * @param meta {object} The meta data for this log entry
   */
  _getRunTargetPath(meta) {
    if (meta.run.name !== undefined && meta.run.name !== '') {
      return [this.targetDir, `Run_${meta.run.name}_${meta.run.startString}`]
    }
    return [this.targetDir, `Run_${meta.run.startString}`]
  }

  /**
   * Writes the log to the file system
   * @param meta {object} The meta data for this log entry
   * @param dat {object} The data for this log entry
   * @param logLevel {string} The logLevel as a string
   * @param targetPath {array} An array of path segemnts
   */
  async _writeLogFile(meta, data, logLevel, targetPath) {
    await mkdirp(path.join(...targetPath))

    const file = await this._getFileName(
      targetPath,
      meta.logTimeString,
      logLevel
    )
    const fileContent = JSON.stringify(
      {
        meta: { logTime: meta.logTime, logTimeString: meta.logTimeString },
        data,
        logLevel,
      },
      null,
      2
    )

    await writeFile(file, fileContent)
  }

  /**
   * Creates a filename which does not yet exists
   * @param targetPath {array} An array of path segements
   * @param timeStamp {string} The current time stamp
   * @param logLevel {string} The loglevel of this message
   * @return fileName {string} A new created not existing file name
   */
  async _getFileName(targetPath, timeStamp, logLevel) {
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
        await fileNameFree(fileName, fs.constants.F_OK)
        fileIsOk = false
      } catch (e) {
        fileIsOk = true
      }

      seq++
    } while (!fileIsOk)

    return fileName
  }
}
