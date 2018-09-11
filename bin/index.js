#!/usr/bin/env node

const chalk = require('chalk')
const clear = require('clear')
const inquirer = require('inquirer')
const figlet = require('figlet')
const shell = require('shelljs')

// Questions.
const initChoices = require('./initChoices.js')
const dumpDBQuestions = require('./dumpDBQuestions.js')
const restoreDBQuestions = require('./restoreDBQuestions.js')

// Clearn terminal.
clear()

// Show a nice figlet on start of application.
console.log(
  chalk.yellowBright(
    figlet.textSync('RethinkDB')
  )
)

// Show a nice description on bottom of figlet with the app description.
console.log(
  chalk.whiteBright('Welcome to the Rethinkdb Dump and Restore CLI utility.')
)

// Prompt user with choices at start e.g (Dump DB, Restore DB). Run selected.
;(async () => {
  this.dumpdb = dumpdb
  this.restoredb = restoredb
  const run = await inquirer.prompt(initChoices)
  await this[run.action.toLowerCase().split(' ').join('')]()
})()

// Restore DB function.
async function restoredb () {
  const {host, port, db, filename, force} = await inquirer.prompt(restoreDBQuestions)
  let command = ['rethinkdb restore -c']
  host, port && (command = command.concat([host+':'+port]))
  force && (command = command.concat(['--force']))
  filename && (command = command.concat([`${__dirname}/dumps/${filename}`]))
  runcommand(command)
}

// Dump DB function.
async function dumpdb () {
  const {host, port, db, filename} = await inquirer.prompt(dumpDBQuestions)
  let command = ['rethinkdb dump -c']
  host, port && (command = command.concat([host+':'+port]))
  filename && (command = command.concat([`-f ${__dirname}/dumps/${filename}`]))
  runcommand(command)
}

// Execute the command to either dump or restore db.
async function runcommand (command) {
  await shell.exec(command.join(' '))
  shell.echo(`${chalk.white('Done')}`)
}