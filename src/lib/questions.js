/**
 * Default prompt first question when the env file doesn't exist
 */
const defaultQuestion = {
  type: 'confirm',
  name: 'createFile',
  message: ' We have seen that the .env file needed is not created. \nDo you want to continue creating the file?',
  default: true,
};

/**
 * First question for prompt when the env file doesn't match with the schema file
 */
const updateQuestion = {
  type: 'confirm',
  name: 'createFile',
  message: ` We have seen that the .env file differs from the schema file. \nDo you want to continue updating the file?`,
  default: true,
};


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
      validate: (input) => ((input.length < 1) ? 'Value cannot be empty' : true),
      filter: (input) => ((input.length < 1) ? '' : `${curr}=${input}`),
      transformer: (input) => ((input.length < 1) ? '' : input.split('=')[1] || input),
    };
    return [
      ...prev,
      question,
    ];
  }
  return [...prev];
}, [updateEnv ? updateQuestion : defaultQuestion]);

module.exports = {
  getQuestions,
};
