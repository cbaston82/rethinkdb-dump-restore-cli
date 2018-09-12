const fileExists = require('file-exists')
const oshomedir = require('os').homedir()

let hostname = 'localhost'
let portnumber = 28015
let db = 'ayy'

// Check if rtkdbconfig.json exists
const rtkdbconfigexists = fileExists.sync(oshomedir+'/.rtkdb/rtkdbconfig.json')

if (rtkdbconfigexists) {
    // Get local config settings.
    const rtkdbconfig = require (oshomedir+'/.rtkdb/rtkdbconfig.json')
    hostname = rtkdbconfig.hostname
    portnumber = rtkdbconfig.portnumber
    db = rtkdbconfig.db
}

const dumpDBQuestions = [{
        type: 'input',
        name: 'host',
        message: 'Hostname',
        default: hostname
    },
    {
        type: 'input',
        name: 'port',
        message: 'Port Number',
        default: portnumber
    },
    {
        type: 'input',
        name: 'db',
        message: 'Database Name',
        default: db,
        validate: (input) => {
            return new Promise((resolve, reject) => {
                if (!input.length) {
                    reject('You need to provide a database name!')
                }
                resolve(true)
            })
        }
    },
    {
        type: 'input',
        name: 'filename',
        message: 'File Name',
        default: `rethinkdb_dump.${new Date().getTime()}.tar.gz`
    }
]

module.exports = dumpDBQuestions