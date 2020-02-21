const defaultQuestion = {
  type: 'confirm',
  name: 'createFile',
  message: ' We have seen that the .env file needed is not created. \nDo you want to continue creating the file?',
  default: true,
};

const updateQuestion = {
  type: 'confirm',
  name: 'createFile',
  message: ` We have seen that the .env file differs from the schema file. \nDo you want to continue updating the file?`,
  default: true,
};



export const getQuestions = (attributes, updateEnv) => {
  return attributes.reduce((prev, curr, index) => {
    if (curr) {
      const question = {
        type: 'input',
        name: `question-${index}`,
        message: `${curr}=`,
        default: '',
        when: (answers) => answers.createFile === true,
        validate: (input) => input.length < 1 ? 'Value cannot be empty' : true,
      }
      return [
        ...prev,
        question,
      ];
    }
    return [...prev];
  }, [updateEnv ? updateQuestion : defaultQuestion]);
}