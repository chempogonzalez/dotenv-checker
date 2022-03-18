/* eslint-disable no-console */
const chalk = require('chalk')
const gradient = require('gradient-string')


/**
 * Short month names
 */
const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]


/**
 * @function padStringTwotNumbers
 *
 * @description Pads provided value to ensure it has 2 characters and add a 0 at the string start if it's needed
 *
 * @param {number|string} value Value to be formatted if needed
 *
 * @returns string
 */
const padStringTwoNumbers = (value) => `${value}`.padStart(2, '0')


/**
 * @function formatDate
 *
 * @description Gets and format current date (Date.now())
 *
 * @returns {string} - Returns string with formatted date
 *
 */
const formatDate = () => {
  const date = new Date()
  const day = padStringTwoNumbers(date.getDate())
  const month = monthNames[date.getMonth()]
  const year = padStringTwoNumbers(date.getFullYear())
  const hour = padStringTwoNumbers(date.getHours())
  const minutes = padStringTwoNumbers(date.getMinutes())
  const seconds = padStringTwoNumbers(date.getSeconds())
  const milliseconds = `${date.getMilliseconds()}`.padStart(3, '0')
  return `📅 ${day}/${month}/${year} 🕐 ${hour}:${minutes}:${seconds}:${milliseconds} `
}


const withDate = (str, displayDate = false) => `${displayDate ? formatDate() : ''}${str}`


const logError = (error) => {
  console.info(withDate(`${chalk.bold.red('[❌ ERROR]')}  ${chalk.red(error)}`))
}

const logInfo = (info) => {
  console.info(withDate(`${chalk.bold.green('📗 [ INFO ]')}  ${info}`))
}

const logWarn = (info) => {
  console.warn(withDate(`${chalk.bold.yellow('🚧 [ WARN ]')} ${info}`))
}

const logAlert = (info) => {
  console.warn(withDate(`${chalk.bold.red('❗️ [ ALERT ] 💢')} ${chalk.underline(info)}`))
}

const log = (value) => {
  console.warn(withDate(`${chalk.bold.whiteBright('[📋 LOG]')} ${value}`))
}

const logStartupBanner = () => console.log(`
${chalk.bold(gradient.summer('[ DOTENV-CHECKER ]'))} ${chalk.cyanBright('- Initializing checks for .env files consistency & sync...')}
`)


const logEnvFileCreated = (envFile) => () => {
  const envFileName = envFile.split('/').slice(-1)
  logInfo(chalk.green(`✅ ${chalk.underline(envFileName)} file created successfully!`))
}

module.exports = {
  logError,
  logInfo,
  logWarn,
  logAlert,
  log,
  logStartupBanner,
  logEnvFileCreated,
}
