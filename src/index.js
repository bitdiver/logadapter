import LogAdapterConsole from './LogAdapterConsole'
import LogAdapterMemory from './LogAdapterMemory'
import LogAdapterFile from './LogAdapterFile'

const LEVEL_DEBUG = 'debug'
const LEVEL_INFO = 'info'
const LEVEL_WARNING = 'warning'
const LEVEL_ERROR = 'error'
const LEVEL_FATAL = 'fatal'

// Stores the logger instance
let logAdapterConsole
let logAdapterMemory
let logAdapterFile

/**
 * returns the logAdapter
 */
function getLogAdapterConsole(opts) {
  if (logAdapterConsole === undefined) {
    logAdapterConsole = new LogAdapterConsole(opts)
  }
  return logAdapterConsole
}

/**
 * returns the logAdapter
 */
function getLogAdapterMemory(opts) {
  if (logAdapterMemory === undefined) {
    logAdapterMemory = new LogAdapterMemory(opts)
  }
  return logAdapterMemory
}

/**
 * returns the logAdapter
 */
function getLogAdapterFile(opts) {
  if (logAdapterFile === undefined) {
    logAdapterFile = new LogAdapterFile(opts)
  }
  return logAdapterFile
}

export {
  LogAdapterConsole,
  LogAdapterMemory,
  LogAdapterFile,
  getLogAdapterConsole,
  getLogAdapterMemory,
  getLogAdapterFile,
  LEVEL_DEBUG,
  LEVEL_INFO,
  LEVEL_WARNING,
  LEVEL_ERROR,
  LEVEL_FATAL,
}
