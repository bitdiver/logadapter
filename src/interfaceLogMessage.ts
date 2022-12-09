export interface LogMessageInterface {
  meta: LogMessageMetaInterface

  /** The data which should be logged */
  data: any

  /** The log level */
  logLevel: number | string
}

export interface LogMessageMetaInterface {
  /** Information about the run */
  run: LogMessageRunInterface

  /** Information about the the testcase */
  tc?: LogMessageTestcaseInterface

  /** Meta information about the step */
  step?: LogMessageStepInterface

  /** The timestamp when the message was created in milliseconds */
  logTime?: number
}

/** Meta information about the run */
interface LogMessageRunInterface {
  /** The start date/time of the test in milliseconds */
  start: number

  /** a unique id for this test run */
  id: string

  /** The name of the suite */
  name: string
}

/** Information about the the testcase */
interface LogMessageTestcaseInterface {
  /** The index number of the current testcase */
  tcCountCurrent: number

  /** The number of all testcases */
  tcCountAll: number

  /** A unique id for this testcase */
  id: string

  /** The name of this testcase */
  name: string
}

/** Meta information about the step */
interface LogMessageStepInterface {
  /** The index number of the current step */
  stepCountCurrent: number

  /** The number of all steps */
  stepCountAll: number

  /** A unique id for this step */
  id: string

  /** The name of this step */
  name: string

  /** The type of this step */
  type: 'single' | 'normal'
}
