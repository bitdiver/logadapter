import {
  LogMessageMetaInterface,
  LogMessageInterface
} from './interfaceLogMessage'
import { LogAdapterConsole } from './LogAdapterConsole'

export class LogAdapterMemory extends LogAdapterConsole {
  logs: any = {}

  async reset(): Promise<void> {
    this.logs = {}
  }

  _prepareRun(runId: string): void {
    if (this.logs[runId] === undefined) {
      this.logs[runId] = {
        logs: [],
        testcases: {}
      }
    }
  }

  _prepareTestcase(
    runId: string,
    testcaseName: string,
    meta: LogMessageMetaInterface
  ): void {
    if (this.logs[runId].testcases[testcaseName] === undefined) {
      this.logs[runId].testcases[testcaseName] = {
        logs: [],
        steps: {},
        countCurrent: meta.tc?.tcCountCurrent,
        countAll: meta.tc?.tcCountAll
      }
    }
  }

  async _logRun(logMessage: LogMessageInterface): Promise<void> {
    const runId = logMessage.meta.run.id
    this._prepareRun(runId)
    this.logs[runId].logs.push({
      data: logMessage.data,
      logLevel: logMessage.logLevel
    })
  }

  async _logTestcase(logMessage: LogMessageInterface): Promise<void> {
    const runId = logMessage.meta.run.id
    const testcaseName = logMessage.meta.tc?.name

    if (testcaseName) {
      this._prepareRun(runId)
      this._prepareTestcase(runId, testcaseName, logMessage.meta)

      this.logs[runId].testcases[testcaseName].logs.push({
        data: logMessage.data,
        logLevel: logMessage.logLevel,
        countCurrent: logMessage.meta.tc?.tcCountCurrent,
        countAll: logMessage.meta.tc?.tcCountAll
      })
    }
  }

  async _logStep(logMessage: LogMessageInterface): Promise<void> {
    const runId = logMessage.meta.run.id
    const testcaseName = logMessage.meta.tc?.name
    const stepName = logMessage.meta.step?.name

    if (testcaseName !== undefined && stepName !== undefined) {
      this._prepareRun(runId)
      this._prepareTestcase(runId, testcaseName, logMessage.meta)
      if (this.logs[runId].testcases[testcaseName] === undefined) {
        this.logs[runId].testcases[testcaseName] = {
          logs: [],
          steps: {},
          countCurrent: logMessage.meta.tc?.tcCountCurrent,
          countAll: logMessage.meta.tc?.tcCountAll
        }
      }
      if (
        this.logs[runId].testcases[testcaseName].steps[stepName] === undefined
      ) {
        this.logs[runId].testcases[testcaseName].steps[stepName] = {
          logs: []
        }
      }
      this.logs[runId].testcases[testcaseName].steps[stepName].logs.push({
        data: logMessage.data,
        logLevel: logMessage.logLevel,
        countCurrent: logMessage.meta.step?.stepCountCurrent,
        countAll: logMessage.meta.step?.stepCountAll
      })
    }
  }
}
