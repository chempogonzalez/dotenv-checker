import fs from 'fs';
import root from 'app-root-path';
import { log, logInfo } from './logger';
const { path: rootPath } = root;

/**
 * @function read
 *
 * @description Reads text asynchronously from the file and returns a Promise
 *
 * @param {string} FILE file name (path + name)
 */
export const readFile = (FILE) => {
  return new Promise((resolve, reject) => {
    const fullPath = `${rootPath}/${FILE}`;
    fs.readFile(fullPath, "utf8", (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}


/**
 * @function writeFile
 *
 * @description Writes the given text into a file asynchronously returning a Promise
 *
 * @param {string} FILE file name to be saved (path + fileName)
 *
 * @param {string} text file content
 */
export const writeFile = (FILE, text) => {
  return new Promise((resolve, reject) => {
    const fullPath = `${rootPath}/${FILE}`;
    fs.writeFile(fullPath, text, err => {
      if (err) reject(err);
      else resolve();
    });
  });
}


export const fileExists = (FILE) => {
  return new Promise((resolve, reject) => {
    const fullPath = `${rootPath}/${FILE}`;
    fs.access(fullPath, fs.F_OK, (err) => {
      if (err) {
        reject(err);
      }
      resolve(true);
    });
  });
}

/**
 * @function cleanNullValuesFromArray
 *
 * @description Delete all the null values within the array
 *
 * @param array Array to be cleaned up
 *
 * @returns {Array<object>} Cleaned up array
 */
export const cleanNullValuesFromArray = (array) => {
  const returnedArray = [...array];
  array.forEach((obj) => {
    if (!obj) {
      returnedArray.splice(returnedArray.indexOf(null), 1);
    }
  });
  return returnedArray;
};


const arrayDiff = (schemaArray, envArray) => {
  var a = [], diff = [];
  const cleanedSchema = cleanNullValuesFromArray(schemaArray);
  const cleanedEnv = cleanNullValuesFromArray(envArray);
  for (var i = 0; i < cleanedSchema.length; i++) {
      a[schemaArray[i]] = true;
  }
  for (var i = 0; i < cleanedEnv.length; i++) {
      if (a[envArray[i]]) {
          delete a[envArray[i]];
      }
  }
  for (var k in a) {
      diff.push(k);
  }
  return diff;
}


export const getDifference = (schemaAttributes, envAttributes) => {
  const cleanedSchema = cleanNullValuesFromArray(schemaAttributes);
  const cleanedEnv = cleanNullValuesFromArray(envAttributes);
  const difference = arrayDiff(cleanedSchema, cleanedEnv);
  return difference;
}

export const getAttributesFromContent = (schemaContent) => {
  const lines = schemaContent.split('\n');
  return lines.reduce((prev, curr) => {
    if (curr) {
      const attribute = curr.split('=')[0];
      return [
        ...prev,
        attribute,
      ];
    }
    return [...prev];
  }, []);
}

export const getEnvContent = (questions, answers) => {
  let content = '';
  for (const key in answers) {
    if (key.includes('-')) {
      const question = questions.find(q => q.name === key);
      if (question) {
        content = `${content}${question.message}${answers[key]}\n`;
      }
    }
  }
  return content;
}