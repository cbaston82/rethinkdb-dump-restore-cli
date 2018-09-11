const choice = require('./bin/initChoices')

// Test Choices
test('Should equal to Dump DB', () => {
  const choiceOne = choice[0].choices[0]
  expect(choiceOne).toMatch(/Dump DB/)
});

test('Should equal to Restore DB', () => {
  const choiceOne = choice[0].choices[1]
  expect(choiceOne).toMatch(/Restore DB/)
});