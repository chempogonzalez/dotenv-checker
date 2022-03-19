#!/usr/bin/env node
// @ts-check
const chalk = require('chalk')
const { program, Option } = require('commander')
const gradient = require('gradient-string')
const path = require('path')

const { checkEnvFile } = require('..')
const { version } = require('../../package.json')



program
  .name('dotenv-checker')
  .description('🔖 CLI to check .env files depending on a schema file with some builtin functionalities')
  .version(version, '-v, --version')
  .addHelpCommand(false)
  .showSuggestionAfterError()
  .addHelpText('beforeAll', () => {
    console.log(chalk.bold(gradient.summer.multiline(`
    |||||||||||||||||||||||||||||||||||
    |||                             |||
    |||     DOTENV-CHECKER (CLI)    |||
    |||                             |||
    |||   Author: @chempogonzalez   |||
    |||                             |||
    |||||||||||||||||||||||||||||||||||
    `)))
    return ''
  })

  .addOption(new Option(
    '-e, --env <env-file>',
    'path/name of the .env file',
  ).default('.env.local', '.env.local'))

  .addOption(new Option(
    '-s, --schema <schema-file>',
    'path/name of the schema file',
  ).default('.env.schema', '.env.schema'))

  .addOption(new Option(
    '-scq, --skip-create-question [boolean]',
    'skips the "create <env-file> question" if it\'s needed and auto-creates the file',
  ).default(true, 'true'))

  .addOption(new Option(
    '-suq, --skip-update-question [boolean]',
    'skips the "update <env-file> question" and auto-updates the file',
  ).default(true, 'true'))


  .addHelpText('after', `
🌀 Examples:
  $ dotenv-checker --env .env.local               Run the command with a custom env file'
  $ dotenv-checker --schema .env.schema           Run the command with a custom schema file
  $ dotenv-checker -s .env.example -e .env.dev    Run the command with a custom env and schema file
  `)
  .addHelpText('afterAll', chalk.bold(gradient.cristal.multiline(`
  ----------------------------------------
  Created with JS ⚡ and lating music 🎺🎵
  ----------------------------------------
  `)))
  .parse(process.argv)


const { INIT_CWD } = process.env
const cwd = INIT_CWD || process.cwd()
const workingDir = cwd


const { schema, env, skipCreateQuestion, skipUpdateQuestion } = program.opts()

const schemaFilePath = path.isAbsolute(schema)
  ? schema
  : path.join(workingDir, schema)

const envFilePath = path.isAbsolute(env)
  ? env
  : path.join(workingDir, env)


const config = {
  schemaFile: schemaFilePath,
  envFile: envFilePath,
  options: {
    skipCreateQuestion: !!(skipCreateQuestion === true || skipCreateQuestion === 'true'),
    skipUpdateQuestion: !!(skipUpdateQuestion === true || skipUpdateQuestion === 'true'),
  },
}


checkEnvFile(config).catch(console.error)
