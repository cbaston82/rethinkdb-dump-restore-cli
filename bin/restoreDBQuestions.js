const readDir = require('readdir')

// Get OS home directory.
const oshomedir = require('os').homedir()

//rtkdb dumps dir folder.
const rtkdbhomedumpsdir = oshomedir+'/.rtkdb/dumps'

// Scan /dumps/ and get all dummp files for use in restore list.
var dumps = readDir.readSync(rtkdbhomedumpsdir, ['*.tar.gz'] );

const restoreDBQuestions = [{
        type: 'input',
        name: 'host',
        message: 'Hostname',
        default: 'localhost'
    },
    {
        type: 'input',
        name: 'port',
        message: 'Port Number',
        default: '28015'
    },
    {
        type: 'input',
        name: 'db',
        message: 'Database Name',
        default: 'ayy',
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
        type: 'confirm',
        name: 'force',
        message: 'Force restore?',
        default: 'No'
    },
    {
        type: 'list',
        name: 'filename',
        message: 'File Name',
        choices: dumps
    }
]

module.exports = restoreDBQuestions