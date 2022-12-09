import clone from 'clone'
import { DateTime } from 'luxon'
import { DEFAULT_TIME_FORMAT, LogAdapterConsoleJson } from '../src/index'
import { getDefaultLogMessage } from './helper'

test('log test case', async () => {
  console.log = jest.fn() // eslint-disable-line no-console

  const logAdapter = new LogAdapterConsoleJson({ logLevel: 2 })

  // A message without a step is not logged
  const logMessage = getDefaultLogMessage()
  logMessage.logLevel = 3
  delete logMessage.meta.step

  await logAdapter.log(logMessage)

  // eslint-disable-next-line no-console
  expect(console.log).toHaveBeenCalledTimes(0)
})

test('log step', async () => {
  console.log = jest.fn() // eslint-disable-line no-console

  const logAdapter = new LogAdapterConsoleJson({ logLevel: 2 })

  // this is a run message
  const logMessage = getDefaultLogMessage()
  logMessage.logLevel = 3

  const timeNow = DateTime.fromISO('2022-06-25T10:12:00+02:00')
  const timeStart = DateTime.fromISO('2022-06-25T10:11:00+02:00')

  const expectedLogMessage: any = clone(logMessage)
  expectedLogMessage.logLevel = 'error'
  expectedLogMessage.meta.logTime = timeNow.toFormat(DEFAULT_TIME_FORMAT)
  expectedLogMessage.meta.run.start = timeStart.toFormat(DEFAULT_TIME_FORMAT)

  await logAdapter.log(logMessage)

  // eslint-disable-next-line no-console
  expect(console.log).toHaveBeenCalledWith(JSON.stringify(expectedLogMessage))
})

test('log step, loglevel < loglevel logadapter', async () => {
  console.log = jest.fn() // eslint-disable-line no-console

  const logAdapter = new LogAdapterConsoleJson({ logLevel: 2 })

  // this is a run message
  const logMessage = getDefaultLogMessage()
  logMessage.logLevel = 1

  await logAdapter.log(logMessage)

  // eslint-disable-next-line no-console
  expect(console.log).toHaveBeenCalledTimes(0)
})
