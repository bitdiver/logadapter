export interface LogAdapterOptions {
  /** The loglevel for the logger */
  logLevel?: number | string

  /** The time zone to use. see https://moment.github.io/luxon/#/zones for more information. Default is the local time zone */
  timeZone?: string

  /** The timeformat to use */
  timeFormat?: string
}
