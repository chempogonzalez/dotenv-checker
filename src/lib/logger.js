/* eslint-disable no-console */
import Colors from './colors';

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

export const logError = (error) => {
  console.error(`${formatDate()}${Colors.Bright}${Colors.FgRed}[❌ ERROR]${Colors.Reset} %s`, error);
};

export const logInfo = (info) => {
  console.info(`${formatDate()}${Colors.Bright}${Colors.FgGreen}[📗  INFO]${Colors.Reset} %s`, info);
};

export const logWarn = (info) => {
  console.info(`${formatDate()}${Colors.Bright}${Colors.FgYellow}[🚧  WARN]${Colors.Reset} %s`, info);
};

export const log = (value) => {
  console.log(`${formatDate()}${Colors.Bright}[📋 LOG]${Colors.Reset} %s`, value);
};
