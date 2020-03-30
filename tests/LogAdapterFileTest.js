import { LogAdapterFile } from '../src/index'
import path from 'path'
import rimraf from 'rimraf'
import util from 'util'
import globby from 'globby'

const rm = util.promisify(rimraf)

const LOG_PATH = path.join(__dirname, 'volatile')

beforeAll(async () => {
  await rm(LOG_PATH)
})

test('Log Message Run', async (done) => {
  const logAdapter = new LogAdapterFile({
    targetDir: LOG_PATH,
    timeFormat: 'YYYY-MM-DD_HHmmss',
    timeZone: 60,
  })

  const logMessage = {
    meta: {
      run: {
        start: 1544432256132,
        id: 'runId', // RunEnvironment ID
        name: 'suiteName',
      },
      logTime: 1544432256132,
    },
    data: { anyKey: 'some value' },
    logLevel: 'error',
  }

  await logAdapter.log(logMessage)

  const rootGlob = path.join(
    LOG_PATH,
    'Run_suiteName_2018-12-10_095736/**/*.json'
  )
  const files = await globby([rootGlob])

  expect(files.length).toBe(1)
  for (let i = 0; i < files.length; i++) {
    files[i] = path.relative(LOG_PATH, files[i])
  }

  expect(files).toEqual([
    'Run_suiteName_2018-12-10_095736/2018-12-10_095736_error.json',
  ])
  done()
})

test('Log Message Testcase', async (done) => {
  const logAdapter = new LogAdapterFile({
    targetDir: LOG_PATH,
    timeFormat: 'YYYY-MM-DD_HHmmss',
    timeZone: 60,
  })

  const tcCountCurrent = 3
  const tcCountAll = 12

  const logMessage = {
    meta: {
      run: {
        start: 1544432286132,
        id: 'runId', // RunEnvironment ID
        name: 'suiteName',
      },
      tc: {
        countCurrent: tcCountCurrent,
        countAll: tcCountAll,
        id: 'tcId', // TestcaseEnvironment ID
        name: 'great tc name',
      },

      logTime: 1544432286132,
    },
    data: { anyKey: 'some value' },
    logLevel: 'error',
  }

  await logAdapter.log(logMessage)

  const rootGlob = path.join(
    LOG_PATH,
    'Run_suiteName_2018-12-10_095806/**/*.json'
  )
  const files = await globby([rootGlob])

  expect(files.length).toBe(1)
  for (let i = 0; i < files.length; i++) {
    files[i] = path.relative(LOG_PATH, files[i])
  }

  expect(files).toEqual([
    'Run_suiteName_2018-12-10_095806/TC_03_great tc name/2018-12-10_095806_error.json',
  ])
  done()
})

test('Log Message Step', async (done) => {
  const logAdapter = new LogAdapterFile({
    targetDir: LOG_PATH,
    timeFormat: 'YYYY-MM-DD_HHmmss',
    timeZone: 60,
  })

  const tcCountCurrent = 3
  const tcCountAll = 12
  const stepCountCurrent = 87
  const stepCountAll = 123

  const logMessage = {
    meta: {
      run: {
        start: 1544432296132,
        id: 'runId', // RunEnvironment ID
        name: 'suiteName',
      },
      tc: {
        countCurrent: tcCountCurrent,
        countAll: tcCountAll,
        id: 'tcId', // TestcaseEnvironment ID
        name: 'great tc name',
      },
      step: {
        countCurrent: stepCountCurrent,
        countAll: stepCountAll,
        id: 'stepId', // testcase instance
        name: 'great step name',
        typ: 'singel',
      },
      logTime: 1544432296132,
    },
    data: { anyKey: 'some value' },
    logLevel: 'error',
  }

  await logAdapter.log(logMessage)

  const rootGlob = path.join(
    LOG_PATH,
    'Run_suiteName_2018-12-10_095816/**/*.json'
  )
  const files = await globby([rootGlob])

  expect(files.length).toBe(1)
  for (let i = 0; i < files.length; i++) {
    files[i] = path.relative(LOG_PATH, files[i])
  }

  expect(files).toEqual([
    'Run_suiteName_2018-12-10_095816/TC_03_great tc name/Step_087_great step name/2018-12-10_095816_error.json',
  ])
  done()
})
