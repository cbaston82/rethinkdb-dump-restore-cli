const initChoices = [
    {
      type: 'list',
      name: 'action',
      message: 'Please select an option',
      choices: ['Dump DB', 'Restore DB', 'Restore Table', 'List Dumps Directory Contents', 'View Configurations', 'Abort'],
      default: 'Dummp DB'
    }
  ]

  module.exports = initChoices