import { LogMessageInterface } from './interfaceLogMessage'

export interface LogAdapterInterface {
  /** Returns the logLevel name as a string */
  levelName: string

  /** Returns the logLevel as a number */
  levelNumber: number

  /** Clears all the existing log entries */
  reset: () => Promise<void>

  /** Logs the message */
  log: (logMessage: LogMessageInterface) => Promise<void>
}
