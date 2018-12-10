import { LogAdapterConsole } from '../lib/index'

test('init LogAdapter: default loglevel', async done => {
  const logAdapter = new LogAdapterConsole()
  expect(logAdapter.level).toEqual('error')
  expect(logAdapter.levelNumber).toEqual(3)
  done()
})

test('init LogAdapter: unknown loglevel init. Should end in default level', async done => {
  const logAdapter = new LogAdapterConsole({ logLevel: 'gum' })
  expect(logAdapter.level).toEqual('error')
  expect(logAdapter.levelNumber).toEqual(3)
  done()
})

test('init LogAdapter: text loglevel.', async done => {
  const logAdapter = new LogAdapterConsole({ logLevel: 'info' })
  expect(logAdapter.level).toEqual('info')
  expect(logAdapter.levelNumber).toEqual(1)
  done()
})

test('init LogAdapter: number loglevel.', async done => {
  const logAdapter = new LogAdapterConsole({ logLevel: 1 })
  expect(logAdapter.level).toEqual('info')
  expect(logAdapter.levelNumber).toEqual(1)
  done()
})

test('init LogAdapter: number in string.', async done => {
  const logAdapter = new LogAdapterConsole({ logLevel: '1' })
  expect(logAdapter.level).toEqual('info')
  expect(logAdapter.levelNumber).toEqual(1)
  done()
})

test('init LogAdapter: number > maxlevel.', async done => {
  const logAdapter = new LogAdapterConsole({ logLevel: 7 })
  expect(logAdapter.level).toEqual('error')
  expect(logAdapter.levelNumber).toEqual(3)
  done()
})

test('init LogAdapter: number in string > maxlevel.', async done => {
  const logAdapter = new LogAdapterConsole({ logLevel: '7' })
  expect(logAdapter.level).toEqual('error')
  expect(logAdapter.levelNumber).toEqual(3)
  done()
})

test('No log message given', () => {
  const logAdapter = new LogAdapterConsole()
  return expect(logAdapter.log()).rejects.toThrow(
    `The 'logMessage' parameter was not given`
  )
})

test('Log message is not an object', () => {
  const logAdapter = new LogAdapterConsole()
  return expect(logAdapter.log('My Error')).rejects.toThrow(
    `The 'logMessage' must be of type 'object'`
  )
})

test('Log message meta property is missing', () => {
  const logAdapter = new LogAdapterConsole()
  return expect(logAdapter.log({ data: 'gum' })).rejects.toThrow(
    `The log message does not have a 'meta' property`
  )
})

test('Log message data property is missing', () => {
  const logAdapter = new LogAdapterConsole()
  return expect(logAdapter.log({ meta: 'gum' })).rejects.toThrow(
    `The log message does not have a 'data' property`
  )
})

test('LogLevel < level of Logadapter', async done => {
  const logAdapter = new LogAdapterConsole()

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
  const logAdapter = new LogAdapterConsole()

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
  const logAdapter = new LogAdapterConsole()

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
  const logAdapter = new LogAdapterConsole({ logLevel: 0 })

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
  const logAdapter = new LogAdapterConsole({ logLevel: 4 })

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
  const logAdapter = new LogAdapterConsole({ logLevel: 2 })

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
  done()
})

test('log test case', async done => {
  const logAdapter = new LogAdapterConsole({ logLevel: 2 })

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
  done()
})

test('log step', async done => {
  const logAdapter = new LogAdapterConsole({ logLevel: 2 })

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
  done()
})
