import { RegAuthCheck } from '../src/utils/regauth_check';

// Regauth test
test.each([
  ['test@mail.sd', null], // Right case
  ['testmail.sd', 'The email address must contain the "@" symbol.'], // Wrong cases
  ['test@', 'The email address must contain a local part and a domain name.'],
  [' test@mail.sd ', 'The email address must not contain any initial or final spaces.'],
  ['test@abc.a', 'The email address must be formatted like example@email.com'],
])('emailCheck should return the correct result', async (email, expectedResult) => {
  const check = new RegAuthCheck();
  const result = await check.emailCheck(email);
  expect(result).toEqual(expectedResult);
});
