#!/usr/bin/env node

const chalk = require('chalk')
const clear = require('clear')
const inquirer = require('inquirer')
const figlet = require('figlet')
const shell = require('shelljs')
const mkdirp = require('mkdirp')

// Get OS home directory.
const oshomedir = require('os').homedir()

//rtkdb dumps dir folder.
const rtkdbhomedumpsdir = oshomedir+'/.rtkdb/dumps'

mkdirp.sync(rtkdbhomedumpsdir, function (err) {
    if (err) throw new Error("Something went badly wrong!")
});

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
  this.abort = abort
  const run = await inquirer.prompt(initChoices)
  await this[run.action.toLowerCase().split(' ').join('')]()
})()

// Restore DB function.
async function restoredb () {
  const {host, port, filename, force} = await inquirer.prompt(restoreDBQuestions)
  let command = ['rethinkdb restore -c']
  host, port && (command = command.concat([host+':'+port]))
  force && (command = command.concat(['--force']))
  filename && (command = command.concat([`${rtkdbhomedumpsdir}/${filename}`]))
  runcommand(command)
}

// Dump DB function.
async function dumpdb () {
  const {host, port, db, filename} = await inquirer.prompt(dumpDBQuestions)
  let command = ['rethinkdb dump -c']
  host, port && (command = command.concat([host+':'+port]))
  db && (command = command.concat([`-e ${db}`]))
  filename && (command = command.concat([`-f ${rtkdbhomedumpsdir}/${filename}`]))
  runcommand(command)
}

// Exit the utility. Do nothing.
function abort () {
  console.log(
    '\n' +
    chalk.redBright('Aborting...') + 
    '\n'
  )
  process.exit() 
}

// Execute the command to either dump or restore db.
async function runcommand (command) {
console.log(
  chalk.redBright(
    '\n' +
    command.join(' ') +
    '\n'
    )
)
  await shell.exec(command.join(' '))
  shell.echo(`${chalk.white('Done')}`)
}