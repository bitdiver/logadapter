import clone from 'clone'
import { LogAdapterConsoleJson } from '../src/index'
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

  const expectedLogMessage: any = clone(logMessage)
  expectedLogMessage.logLevel = 'error'
  expectedLogMessage.meta.logTime = '2022-06-25 10:12:00.000 +02:00'
  expectedLogMessage.meta.run.start = '2022-06-25 10:11:00.000 +02:00'

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
