import { LogMessageInterface, LogAdapterConsole } from '../src/index'
import { getDefaultLogMessage } from './helper'

test('init LogAdapter: default loglevel', async () => {
  const logAdapter = new LogAdapterConsole()
  expect(logAdapter.levelName).toEqual('error')
  expect(logAdapter.levelNumber).toEqual(3)
})

test('init LogAdapter: unknown loglevel init. Should end in default level', async () => {
  const logAdapter = new LogAdapterConsole({ logLevel: 'gum' })
  expect(logAdapter.levelName).toEqual('error')
  expect(logAdapter.levelNumber).toEqual(3)
})

test('init LogAdapter: text loglevel.', async () => {
  const logAdapter = new LogAdapterConsole({ logLevel: 'info' })
  expect(logAdapter.levelName).toEqual('info')
  expect(logAdapter.levelNumber).toEqual(1)
})

test('init LogAdapter: number loglevel.', async () => {
  const logAdapter = new LogAdapterConsole({ logLevel: 1 })
  expect(logAdapter.levelName).toEqual('info')
  expect(logAdapter.levelNumber).toEqual(1)
})

test('init LogAdapter: number in string.', async () => {
  const logAdapter = new LogAdapterConsole({ logLevel: '1' })
  expect(logAdapter.levelName).toEqual('info')
  expect(logAdapter.levelNumber).toEqual(1)
})

test('init LogAdapter: number > maxlevel.', async () => {
  const logAdapter = new LogAdapterConsole({ logLevel: 7 })
  expect(logAdapter.levelName).toEqual('error')
  expect(logAdapter.levelNumber).toEqual(3)
})

test('init LogAdapter: number in string > maxlevel.', async () => {
  const logAdapter = new LogAdapterConsole({ logLevel: '7' })
  expect(logAdapter.levelName).toEqual('error')
  expect(logAdapter.levelNumber).toEqual(3)
})

test('LogLevel < level of Logadapter', async () => {
  const logAdapter = new LogAdapterConsole()

  const res: any[] = []
  logAdapter._writeLog = async (logMessage: LogMessageInterface) => {
    res.push(logMessage)
  }

  const logMessage = getDefaultLogMessage()
  await logAdapter.log(logMessage)
  expect(res).toEqual([])
})

test('LogLevel >= level of Logadapter', async () => {
  const logAdapter = new LogAdapterConsole()

  const res: any[] = []
  logAdapter._writeLog = async (logMessage: LogMessageInterface) => {
    res.push(logMessage)
  }

  const logMessage = getDefaultLogMessage()
  logMessage.logLevel = 'error'
  await logAdapter.log(logMessage)

  expect(res).toEqual([logMessage])
})

test('log run', async () => {
  const logAdapter = new LogAdapterConsole({ logLevel: 2 })

  const resRun: any[] = []
  const resTc: any[] = []
  const resStep: any[] = []

  logAdapter._logRun = async (logMessage: LogMessageInterface) => {
    resRun.push(logMessage)
  }
  logAdapter._logTestcase = async (logMessage: LogMessageInterface) => {
    resTc.push(logMessage)
  }
  logAdapter._logStep = async (logMessage: LogMessageInterface) => {
    resStep.push(logMessage)
  }

  const logMessage = getDefaultLogMessage()
  logMessage.logLevel = 3
  delete logMessage.meta.tc
  delete logMessage.meta.step

  await logAdapter.log(logMessage)

  expect(resRun).toEqual([logMessage])
  expect(resTc).toEqual([])
  expect(resStep).toEqual([])
})

test('log test case', async () => {
  const logAdapter = new LogAdapterConsole({ logLevel: 2 })

  const resRun: any[] = []
  const resTc: any[] = []
  const resStep: any[] = []

  logAdapter._logRun = async (logMessage: LogMessageInterface) => {
    resRun.push(logMessage)
  }
  logAdapter._logTestcase = async (logMessage: LogMessageInterface) => {
    resTc.push(logMessage)
  }
  logAdapter._logStep = async (logMessage: LogMessageInterface) => {
    resStep.push(logMessage)
  }

  const logMessage = getDefaultLogMessage()
  logMessage.logLevel = 3
  delete logMessage.meta.step

  await logAdapter.log(logMessage)

  expect(resRun).toEqual([])
  expect(resTc).toEqual([logMessage])
  expect(resStep).toEqual([])
})

test('log step', async () => {
  const logAdapter = new LogAdapterConsole({ logLevel: 2 })

  const resRun: any[] = []
  const resTc: any[] = []
  const resStep: any[] = []

  logAdapter._logRun = async (logMessage: LogMessageInterface) => {
    resRun.push(logMessage)
  }
  logAdapter._logTestcase = async (logMessage: LogMessageInterface) => {
    resTc.push(logMessage)
  }
  logAdapter._logStep = async (logMessage: LogMessageInterface) => {
    resStep.push(logMessage)
  }

  const logMessage = getDefaultLogMessage()
  logMessage.logLevel = 3

  await logAdapter.log(logMessage)

  expect(resRun).toEqual([])
  expect(resTc).toEqual([])
  expect(resStep).toEqual([logMessage])
})
