import fs from 'fs';
import root from 'app-root-path';
const { path: rootPath } = root;

/**
 * @function read
 *
 * @description Reads text asynchronously from the file and returns a Promise
 *
 * @param {string} FILE file name (path + name)
 */
export const read = (FILE) => {
  return new Promise((resolve, reject) => {
    fs.readFile(FILE, "utf8", (err, data) => {
      if (err) reject(err);
      else resolve(data);
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