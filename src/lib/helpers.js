/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */


/**
 * @function cleanNullValuesFromArray
 *
 * @description Delete all the undefined values within the array
 *
 * @param array Array to be cleaned up
 *
 * @returns {Array<object>} Cleaned up array
 */
const cleanNullValuesFromArray = (array) => {
  const returnedArray = [...array]
  array.forEach((obj) => {
    if (!obj) {
      returnedArray.splice(returnedArray.indexOf(undefined || ''), 1)
    }
  })
  return returnedArray
}


/**
 * @function arrayDiff
 *
 * @description Gets the differences between schemaArray and envArray
 *
 * @param {Array<string>} schemaArray String array from schema variable names
 * @param {Array<string>} envArray String array from environment variable names
 *
 * @returns Array<string>
 */
const arrayDiff = (schemaArray, envArray) => {
  const a = []
  const diff = []
  const cleanedSchema = cleanNullValuesFromArray(schemaArray)
  const cleanedEnv = cleanNullValuesFromArray(envArray)
  for (let i = 0; i < cleanedSchema.length; i += 1) {
    a[schemaArray[i]] = true
  }
  for (let i = 0; i < cleanedEnv.length; i += 1) {
    if (a[envArray[i]]) {
      delete a[envArray[i]]
    }
  }
  for (const k in a) {
    diff.push(k)
  }
  return diff
}


/**
 * @function getDifference
 *
 * @description Wrapper of arrayDiff, cleaning the arrays before execute arrayDiff
 *
 * @param {Array<string>} schemaAttributes String array from schema variable names
 * @param {Array<string>} envAttributes String array from environment variable names
 *
 * @returns Array<string>
 */
const getDifference = (schemaAttributes, envAttributes) => {
  const cleanedSchema = cleanNullValuesFromArray(schemaAttributes)
  const cleanedEnv = cleanNullValuesFromArray(envAttributes)
  const difference = arrayDiff(cleanedSchema, cleanedEnv)
  return difference
}


/**
 * @function getAttributesFromContent
 *
 * @description Gets array of environment variable names from the provided content
 *
 * @param {string} fileContent File content
 *
 * @returns Array<string>
 */
const getAttributesFromContent = (fileContent) => {
  const lines = fileContent.split('\n')
  return lines.reduce((prev, curr) => {
    if (curr) {
      const attribute = curr.split('=')[0]
      return [
        ...prev,
        attribute,
      ]
    }
    return [...prev]
  }, [])
}


/**
 * @function getEnvContent
 *
 * @description Gets the environment content to be writted well formatted
 *              based on provided answers object
 *
 * @param {object} answers Object which contains the answers in object attributes
 *
 * @returns string
 */
const getEnvContent = (answers) => {
  let content = ''
  for (const key in answers) {
    if (key.includes('-')) {
      content = `${content}${answers[key]}\n`
    }
  }
  return content
}

module.exports = {
  getEnvContent,
  getAttributesFromContent,
  getDifference,
}
