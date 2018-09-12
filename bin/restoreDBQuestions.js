const readDir = require('readdir')
const fileExists = require('file-exists')

// Get OS home directory.
const oshomedir = require('os').homedir()

//rtkdb dumps dir folder.
const rtkdbhomedumpsdir = oshomedir+'/.rtkdb/dumps'

// Scan /dumps/ and get all dummp files for use in restore list.
var dumps = readDir.readSync(rtkdbhomedumpsdir, ['*.tar.gz'] );

let hostname = 'localhost'
let portnumber = 28015
let db = 'ayy'
let force = 'n'

// Check if rtkdbconfig.json exists
const rtkdbconfigexists = fileExists.sync(oshomedir+'/.rtkdb/rtkdbconfig.json')

if (rtkdbconfigexists) {
    // Get local config settings.
    const rtkdbconfig = require (oshomedir+'/.rtkdb/rtkdbconfig.json')
    rtkdbconfig.hostname && (hostname = rtkdbconfig.hostname)
    rtkdbconfig.portnumber && (portnumber = rtkdbconfig.portnumber)
    rtkdbconfig.db && (db = rtkdbconfig.db)
}



const restoreDBQuestions = [{
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
    // {
    //     type: 'input',
    //     name: 'db',
    //     message: 'Database Name',
    //     default: 'ayy',
    //     validate: (input) => {
    //         return new Promise((resolve, reject) => {
    //             if (!input.length) {
    //                 reject('Please provide a database name!')
    //             }
    //             resolve(true)
    //         })
    //     }
    // },
    {
        type: 'list',
        name: 'force',
        message: 'Force restore?',
        choices: ['Yes', 'No']
    },
    {
        type: 'list',
        name: 'filename',
        message: 'File Name',
        choices: dumps
    }
]

module.exports = restoreDBQuestions