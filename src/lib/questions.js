
function getShortFileName (filePath) { return filePath.split('/').slice(-1)[0] }
/**
 * Default prompt first question when the env file doesn't exist
 */
const defaultQuestion = {
  type: 'confirm',
  name: 'createFile',
  message: ' We have seen that the .env file needed is not created. \nDo you want to continue creating the file?',
  default: true,
}

/**
 * First question for prompt when the env file doesn't match with the schema file
 */
const updateQuestion = {
  type: 'confirm',
  name: 'createFile',
  message: ' We have seen that the .env file differs from the schema file. \nDo you want to continue updating the file?',
  default: true,
}


/**
 * @function getQuestions
 *
 * @description Format object array with the questions object based on attributes provided
 *
 * @param {Array<string>} attributes Attributes to be asked for
 * @param {boolean} updateEnv Flag to change first question message
 *
 * @returns Array<object>
 */
const getQuestions = (attributes, updateEnv) => attributes.reduce((prev, curr, index) => {
  if (curr) {
    const question = {
      type: 'input',
      name: `question-${index}`,
      message: `${curr}=`,
      default: '',
      when: (answers) => answers.createFile === true,
      // validate: (input) => ((input.length < 1) ? 'Value cannot be empty' : true),
      filter: (input) => (`${curr}=${input}`),
      transformer: (input) => (input.split('=')[1] ?? ''),
    }
    return [
      ...prev,
      question,
    ]
  }
  return [...prev]
}, [updateEnv ? updateQuestion : defaultQuestion])



const getCreateNewEnvFileQuestions = (envFile) => {
  const envFileName = getShortFileName(envFile)
  return {
    type: 'confirm',
    name: 'createEnvFile',
    message: ` We have seen that the "${envFileName}" file is not created. \nDo you want to continue creating the file?`,
    default: true,
  }
}



const getUpdateEnvFileQuestions = (envFile, schemaFile) => {
  const envFileName = getShortFileName(envFile)
  const schemaFileName = getShortFileName(schemaFile)
  return {
    type: 'confirm',
    name: 'shouldUpdateEnvFile',
    message: ` We have seen that the "${envFileName}" file differs from the "${schemaFileName}" file. \nDo you want to continue updating the file?`,
    default: true,
  }
}

module.exports = {
  getQuestions,
  getCreateNewEnvFileQuestions,
  getUpdateEnvFileQuestions,
}
