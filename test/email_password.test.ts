import { EmailPasswordCheck } from '../src/utils/email_password_check';
const CHECK = new EmailPasswordCheck();

// Email test
test.each([
  ['test@mail.sd', null], // Right case
  ['testmail.sd', 'The email address must contain the "@" symbol.'], // Wrong cases
  ['test@', 'The email address must contain a local part and a domain name.'],
  [' test@mail.sd ', 'The email address must not contain any initial or final spaces.'],
  ['test@abc.a', 'The email address must be formatted like example@email.com'],
])('emailCheck should return the correct result', async (email, expectedResult) => {
  const result = await CHECK.emailCheck(email);
  expect(result).toEqual(expectedResult);
});

// Password test
test.each([
  ['pAss0word!', null], // Right case
  ['A0word!', 'The password must be at least 8 characters long.'], // Wrong cases
  ['pass0word!', 'The password must contain at least one capital letter (A-Z).'],
  ['PASS0WORD!', 'The password must contain at least one lowercase letter (a-z).'],
  ['pAssword!', 'The password must contain at least one digit (0-9).'],
  [' pAss0word! ', 'The password must not contain any initial or final spaces.'],
])('passwordCheck should return the correct result', async (password, expectedResult) => {
  const result = await CHECK.passwordCheck(password);
  expect(result).toEqual(expectedResult);
});
