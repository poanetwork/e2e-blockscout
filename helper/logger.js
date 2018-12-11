const winston = require('winston')
const fs = require('fs-extra')
const { createLogger, format } = require('winston')
const { combine, timestamp, label, printf } = format
const myFormat = printf(info => {
  return `[${info.timestamp}]  ${info.message} `
})
const tempOutputPath = './temp/'
fs.ensureDirSync(tempOutputPath)
const tempOutputFile = tempOutputPath + 'result.log'
fs.ensureFileSync(tempOutputFile)
const logger = createLogger({
  format: combine(
    label({ label: '' }),
    timestamp(),
    myFormat
  ),
  transports: [
    new (winston.transports.Console)()
    // new (winston.transports.File)({filename: tempOutputFile})
  ]
})
exports.logger = logger
exports.tempOutputPath = tempOutputPath
exports.tempOutputFile = tempOutputFile
