#!/usr/bin/env node

const chalk = require('chalk')
const clear = require('clear')
const inquirer = require('inquirer')
const figlet = require('figlet')
const shell = require('shelljs')
const mkdirp = require('mkdirp')
const cmd = require('node-cmd')
const fileExists = require('file-exists')

// Get OS home directory.
const oshomedir = require('os').homedir()

//rtkdb dumps dir folder.
const rtkdbhomedumpsdir = oshomedir+'/.rtkdb/dumps'

// Create dumps directory.
mkdirp.sync(rtkdbhomedumpsdir, function (err) {
    if (err) throw new Error("Something went badly wrong!")
});

// Questions.
const initChoices = require('./initChoices.js')
const dumpDBQuestions = require('./dumpDBQuestions.js')
const restoreDBQuestions = require('./restoreDBQuestions.js')
const restoreTableQuestions = require('./restoreTableQuestions.js')

// Clearn terminal.
clear()

// Show a nice figlet on start of application.
console.log(
  chalk.cyanBright(
    figlet.textSync('RethinkDB')
  )
)

// Show a nice description on bottom of figlet with the app description.
console.log(
  chalk.whiteBright('Welcome to the Rethinkdb Dump and Restore CLI utility.')
)

// Prompt user with choices at start e.g (Dump DB, Restore DB, etc). Run selected.
;(async () => {
  this.dumpdb = dumpdb
  this.restoredb = restoredb
  this.restoretable = restoretable
  this.abort = abort
  this.listdumpsdirectorycontents = listdumpsdirectorycontents
  this.viewconfigurations = viewconfigurations

  const run = await inquirer.prompt(initChoices)
  await this[run.action.toLowerCase().split(' ').join('')]()
})()

// Restore DB function.
async function restoredb () {
  const {host, port, db, filename, force} = await inquirer.prompt(restoreDBQuestions)
  let command = ['rethinkdb restore -c']

  host, port && (command = command.concat([host+':'+port]))
  force === 'Yes' && (command = command.concat(['--force']))
  filename && (command = command.concat([`${rtkdbhomedumpsdir}/${filename}`]))
  db && (command = command.concat([`-i ${db}`]))

  await runcommand(command)
}

// Dump DB function.
async function dumpdb () {
  const {host, port, db, filename} = await inquirer.prompt(dumpDBQuestions)
  let command = ['rethinkdb dump -c']

  host, port && (command = command.concat([host+':'+port]))
  db && (command = command.concat([`-e ${db}`]))
  filename && (command = command.concat([`-f ${rtkdbhomedumpsdir}/${filename}`]))

  await runcommand(command)
}

// Restore table.
async function restoretable () {
  const {host, port, db, filename, tablename, force} = await inquirer.prompt(restoreTableQuestions)
  let command = ['rethinkdb restore -c']

  host, port && (command = command.concat([host+':'+port]))
  force === 'Yes' && (command = command.concat(['--force']))
  filename && (command = command.concat([`${rtkdbhomedumpsdir}/${filename}`]))
  tablename, db && (command = command.concat([`-i ${db}.${tablename}`]))

  await runcommand(command)
}

// Execute the command to either dump or restore db.
async function runcommand (command) {
  console.log(
    chalk.greenBright(
      '\n' +
      command.join(' ') +
      '\n'
      )
  )
  await shell.exec(command.join(' '))
  shell.echo(`${chalk.greenBright('\n Done \n')}`)
}

// Open dumps directory.
function listdumpsdirectorycontents () {
  cmd.get(
    `
      cd ${rtkdbhomedumpsdir}
      ls
    `,
    function(err, data, stderr){
      if (!err) {
        console.log(
          '\n' +
          chalk.redBright('Directory contents:') + 
          '\n' + 
          data
        )
      } else {
        console.log('error', err)
      }
    }
  );
}

// View rtkdbconfig.json.
function viewconfigurations () {
  const rtkdbconfigexists = fileExists.sync(oshomedir+'/.rtkdb/rtkdbconfig.json')
  if (rtkdbconfigexists) {
    cmd.get(
      `
        cd ${oshomedir}/.rtkdb
        cat rtkdbconfig.json
      `,
      function(err, data, stderr){
        if (!err) {
          console.log(
            '\n' +
            chalk.redBright('Directory contents:') + 
            '\n' + 
            data
          )
        } else {
          console.log('error', err)
        }
      }
    );
  } else {
    console.log(
      '\n' +
      chalk.redBright(`
        There was an error while trying to read the rtkdbconfig.json.
        For more information on setting up the rtkdbconfig.json
        visit https://github.com/ImagineDesignDevelop/rethinkdb-dump-restore-cli
      `) + 
      '\n'
    )
  }
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