import { getLogLevelNumber, getLogLevelName } from '../src/logLevel'

describe('getLogLevelNumber', () => {
  test('valid name: should return the right logLevel for the name', () => {
    const logLevel = getLogLevelNumber('warning')
    expect(logLevel).toEqual(2)
  })

  test('invalid name: should return the default logLevel', () => {
    const logLevel = getLogLevelNumber('gum')
    expect(logLevel).toEqual(3)
  })

  test('valid number as string: should return the right logLevel', () => {
    const logLevel = getLogLevelNumber('2')
    expect(logLevel).toEqual(2)
  })

  test('invalid number as string: should return the default logLevel', () => {
    const logLevel = getLogLevelNumber('15')
    expect(logLevel).toEqual(3)
  })

  test('valid number: should return the right logLevel', () => {
    const logLevel = getLogLevelNumber(2)
    expect(logLevel).toEqual(2)
  })

  test('invalid number: should return the default logLevel', () => {
    const logLevel = getLogLevelNumber(15)
    expect(logLevel).toEqual(3)
  })

  test('undefined: should return the default logLevel', () => {
    const logLevel = getLogLevelNumber()
    expect(logLevel).toEqual(3)
  })
})

describe('getLogLevelName', () => {
  test('valid name: should return the logLevel name', () => {
    const logLevel = getLogLevelName('warning')
    expect(logLevel).toEqual('warning')
  })

  test('valid name 2: should return the logLevel name', () => {
    const logLevel = getLogLevelName('warn')
    expect(logLevel).toEqual('warning')
  })

  test('invalid name: should return the logLevel name for the default logLevel', () => {
    const logLevel = getLogLevelName('xxx')
    expect(logLevel).toEqual('error')
  })

  test('valid number: should return the right logLevel name for the given number', () => {
    const logLevel = getLogLevelName(0)
    expect(logLevel).toEqual('debug')
  })

  test('valid number as string: should return the right logLevel name for the given number', () => {
    const logLevel = getLogLevelName('0')
    expect(logLevel).toEqual('debug')
  })

  test('invalid number: should return the logLevel name for the default logLevel', () => {
    const logLevel = getLogLevelName(15)
    expect(logLevel).toEqual('error')
  })
})
