import { LogAdapterConsoleJsonElastic } from '../src/index'

test('init LogAdapter: default loglevel', async () => {
  const logAdapter = new LogAdapterConsoleJsonElastic()
  expect(logAdapter.level).toEqual('error')
  expect(logAdapter.levelNumber).toEqual(3)
})

test('init LogAdapter: unknown loglevel init. Should end in default level', async () => {
  const logAdapter = new LogAdapterConsoleJsonElastic({ logLevel: 'gum' })
  expect(logAdapter.level).toEqual('error')
  expect(logAdapter.levelNumber).toEqual(3)
})

test('init LogAdapter: text loglevel.', async () => {
  const logAdapter = new LogAdapterConsoleJsonElastic({ logLevel: 'info' })
  expect(logAdapter.level).toEqual('info')
  expect(logAdapter.levelNumber).toEqual(1)
})

test('init LogAdapter: number loglevel.', async () => {
  const logAdapter = new LogAdapterConsoleJsonElastic({ logLevel: 1 })
  expect(logAdapter.level).toEqual('info')
  expect(logAdapter.levelNumber).toEqual(1)
})

test('init LogAdapter: number in string.', async () => {
  const logAdapter = new LogAdapterConsoleJsonElastic({ logLevel: '1' })
  expect(logAdapter.level).toEqual('info')
  expect(logAdapter.levelNumber).toEqual(1)
})

test('init LogAdapter: number > maxlevel.', async () => {
  const logAdapter = new LogAdapterConsoleJsonElastic({ logLevel: 7 })
  expect(logAdapter.level).toEqual('error')
  expect(logAdapter.levelNumber).toEqual(3)
})

test('init LogAdapter: number in string > maxlevel.', async () => {
  const logAdapter = new LogAdapterConsoleJsonElastic({ logLevel: '7' })
  expect(logAdapter.level).toEqual('error')
  expect(logAdapter.levelNumber).toEqual(3)
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

test('LogLevel < level of Logadapter', async () => {
  const logAdapter = new LogAdapterConsoleJsonElastic()

  const res = []
  logAdapter._writeLog = async (logMessage) => {
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
})

test('LogLevel >= level of Logadapter', async () => {
  const logAdapter = new LogAdapterConsoleJsonElastic()

  const res = []
  logAdapter._writeLog = async (logMessage) => {
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
})

test('LogLevel not given. LogAdapter level = error', async () => {
  const logAdapter = new LogAdapterConsoleJsonElastic()

  const res = []
  logAdapter._writeLog = async (logMessage) => {
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
})

test('LogLevel not given. LogAdapter level = debug', async () => {
  const logAdapter = new LogAdapterConsoleJsonElastic({ logLevel: 0 })

  const res = []
  logAdapter._writeLog = async (logMessage) => {
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
})

test('LogLevel not given. LogAdapter level = fatal', async () => {
  const logAdapter = new LogAdapterConsoleJsonElastic({ logLevel: 4 })

  const res = []
  logAdapter._writeLog = async (logMessage) => {
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
})

test('log run', async () => {
  const logAdapter = new LogAdapterConsoleJsonElastic({ logLevel: 2 })

  const res = []
  logAdapter._writeLog = async (logMessage) => {
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
})

test('log test case', async () => {
  const logAdapter = new LogAdapterConsoleJsonElastic({ logLevel: 2 })

  const res = []
  logAdapter._writeLog = async (logMessage) => {
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
})

test('log step', async () => {
  const logAdapter = new LogAdapterConsoleJsonElastic({ logLevel: 2 })

  const res = []
  logAdapter._writeLog = async (logMessage) => {
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
})

test('show log step with json data content', async () => {
  const logAdapter = new LogAdapterConsoleJsonElastic({ logLevel: 0 })

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
    data: {
      message: 'Could not clear the abo',
    },
  }

  await logAdapter.log(logMessage)
})
