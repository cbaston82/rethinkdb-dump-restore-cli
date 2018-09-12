const initChoices = [
    {
      type: 'list',
      name: 'action',
      message: 'Please select an option',
      choices: ['Dump DB', 'Restore DB', 'Abort'],
      default: 'Dummp DB'
    }
  ]

  module.exports = initChoices