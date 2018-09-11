const dumpDBQuestions = [{
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
        type: 'input',
        name: 'filename',
        message: 'File Name',
        default: `rethinkdb_dump.${new Date().getTime()}.tar.gz`
    }
]

module.exports = dumpDBQuestions