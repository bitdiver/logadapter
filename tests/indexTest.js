import {
  LogAdapterConsole,
  LogAdapterConsoleJson,
  LogAdapterConsoleJsonElastic,
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
} from '../src/index'

test('LEVEL_DEBUG', () => {
  expect(LEVEL_DEBUG).toEqual('debug')
})
test('LEVEL_INFO', () => {
  expect(LEVEL_INFO).toEqual('info')
})
test('LEVEL_WARNING', () => {
  expect(LEVEL_WARNING).toEqual('warning')
})
test('LEVEL_ERROR', () => {
  expect(LEVEL_ERROR).toEqual('error')
})
test('LEVEL_FATAL', () => {
  expect(LEVEL_FATAL).toEqual('fatal')
})

test('LogAdapterConsole', () => {
  const logAdapter = new LogAdapterConsole()
  expect(logAdapter).toBeDefined()
})

test('LogAdapterConsoleJson', () => {
  const logAdapter = new LogAdapterConsoleJson()
  expect(logAdapter).toBeDefined()
})

test('LogAdapterConsoleJsonElastic', () => {
  const logAdapter = new LogAdapterConsoleJsonElastic()
  expect(logAdapter).toBeDefined()
})

test('LogAdapterMemory', () => {
  const logAdapter = new LogAdapterMemory()
  expect(logAdapter).toBeDefined()
})

test('LogAdapterFile', () => {
  const logAdapter = new LogAdapterFile()
  expect(logAdapter).toBeDefined()
})

test('getLogAdapterConsole', () => {
  const logAdapter = getLogAdapterConsole()
  expect(logAdapter).toBeDefined()
})

test('getLogAdapterMemory', () => {
  const logAdapter = getLogAdapterMemory()
  expect(logAdapter).toBeDefined()
})

test('getLogAdapterFile', () => {
  const logAdapter = getLogAdapterFile()
  expect(logAdapter).toBeDefined()
})
