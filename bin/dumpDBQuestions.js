const {options, dumps} = require('./config')
const timestamp = require('time-stamp')

const dumpDBQuestions = [{
        type: 'input',
        name: 'host',
        message: 'Host dumping from',
        default: options.hostname
    },
    {
        type: 'input',
        name: 'port',
        message: 'Port number',
        default: options.portnumber
    },
    {
        type: 'input',
        name: 'db',
        message: 'Database dumping',
        default: options.db,
        validate: (input) => {
            return new Promise((resolve, reject) => {
                if (!input.length) {
                    reject('Please provide a database name!')
                }
                resolve(true)
            })
        }
    },
    {
        type: 'input',
        name: 'filename',
        message: 'File name',
        default: `rethikdb_dump_${timestamp('YYYY-MM-DDTHH:mm:ss')}.tar.gz`
    }
]

module.exports = dumpDBQuestions