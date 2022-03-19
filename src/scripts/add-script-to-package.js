const appRoot = require('app-root-path')
const merge = require('deepmerge')
const path = require('path')

const { writeFile } = require('../lib/file')
const { exitWithSuccess } = require('../lib/helpers')



/* [start] ------------------ CONSTANTS ---------------------------------- */
const PACKAGE_NAME = 'dotenv-checker'

const SCRIPT_TO_BE_ADDED = {
  predev: `${PACKAGE_NAME} --schema .env.schema --env .env.local`,
}
/* [end] -------------------- CONSTANTS ---------------------------------- */



const { path: rootPath } = appRoot
const packageJSONPath = path.join(rootPath, 'package.json')

const packageJSON = require(packageJSONPath)


const { name: projectName } = packageJSON

/** Guard for npm install in currrent package */
if (projectName === PACKAGE_NAME) exitWithSuccess()

if (!packageJSON.scripts?.predev) {
  const newPackageJSONContent = merge(packageJSON, { scripts: SCRIPT_TO_BE_ADDED })
  writeFile(packageJSONPath, JSON.stringify(newPackageJSONContent, null, 2))
}
