const chalk = require('chalk')
// const { prompt } = require('inquirer')

const {
  updateEnvFile,
  fileExists,
  readFile,
  createNewEnvFile,
  getShortFileName,
} = require('./file')
const {
  exitWithError,
  exitWithSuccess,
  // getParsedAttributes,
  areAttributesDifferent,
} = require('./helpers')
const {
  logError,
  logInfo,
  logWarn,
  logAlert,
  logStartupBanner,
} = require('./logger')
// const { getUpdateEnvFileQuestions } = require('./questions')





/**
 * Default options
 * 1. schemaFile : name/path+name of the file which is going to be the reference file to create the .env file
 * 2. envFile: name/path+name of the file which is going to be created
 */
const DEFAULT_OPTIONS = {
  schemaFile: '.env.schema',
  envFile: '.env.local',
  options: {
    skipCreateQuestion: true,
    skipUpdateQuestion: true,
  },
}


/**
 * @function checkEnvFile
 *
 * @description Checks if the environment file already exists and compare it with the schema file.
 *              1. In case .env not exists, prompt a create-file question to the user if it's set
 *
 *              2. In case .env already exists, checks differences between env variable names from schema and .env file.
 *                If there are some differences, prompt for a update-file question if it's set. If not, auto update
 *
 * @param config Main function options with the following possible values:
 *                          1. **schemaFile** : name/path+name of the file which is going to be the reference file to create the .env file
 *                          2. **envFile**: name/path+name of the file which is going to be created
 *                          3. **options**: skip questions options
 *
 * @returns Promise<void>
 */
const checkEnvFile = async (config = DEFAULT_OPTIONS) => {
  let schemaContent

  logStartupBanner()

  const mainConfig = { ...DEFAULT_OPTIONS, ...(config || {}) }

  const { schemaFile, envFile, options } = mainConfig


  try {
    /** Check if schema file exists */
    await fileExists(schemaFile)

    schemaContent = await readFile(schemaFile)
    logInfo(`✅ Schema file (${chalk.underline(getShortFileName(schemaFile))}) checked successfully`)
  } catch (err) {
    logError(`Trying to read 📄${schemaFile} file.`)
    exitWithError()
  }

  /** ------------------------------------------------------------------------------------------------- */

  try {
    /** Check if environment file exists */
    await fileExists(envFile)
  } catch (err) {
    /** Create the env file due to "file no exists" error */
    logAlert(`${envFile} file doesn't exist`)
    await createNewEnvFile(schemaContent, envFile, options)
    exitWithSuccess()
  }

  /** ------------------------------------------------------------------------------------------------- */



  /** CASE: UPDATE ENV FILE -------------------------------------------------- */
  /**
   * If no error were thrown executing 'fileExists',
   * it means that already exists an env file and we need to
   * start checking differences from schema file
   */
  const envContent = await readFile(envFile)
  const isDifferentContent = areAttributesDifferent(schemaContent, envContent)

  if (isDifferentContent) {
    logWarn(` ⚠️  Environment file (${chalk.underline(getShortFileName(envFile))}) differs from ${chalk.underline(getShortFileName(schemaFile))}`)
    await updateEnvFile(options, schemaContent, envContent, schemaFile, envFile)
    exitWithSuccess()
  }

  /** ------------------------------------------------------------------------------------------------- */


  /** CASE WHEN: all is fine and no need to update or create */
  logInfo(`✅ Environment file (${chalk.underline(getShortFileName(envFile))}) checked successfully`)
  exitWithSuccess()
}

module.exports = {
  checkEnvFile,
}
