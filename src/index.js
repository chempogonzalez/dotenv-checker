'use strict';
import { prompt } from 'inquirer';
import { fileExists } from './lib/helpers';


const questions = [
  {
    type: 'confirm',
    name: 'toBeDelivered',
    message: ' We have seen that the .env file needed is not created. \nDo you want to continue creating the file?',
    default: true,
  },
];
const run = async (schema, envFile = undefined) => {
  const schemaFile = schema || '.env.schema';
  try {
    const isSchema = await fileExists(schema || '.env.schema');
    console.log(`✅ Schema file properly read`);
    const answers = await prompt(questions);
  } catch (err) {
    console.error(`❌ Error trying to get the 📄 ${schemaFile} file`);
  }
}



run();



