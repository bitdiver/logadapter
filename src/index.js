import LogAdapterConsole from './LogAdapterConsole'
import LogAdapterMemory from './LogAdapterMemory'
import LogAdapterFile from './LogAdapterFile'


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


export { LogAdapterConsole, LogAdapterMemory, LogAdapterFile, getLogAdapterConsole, getLogAdapterMemory, getLogAdapterFile }
