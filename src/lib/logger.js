import Colors from './colors';

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

const padStringTwoNumbers = (value) => {
  return `${value}`.padStart(2, '0');
}

/**
 * @function formatDate
 *
 * @description This funcion get date now and format.
 *
 * @returns {string} - Return string with date formated.
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
}

export const logError = (error) => {
  console.error(`${formatDate()}${Colors.Bright}${Colors.FgRed}[❌ ERROR]${Colors.Reset} %s`, error);
};


export const logInfo = (info) => {
  console.info(`${formatDate()}${Colors.Bright}${Colors.FgGreen}[📗 INFO]${Colors.Reset} %s`, info);
};

export const log = (value) => {
  console.log(`${formatDate()}${Colors.Bright}[📋 LOG]${Colors.Reset} %s`, value);
};
