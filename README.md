# 🔌 dotENV-checker [![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

<img src="https://img.shields.io/npm/v/dotenv-checker?style=for-the-badge" />

> Environment file checker/generator 


## 🔖 Description

This application is a **checker/generator for environment files**. It checks, based on a schema/base file, if your .env is up-to-date and it maintains them synchronized.

## 📦 Installation

```zsh
# Install the cli in devDependencies
$ npm i dotenv-checker -D
```


## 🚀 Usage
Automatically, when you installs the package it will add a "predev" script. In case you need it, here you have an example to make it manually

```jsonc
{
  "scripts": {
    // Script with "pre" in the name is executed before
    // the script named "dev" automatically
    "predev": "dotenv-checker -s .env.schema -e .env.local",
    "dev": "next dev"
  }
}
```
## 🛠️ CLI Options
You can customize the cli options. Here you have the possible customizations: 
#### 🟣 `--schema or -s` _(default: ".env.schema")_
Sets the custom file to be used as a schema/base file. This is the file which is used to sync the environment file
```zsh
# Set a custom schema (file to be based on)
dotenv-checker --schema .env.base
```
<br>

#### 🟣 `--env or -e` _(default: ".env.local")_
Sets the custom file to be synchronized with the schema file. <br><br>In case this file is out-of-sync and has some keys that the schema doesn't have, it reports the named keys to you through terminal
```bash
# File to check that needs to be in sync with schema file
dotenv-checker --env .env.local
```
<br>

#### 🟣 `--skip-create-question or -scq` _(default: "true")_
By default it auto create the environment file if it doesn't exist. If you set this to "false" you can force to be asked to create it or not in case it's needed

```bash
# File to check that needs to be in sync with schema file
dotenv-checker --skip-create-question=false
```

<br>

#### 🟣 `--skip-update-question or -suq` _(default: "true")_
By default it auto updates the environment file if it differs from schema file. If you set this to "false" you can force to be asked to update it or not in case it's needed

```bash
# File to check that needs to be in sync with schema file
dotenv-checker --skip-create-question=false
```

<br>

## 💻 Examples
#### Files are in sync and no problems were found
<img src="https://github.com/chempogonzalez/dotenv-checker/blob/master/assets/all_ok.png">

#### Schema has new keys and env file is not synchronized
<img src="https://github.com/chempogonzalez/dotenv-checker/blob/master/assets/schema_has_new_keys.png">

#### Environment file has keys that are not in schema
<img src="https://github.com/chempogonzalez/dotenv-checker/blob/master/assets/env_has_keys_are_not_in_schema.png">

------
<br>


## 🤓 Happy Code

> Created with Typescript! ⚡ and latin music 🎺🎵

### This README.md file has been written keeping in mind

- [GitHub Markdown](https://guides.github.com/features/mastering-markdown/)
- [Emoji Cheat Sheet](https://www.webfx.com/tools/emoji-cheat-sheet/)
