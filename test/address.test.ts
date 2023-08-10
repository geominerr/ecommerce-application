import { AddressCheck } from '../src/utils/address_check';
const CHECK = new AddressCheck();

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
