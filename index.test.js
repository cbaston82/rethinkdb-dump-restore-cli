const choice = require('./bin/initChoices')

// Test Choices
test('Option should be "Dump DB"', () => {
  const choiceOne = choice[0].choices[0]
  expect(choiceOne).toMatch(/Dump DB/)
});

test('Option should be "Restore DB"', () => {
  const choiceOne = choice[0].choices[1]
  expect(choiceOne).toMatch(/Restore DB/)
});

test('Option should be "Restore Table"', () => {
  const choiceOne = choice[0].choices[2]
  expect(choiceOne).toMatch(/Restore Table/)
});

test('Option should be "List Dumps Directory Contents"', () => {
  const choiceOne = choice[0].choices[3]
  expect(choiceOne).toMatch(/List Dumps Directory Contents/)
});

test('Option should be "View Configurations"', () => {
  const choiceOne = choice[0].choices[4]
  expect(choiceOne).toMatch(/View Configurations/)
});

