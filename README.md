# Env-generator - Environment file generator [![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)


## Description

This application is a simple checker/generator for environment files. It checks based on a schema file, if your .env is up-to-date compared with schema variables. 

In case you don't have .env file created or if it differs from schema file, it allows you to create the file through terminal prompt.

## 🚀 USAGE

As the library process are done asynchronously it returns a `Promise<void>` when the process is done.
```js
/**
 * Import the env-generator library
 * (main method with object destructuring)
 **/
import { checkEnvFile } from 'env-generator';

// Check environment variable with default config
await checkEnvFile();
```

### ⚙️ Usage with custom options

The library allows you to customize some options:
- `schemaFile` (default `'.env.schema'`) -- Allows you to specify the schema file with a custom name or location _(paths must be specified from root directory)_
- `envFile` (default `'.env'`) -- Allows you to specify the environment file to be created/checked with a custom name or location _(paths must be specified from root directory)_

```js
/**
 * Import the env-generator library
 * (main method with object destructuring)
 **/
import { checkEnvFile } from 'env-generator';

// Check environment variable with default config
await checkEnvFile({
  schemaFile: '.env.example',
  envFile: '.env.local',
});
```

<br/>

-------------------------------------------------
<br/>

## 📌 Methodologies and Guidelines

These are the methodologies and guides.

- [GitHub flow](https://guides.github.com/introduction/flow/)

Visual Studio Code Editor configurations and plugins.

- [jsdoc](https://marketplace.visualstudio.com/items?itemName=stevencl.addDocComments)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Guideline JS and CSS.

- [JSDoc](https://www.npmjs.com/package/eslint-plugin-jsdoc)

## ⚡️ Technologies and Tools

- [NodeJS](https://nodejs.org/)
- [InquirerJS](https://github.com/SBoudrias/Inquirer.js/)


## 📐 How to work with this project

### ✅ Prerequisites

In order to work with this project, your local environment must have at least the following versions:

* NodeJS Version: 10.xx or higher
* NPM Version: 6.12.0

The following steps must be followed in order to work with this project locally.

### 1️⃣ Install NodeJS Dependencies

To work with this project locally, it is necessary to install the NPM dependencies.

```bash
# Install npm dependencies
$npm i
```


### 3️⃣ Development

To start working locally with the project you will need to execute the following command:

```bash
# Development
$npm run start:watch
```

To run the linters for this project you will need to execute the following command:

```bash
# ESLint linter
$npm run lint

# Duplicated code
$npm run lint:copy-paste
```


## 📂 Code scaffolding

```any
/
├── doc
|   ├── qac 🔰              # Quality Assurance Code.
|   |   └── ...             # ...
|   |
├── src
|   ├── lib
|   |   ├── file            # Methods for file writting/reading
|   |   ├── helpers         # Common methods to be used in the app
|   |   ├── logger          # Custom pretty console logs
|   |   ├── questions       # Prompt's questions code related
|   |   └── ... index.js    # Main Lib logic method
|   └── ... index.js        # Main Lib folder functionality export
└── ...
```

## Happy Code

Created with Typescript! ⚡ and latin music 🎺🎵

### This README.md file has been written keeping in mind

- [GitHub Markdown](https://guides.github.com/features/mastering-markdown/)
- [Emoji Cheat Sheet](https://www.webfx.com/tools/emoji-cheat-sheet/)
