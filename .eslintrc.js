// @ts-check
const RULES = {
  OFF: 0,
  WARNING: 1,
  ERROR: 2,
}

// eslint-disable-next-line no-unused-vars
const { OFF, WARNING, ERROR } = RULES


const COMMON_RULES = {}

const TYPESCRIPT_RULES = {}




/** @type {import('eslint').ESLint.Options['baseConfig']} */
module.exports = {
  // Rules for .js or .jsx files
  extends: ['./node_modules/@chempo/ec-linter/configs/without-next/.eslintrc.js'],
  rules: {
    ...COMMON_RULES,
  },

  // Rules for .ts or .tsx files
  overrides: [
    {
      files: ['**/*.+(ts|tsx)'],
      rules: {
        ...COMMON_RULES,
        ...TYPESCRIPT_RULES,
      },
    },
  ],
}
