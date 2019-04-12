import { LogAdapterConsoleJsonElastic } from '../lib/index'

test('init LogAdapter: default loglevel', async done => {
  const logAdapter = new LogAdapterConsoleJsonElastic()
  expect(logAdapter.level).toEqual('error')
  expect(logAdapter.levelNumber).toEqual(3)
  done()
})

test('init LogAdapter: unknown loglevel init. Should end in default level', async done => {
  const logAdapter = new LogAdapterConsoleJsonElastic({ logLevel: 'gum' })
  expect(logAdapter.level).toEqual('error')
  expect(logAdapter.levelNumber).toEqual(3)
  done()
})

test('init LogAdapter: text loglevel.', async done => {
  const logAdapter = new LogAdapterConsoleJsonElastic({ logLevel: 'info' })
  expect(logAdapter.level).toEqual('info')
  expect(logAdapter.levelNumber).toEqual(1)
  done()
})

test('init LogAdapter: number loglevel.', async done => {
  const logAdapter = new LogAdapterConsoleJsonElastic({ logLevel: 1 })
  expect(logAdapter.level).toEqual('info')
  expect(logAdapter.levelNumber).toEqual(1)
  done()
})

test('init LogAdapter: number in string.', async done => {
  const logAdapter = new LogAdapterConsoleJsonElastic({ logLevel: '1' })
  expect(logAdapter.level).toEqual('info')
  expect(logAdapter.levelNumber).toEqual(1)
  done()
})

test('init LogAdapter: number > maxlevel.', async done => {
  const logAdapter = new LogAdapterConsoleJsonElastic({ logLevel: 7 })
  expect(logAdapter.level).toEqual('error')
  expect(logAdapter.levelNumber).toEqual(3)
  done()
})

test('init LogAdapter: number in string > maxlevel.', async done => {
  const logAdapter = new LogAdapterConsoleJsonElastic({ logLevel: '7' })
  expect(logAdapter.level).toEqual('error')
  expect(logAdapter.levelNumber).toEqual(3)
  done()
})

test('No log message given', () => {
  const logAdapter = new LogAdapterConsoleJsonElastic()
  return expect(logAdapter.log()).rejects.toThrow(
    `The 'logMessage' parameter was not given`
  )
})

test('Log message is not an object', () => {
  const logAdapter = new LogAdapterConsoleJsonElastic()
  return expect(logAdapter.log('My Error')).rejects.toThrow(
    `The 'logMessage' must be of type 'object'`
  )
})

test('Log message meta property is missing', () => {
  const logAdapter = new LogAdapterConsoleJsonElastic()
  return expect(logAdapter.log({ data: 'gum' })).rejects.toThrow(
    `The log message does not have a 'meta' property`
  )
})

test('Log message data property is missing', () => {
  const logAdapter = new LogAdapterConsoleJsonElastic()
  return expect(logAdapter.log({ meta: 'gum' })).rejects.toThrow(
    `The log message does not have a 'data' property`
  )
})

test('LogLevel < level of Logadapter', async done => {
  const logAdapter = new LogAdapterConsoleJsonElastic()

  const res = []
  logAdapter._writeLog = async logMessage => {
    res.push(logMessage)
  }

  const logMessage = {
    meta: {
      run: {
        start: 1533720241284,
      },
    },
    logLevel: 'debug',
    data: {},
  }
  await logAdapter.log(logMessage)
  expect(res).toEqual([])
  done()
})

test('LogLevel >= level of Logadapter', async done => {
  const logAdapter = new LogAdapterConsoleJsonElastic()

  const res = []
  logAdapter._writeLog = async logMessage => {
    res.push(logMessage)
  }

  const logMessage = {
    meta: {
      run: {
        start: 1533720241284,
      },
    },
    logLevel: 'error',
    data: {},
  }
  await logAdapter.log(logMessage)

  expect(res).toEqual([logMessage])
  done()
})

test('LogLevel not given. LogAdapter level = error', async done => {
  const logAdapter = new LogAdapterConsoleJsonElastic()

  const res = []
  logAdapter._writeLog = async logMessage => {
    res.push(logMessage)
  }

  const logMessage = {
    meta: {
      run: {
        start: 1533720241284,
      },
    },
    data: {},
  }
  await logAdapter.log(logMessage)

  expect(res).toEqual([logMessage])
  done()
})

test('LogLevel not given. LogAdapter level = debug', async done => {
  const logAdapter = new LogAdapterConsoleJsonElastic({ logLevel: 0 })

  const res = []
  logAdapter._writeLog = async logMessage => {
    res.push(logMessage)
  }

  const logMessage = {
    meta: {
      run: {
        start: 1533720241284,
      },
    },
    data: {},
  }
  await logAdapter.log(logMessage)

  expect(res).toEqual([logMessage])
  done()
})

test('LogLevel not given. LogAdapter level = fatal', async done => {
  const logAdapter = new LogAdapterConsoleJsonElastic({ logLevel: 4 })

  const res = []
  logAdapter._writeLog = async logMessage => {
    res.push(logMessage)
  }

  const logMessage = {
    meta: {
      run: {
        start: 1533720241284,
      },
    },
    data: {},
  }
  await logAdapter.log(logMessage)

  expect(res).toEqual([])
  done()
})

test('log run', async done => {
  const logAdapter = new LogAdapterConsoleJsonElastic({ logLevel: 2 })

  const res = []
  logAdapter._writeLog = async logMessage => {
    res.push(logMessage)
  }

  // this is a run message
  const logMessage = {
    meta: {
      run: {
        start: 1533720241284,
      },
    },
    data: {},
  }

  await logAdapter.log(logMessage)

  expect(res).toEqual([{ ...logMessage, logLevel: 'error' }])

  done()
})

test('log test case', async done => {
  const logAdapter = new LogAdapterConsoleJsonElastic({ logLevel: 2 })

  const res = []
  logAdapter._writeLog = async logMessage => {
    res.push(logMessage)
  }

  // this is a run message
  const logMessage = {
    meta: {
      run: {
        start: 1533720241284,
      },
      tc: {
        id: 'gum',
      },
    },
    data: {},
  }

  await logAdapter.log(logMessage)

  expect(res).toEqual([{ ...logMessage, logLevel: 'error' }])
  done()
})

test('log step', async done => {
  const logAdapter = new LogAdapterConsoleJsonElastic({ logLevel: 2 })

  const res = []
  logAdapter._writeLog = async logMessage => {
    res.push(logMessage)
  }

  // this is a run message
  const logMessage = {
    meta: {
      run: {
        start: 1533720241284,
      },
      tc: {
        id: 'gum',
      },
      step: { id: 'bo' },
    },
    data: {},
  }

  await logAdapter.log(logMessage)

  expect(res).toEqual([{ ...logMessage, logLevel: 'error' }])
  done()
})

test('log step with real json', async done => {
  const logAdapter = new LogAdapterConsoleJsonElastic({ logLevel: 2 })

  const res = []
  logAdapter._writeLog = async logMessage => {
    res.push(logMessage)
  }

  // this is a run message
  const logMessage = {
    logLevel: 'info',
    meta: {
      run: {
        start: 1554467063766,
        id: 'f55c21f6-20a2-4835-9e56-fd86de12e6f1',
        name: 'RI-Kern Suite',
        startString: '2019-04-05_14:24:23_+0200',
      },
      time: 1554469226073,
      step: {
        countCurrent: 846,
        countAll: 1121,
        id: '7b327bee-013b-4bac-b6fc-7ec6d24f7d0d',
        name: 'Risml Ist Send Event 1289',
        type: 'normal',
      },
      tc: {
        countAll: 330,
        countCurrent: 80,
        id: '86331edb-31b9-4fbb-aaed-475fafa70306',
        name:
          'TF-0080-Planfahrt-13_vereinigt_mit_Viahalt-Prio_1_Ausfall_vereinigt_Prio_1-9_ST_Ausfall-A8-4',
      },
      logTime: 1554469226073,
      logTimeString: '2019-04-05_15:00:26_+0200',
    },
    data: {
      message: 'Step start',
      tc: {
        countAll: 330,
        countCurrent: 80,
        id: '86331edb-31b9-4fbb-aaed-475fafa70306',
        name:
          'TF-0080-Planfahrt-13_vereinigt_mit_Viahalt-Prio_1_Ausfall_vereinigt_Prio_1-9_ST_Ausfall-A8-4',
      },
    },
  }

  await logAdapter.log(logMessage)

  expect(res).toEqual([{ ...logMessage, logLevel: 'error' }])
  done()
})
