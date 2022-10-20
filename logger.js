const { createLogger, format, transports, config } = require('winston')

const myFormat = format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`
})

const logger = createLogger({
  levels: config.syslog.levels,
    format: format.combine(
    format.timestamp(),
     format.label({ label: 'CT-BOT' }),
    myFormat
  ),
  transports: [new transports.Console(), new transports.File({ filename: 'botlogs.log' })],
  exceptionHandlers: [new transports.Console(), new transports.File({ filename: 'botlogs.log' })],
})
module.exports = logger
