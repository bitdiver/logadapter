import { LogAdapterMemory } from '../src/index'

test('init LogAdapter: default loglevel', async () => {
  const logAdapter = new LogAdapterMemory()
  expect(logAdapter.level).toEqual('error')
  expect(logAdapter.levelNumber).toEqual(3)
})

test('init LogAdapter: unknown loglevel init. Should end in default level', async () => {
  const logAdapter = new LogAdapterMemory({ logLevel: 'gum' })
  expect(logAdapter.level).toEqual('error')
  expect(logAdapter.levelNumber).toEqual(3)
})

test('init LogAdapter: text loglevel.', async () => {
  const logAdapter = new LogAdapterMemory({ logLevel: 'info' })
  expect(logAdapter.level).toEqual('info')
  expect(logAdapter.levelNumber).toEqual(1)
})

test('init LogAdapter: number loglevel.', async () => {
  const logAdapter = new LogAdapterMemory({ logLevel: 1 })
  expect(logAdapter.level).toEqual('info')
  expect(logAdapter.levelNumber).toEqual(1)
})

test('init LogAdapter: number in string.', async () => {
  const logAdapter = new LogAdapterMemory({ logLevel: '1' })
  expect(logAdapter.level).toEqual('info')
  expect(logAdapter.levelNumber).toEqual(1)
})

test('init LogAdapter: number > maxlevel.', async () => {
  const logAdapter = new LogAdapterMemory({ logLevel: 7 })
  expect(logAdapter.level).toEqual('error')
  expect(logAdapter.levelNumber).toEqual(3)
})

test('init LogAdapter: number in string > maxlevel.', async () => {
  const logAdapter = new LogAdapterMemory({ logLevel: '7' })
  expect(logAdapter.level).toEqual('error')
  expect(logAdapter.levelNumber).toEqual(3)
})

test('No log message given', () => {
  const logAdapter = new LogAdapterMemory()
  return expect(logAdapter.log()).rejects.toThrow(
    `The 'logMessage' parameter was not given`
  )
})

test('Log message is not an object', () => {
  const logAdapter = new LogAdapterMemory()
  return expect(logAdapter.log('My Error')).rejects.toThrow(
    `The 'logMessage' must be of type 'object'`
  )
})

test('Log message meta property is missing', () => {
  const logAdapter = new LogAdapterMemory()
  return expect(logAdapter.log({ data: 'gum' })).rejects.toThrow(
    `The log message does not have a 'meta' property`
  )
})

test('Log message data property is missing', () => {
  const logAdapter = new LogAdapterMemory()
  return expect(logAdapter.log({ meta: 'gum' })).rejects.toThrow(
    `The log message does not have a 'data' property`
  )
})

test('LogLevel < level of Logadapter', async () => {
  const logAdapter = new LogAdapterMemory()

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
  const logAdapter = new LogAdapterMemory()

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
  const logAdapter = new LogAdapterMemory()

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
  const logAdapter = new LogAdapterMemory({ logLevel: 0 })

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
  const logAdapter = new LogAdapterMemory({ logLevel: 4 })

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
  const logAdapter = new LogAdapterMemory({ logLevel: 2 })

  const resRun = []
  const resTc = []
  const resStep = []
  logAdapter._logRun = async (meta, data, logLevel) => {
    resRun.push({ meta, data, logLevel })
  }
  logAdapter._logTestcase = async (meta, data, logLevel) => {
    resTc.push({ meta, data, logLevel })
  }
  logAdapter._logStep = async (meta, data, logLevel) => {
    resStep.push({ meta, data, logLevel })
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

  expect(resRun).toEqual([{ ...logMessage, logLevel: 'error' }])
  expect(resTc).toEqual([])
  expect(resStep).toEqual([])
})

test('log test case', async () => {
  const logAdapter = new LogAdapterMemory({ logLevel: 2 })

  const resRun = []
  const resTc = []
  const resStep = []
  logAdapter._logRun = async (meta, data, logLevel) => {
    resRun.push({ meta, data, logLevel })
  }
  logAdapter._logTestcase = async (meta, data, logLevel) => {
    resTc.push({ meta, data, logLevel })
  }
  logAdapter._logStep = async (meta, data, logLevel) => {
    resStep.push({ meta, data, logLevel })
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

  expect(resRun).toEqual([])
  expect(resTc).toEqual([{ ...logMessage, logLevel: 'error' }])
  expect(resStep).toEqual([])
})

test('log step', async () => {
  const logAdapter = new LogAdapterMemory({ logLevel: 2 })

  const resRun = []
  const resTc = []
  const resStep = []
  logAdapter._logRun = async (meta, data, logLevel) => {
    resRun.push({ meta, data, logLevel })
  }
  logAdapter._logTestcase = async (meta, data, logLevel) => {
    resTc.push({ meta, data, logLevel })
  }
  logAdapter._logStep = async (meta, data, logLevel) => {
    resStep.push({ meta, data, logLevel })
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

  expect(resRun).toEqual([])
  expect(resTc).toEqual([])
  expect(resStep).toEqual([{ ...logMessage, logLevel: 'error' }])
})

test('Test reset and log step', async () => {
  const logAdapter = new LogAdapterMemory({ logLevel: 2 })

  // this is a run message
  const logMessage = {
    meta: {
      run: {
        start: 1533720241284,
        id: '0815',
      },
      tc: {
        id: 'gum',
        name: 'my tc name',
        countAll: 100,
        countCurrent: 5,
      },
      step: { id: 'bo', name: 'my step name', countAll: 15, countCurrent: 3 },
    },
    data: {},
    logLevel: 3,
  }

  await logAdapter.log(logMessage)

  expect(logAdapter.logs).toEqual({
    '0815': {
      logs: [],
      testcases: {
        'my tc name': {
          countAll: 100,
          countCurrent: 5,
          logs: [],
          steps: {
            'my step name': {
              logs: [
                {
                  countAll: 15,
                  countCurrent: 3,
                  data: {},
                  logLevel: 'error',
                },
              ],
            },
          },
        },
      },
    },
  })

  logAdapter.reset()
  expect(logAdapter.logs).toEqual({})
})

test('Test log run', async () => {
  const logAdapter = new LogAdapterMemory({ logLevel: 2 })

  // this is a run message
  const logMessage = {
    meta: {
      run: {
        start: 1533720241284,
        id: '0815',
      },
    },
    data: { gum: 'bo' },
    logLevel: 3,
  }

  await logAdapter.log(logMessage)

  expect(logAdapter.logs).toEqual({
    '0815': {
      logs: [{ data: { gum: 'bo' }, logLevel: 'error' }],
      testcases: {},
    },
  })

  logAdapter.reset()
  expect(logAdapter.logs).toEqual({})
})

test('Test log test case', async () => {
  const logAdapter = new LogAdapterMemory({ logLevel: 2 })

  // this is a run message
  const logMessage = {
    meta: {
      run: {
        start: 1533720241284,
        id: '0815',
      },
      tc: {
        id: 'gum',
        name: 'my tc name',
        countAll: 100,
        countCurrent: 5,
      },
    },
    data: { gum: 'bo' },
    logLevel: 3,
  }

  await logAdapter.log(logMessage)

  expect(logAdapter.logs).toEqual({
    '0815': {
      logs: [],
      testcases: {
        'my tc name': {
          countAll: 100,
          countCurrent: 5,
          logs: [
            {
              countAll: 100,
              countCurrent: 5,
              data: { gum: 'bo' },
              logLevel: 'error',
            },
          ],
          steps: {},
        },
      },
    },
  })

  logAdapter.reset()
  expect(logAdapter.logs).toEqual({})
})
