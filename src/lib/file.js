import { prompt } from 'inquirer';
import root from 'app-root-path';
import fs from 'fs';
import {
  getEnvContent,
} from './helpers';
import { logInfo } from './logger';
import { getQuestions } from './questions';

const { path: rootPath } = root;


/**
 * @function writeFile
 *
 * @description Writes the given text into a file asynchronously returning a Promise
 *
 * @param {string} FILE file name to be saved (path + fileName)
 * @param {string} text file content
 *
 * @returns Promise<void>
 */
export const writeFile = (FILE, text) => new Promise((resolve, reject) => {
  const fullPath = `${rootPath}/${FILE}`;
  const folderPath = fullPath.substring(0, fullPath.lastIndexOf('/'));
  try {
    fs.mkdir(folderPath, { recursive: true }, (err) => {
      if (err) reject(err);

      fs.writeFile(fullPath, text, (error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  } catch (err) {
    reject(err);
  }
});


/**
 * @function createEnvFile
 *
 * @description Creates the environment file with the fileName provided
 *              based on schema variable names filled through terminal
 *
 * @param {Array<string>} attributes Schema attributes which are going to be filled through user input
 * @param {string} envFile Environment file name
 *
 * @returns void
 */
export const createEnvFile = async (attributes, envFile) => {
  // Get questions to be displayed through terminal
  const questions = getQuestions(attributes);
  // Start questions to fill env varialbes through user input
  const answers = await prompt(questions);
  // Get the environment file content well formatted
  const envContent = await getEnvContent(answers);
  // Write the environment file with the filled content
  await writeFile(envFile, envContent);
  logInfo(`✅ Environment file has been created successfully`);
};


/**
 * @function updateEnvFile
 *
 * @description Creates the environment file with the fileName provided
 *              based on 'attributes' param filled by user input through terminal.

 * @param {Array<string>} attributes Variable names to be asked for
 * @param {string} envContent Current environment content where we are going to append the new needed variables
 * @param {string} envFile Environment file name
 *
 * @returns void
 */
export const updateEnvFile = async (attributes, envContent, envFile) => {
  // Get questions to be displayed through terminal
  const questions = getQuestions(attributes, true);
  // Start questions to fill env varialbes through terminal
  const answers = await prompt(questions);
  // Get the environment file content well formatted
  const addedEnvContent = await getEnvContent(answers);
  // Clean empty lines from existing environmet file
  const cleanedCurrEnvContent = envContent.split('\n').filter((c) => !!c);
  // Concat cleaned existing environment file content with the new filled content
  const newEnvContent = `${cleanedCurrEnvContent.join('\n')}\n${addedEnvContent}`;
  // Update the environment file with the current content and the new appended content
  await writeFile(envFile, newEnvContent);
  if (Object.keys(answers).length > 1) logInfo(`✅ Environment file has been updated successfully`);
};


/**
 * @function readFile
 *
 * @description Reads text asynchronously from the file and returns a Promise
 *
 * @param {string} FILE file name (path + name)
 *
 * @returns Promise<string>
 */
export const readFile = (FILE) => new Promise((resolve, reject) => {
  const fullPath = `${rootPath}/${FILE}`;
  fs.readFile(fullPath, "utf8", (err, data) => {
    if (err) reject(err);
    else resolve(data);
  });
});


/**
 * @function fileExists
 *
 * @description Checks if the provided file exists
 *
 * @param {string} FILE file name (path + name)
 *
 * @returns Promise<boolean
 */
export const fileExists = (FILE) => new Promise((resolve, reject) => {
  const fullPath = `${rootPath}/${FILE}`;
  fs.access(fullPath, fs.F_OK, (err) => {
    if (err) {
      reject(err);
    }
    resolve(true);
  });
});
