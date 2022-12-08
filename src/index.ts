import { LogAdapterOptions } from './interfaceLogAdpaterOptions'
import { LogAdapterConsole } from './LogAdapterConsole'
import { LogAdapterConsoleJson } from './LogAdapterConsoleJson'
import { LogAdapterFile } from './LogAdapterFile'
import { LogAdapterMemory } from './LogAdapterMemory'

export { LogAdapterInterface } from './interfaceLogAdapter'
export { LogMessageInterface as LogMessage } from './interfaceLogMessage'
export { LogAdapterConsole, LogAdapterConsoleJson, LogAdapterMemory }

export {
  LEVEL_DEBUG,
  LEVEL_INFO,
  LEVEL_WARNING,
  LEVEL_ERROR,
  LEVEL_FATAL
} from './logLevel'

// Stores the logger instance
let logAdapterConsole: LogAdapterConsole
let logAdapterConsoleJson: LogAdapterConsoleJson
let logAdapterMemory: LogAdapterMemory
let logAdapterFile: LogAdapterFile

/**
 * returns the logAdapter
 */
function getLogAdapterConsole(opts?: LogAdapterOptions): LogAdapterConsole {
  if (logAdapterConsole === undefined) {
    logAdapterConsole = new LogAdapterConsole(opts)
  }
  return logAdapterConsole
}

/**
 * returns the logAdapter
 */
function getLogAdapterConsoleJson(
  opts?: LogAdapterOptions
): LogAdapterConsoleJson {
  if (logAdapterConsoleJson === undefined) {
    logAdapterConsoleJson = new LogAdapterConsoleJson(opts)
  }
  return logAdapterConsoleJson
}

/**
 * returns the logAdapter
 */
function getLogAdapterMemory(opts?: LogAdapterOptions): LogAdapterMemory {
  if (logAdapterMemory === undefined) {
    logAdapterMemory = new LogAdapterMemory(opts)
  }
  return logAdapterMemory
}

/**
 * returns the logAdapter
 */
function getLogAdapterFile(opts?: LogAdapterOptions): LogAdapterFile {
  if (logAdapterFile === undefined) {
    logAdapterFile = new LogAdapterFile(opts)
  }
  return logAdapterFile
}
export {
  getLogAdapterConsole,
  getLogAdapterConsoleJson,
  getLogAdapterMemory,
  getLogAdapterFile
}
