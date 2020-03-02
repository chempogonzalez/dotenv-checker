#!/usr/bin/env node
const { argv } = require('yargs').options({
  env: {
    alias: 'e',
    type: 'string',
    usage: 'Usage: $0 --env .env.local',
    describe: 'Name of the env file. Defaults to ".env.local"',
  },
  schema: {
    alias: 's',
    type: 'string',
    usage: 'Usage: $0 --schema .env.schema',
    describe: 'Name of the schema file. Defaults to ".env.schema"',
  },
}).strict(true)
  .example('$0 --env .env.local', 'Run the command with a custom env file')
  .example('$0 --schema .env.schema', 'Run the command with a custom schema file')
  .example('$0 -e .env.dev -s .env.example', 'Run the command with a custom env and schema file')
  .epilog('Made with ❤️');
const { checkEnvFile } = require('.');

const workingDir = process.cwd();
const options = {
  schemaFile: `${workingDir}/${argv.schema || '.env.schema'}`,
  envFile: `${workingDir}/${argv.env || '.env'}`,
};
checkEnvFile(options).catch(console.error);
