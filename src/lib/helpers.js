// TODO: DOCUMENT METHODS
const getParsedAttributes = (fileContent) => {
  const lines = fileContent.split('\n')
  return lines.reduce((acc, curr) => {
    const line = curr.trim()

    // If it's not a comment line
    if (!line.startsWith('#')) {
      const [key, value] = line.split('=')
      if (key) acc[key] = value ?? ''
    }

    return acc
  }, {})
}

const areAttributesDifferent = (schemaContent, envContent) => {
  const schemaAttributes = Object.keys(getParsedAttributes(schemaContent) ?? {})
  const envAttributes = Object.keys(getParsedAttributes(envContent) ?? {})
  return JSON.stringify(schemaAttributes) !== JSON.stringify(envAttributes)
}



const exitWithError = () => process.exit(1)
const exitWithSuccess = () => process.exit(0)


module.exports = {
  getParsedAttributes,
  areAttributesDifferent,
  exitWithError,
  exitWithSuccess,
}
