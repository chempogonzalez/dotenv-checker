const chalk = require('chalk')
const { prompt } = require('inquirer')

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
  getParsedAttributes,
} = require('./helpers')
const {
  logError,
  logInfo,
  logWarn,
  logAlert,
  logStartupBanner,
} = require('./logger')
const { getUpdateEnvFileQuestions } = require('./questions')





/**
 * Default options
 * 1. schemaFile : name/path+name of the file which is going to be the reference file to create the .env file
 * 2. envFile: name/path+name of the file which is going to be created
 */
const defaultOptions = {
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
 *              1. In case .env not exists, prompt questions to the user
 *                in order to fill the needed env variables and create the .env file
 *
 *              2. In case .env already exists, checks differences between env variable names from schema and .env file.
 *                If there are some differences, ask the user to fill the needed variables to match schema variables.
 *
 * @param config Main function options with the following possible values:
 *                          1. **schemaFile** : name/path+name of the file which is going to be the reference file to create the .env file
 *                          2. **envFile**: name/path+name of the file which is going to be created
 *
 * @returns Promise<void>
 */
const checkEnvFile = async (config = defaultOptions) => {
  let schemaContent

  logStartupBanner()

  const mainConfig = { ...defaultOptions, ...(config || {}) }

  const { schemaFile, envFile, options } = mainConfig


  try {
    // Check if schema file exists
    await fileExists(schemaFile)

    /**
     * Read schema file and get env variable names to be used later in order to create the environment file
     */
    schemaContent = await readFile(schemaFile)
    // schemaAttributes = getAttributesFromContent(schemaContent)
    logInfo(`✅ Schema file (${chalk.underline(getShortFileName(schemaFile))}) checked successfully`)
  } catch (err) {
    logError(`Trying to read 📄${schemaFile} file.`)
    exitWithError()
  }


  try {
    // Check if environment file exists
    await fileExists(envFile)
  } catch (err) {
    // If an error were found, execute 'Create Env file' when the file doesn't exist
    logAlert(`${envFile} file doesn't exist`)
    // await createEnvFile(schemaAttributes, envFile)
    await createNewEnvFile(schemaContent, envFile, options)
    exitWithSuccess()
  }




  /**
   * If no error were thrown executing 'fileExists',
   * it means that already exists an env file and we need to
   * start checking differences from schema file
   */
  const envContent = await readFile(envFile)
  const schemaAttributes = Object.keys(getParsedAttributes(schemaContent) ?? {})
  const envAttributes = Object.keys(getParsedAttributes(envContent) ?? {})

  const isDifferentContent = JSON.stringify(schemaAttributes) !== JSON.stringify(envAttributes)

  if (isDifferentContent) {
    logWarn(` ⚠️  Environment file (${chalk.underline(getShortFileName(envFile))}) differs from ${chalk.underline(getShortFileName(schemaFile))}`)
    if (!options.skipUpdateQuestion) {
      const questions = getUpdateEnvFileQuestions(envFile, schemaFile)
      const { shouldUpdateEnvFile } = await prompt(questions)
      if (shouldUpdateEnvFile) {
        await updateEnvFile(schemaContent, envContent, schemaFile, envFile)
        logInfo(`✅ Environment file (${chalk.underline(getShortFileName(envFile))}) updated successfully`)
      }
      exitWithSuccess()
    }

    await updateEnvFile(schemaContent, envContent, schemaFile, envFile)
    logInfo(`✅ Environment file (${chalk.underline(getShortFileName(envFile))}) updated successfully`)
    exitWithSuccess()
  }

  logInfo(`✅ Environment file (${chalk.underline(getShortFileName(envFile))}) checked successfully`)
  exitWithSuccess()
}

module.exports = {
  checkEnvFile,
}
