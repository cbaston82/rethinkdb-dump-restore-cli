const readDir = require('readdir')
const fileExists = require('file-exists')

// Get OS home directory.
const oshomedir = require('os').homedir()

//rtkdb dumps dir folder.
const rtkdbhomedumpsdir = oshomedir+'/.rtkdb/dumps'

// Default settings
let hostname = 'localhost'
let portnumber = 28015
let db = 'test'
let force = 'n'

// Check if rtkdbconfig.json exists and override default settings.
const rtkdbconfigexists = fileExists.sync(oshomedir+'/.rtkdb/rtkdbconfig.json')
if (rtkdbconfigexists) {
    const rtkdbconfig = require (oshomedir+'/.rtkdb/rtkdbconfig.json')
    rtkdbconfig.hostname && (hostname = rtkdbconfig.hostname)
    rtkdbconfig.portnumber && (portnumber = rtkdbconfig.portnumber)
    rtkdbconfig.db && (db = rtkdbconfig.db)
}

const options = {
  hostname: hostname,
  portnumber: portnumber,
  db: db,
  force: force
}

// Scan /dumps/ and get all dummp files for use in restore list.
const dumps = readDir.readSync(rtkdbhomedumpsdir, ['*.tar.gz'] );

module.exports = {options, dumps}