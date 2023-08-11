import { AddressCheck } from '../src/utils/address_check';
const CHECK = new AddressCheck();

// Age
test.each([
  ['1990-01-01', null], // Right case
  ['2016-06-06', 'Get out of here, little sucker.'], // Wrong cases
  ['1915-03-16', 'You should be dead.'],
])('ageCheck should return the correct result', async (age, expectedResult) => {
  const result = await CHECK.ageCheck(age);
  expect(result).toEqual(expectedResult);
});

// Postal code
test('postalCodeCheck should return null for correct postal code', async () => {
  const code = '12345';
  const country = 'US';
  const result = CHECK.postalCodeCheck(code, country);
  expect(result).toBeNull();
});

test('postalCodeCheck should return an error message for incorrect postal code', async () => {
  const code = '1234';
  const country = 'US';
  const result = CHECK.postalCodeCheck(code, country);
  expect(result).toEqual('Zip code required length 5 characters!');
});

// Country
test('countryCheck should return the correct country name for valid country code', () => {
  const country = 'United States';
  const expectedResult = 'US';
  const result = CHECK.countryCheck(country);
  expect(result).toEqual(expectedResult);
});

test('countryCheck should return null for invalid country code', () => {
  const invalidCountry = 'Uganda';
  const result = CHECK.countryCheck(invalidCountry);
  expect(result).toBeNull();
});
