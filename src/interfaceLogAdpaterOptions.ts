export interface LogAdapterOptions {
  /** The loglevel for the logger */
  logLevel?: number | string

  /** The timeformat to use */
  timeFormat?: string
}

export interface LogAdapterFileOptions extends LogAdapterOptions {
  /** The log directory where to write the files */
  targetDir?: string

  /** The time format uses to create the file names */
  timeFormatFileName?: string
}
