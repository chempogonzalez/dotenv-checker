
import { prompt } from 'inquirer';
import {
  fileExists,
  readFile,
  getAttributesFromContent,
  getEnvContent,
  writeFile,
  getDifference,
  cleanNullValuesFromArray,
} from './helpers';
import { logError, logInfo, log } from './logger';
import { getQuestions } from './questions';

const defaultOptions = {
  schemaFile: '.env.schema',
  envFile: '.env',
  outPut: '',
}

export const checkEnvFile = async (options = undefined) => {
  let funcOptions;
  if (!options) {
    funcOptions = defaultOptions;
  } else {
    funcOptions = { ...defaultOptions, ...options };
  }

  const { schemaFile, envFile } = funcOptions;
  
  let schemaAttributes;

  // Check schema file is ok
  try {
    await fileExists(schemaFile);
    const schemaContent = await readFile(schemaFile);
    schemaAttributes = getAttributesFromContent(schemaContent);
    logInfo(`✅ Schema file checked successfully`);
  } catch (err) {
    logError(`Trying to read 📄${schemaFile} file.`);
    return;
  }

  // Check environment file
  try {
    await fileExists(envFile);
    // In case environment file exists, check differences from schema file
    const envContent = await readFile(envFile);
    const envAttributes = await getAttributesFromContent(envContent);
    const difference = getDifference(schemaAttributes, envAttributes);
    if (difference && difference.length > 0) {
      updateEnvFile(difference, envContent);
    } else {
      logInfo(`✅ Environment file checked successfully`);
    }
  } catch (err) {
    // Create Env file when the file doesn't exist
    createEnvFile(schemaAttributes);
  }
}


const createEnvFile = async (attributes) => {
  const questions = getQuestions(attributes);
  const answers = await prompt(questions);
  const envContent = await getEnvContent(questions, answers);
  await writeFile('.env', envContent);
  logInfo(`✅ Environment file has been created successfully`);
}

const updateEnvFile = async (attributes, envContent) => {
  const questions = getQuestions(attributes, true);
  const answers = await prompt(questions);
  const addedEnvContent = await getEnvContent(questions, answers);
  const cleanedCurrEnvContent = cleanNullValuesFromArray(envContent.split('\n')).map(c => `${c}\n`);
  const newEnvContent = `${cleanedCurrEnvContent}${addedEnvContent}`;
  await writeFile('.env', newEnvContent);
  if (Object.keys(answers).length > 1) logInfo(`✅ Environment file has been updated successfully`);
}




checkEnvFile({
  schemaFile: '.env.example',
});



