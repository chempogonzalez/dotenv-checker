#!/usr/bin/env node
const { program, Option } = require('commander')
const path = require('path')

const { checkEnvFile } = require('..')
const { version } = require('../../package.json')



program
  .name('dotenv-checker')
  .description('🔖 CLI to check .env files depending on a schema file with some functionalities')
  .version(version, '-v, --version')
  .addHelpCommand(false)
  .showSuggestionAfterError()
  .addHelpText('beforeAll', `
  ///////////////////////////////////
  ///                             ///
  ///     DOTENV-CHECKER (CLI)    ///
  ///                             ///
  ///   Author: @chempogonzalez   ///
  ///                             ///
  ///////////////////////////////////
  `)

  .addOption(new Option(
    '-e, --env <env-file>',
    'path/name of the .env file',
  ).default('.env.local', '.env.local'))

  .addOption(new Option(
    '-s, --schema <schema-file>',
    'path/name of the schema file. Defaults to ".env.schema"',
  ).default('.env.schema', '.env.schema'))

  .addHelpText('after', `
🌀 Examples:
  $ dotenv-checker --env .env.local               Run the command with a custom env file'
  $ dotenv-checker --schema .env.schema           Run the command with a custom schema file
  $ dotenv-checker -e .env.dev -s .env.example    Run the command with a custom env and schema file
  `)
  .addHelpText('afterAll', `
  ----------------------------------------
  Created with JS ⚡ and lating music 🎺🎵
  ----------------------------------------
  `)
  .parse(process.argv)



// Display help if no args are provided
if (process.argv.length < 3) {
  program.help()
}


const { INIT_CWD } = process.env
const cwd = INIT_CWD || process.cwd()
const workingDir = cwd


const { schema, env } = program.opts()
const schemaFilePath = path.isAbsolute(schema)
  ? schema
  : path.join(workingDir, schema)

const envFilePath = path.isAbsolute(env)
  ? env
  : path.join(workingDir, env)


const options = {
  schemaFile: schemaFilePath,
  envFile: envFilePath,
}


checkEnvFile(options).catch(console.error)
