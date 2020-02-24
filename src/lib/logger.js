/* eslint-disable no-console */

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
];

/** */
const colours = {
  Reset: `\x1b[0m`,
  Bright: `\x1b[1m`,
  FgRed: `\x1b[31m`,
  FgGreen: `\x1b[32m`,
  FgYellow: `\x1b[33m`,
};


/**
 * @function padStringTwotNumbers
 *
 * @description Pads provided value to ensure it has 2 characters and add a 0 at the string start if it's needed
 *
 * @param {number|string} value Value to be formatted if needed
 *
 * @returns string
 */
const padStringTwoNumbers = (value) => `${value}`.padStart(2, '0');


/**
 * @function formatDate
 *
 * @description Gets and format current date (Date.now())
 *
 * @returns {string} - Returns string with formatted date
 *
 */
const formatDate = () => {
  const date = new Date();
  const day = padStringTwoNumbers(date.getDate());
  const month = monthNames[date.getMonth()];
  const year = padStringTwoNumbers(date.getFullYear());
  const hour = padStringTwoNumbers(date.getHours());
  const minutes = padStringTwoNumbers(date.getMinutes());
  const seconds = padStringTwoNumbers(date.getSeconds());
  const milliseconds = `${date.getMilliseconds()}`.padStart(3, '0');
  return `📅 ${day}/${month}/${year} 🕐 ${hour}:${minutes}:${seconds}:${milliseconds} `;
};

const logError = (error) => {
  console.error(`${formatDate()}${colours.Bright}${colours.FgRed}[❌ ERROR]${colours.Reset} %s`, error);
};

const logInfo = (info) => {
  console.info(`${formatDate()}${colours.Bright}${colours.FgGreen}[📗  INFO]${colours.Reset} %s`, info);
};

const logWarn = (info) => {
  console.warn(`${formatDate()}${colours.Bright}${colours.FgYellow}[🚧  WARN]${colours.Reset} %s`, info);
};

const logAlert = (info) => {
  console.warn(`${formatDate()}${colours.Bright}${colours.FgRed}[❗️  ALERT]${colours.Reset} %s`, info);
};

const log = (value) => {
  console.log(`${formatDate()}${colours.Bright}[📋 LOG]${colours.Reset} %s`, value);
};

module.exports = {
  logError,
  logInfo,
  logWarn,
  logAlert,
  log,
};
