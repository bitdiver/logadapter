import LogAdapterConsole from './LogAdapterConsole'

/**
 * This logadapter stores all the logs into memory.
 * The format of the stored logs is as follows:
 * const this.logs = {
 *   runId: {
 *     logs:[{}, ...]
 *     testcases:{tcId: testcase}
 *   }
 * }
 *
 * const testcase = {
 *   steps: {}
 *   logs: []
 * }
 *
 * const step = {
 *   logs: []
 * }
 *
 */
export class LogAdapterMemory extends LogAdapterConsole {
  constructor(opts) {
    super(opts)

    // Stores all the logs
    this.logs = {}
  }

  reset() {
    this.logs = {}
  }

  _prepareRun(runId) {
    if (this.logs[runId] === undefined) {
      this.logs[runId] = {
        logs: [],
        testcases: {},
      }
    }
  }

  _prepareTestcase(runId, testcaseName, meta) {
    if (this.logs[runId].testcases[testcaseName] === undefined) {
      this.logs[runId].testcases[testcaseName] = {
        logs: [],
        steps: {},
        countCurrent: meta.tc.countCurrent,
        countAll: meta.tc.countAll,
      }
    }
  }

  async _logRun(meta, data, logLevel) {
    const runId = meta.run.id
    this._prepareRun(runId)
    this.logs[runId].logs.push({ data, logLevel })
  }

  async _logTestcase(meta, data, logLevel) {
    const runId = meta.run.id
    const testcaseName = meta.tc.name

    this._prepareRun(runId)
    this._prepareTestcase(runId, testcaseName, meta)

    this.logs[runId].testcases[testcaseName].logs.push({
      data,
      logLevel,
      countCurrent: meta.tc.countCurrent,
      countAll: meta.tc.countAll,
    })
  }

  async _logStep(meta, data, logLevel) {
    const runId = meta.run.id
    const testcaseName = meta.tc.name
    const stepName = meta.step.name

    this._prepareRun(runId)
    this._prepareTestcase(runId, testcaseName, meta)
    if (this.logs[runId].testcases[testcaseName] === undefined) {
      this.logs[runId].testcases[testcaseName] = {
        logs: [],
        steps: {},
        countCurrent: meta.tc.countCurrent,
        countAll: meta.tc.countAll,
      }
    }
    if (
      this.logs[runId].testcases[testcaseName].steps[stepName] === undefined
    ) {
      this.logs[runId].testcases[testcaseName].steps[stepName] = {
        logs: [],
      }
    }
    this.logs[runId].testcases[testcaseName].steps[stepName].logs.push({
      data,
      logLevel,
      countCurrent: meta.step.countCurrent,
      countAll: meta.step.countAll,
    })
  }
}
