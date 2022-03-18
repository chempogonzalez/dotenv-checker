const appRoot = require('app-root-path')
const chalk = require('chalk')
const fs = require('fs')
const { prompt } = require('inquirer')
const path = require('path')

const { getParsedAttributes } = require('./helpers')
const { logEnvFileCreated, logInfo } = require('./logger')
const { getCreateNewEnvFileQuestions, getUpdateEnvFileQuestions } = require('./questions')

const { path: rootPath } = appRoot



const getFileFullPath = (file) => {
  const filePath = path.isAbsolute(file) && !file.startsWith(rootPath) ? rootPath : ''
  return path.join(filePath, file)
}



/**
 * @function writeFile
 *
 * @description Writes the given text into a file asynchronously returning a Promise
 *
 * @param {string} file file name to be saved (path + fileName)
 * @param {string} text file content
 *
 * @returns Promise<void>
 */
const writeFile = (file, text) => new Promise((resolve, reject) => {
  const fullPath = getFileFullPath(file)
  // const fullPath = `${path.isAbsolute(file) ? '' : `${rootPath}/`}/${FILE}`
  const folderPath = fullPath.substring(0, fullPath.lastIndexOf('/'))
  try {
    fs.mkdir(folderPath, { recursive: true }, (err) => {
      if (err) reject(err)

      fs.writeFile(fullPath, text, (error) => {
        if (error) reject(error)
        else resolve()
      })
    })
  } catch (err) {
    reject(err)
  }
})




const createNewEnvFile = async (schemaContent, envFile, options) => {
  if (options.skipCreateQuestion) {
    return writeFile(envFile, schemaContent).then(logEnvFileCreated(envFile))
  }

  const questions = getCreateNewEnvFileQuestions(envFile)
  const { createEnvFile } = await prompt(questions)

  if (createEnvFile) return writeFile(envFile, schemaContent).then(logEnvFileCreated(envFile))
}

const updateEnvFile = async (options, schemaContent, envContent, schemaFile, envFile) => {
  if (!options.skipUpdateQuestion) {
    const questions = getUpdateEnvFileQuestions(envFile, schemaFile)
    const { shouldUpdateEnvFile } = await prompt(questions)
    if (shouldUpdateEnvFile) {
      await processEnvFileToUpdate(schemaContent, envContent, schemaFile, envFile)
      logInfo(`✅ Environment file (${chalk.underline(getShortFileName(envFile))}) updated successfully`)
    }
    return
  }

  /** If skipping asking for auto-update file */
  await processEnvFileToUpdate(schemaContent, envContent, schemaFile, envFile)
  logInfo(`✅ Environment file (${chalk.underline(getShortFileName(envFile))}) updated successfully`)
}


// TODO: To be refactorized and simplified
const processEnvFileToUpdate = async (schemaContent, envContent, schemaFile, envFile) => {
  const schemaAttributes = getParsedAttributes(schemaContent)
  const envAttributes = getParsedAttributes(envContent)
  const keysNotInEnvFile = Object.keys(schemaAttributes).filter(k => !(k in envAttributes))

  let finalContent = schemaContent

  if (keysNotInEnvFile.length) {
    const textByLength = keysNotInEnvFile.length === 1
      ? 'Key which is going to be added:'
      : 'Keys which are going to be added:'

    console.log(`
  ${chalk.underline(textByLength)}
   - ${chalk.bold(keysNotInEnvFile.join('\n   - '))}
    `)
  }

  const keysNotInSchemaFile = Object.keys(envAttributes).filter(k => !(k in schemaAttributes))

  // If env file has other keys different than schema
  if (keysNotInSchemaFile.length) {
    const schemaFileName = schemaFile.split('/').slice(-1)[0]

    let envFileDifferentKeysBlock = '# **************** !!WARN!! KEYS NOT AVAILABLE IN ' + schemaFileName + ' ****************\n'

    const formattedKeysNotInSchemaFile = keysNotInSchemaFile.map(k => `${k}=${envAttributes[k]}`).join('\n  ')

    envFileDifferentKeysBlock += '  ' + formattedKeysNotInSchemaFile + '\n'

    envFileDifferentKeysBlock += '# ' + '*'.repeat(schemaFileName.length + 65) + '\n\n\n\n'
    finalContent = envFileDifferentKeysBlock + finalContent


    const textBylength = keysNotInSchemaFile.length === 1
      ? `The following key is not present in the "${schemaFileName}" file:`
      : `The following keys are not present in the "${schemaFileName}" file:`

    console.log(`
  ${chalk.bold.red('!! Alert !!')} ${chalk.underline(textBylength)}
               - ${chalk.bold(keysNotInSchemaFile.join('\n               - '))}
    `)
  }

  const finalContentByLines = finalContent.split('\n')

  finalContent = finalContentByLines.map(l => {
    const lineAttributeObj = getParsedAttributes(l)
    const [key] = Object.keys(lineAttributeObj ?? {})

    // Ensure currentline is a config line
    if (key in envAttributes) {
      const equalsSymbolIdx = l.indexOf('=')
      const beforeEqualsContent = l.substring(0, equalsSymbolIdx >= 0 ? equalsSymbolIdx : undefined)
      return beforeEqualsContent + '=' + envAttributes[key]
    }
    return l
  }).join('\n')

  return writeFile(envFile, finalContent)
}




/**
 * @function readFile
 *
 * @description Reads text asynchronously from the file and returns a Promise
 *
 * @param {string} file file name (path + name)
 *
 * @returns Promise<string>
 */
const readFile = (file) => new Promise((resolve, reject) => {
  const fullPath = getFileFullPath(file)
  fs.readFile(fullPath, 'utf8', (err, data) => {
    if (err) reject(err)
    else resolve(data)
  })
})


/**
 * @function fileExists
 *
 * @description Checks if the provided file exists
 *
 * @param {string} file file name (path + name)
 *
 * @returns Promise<boolean>
 */
const fileExists = (file) => new Promise((resolve, reject) => {
  const fullPath = getFileFullPath(file)
  fs.access(fullPath, fs.F_OK, (err) => {
    if (err) {
      reject(err)
    }
    resolve(true)
  })
})


const getShortFileName = (filePath) => filePath.split('/').slice(-1)[0]

module.exports = {
  fileExists,
  readFile,
  updateEnvFile,
  writeFile,
  createNewEnvFile,
  getShortFileName,
}
