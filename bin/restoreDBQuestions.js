const {options, dumps} = require('./config')

const restoreDBQuestions = [{
        type: 'input',
        name: 'host',
        message: 'Host restoring from',
        default: options.hostname
    },
    {
        type: 'input',
        name: 'port',
        message: 'Port number',
        default: options.portnumber
    },
    {
        type: 'list',
        name: 'force',
        message: 'Force restore?',
        choices: ['Yes', 'No']
    },
    {
        type: 'input',
        name: 'db',
        message: 'Database restoring from',
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
        type: 'list',
        name: 'filename',
        message: 'File name',
        choices: dumps
    }
]

module.exports = restoreDBQuestions