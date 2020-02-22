/* eslint-disable import/prefer-default-export */
import {
  getAttributesFromContent,
  getDifference,
} from './helpers';
import {
  createEnvFile,
  updateEnvFile,
  fileExists,
  readFile,
} from './file';
import { logError, logInfo, logWarn } from './logger';


/**
 * Default options
 * 1. schemaFile : name/path+name of the file which is going to be the reference file to create the .env file
 * 2. envFile: name/path+name of the file which is going to be created
 */
const defaultOptions = {
  schemaFile: '.env.schema',
  envFile: '.env',
};


/**
 * @function checkEnvFile
 *
 * @description Checks if the environmet file already exists and compare it with the schema file.
 *              1. In case .env not exists, prompt questions to the user
 *                in order to fill the needed env variables and create the .env file
 *
 *              2. In case .env already exists, checks differences between env variable names from schema and .env file.
 *                If there are some differences, ask the user to fill the needed variables to match schema variables.
 *
 * @param {object} options Main function options with the following possible values:
 *                          1. **schemaFile** : name/path+name of the file which is going to be the reference file to create the .env file
 *                          2. **envFile**: name/path+name of the file which is going to be created
 *
 * @returns Promise<void>
 */
export const checkEnvFile = async (options = undefined) => {
  let funcOptions;
  let schemaAttributes;

  /**
   * Check if options are provided
   * if TRUE, merge with defaultOptions
   * if FALSE, set defaultOptions to the object
   */
  if (!options) {
    funcOptions = defaultOptions;
  } else {
    funcOptions = { ...defaultOptions, ...options };
  }

  const { schemaFile, envFile } = funcOptions;

  try {
    // Check if schema file exists
    await fileExists(schemaFile);

    /**
     * Read schema file and get env variable names to be used later in order to create the environment file
     */
    const schemaContent = await readFile(schemaFile);
    schemaAttributes = getAttributesFromContent(schemaContent);
    logInfo(`✅ Schema file checked successfully`);
  } catch (err) {
    logError(`Trying to read 📄${schemaFile} file.`);
    return;
  }

  try {
    // Check if environment file exists
    await fileExists(envFile);
  } catch (err) {
    // If an error were found Create Env file when the file doesn't exist
    createEnvFile(schemaAttributes, envFile);
    return;
  }

  /**
   * If no error were thrown executing 'fileExists',
   * it means that already exists an env file and we need to
   * start checking differences from schema file
   */
  const envContent = await readFile(envFile);
  const envAttributes = await getAttributesFromContent(envContent);
  const difference = getDifference(schemaAttributes, envAttributes);

  /**
   * If there are some differences between schema and env file
   * We need to start the 'updateEnvFile' process
   *
   * If no differences were found, it's ALL OK. Process finished
   */
  if (difference && difference.length > 0) {
    logWarn(`Environment file differs from ${schemaFile}`);
    updateEnvFile(difference, envContent, envFile);
  } else {
    logInfo(`✅ Environment file checked successfully`);
  }
};


checkEnvFile({
  schemaFile: '.env.example',
});
