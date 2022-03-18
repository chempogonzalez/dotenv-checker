const appRoot = require('app-root-path')
const merge = require('deepmerge')
const path = require('path')

const { writeFile } = require('../lib/file')


const SCRIPT_TO_BE_ADDED = {
  predev: 'dotenv-checker --schema .env.schema --env .env.local',
}

const { path: rootPath } = appRoot
const packageJSONPath = path.join(rootPath, 'package.json')

const packageJSON = require(packageJSONPath)



if (!packageJSON.scripts?.predev) {
  const newPackageJSONContent = merge(packageJSON, { scripts: SCRIPT_TO_BE_ADDED })
  writeFile(packageJSONPath, JSON.stringify(newPackageJSONContent, null, 2))
}
