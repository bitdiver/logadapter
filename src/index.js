import LogAdapterConsole from './LogAdapterConsole'
import LogAdapterConsoleJson from './LogAdapterConsoleJson'
import LogAdapterConsoleJsonElastic from './LogAdapterConsoleJsonElastic'
import LogAdapterMemory from './LogAdapterMemory'
import LogAdapterFile from './LogAdapterFile'

const LEVEL_DEBUG = 'debug'
const LEVEL_INFO = 'info'
const LEVEL_WARNING = 'warning'
const LEVEL_ERROR = 'error'
const LEVEL_FATAL = 'fatal'

// Stores the logger instance
let logAdapterConsole
let logAdapterConsoleJson
let logAdapterConsoleJsonElastic
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
function getLogAdapterConsoleJson(opts) {
  if (logAdapterConsoleJson === undefined) {
    logAdapterConsoleJson = new LogAdapterConsoleJson(opts)
  }
  return logAdapterConsoleJson
}

/**
 * returns the logAdapter
 */
function getLogAdapterConsoleJsonElastic(opts) {
  if (logAdapterConsoleJsonElastic === undefined) {
    logAdapterConsoleJsonElastic = new LogAdapterConsoleJsonElastic(opts)
  }
  return logAdapterConsoleJsonElastic
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
  LogAdapterConsoleJson,
  LogAdapterConsoleJsonElastic,
  LogAdapterMemory,
  LogAdapterFile,
  getLogAdapterConsole,
  getLogAdapterConsoleJson,
  getLogAdapterConsoleJsonElastic,
  getLogAdapterMemory,
  getLogAdapterFile,
  LEVEL_DEBUG,
  LEVEL_INFO,
  LEVEL_WARNING,
  LEVEL_ERROR,
  LEVEL_FATAL,
}
