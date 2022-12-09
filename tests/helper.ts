import { LogMessageInterface } from '../src/interfaceLogMessage'
import { DateTime } from 'luxon'

export function getDefaultLogMessage(): LogMessageInterface {
  const timeNow = DateTime.fromISO('2022-06-25T10:12:00+02:00').toMillis()
  const timeStart = DateTime.fromISO('2022-06-25T10:11:00+02:00').toMillis()
  return {
    meta: {
      /** Information about the run */
      run: {
        /** The start date/time of the test */
        start: timeStart,

        /** a unique id for this test run */
        id: 'myRunId',

        /** The name of the suite */
        name: 'myRunName'
      },

      /** Information about the the testcase */
      tc: {
        /** The index number of the current testcase */
        tcCountCurrent: 2,

        /** The number of all testcases */
        tcCountAll: 4,

        /** A unique id for this testcase */
        id: 'testcaseId_4',

        /** The name of this testcase */
        name: 'testcaseName_4'
      },

      /** Meta information about the step */
      step: {
        /** The index number of the current step */
        stepCountCurrent: 1,

        /** The number of all steps */
        stepCountAll: 3,

        /** A unique id for this step */
        id: 'stepId_1',

        /** The name of this step */
        name: 'stepName_1',

        /** The type of this step */
        typ: 'normal'
      },

      /** The timestamp when the message was created */
      logTime: timeNow
    },

    /** The data which should be logged */
    data: {
      foo: 'bar'
    },

    /** The log level */
    logLevel: 'debug'
  }
}
